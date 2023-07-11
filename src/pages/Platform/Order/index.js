import { useParams } from "react-router-dom";

import LayoutBlock from "./../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "./../../../components/Layouts/LayoutBlocks";
import LayoutPage from "./../../../components/Layouts/LayoutPage";
import Button from "./../../../components/UI/Button";
import Loader from "./../../../components/Loader";

import getAllOrders from "./../../../utils/getAllOrders";

import { useEffect, useState } from "react";

const Order = () => {
    const params = useParams();
    const [order, setOrder] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllOrders()
            .then(({ data }) => {
                let orders = data.filter(order => order?._id === params.id);
                setOrder(orders[0]);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    const getCreatedOrderDate = () => {
        const date = new Date(order?.createdAt);
        return date.toLocaleDateString();
    };

    // const getOrderTelephone = () => {
    //     const phone = order.telephone[0]
    //     if (phone[0] === "7" || phone[0] === "8") {
    //         return `+7(${phone.slice(1, 4)})${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9,11)}`
    //     }
    //     return phone;
    // }

    return (
        <LayoutPage title={`Заявка №${params?.id}`}>
            <Loader trigger={isLoading} />
            <LayoutBlocks>
                <LayoutBlock>
                    {order && <div className="order">
                        <div className="order__row">
                            <div className="order__row-title">Дата создания:</div>
                            <div className="order__row-text">{getCreatedOrderDate()}</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Товарная группа / номенклатура:</div>
                            <div className="order__row-text">{order.nomeclature[0].join(" / ")}</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Регион покупателя:</div>
                            <div className="order__row-text">{order.region.join(" / ")}</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Текст заявки:</div>
                            <div className="order__row-text">
                                {order.text}
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Вложения к заявке:</div>
                            <div className="order__row-text">—</div>
                        </div>
                        {/* <div className="order__row">
                            <div className="order__row-title">Контактные данные:</div>
                            <div className="order__row-text">
                                {window.innerWidth <= 768 ? (
                                    <>
                                        {order.email}
                                        <br />
                                        {getOrderTelephone()}
                                        <br />
                                        {order.fio}
                                    </>
                                ) : (
                                    <pre>{order.email}   {getOrderTelephone()}   {order.fio}</pre>
                                )}
                            </div>
                        </div> */}
                        <div className="order__row">
                            <div className="order__row-title">Оценка:</div>
                            <div className="order__row-text">{order.score}</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Тип покупателя:</div>
                            <div className="order__row-text">{order.type_buyer}</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Закупка:</div>
                            <div className="order__row-text">{order.type_order}</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Срочная:</div>
                            <div className="order__row-text">{order.is_urgent}</div>
                        </div>
                        {/* <div className="order__row">
                            <div className="order__row-title">Тип заявки:</div>
                            <div className="order__row-text">{order.is_open.toLowerCase()}</div>
                        </div> */}
                        <div className="order__row">
                            <div className="order__row-title">Стоимость:</div>
                            <div className="order__row-text">{order.price} руб.</div>
                        </div>
                    </div>}
                </LayoutBlock>
            </LayoutBlocks>
            <div className="order__buttons">
                <Button text="Отказаться" />
                <Button type="fill" text="В архив" />
            </div>
        </LayoutPage>
    );
};

export default Order;
