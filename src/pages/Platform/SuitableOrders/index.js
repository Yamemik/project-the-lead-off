import LayoutBlock from "./../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "./../../../components/Layouts/LayoutBlocks";
import LayoutPage from "./../../../components/Layouts/LayoutPage";
import Filters from "./../../../components/Filters";
import Pagination from "../../../components/Pagination";

import { useEffect, useState } from "react";
import axios from "axios";

const SuitableOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isOpenMobileFilters, setIsOpenMobileFilters] = useState(window.innerWidth <= 768 ? false : true);

    useEffect(() => {
        axios
            .get("/orders.json")
            .then(res => setOrders(res.data.items))
            .catch(err => console.log(err));
    }, []);

    return (
        <LayoutPage title="Подходящие заявки">
            <LayoutBlocks>
                <LayoutBlock title="Фильтры" isHaveFiltersInPage isOpenMobileFilters={isOpenMobileFilters} setIsOpenMobileFilters={arg => setIsOpenMobileFilters(arg)}>
                    {isOpenMobileFilters && (
                        <div className="suitableOrders__filtersAndButton">
                            <Filters />
                        </div>
                    )}
                    <Pagination items={orders} itemsPerPage={3} isCanBuy />
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default SuitableOrders;
