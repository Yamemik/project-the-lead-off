import LayoutPage from "./../../../../components/Layouts/LayoutPage";
import LayoutBlocks from "./../../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "./../../../../components/Layouts/LayoutBlock";
import Pagination from "../../../../components/Pagination";

import { useState, useEffect } from "react";

import axios from "../../../../utils/axios";
import getDifferenceBetweenTwoDates from "../../../../utils/getDifferenceBetweenTwoDates";
import { toast } from "react-hot-toast";
import getOrderWithCalculatePrice from "../../../../utils/getOrderWithCalculatePrice";

const AdminPanelOrders = () => {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios
            .get("/api/admin/order")
            .then(({ data }) => {
                data.reverse().map(order => {
                    getOrderWithCalculatePrice(order, JSON.parse(localStorage.getItem("user"))).then(order =>
                        setOrders(prev => [
                            ...prev,
                            // {
                            //     _id: order._id,
                            //     id: order.number_order,
                            //     create_date: new Date(order.createdAt).toLocaleDateString(),
                            //     login: order.nomeclature[0][0],
                            //     FIO: order.nomeclature[0][1],
                            //     region: order.nomeclature[0][2],
                            //     phone: order.score,
                            //     balance: order.region.join(" / "),
                            //     category:
                            //     `${order.price} руб.`,
                            // },
                            {
                                _id: order._id,
                                id: order.number_order,
                                create_date: new Date(order.createdAt).toLocaleDateString(),
                                login: order.region.join(" / "),
                                FIO: order.nomeclature[0][0],
                                phone: order.nomeclature[0][1],
                                region: order.nomeclature[0][2],
                                balance: order.score,
                                category: `${order.price} руб.`,
                            },
                        ]),
                    );
                    // setOrders(prev => [
                    //     ...prev,
                    //     {
                    //         _id: order._id,
                    //         id: order.number_order,
                    //         create_date: new Date(order.createdAt).toLocaleDateString(),
                    //         login: `${order.nomeclature[0][0]} / ${order.nomeclature[0][1]}`,
                    //         FIO: order.nomeclature[0][2],
                    //         region: order.score,
                    //         phone: order.region.join(" / "),
                    //         balance: `${order.price} руб.`,
                    //         category:
                    //             getDifferenceBetweenTwoDates(order.createdAt, new Date()) < 24 ? "Новая" : "Старая",
                    //     },
                    // ]);
                });
            })
            .catch(err => console.log(err));
    }, []);

    const handleEditOrder = userID => {
        window.location.href = `/platform/admin-panel/edit-order/${userID}`;
    };

    const handleDeleteOrder = userID => {
        axios
            .delete(`/api/admin/order/${userID}`)
            .then(_ => {
                toast.success("Заявка удалена");
                axios
                    .get("/api/admin/order")
                    .then(({ data }) => {
                        setOrders([]);
                        data.reverse().map(order => {
                            setOrders(prev => [
                                ...prev,
                                {
                                    _id: order._id,
                                    id: order.number_order,
                                    create_date: new Date(order.createdAt).toLocaleDateString(),
                                    login: `${order.nomeclature[0][0]} / ${order.nomeclature[0][1]}`,
                                    FIO: order.nomeclature[0][2],
                                    region: order.score,
                                    phone: order.region.join(" / "),
                                    balance: `${order.price} руб.`,
                                    category:
                                        getDifferenceBetweenTwoDates(order.createdAt, new Date()) < 24
                                            ? "Новая"
                                            : "Старая",
                                },
                            ]);
                        });
                    })
                    .catch(err => console.log(err));
            })
            .catch(_ => toast.error("Ошибка при удалении заявки"));
    };

    return (
        <LayoutPage
            title="Заявки"
            isOrdersTable
            searchQuery={searchQuery}
            setSearchQuery={value => setSearchQuery(value)}>
            <LayoutBlocks>
                <LayoutBlock isOverflowHidden>
                    {orders.length > 0 && (
                        <Pagination
                            items={orders.filter(
                                order =>
                                    order?.FIO?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
                                    order.login.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    order.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    order.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    String(order.balance).includes(searchQuery) ||
                                    order.category.toLowerCase().includes(searchQuery.toLowerCase()),
                            )}
                            itemsPerPage={5}
                            isAdminPanelTable
                            head={[
                                "ID",
                                "Дата создания","Регион",
                                "Категория",
                                "Товарная группа",
                                "Номенклатура",
                                
                                "Оценка",
                                "Стоимость",
                            ]}
                            clickSee={userID => (window.location.href = `/platform/admin-panel/order/${userID}`)}
                            clickDelete={userID => handleDeleteOrder(userID)}
                            clickEdit={userID => handleEditOrder(userID)}
                        />
                    )}
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default AdminPanelOrders;
