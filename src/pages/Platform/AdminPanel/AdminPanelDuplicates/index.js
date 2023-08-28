import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LayoutPage from "../../../../components/Layouts/LayoutPage";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "../../../../components/Layouts/LayoutBlock";

import axios from "../../../../utils/axios";
import getDifferenceBetweenTwoDates from "../../../../utils/getDifferenceBetweenTwoDates";
import Pagination from "../../../../components/Pagination";
import getOrderWithCalculatePrice from "../../../../utils/getOrderWithCalculatePrice";

const AdminPanelDuplicates = () => {
    const params = useParams()

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
            .get("/api/admin/order")
            .then(({ data }) => {
                data.map(order => {
                    if (params.ordersIDs.split("$").includes(order._id)) {
                        getOrderWithCalculatePrice(order, JSON.parse(localStorage.getItem("user"))).then(order =>
                            setOrders(prev => [
                                ...prev,
                                {
                                    _id: order._id,
                                    id: order.number_order,
                                    create_date: new Date(order.createdAt).toLocaleDateString(),
                                    login: order.region.join(" / "),
                                    FIO: order.nomeclature[0][0],
                                    phone: order.nomeclature[0][1] || "—",
                                    region: order.nomeclature[0][2] || "—",
                                    balance: order.score,
                                    category: `${order.price} руб.`,
                                },
                            ]),
                        );
                    }
                })
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <LayoutPage
            title="Дубликаты">
            <LayoutBlocks>
                <LayoutBlock>
                    {orders.length > 0 && (
                        <Pagination
                            items={orders}
                            itemsPerPage={5}
                            isAdminPanelTable
                            isDuplicatesTable={true}
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
                        />
                    )}
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default AdminPanelDuplicates;
