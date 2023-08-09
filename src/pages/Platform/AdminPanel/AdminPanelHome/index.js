import LayoutPage from "./../../../../components/Layouts/LayoutPage";
import LayoutBlocks from "./../../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "./../../../../components/Layouts/LayoutBlock";

import "./AdminPanelHome.scss";

import { useEffect, useState } from "react";

import axios from "../../../../utils/axios";

import getDifferenceBetweenTwoDates from "../../../../utils/getDifferenceBetweenTwoDates"

const AdminPanelHome = () => {
    const [stat, setStat] = useState({
        users: {
            total: 0,
            with_active_orders: 0
        },
        orders: {
            total: 0,
            checked_today: 0 // взять все заявки и проверить последние созданные за 24 часа
        },
        finances: {
            operations: 0,
            operations_today: 0,
            operations_total_sum: 0,
            operations_sum_today: 0
        }
    })

    useEffect(() => {
        axios
            .get("/api/admin/user")
            .then(({ data }) => setStat(prev => ({ ...prev, users: { ...prev.users, total: data.length } })))
            .catch(err => console.log(err))
        axios
            .get("/api/admin/order")
            .then(({ data }) => {
                let with_active_orders = 0
                let checked_today = 0
                data.map(order => {
                    if (getDifferenceBetweenTwoDates(order.createdAt, new Date()) < 24) {
                        checked_today += 1
                    }
                    if (order?.user?._id) {
                        if (order.user.id === JSON.stringify(localStorage.getItem('user'))._id) {
                            with_active_orders += 1
                        }
                    }
                })
                setStat(prev => ({ ...prev, users: { ...prev.users, with_active_orders }, orders: {total: data.length, checked_today} }))
            })
            .catch(err => console.log(err))
        axios
            .get("/api/admin/ukassa/getall")
            .then(({data}) => {
                let operations_today = []
                data.map(operation => {
                    if (getDifferenceBetweenTwoDates(operation.createdAt, new Date()) < 24) {
                        operations_today.push(operation)
                    }
                })
                setStat(prev => ({...prev, finances: {
                    operations: data.length,
                    operations_today: operations_today.length,
                    operations_total_sum: (() => {
                        let sum = data.reduce((total, item) => {
                            if (item?.payment?.amount?.value && item.status === "succeeded") {
                                return (total + Number(item.payment.amount.value))
                            } else if (item?.payment?.sum && item.status === "buy") {
                                return (total + Number(item.payment.sum))
                            }
                            return total
                        }, 0)
                        return `${sum} руб.`
                    })(),
                    operations_sum_today: (() => {
                        let sum = operations_today.reduce((total, item) => {
                            if (item?.payment?.amount?.value && item.status === "succeeded") {
                                return (total + Number(item.payment.amount.value))
                            } else if (item?.payment?.sum && item.status === "buy") {
                                return (total + Number(item.payment.sum))
                            }
                            return total
                        }, 0)
                        return `${sum} руб.`
                    })()
                }}))
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <LayoutPage title="Главная">
            <LayoutBlocks addClass={"layoutBlocks__adminPanelHome"}>
                <LayoutBlock title={["Пользователи", "users"]}>
                    <div className="adminPanelHome__rows">
                        <div className="adminPanelHome__rows-row">
                            Всего: <span>{stat.users.total}</span>
                        </div>
                        <div className="adminPanelHome__rows-row">
                            С активными заявками: <span>{stat.users.with_active_orders}</span>
                        </div>
                    </div>
                </LayoutBlock>
                <LayoutBlock title={["Заявки", "orders"]}>
                    <div className="adminPanelHome__rows">
                        <div className="adminPanelHome__rows-row">
                            Всего: <span>{stat.orders.total}</span>
                        </div>
                        <div className="adminPanelHome__rows-row">
                            Создано за последние 24 часа: <span>{stat.orders.checked_today}</span>
                        </div>
                    </div>
                </LayoutBlock>
                <LayoutBlock title={["Финансовая статистика", "analytics"]}>
                    <div className="adminPanelHome__rows">
                        <div className="adminPanelHome__rows-row">
                            Операций всего: <span>{stat.finances.operations}</span>
                        </div>
                        <div className="adminPanelHome__rows-row">
                            Операций за последние 24 часа: <span>{stat.finances.operations_today}</span>
                        </div>
                        <div className="adminPanelHome__rows-row">
                            Сумма всех операций: <span>{stat.finances.operations_total_sum}</span>
                        </div>
                        <div className="adminPanelHome__rows-row">
                            Сумма операций за последние 24 часа: <span>{stat.finances.operations_sum_today}</span>
                        </div>
                    </div>
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default AdminPanelHome;