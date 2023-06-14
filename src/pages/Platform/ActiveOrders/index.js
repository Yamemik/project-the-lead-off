import axios from "axios";
import { useState, useEffect } from "react";

import LayoutBlock from "./../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "./../../../components/Layouts/LayoutBlocks";
import LayoutPage from "./../../../components/Layouts/LayoutPage";
import Filters from "./../../../components/Filters";
import Pagination from "../../../components/Pagination";

const ActiveOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
            .get("/orders.json")
            .then(res => setOrders(res.data.items))
            .catch(err => console.log(err));
    }, []);

    return (
        <LayoutPage title="Распродажа">
            <LayoutBlocks>
                <LayoutBlock title="Фильтры">
                    <Pagination items={orders} itemsPerPage={3} isCanClose />
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default ActiveOrders;
