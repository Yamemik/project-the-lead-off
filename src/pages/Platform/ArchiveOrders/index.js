import axios from "../../../utils/axios";
import { useState, useEffect } from "react";
import LayoutBlock from "./../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "./../../../components/Layouts/LayoutBlocks";
import LayoutPage from "./../../../components/Layouts/LayoutPage";
import Pagination from "../../../components/Pagination";
import Loader from "../../../components/Loader";
import getOrderWithCalculatePrice from "../../../utils/getOrderWithCalculatePrice";

const ArchiveOrders = () => {
    const [archiveOrders, setArchiveOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios
            .get("/api/user/orders/all")
            .then(({ data }) => {
                data.filter(
                    order => order?.is_archive && order?.user === JSON.parse(localStorage.getItem("user"))._id,
                ).map(order =>
                    getOrderWithCalculatePrice(order, JSON.parse(localStorage.getItem("user"))).then(order =>
                        setArchiveOrders(prev => [...prev, order]),
                    ),
                );
                setTimeout(() => {
                    setIsLoading(false);
                }, 1200);
            })
            .catch(err => console.log(err));

    }, []);

    return (
        <LayoutPage title="Архив">
            <Loader trigger={isLoading} />
            <LayoutBlocks>
                <LayoutBlock>
                    <Pagination items={archiveOrders} itemsPerPage={5} isHaveDateDelete />
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default ArchiveOrders;
