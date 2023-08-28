import HeaderDemo from "../../../components/HeaderDemo";
import Loader from "../../../components/Loader";
import { useState, useEffect } from "react";
import LayoutBlock from "../../../components/Layouts/LayoutBlock";
import TableRow from "../../../components/TableRow";
import Pagination from "../../../components/Pagination";
import Button from "../../../components/UI/Button";
import LayoutBlocks from "../../../components/Layouts/LayoutBlocks";
import getDifferenceBetweenTwoDates from "../../../utils/getDifferenceBetweenTwoDates";
import LayoutPage from "../../../components/Layouts/LayoutPage";

const Demo = () => {
	const [isLoading, setIsLoading] = useState(true);

    const [suitableOrders, setSuitableOrders] = useState([]);
    const [saleOrders, setSaleOrders] = useState([]);

	useEffect(() => {
        setSuitableOrders(JSON.parse(localStorage.getItem("demo")).orders.suitables || []);
        setSaleOrders(JSON.parse(localStorage.getItem("demo")).orders.sales || []);
		setIsLoading(false);
	}, []);

    const getAdditions = (item, isCanBuy = false, isCanSale = false, isCanClose = false) => {
        let arr = [];
        if (item?.type_buyer?.includes("частная")) arr.push("private");
        if (item?.type_buyer?.includes("государственная")) arr.push("state");
        if (item?.type_order?.includes("тендер")) arr.push("tender");
        if (item?.is_urgent === "да") arr.push("urgent");
        if (item?.express) arr.push("express");
        if (isCanBuy) arr.push("cart");
        if (isCanSale) arr.push("sale");
        if (isCanClose) arr.push("close");
        return arr;
    };

    return (
		<>
			<HeaderDemo />
			<Loader trigger={isLoading} />
            <LayoutPage title="Главная">
                <LayoutBlocks>
                <LayoutBlock title="Подходящие заявки">
                    {suitableOrders &&
                        (window.innerWidth > 1280 ? (
                            suitableOrders
                                .map(item => (
                                    <TableRow
                                        order={item}
                                        demo
                                        category={item.nomeclature[0][0]}
                                        key={item._id}
                                        id={item._id}
                                        productGroup={item.nomeclature[0][1] || "—"}
                                        nomenclature={item.nomeclature[0][2] || "—"}
                                        region={item.region}
                                        estimation={item.score}
                                        price={item.price}
                                        additions={getAdditions(item, true)}
                                        numberOrder={item.number_order}
                                    />
                                ))
                        ) : (
                            <Pagination demo itemsPerPage={5} items={suitableOrders} isCanBuy />
                        ))}
                    <Button toUrl="/platform/demo/suitable-orders" text="Посмотреть всё" />
                </LayoutBlock>
                <LayoutBlock title="Распродажа">
                    {window.innerWidth > 1280 ? (
                        saleOrders
                            .map(item => (
                                <TableRow
                                    order={item}
                                    demo
                                    category={item.nomeclature[0][0]}
                                    key={item._id}
                                    id={item._id}
                                    productGroup={item.nomeclature[0][1] || "—"}
                                    nomenclature={item.nomeclature[0][2] || "—"}
                                    region={item.region}
                                    estimation={item.score}
                                    price={item.price}
                                    additions={getAdditions(item, false, true)}
                                    numberOrder={item.number_order}
                                />
                            ))
                    ) : (
                        <Pagination demo items={saleOrders} isCanSale />
                    )}
                    <Button toUrl="/platform/demo/sale-orders" text="Посмотреть всё" />
                </LayoutBlock>
            </LayoutBlocks>
            </LayoutPage>
		</>
	);
};

export default Demo;
