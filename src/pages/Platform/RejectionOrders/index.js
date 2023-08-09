import axios from "../../../utils/axios";
import { useState, useEffect } from "react";

import LayoutBlock from "./../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "./../../../components/Layouts/LayoutBlocks";
import LayoutPage from "./../../../components/Layouts/LayoutPage";
import Pagination from "../../../components/Pagination";
import Loader from "../../../components/Loader";
import getOrderWithCalculatePrice from "../../../utils/getOrderWithCalculatePrice";

const RejectionOrders = () => {
    const [rejectedOrders, setRejectedOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios
            .get("/api/user/orders/all")
            .then(({ data }) => {
                data.map(order => {
                    if (order?.user === JSON.parse(localStorage.getItem("user"))._id && order?.answer) {
                        getOrderWithCalculatePrice(order, JSON.parse(localStorage.getItem("user"))).then(order =>
                            setRejectedOrders(prev => [
                                ...prev,
                                { ...order, status: order.answer === "access" ? "approved" : "" },
                            ]),
                        );
                    }
                });
                setTimeout(() => {
                    setIsLoading(false)
                }, 1200)
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <LayoutPage title="Отказы">
            <Loader trigger={isLoading} />
            <LayoutBlocks>
                <LayoutBlock>
                    <Pagination items={rejectedOrders} itemsPerPage={5} isHaveStatus />
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default RejectionOrders;
