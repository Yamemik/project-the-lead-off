import axios from "axios";
import { useState, useEffect } from "react";

import LayoutBlock from "./../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "./../../../components/Layouts/LayoutBlocks";
import LayoutPage from "./../../../components/Layouts/LayoutPage";
import Pagination from "../../../components/Pagination";

const RejectionOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
            .get("/orders.json")
            .then(res => setOrders(res.data.items))
            .catch(err => console.log(err));
    }, []);

    return (
        <LayoutPage title="Отказы">
            <LayoutBlocks>
                <LayoutBlock>
                    <Pagination items={orders} itemsPerPage={3} isHaveStatus />
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default RejectionOrders;
