import { useState, useEffect } from "react";

import LayoutBlock from "./../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "./../../../components/Layouts/LayoutBlocks";
import LayoutPage from "./../../../components/Layouts/LayoutPage";
import Pagination from "../../../components/Pagination";
import Loader from "../../../components/Loader";

import getAllOrders from "../../../utils/getAllOrders";

const ActiveOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllOrders()
            .then(({ data }) => {
                setOrders(data.filter(order => order?.user?._id === JSON.parse(localStorage.getItem("user"))._id));
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <LayoutPage title="Активные заявки">
            <Loader trigger={isLoading} />
            <LayoutBlocks>
                <LayoutBlock title="Фильтры">
                    <Pagination items={orders} itemsPerPage={3} isCanClose />
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default ActiveOrders;
