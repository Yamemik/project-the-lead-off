import { useEffect, useState } from "react";

import LayoutPage from "../../components/Layouts/LayoutPage";
import LayoutBlocks from "../../components/Layouts/LayoutBlocks";
import LayoutBlock from "../../components/Layouts/LayoutBlock";
import TableRow from "../../components/TableRow";
import Button from "../../components/UI/Button";
import Pagination from "../../components/Pagination";

import "./Platform.scss";

import axios from "axios";

const Homepage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
            .get("/orders.json")
            .then(res => setOrders(res.data.items))
            .catch(err => console.log(err));
    }, []);

    return (
        <LayoutPage title="Главная">
            <LayoutBlocks>
                <LayoutBlock title="Подходящие заявки">
                    {window.innerWidth > 1280 ? (
                        orders.map(item => (
                            <TableRow
                                key={item.id}
                                id={item.id}
                                productGroup={item.product_group}
                                nomenclature={item.nomenclature}
                                region={item.region}
                                estimation={item.estimation}
                                price={item.price}
                                additions={[...item.additions, "cart"]}
                            />
                        ))
                    ) : (
                        <Pagination items={orders} isCanBuy/>
                    )}
                    <Button toUrl="../suitable-orders" text="Посмотреть всё" />
                </LayoutBlock>
                <LayoutBlock title="Распродажа">
                    {window.innerWidth > 1280 ? (
                        orders.filter(order => order.is_sale).map(item => (
                            <TableRow
                                key={item.id}
                                id={item.id}
                                productGroup={item.product_group}
                                nomenclature={item.nomenclature}
                                region={item.region}
                                estimation={item.estimation}
                                price={item.price}
                                additions={[...item.additions, "sale"]}
                            />
                        ))
                    ) : (
                        <Pagination items={orders.filter(order => order.is_sale)} isCanSale />
                    )}
                    <Button toUrl="../sale-orders" text="Посмотреть всё" />
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default Homepage;
