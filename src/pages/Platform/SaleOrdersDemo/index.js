import { useEffect, useState } from "react";
import LayoutPage from "../../../components/Layouts/LayoutPage";
import Loader from "../../../components/Loader";
import LayoutBlocks from "../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "../../../components/Layouts/LayoutBlock";
import Filters from "../../../components/Filters";
import Pagination from "../../../components/Pagination";
import getDifferenceBetweenTwoDates from "../../../utils/getDifferenceBetweenTwoDates";
import HeaderDemo from "../../../components/HeaderDemo";

const SaleOrdersDemo = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenMobileFilters, setIsOpenMobileFilters] = useState(
        window.innerWidth > 768,
    );

    const [filters, setFilters] = useState({
        product_groups: [["", "", ""]],
        countries: [""],
        regions: [""],
        scores: [""],
        priceAt: "",
        priceTo: "",
        buyer: [],
        purchase: [],
        type_order: [],
    });

    useEffect(() => {
        JSON.parse(localStorage.getItem("demo")).orders.sales.map(order => {
            setOrders(prev => [...prev, order])
        })
        setIsLoading(false);
    }, []);

    return (
        <>
        <HeaderDemo/>
            <LayoutPage title="Распродажа">
                <Loader trigger={isLoading} />
                <LayoutBlocks>
                    <LayoutBlock
                        title="Фильтры"
                        isHaveFiltersInPage
                        isOpenMobileFilters={isOpenMobileFilters}
                        setIsOpenMobileFilters={arg => setIsOpenMobileFilters(arg)}
                    >
                        {isOpenMobileFilters && (
                            <div className="suitableOrders__filtersAndButton">
                                <Filters
                                    is_suitable_page
                                    filters={filters}
                                    setFilters={filters => setFilters(filters)}
                                />
                            </div>
                        )}
                        <Pagination
                            demo
                            items={orders
                                .filter(
                                    order =>
                                        Number(order.price) >=
                                        Number(filters.priceAt) ||
                                        filters.priceAt === "",
                                )
                                .filter(
                                    order =>
                                        Number(order.price) <=
                                        Number(filters.priceTo) ||
                                        filters.priceTo === "",
                                )
                                .filter(order => {
                                    let flag = false;
                                    if (
                                        filters.product_groups[0][0] === "" &&
                                        filters.product_groups[0][1] === "" &&
                                        filters.product_groups[0][2] === ""
                                    ) {
                                        flag = true;
                                    } else {
                                        order.nomeclature.map(orderProductGroup => {
                                            if (!flag) {
                                                filters.product_groups.map(
                                                    filterProductGroup => {
                                                        if (
                                                            orderProductGroup[0] ===
                                                            filterProductGroup[0] &&
                                                            orderProductGroup[1] ===
                                                            filterProductGroup[1] &&
                                                            orderProductGroup[2] ===
                                                            filterProductGroup[2]
                                                        ) {
                                                            flag = true;
                                                        }
                                                    },
                                                );
                                            }
                                        });
                                    }
                                    return flag;
                                })
                                .filter(
                                    order =>
                                        filters.countries.includes(
                                            order.region[0],
                                        ) || filters.countries[0] === "",
                                )
                                .filter(
                                    order =>
                                        filters.regions.includes(order.region[1]) ||
                                        filters.regions[0] === "",
                                )
                                .filter(order => filters.scores.map(str => str.toLowerCase()).includes(order.score.toLowerCase()) || filters.scores[0] === "")
                                .filter(
                                    order =>
                                        filters.buyer.includes(order.type_buyer) ||
                                        filters.buyer.length <= 0,
                                )
                                .filter(
                                    order =>
                                        filters.purchase.includes(
                                            order.type_order,
                                        ) || filters.purchase.length <= 0,
                                )
                                .filter(
                                    order =>
                                        (filters.type_order.includes("срочная") &&
                                            order.is_urgent === "да") ||
                                        (filters.type_order.includes("горящая") &&
                                            getDifferenceBetweenTwoDates(
                                                order.createdAt,
                                                new Date(),
                                            ) < 24) ||
                                        filters.type_order.length <= 0,
                                )}
                            itemsPerPage={3}
                            isCanSale
                        />
                    </LayoutBlock>
                </LayoutBlocks>
            </LayoutPage>
        </>
    );
};

export default SaleOrdersDemo;
