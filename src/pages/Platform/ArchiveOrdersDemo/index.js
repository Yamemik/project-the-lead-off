import { useEffect, useState } from "react";
import LayoutPage from "../../../components/Layouts/LayoutPage";
import Loader from "../../../components/Loader";
import LayoutBlocks from "../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "../../../components/Layouts/LayoutBlock";
import Pagination from "../../../components/Pagination";
import HeaderDemo from "../../../components/HeaderDemo";

const ArchiveOrdersDemo = () => {
    const [archiveOrders, setArchiveOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        JSON.parse(localStorage.getItem("demo")).orders.archives.map(order => {
            setArchiveOrders(prev => [...prev, order])
        })
        setIsLoading(false);
    }, []);

    return (
        <>
        <HeaderDemo/>
            <LayoutPage title="Архив">
                <Loader trigger={isLoading} />
                <LayoutBlocks>
                    <LayoutBlock>
                        <Pagination demo items={archiveOrders} itemsPerPage={5} isHaveDateDelete />
                    </LayoutBlock>
                </LayoutBlocks>
            </LayoutPage></>
    );
};

export default ArchiveOrdersDemo;
