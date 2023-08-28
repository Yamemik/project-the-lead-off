import { useParams } from "react-router-dom";

import LayoutBlock from "./../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "./../../../components/Layouts/LayoutBlocks";
import LayoutPage from "./../../../components/Layouts/LayoutPage";
import Button from "./../../../components/UI/Button";
import Loader from "./../../../components/Loader";

import getAllOrders from "./../../../utils/getAllOrders";

import { useEffect, useState } from "react";
import getDifferenceBetweenTwoDates from "../../../utils/getDifferenceBetweenTwoDates";

import axios from "../../../utils/axios";
import getOrderWithCalculatePrice from "../../../utils/getOrderWithCalculatePrice";
import { toast } from "react-hot-toast";
import ModalWindow from "../../../components/ModalWindow";
import getUploadShortName from "../../../utils/getUploadShortName";
import getFormatUserTelephone from "../../../utils/getFormatUserTelephone";

const Order = () => {
    const params = useParams();
    const [order, setOrder] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const [rejectInput, setRejectInput] = useState("");
    const [rejectPopup, setRejectPopup] = useState(false);
    const [rejectID, setRejectID] = useState(null);

    useEffect(() => {
        getAllOrders()
            .then(({ data }) => {
                let orders = data.filter(order => order?._id === params.id);
                // setOrder(orders[0]);
                getOrderWithCalculatePrice(orders[0], JSON.parse(localStorage.getItem("user"))).then(order =>
                    setOrder(order),
                );
                setIsLoading(false);
            })
            .catch(err => console.log(err));
        setUser(JSON.parse(localStorage.getItem("user")));
    }, [params]);

    const getCreatedOrderDate = () => {
        const date = new Date(order?.createdAt);
        return date.toLocaleDateString();
    };

    return (
        <LayoutPage title={`Заявка №${order?.number_order}`}>
            <Loader trigger={isLoading} />
            <ModalWindow trigger={rejectPopup}>
                <h1 style={{ marginBottom: "20px" }}>Укажите причину отмены</h1>
                <div className="order__row">
                    <textarea
                        placeholder="Пример: «Случайно приобрел заявку не той категории»"
                        value={rejectInput}
                        onChange={e => setRejectInput(e.target.value)}
                    />
                </div>
                <div className="modalWindow__body-buttons">
                    <Button
                        text="Закрыть"
                        click={() => {
                            setRejectPopup(false);
                            setRejectID(null);
                        }}
                    />
                    <Button
                        text="Отправить"
                        type="fill"
                        click={() => {
                            if (rejectInput !== "" && rejectID) {
                                axios
                                    .patch(`/api/user/order/sendCancel/${rejectID}`, {
                                        is_canceled_text: rejectInput,
                                    })
                                    .then(_ => {
                                        setRejectPopup(false);
                                        window.location.href = "/platform/active-orders";
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        toast.error("Не удалось совершить отмену");
                                    });
                            } else {
                                toast.error("Укажите причину отмены");
                            }
                        }}
                    />
                </div>
            </ModalWindow>
            <LayoutBlocks>
                <LayoutBlock>
                    {order && (
                        <div className="order">
                            <div className="order__row">
                                <div className="order__row-title">Дата создания:</div>
                                <div className="order__row-text">{getCreatedOrderDate()}</div>
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">Направление бизнеса:</div>
                                <div className="order__row-text">{order.nomeclature[0].join(" / ")}</div>
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">Регион покупателя:</div>
                                <div className="order__row-text">{order.region.join(" / ")}</div>
                            </div>
                            {user.access_to_open && (
                                <div className="order__row">
                                    <div className="order__row-title">Текст заявки:</div>
                                    <div className="order__row-text">{order.text}</div>
                                </div>
                            )}
                            <div className="order__row">
                                <div className="order__row-title">Вложения к заявке:</div>
                                <div className="order__row-text order__row-text--uploads">
                                    {order.upload.map(upload => (
                                        <>
                                        {JSON.parse(localStorage.getItem("user")).access_to_open ? <a href={`/uploads/${upload.filename}`} download={upload.originalname} className="order__row-text-upload">{getUploadShortName(upload.originalname)}</a> : (upload.open && <a href={`/uploads/${upload.filename}`} download={upload.originalname} className="order__row-text-upload">{getUploadShortName(upload.originalname)}</a>)}
                                        </>
                                    ))}
                                </div>
                            </div>
                            {order?.is_buy && <div className="order__row">
                                <div className="order__row-title">
                                    Контактные данные:
                                </div>
                                <div className="order__row-text">
                                    {window.innerWidth <= 768 ? (
                                        <>
                                            {order.email}
                                            <br />
                                            {getFormatUserTelephone(
                                                order.telephone[0],
                                            )}
                                            <br />
                                            {order.fio}
                                        </>
                                    ) : (
                                        <pre>
											{order.email}{" "}
                                            {getFormatUserTelephone(
                                                order.telephone[0],
                                            )}{" "}
                                            {order.fio}
										</pre>
                                    )}
                                </div>
                            </div>}
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
                            {order?.is_canceled_text && order?.is_canceled !== "access" && (
                                <div className="order__row">
                                    <div className="order__row-title">Ваш комментарий:</div>
                                    <div className="order__row-text">{order.is_canceled_text}</div>
                                </div>
                            )}
                            {order?.answer && order?.answer !== "access" && (
                                <div className="order__row">
                                    <div className="order__row-title">Комментарий администратора:</div>
                                    <div className="order__row-text">{order.answer}</div>
                                </div>
                            )}
                        </div>
                    )}
                </LayoutBlock>
            </LayoutBlocks>
            {!order?.answer && !order?.is_canceled && (
                <div className="order__buttons">
                    {order?.user?._id === user?._id && order?.is_buy && (
                        <>
                            {getDifferenceBetweenTwoDates(order?.date_buy, new Date()) < 24 && (
                                <Button
                                    text="Отказаться"
                                    click={() => {
                                        setRejectPopup(true);
                                        setRejectID(params.id);
                                    }}
                                />
                            )}
                            {!order?.is_archive && (
                                <Button
                                    type="fill"
                                    text="В архив"
                                    click={() => {
                                        axios
                                            .patch(`/api/user/order/setIsArchive/${order?._id}`, { is_archive: true })
                                            .then(_ => (window.location.href = "/platform/active-orders"))
                                            .catch(err => {
                                                console.log(err);
                                                toast.error("Ошибка при добавлении заявки в архив");
                                            });
                                    }}
                                />
                            )}
                        </>
                    )}
                    {!order?.is_buy && !order?.is_archive && (
                        <Button
                            type="fill"
                            text="Купить"
                            click={() => {
                                axios
                                    .post(`/api/user/order/buyorder/${order?._id}`, {
                                        sum: order?.price,
                                    })
                                    .then(_ => (window.location.href = "/platform/active-orders"))
                                    .catch(err => {
                                        console.log(err);
                                        toast.error("Не удалось приобрести заявку");
                                    });
                            }}
                        />
                    )}
                </div>
            )}
        </LayoutPage>
    );
};

export default Order;
