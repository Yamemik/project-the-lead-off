import { useEffect, useState } from "react";

import LayoutPage from "../../components/Layouts/LayoutPage";
import LayoutBlocks from "../../components/Layouts/LayoutBlocks";
import LayoutBlock from "../../components/Layouts/LayoutBlock";
import TableRow from "../../components/TableRow";
import Button from "../../components/UI/Button";
import Pagination from "../../components/Pagination";

import "./Platform.scss";

import axios from "../../utils/axios";

import getDifferenceBetweenTwoDates from "../../utils/getDifferenceBetweenTwoDates";
import isSuitableOrder from "../../utils/isSuitableOrder";
import Loader from "../../components/Loader";
import getOrderWithCalculatePrice from "../../utils/getOrderWithCalculatePrice";

const Homepage = () => {
    const [saleOrders, setSaleOrders] = useState([]);
    const [suitableOrders, setSuitableOrders] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/api/user/orders/all")
            .then(({ data }) => {
                data.reverse().map(order => {
                    if (isSuitableOrder(order)) {
                        getOrderWithCalculatePrice(order, JSON.parse(localStorage.getItem("user"))).then(order => setSuitableOrders(prev => [...prev, order]))
                    }
                    if (order?.is_sale && getDifferenceBetweenTwoDates(order?.createdAt, new Date()) > 72) {
                        getOrderWithCalculatePrice(order, JSON.parse(localStorage.getItem("user"))).then(order => setSaleOrders(prev => [...prev, order]))
                    }
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 1200)
                });
            })
    }, []);

    const getAdditions = (item, isCanBuy = false, isCanSale = false, isCanClose = false) => {
        let arr = [];
        if (item?.type_buyer?.includes("частная")) arr.push("private");
        if (item?.type_buyer?.includes("государственная")) arr.push("state");
        if (item?.type_order?.includes("тендер")) arr.push("tender");
        if (item?.is_urgent === "да") arr.push("urgent");
        if (getDifferenceBetweenTwoDates(item?.createdAt, new Date()) < 24) arr.push("express");
        if (isCanBuy) arr.push("cart");
        if (isCanSale) arr.push("sale");
        if (isCanClose) arr.push("close");
        return arr;
    };

    return (
        <LayoutPage title="Главная">
            <Loader trigger={isLoading}/>
            <LayoutBlocks>
                <LayoutBlock title="Подходящие заявки">
                    {suitableOrders &&
                        (window.innerWidth > 1280 ? (
                            suitableOrders
                                .slice(0, 5)
                                .map(item => (
                                    <TableRow
                                        category={item.nomeclature[0][0]}
                                        key={item._id}
                                        id={item._id}
                                        productGroup={item.nomeclature[0][1]}
                                        nomenclature={item.nomeclature[0][2]}
                                        region={item.region}
                                        estimation={item.score}
                                        price={item.price}
                                        additions={getAdditions(item, true)}
                                        numberOrder={item.number_order}
                                    />
                                ))
                        ) : (
                            <Pagination itemsPerPage={5} items={suitableOrders} isCanBuy />
                        ))}
                    <Button toUrl="../suitable-orders" text="Посмотреть всё" />
                </LayoutBlock>
                <LayoutBlock title="Распродажа">
                    {window.innerWidth > 1280 ? (
                        saleOrders
                            .slice(0, 5)
                            .map(item => (
                                <TableRow
                                    category={item.nomeclature[0][0]}
                                    key={item._id}
                                    id={item._id}
                                    productGroup={item.nomeclature[0][1]}
                                    nomenclature={item.nomeclature[0][2]}
                                    region={item.region}
                                    estimation={item.score}
                                    price={item.price}
                                    additions={getAdditions(item, false, true)}
                                    numberOrder={item.number_order}
                                />
                            ))
                    ) : (
                        <Pagination items={saleOrders} isCanSale />
                    )}
                    <Button toUrl="../sale-orders" text="Посмотреть всё" />
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default Homepage;
