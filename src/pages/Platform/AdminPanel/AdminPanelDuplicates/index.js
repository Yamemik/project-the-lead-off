import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LayoutPage from "../../../../components/Layouts/LayoutPage";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "../../../../components/Layouts/LayoutBlock";

import axios from "../../../../utils/axios";
import getDifferenceBetweenTwoDates from "../../../../utils/getDifferenceBetweenTwoDates";
import Pagination from "../../../../components/Pagination";

const AdminPanelDuplicates = () => {
    const params = useParams()

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
            .get("/api/admin/order")
            .then(({ data }) => {
                data.map(order => {
                    if (params.ordersIDs.split("$").includes(order._id)) {
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
                                    getDifferenceBetweenTwoDates(order.createdAt, new Date()) < 24 ? "Новая" : "Старая",
                            },
                        ]);
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
