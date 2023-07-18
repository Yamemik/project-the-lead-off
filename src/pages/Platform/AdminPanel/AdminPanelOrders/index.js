import LayoutPage from "./../../../../components/Layouts/LayoutPage";
import LayoutBlocks from "./../../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "./../../../../components/Layouts/LayoutBlock";
import Pagination from "../../../../components/Pagination";

import { useState, useEffect } from "react";

import axios from "../../../../utils/axios";
import sliceBigString from "../../../../utils/sliceBigString";
import getDifferenceBetweenTwoDates from "../../../../utils/getDifferenceBetweenTwoDates";

const AdminPanelOrders = () => {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios
            .get("/api/admin/order")
            .then(({ data }) => {
                data.map(order => {
                    setOrders(prev => [
                        ...prev,
                        {
                            _id: order._id,
                            id: sliceBigString(order._id, 8, [0, 3]),
                            create_date: new Date(order.createdAt).toLocaleDateString(),
                            login: `${order.nomeclature[0][0]} / ${order.nomeclature[0][1]}`,
                            FIO: order.nomeclature[0][2],
                            region: order.score,
                            phone: order.region.join(" / "),
                            balance: `${order.price} руб.`,
                            category:
                                getDifferenceBetweenTwoDates(order.createdAt, new Date()) < 24 ? "Новая" : "Старая",
                        },
                    ]);
                });
            })
            .catch(err => console.log(err));
    }, []);

    const handleEditOrder = (userID) => {
        
    }
    const handleDeleteOrder = (userID) => {
        
    }

    return (
        <LayoutPage
            title="Заявки"
            isOrdersTable
            searchQuery={searchQuery}
            setSearchQuery={value => setSearchQuery(value)}>
            <LayoutBlocks>
                <LayoutBlock>
                    {orders.length > 0 && (
                        <Pagination
                            items={orders.filter(
                                order =>
                                    order?.FIO?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
                                    order.login.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    order.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    order.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    String(order.balance).includes(searchQuery) ||
                                    order.category.toLowerCase().includes(searchQuery.toLowerCase())
                            )}
                            itemsPerPage={5}
                            isAdminPanelTable
                            head={[
                                "ID",
                                "Дата создания",
                                "Товарная группа",
                                "Номенклатура",
                                "Регион",
                                "Оценка",
                                "Стоимость",
                                "Статус",
                            ]}
                            clickSee={userID =>  window.location.href = `/platform/admin-panel/order/${userID}`}
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
