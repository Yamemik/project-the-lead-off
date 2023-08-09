import LayoutPage from "../../../../components/Layouts/LayoutPage";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "../../../../components/Layouts/LayoutBlock";
import DropdownList from "../../../../components/UI/DropdownList";
import Button from "../../../../components/UI/Button";

import "./AdminPanelAnalytic.scss";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import axios from "../../../../utils/axios";

import getDifferenceBetweenTwoDates from "../../../../utils/getDifferenceBetweenTwoDates";

const AdminPanelFinance = () => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const [dateRange2, setDateRange2] = useState([null, null]);
    const [startDate2, endDate2] = dateRange2;

    const [stat, setStat] = useState({
        users: {
            total_users: 0,
            total_users_balance: 0,
            total_purchases: 0,
            today_account_refill: 0,
            today_purchases_orders: 0,
        },
        orders: {
            total_active: 0,
            total_sale: 0,
            total_accepted: 0,
            total_rejected: 0,
            average_order_sum: 0,
            total_orders_sum: 0,
        },
    });

    const [users, setUsers] = useState([])

    useEffect(() => {
        axios
            .get("/api/admin/user")
            .then(({ data }) => {
                setUsers(data)
                let total_users_balance = 0;
                data.map(user => (total_users_balance += user.balance));
                setStat(prev => ({
                    ...prev,
                    users: {
                        ...prev.users,
                        total_users: data.length,
                        total_users_balance,
                    },
                }));
            })
            .catch(err => console.log(err));
        axios
            .get("/api/admin/ukassa/getall")
            .then(({ data }) => {
                let total_purchases = 0;
                let today_account_refill = 0;
                let today_purchases_orders = 0;
                data.map(operation => {
                    if (operation.status === "buy") total_purchases++;
                    if (getDifferenceBetweenTwoDates(operation.createdAt, new Date()) < 24) {
                        if (operation.status === "succeeded") today_account_refill++;
                        if (operation.status === "buy") today_purchases_orders++;
                    }
                });
                setStat(prev => ({
                    ...prev,
                    users: {
                        ...prev.users,
                        total_purchases,
                        today_account_refill,
                        today_purchases_orders,
                    },
                }));
            })
            .catch(err => console.log(err));
        axios
            .get("/api/admin/order")
            .then(({ data }) => {
                let total_active = 0;
                let total_sale = 0;
                let total_orders_sum = 0
                data.map(order => {
                    if (order?.user && JSON.stringify(order?.user) !== "{}" && order.is_buy) total_active++;
                    if (order?.is_sale) total_sale++
                    total_orders_sum += Number(order.price)
                });
                setStat(prev => ({
                    ...prev,
                    orders: {
                        ...prev.orders,
                        total_active,
                        total_sale,
                        average_order_sum: total_orders_sum / data.length,
                        total_orders_sum
                    },
                }));
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <LayoutPage title="Аналитика">
            <LayoutBlocks addClass={"adminPanelAnalytic"}>
                <div className="adminPanelAnalytic__box">
                    <LayoutBlock title={"Пользователи и покупки"}>
                        <div className="adminPanelHome__rows">
                            <div className="adminPanelHome__rows-row">
                                Пользователей всего: <span>{stat.users.total_users}</span>
                            </div>
                            <div className="adminPanelHome__rows-row">
                                Общий баланс всех пользователей: <span>{stat.users.total_users_balance} руб.</span>
                            </div>
                            <div className="adminPanelHome__rows-row">
                                Покупок всего: <span>{stat.users.total_purchases}</span>
                            </div>
                            <div className="adminPanelHome__rows-row">
                                Пополнений счета сегодня: <span>{stat.users.today_account_refill}</span>
                            </div>
                            <div className="adminPanelHome__rows-row">
                                Покупок заявок сегодня: <span>{stat.users.today_purchases_orders}</span>
                            </div>
                        </div>
                    </LayoutBlock>
                    <LayoutBlock title={"Заявки"}>
                        <div className="adminPanelHome__rows">
                            <div className="adminPanelHome__rows-row">
                                Активные / уцененные заявки: <span>{stat.orders.total_active}</span> /{" "}
                                <span>{stat.orders.total_sale}</span>
                            </div>
                            {/* <div className="adminPanelHome__rows-row">
                                Принятые / отклоненные заявки: <span>{stat.orders.total_accepted}</span> /{" "}
                                <span>{stat.orders.total_rejected}</span>
                            </div> */}
                            <div className="adminPanelHome__rows-row">
                                Средняя стоимость заявки: <span>{stat.orders.average_order_sum.toFixed(2)} руб.</span>
                            </div>
                            {/* <div className="adminPanelHome__rows-row">
                                Заявок в работе: <span>{stat.orders.orders_in_work}</span>
                            </div> */}
                            <div className="adminPanelHome__rows-row">
                                Общая стоимость заявок: <span>{stat.orders.total_orders_sum.toFixed(2)} руб.</span>
                            </div>
                        </div>
                    </LayoutBlock>
                </div>
                <LayoutBlock title={"Отчеты по пользователям"}>
                    <div className="adminPanelAnalytic__dropdowns">
                        {/* <DropdownList label={"Выберите тип отчета:"} /> */}
                        <DropdownList label={"Выберите пользователя:"} values={[...(() => {
                            let users_names = []
                            users.map(user => users_names.push(user.fio))
                            return users_names
                        })()]} />
                        <DatePicker
                            placeholderText="Выберите период"
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={update => {
                                setDateRange(update);
                            }}
                        />
                        <Button text="Сбросить поля" />
                        <Button text="Сформировать отчет" type="fill" />
                    </div>
                </LayoutBlock>
                <LayoutBlock title={"Отчеты по категориям"}>
                    <div className="adminPanelAnalytic__dropdowns">
                        {/* <DropdownList label={"Выберите тип отчета:"} /> */}
                        <DropdownList label={"Выберите категорию (1):"} />
                        <DatePicker
                            placeholderText="Выберите период"
                            selectsRange={true}
                            startDate={startDate2}
                            endDate={endDate2}
                            onChange={update => {
                                setDateRange2(update);
                            }}
                        />
                        <Button text="Сбросить поля" />
                        <Button text="Сформировать отчет" type="fill" />
                    </div>
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default AdminPanelFinance;
