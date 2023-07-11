import { useState, useEffect } from "react";

import LayoutBlock from "./../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "./../../../components/Layouts/LayoutBlocks";
import LayoutPage from "./../../../components/Layouts/LayoutPage";
import Filters from "./../../../components/Filters";
import Pagination from "../../../components/Pagination";
import Loader from "../../../components/Loader";

import getAllOrders from "../../../utils/getAllOrders";

const SaleOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenMobileFilters, setIsOpenMobileFilters] = useState(window.innerWidth <= 768 ? false : true);

    useEffect(() => {
        getAllOrders()
            .then(({ data }) => {
                setOrders(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <LayoutPage title="Распродажа">
            <Loader trigger={isLoading}/>
            <LayoutBlocks>
                <LayoutBlock
                    title="Фильтры"
                    isHaveFiltersInPage
                    isOpenMobileFilters={isOpenMobileFilters}
                    setIsOpenMobileFilters={arg => setIsOpenMobileFilters(arg)}>
                    {isOpenMobileFilters && (
                        <div className="suitableOrders__filtersAndButton">
                            <Filters />
                        </div>
                    )}
                    <Pagination items={orders.filter(order => order.is_sale)} itemsPerPage={3} isCanSale />
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default SaleOrders;
