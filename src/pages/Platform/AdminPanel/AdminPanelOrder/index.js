import { useParams } from "react-router-dom";

import LayoutBlock from "../../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutPage from "../../../../components/Layouts/LayoutPage";
import Button from "../../../../components/UI/Button";

import { useEffect, useState } from "react";

import axios from "../../../../utils/axios";
import ModalWindow from "../../../../components/ModalWindow";
import { toast } from "react-hot-toast";

import getFormatUserTelephone from "../../../../utils/getFormatUserTelephone";
import sliceBigString from "../../../../utils/sliceBigString";
import getOrderWithCalculatePrice from "../../../../utils/getOrderWithCalculatePrice";

const AdminPanelOrder = () => {
    const params = useParams();
    const [order, setOrder] = useState();
    const [deleteOrderPopup, setDeleteOrderPopup] = useState(false);

    useEffect(() => {
        axios
            .get(`/api/user/order/${params.id}`)
            .then(({ data }) => {
                getOrderWithCalculatePrice(data, JSON.parse(localStorage.getItem("user"))).then(order =>
                    setOrder(order),
                );
            })
            .catch(err => console.log(err));
    }, []);

    const handleDeleteOrder = () => {
        axios
            .delete(`/api/admin/order/${params.id}`)
            .then(_ => {
                toast.success("Заявка удалена");
                setDeleteOrderPopup(false)
                setTimeout(() => {
                    window.location.href = "/platform/admin-panel/orders";
                }, 1200);
            })
            .catch(_ => toast.error("Ошибка при удалении заявки"));
    };

    const getUploads = () => {
        let arr = []
        order.upload.map(({ path }) => arr.push(sliceBigString(path.split("/")[1])))
        return arr
    }

    return (
        <LayoutPage title={`Заявка №${order?.number_order}`}>
            <LayoutBlocks>
                <LayoutBlock>
                    {order && (
                        <div className="order">
                            <div className="order__row">
                                <div className="order__row-title">Дата создания:</div>
                                <div className="order__row-text">{new Date(order.createdAt).toLocaleDateString()}</div>
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
                                <div className="order__row-text order__row-text--uploads">{getUploads().map(filename => <p className="order__row-text-item">{filename}</p>)}</div>
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">Контактные данные:</div>
                                <div className="order__row-text">
                                    {window.innerWidth <= 768 ? (
                                        <>
                                            {order.email}
                                            <br />
                                            {getFormatUserTelephone(order.telephone[0])}
                                            <br />
                                            {order.fio}
                                        </>
                                    ) : (
                                        <pre>{order.email}   {getFormatUserTelephone(order.telephone[0])}   {order.fio}</pre>
                                    )}
                                </div>
                            </div>
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
                            <div className="order__row">
                                <div className="order__row-title">Стоимость:</div>
                                <div className="order__row-text">{order.price} руб.</div>
                            </div>
                        </div>
                    )}
                </LayoutBlock>
            </LayoutBlocks>
            <div className="order__buttons">
                <Button text="Удалить" click={() => setDeleteOrderPopup(!deleteOrderPopup)} />
                <Button
                    type="fill"
                    text="Редактировать"
                    click={() => (window.location.href = `/platform/admin-panel/edit-order/${params.id}`)}
                />
            </div>
            <ModalWindow trigger={deleteOrderPopup}>
                <h1>Вы уверены, что хотите удалить заявку?</h1>
                <div className="modalWindow__body-buttons">
                    <Button text="Подтвердить" type="fill" click={handleDeleteOrder} />
                    <Button text="Отменить" click={() => setDeleteOrderPopup(false)} />
                </div>
            </ModalWindow>
        </LayoutPage>
    );
};

export default AdminPanelOrder;
