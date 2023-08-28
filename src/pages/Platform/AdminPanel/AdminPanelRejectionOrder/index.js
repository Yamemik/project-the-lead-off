import { useParams } from "react-router-dom";

import LayoutBlock from "../../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutPage from "../../../../components/Layouts/LayoutPage";
import Button from "../../../../components/UI/Button";
import getUploadShortName from "../../../../utils/getUploadShortName";
import getFormatUserTelephone from "../../../../utils/getFormatUserTelephone";
import { useEffect, useState } from "react";
import axios from "../../../../utils/axios";
import getOrderWithCalculatePrice from "../../../../utils/getOrderWithCalculatePrice";
import { toast } from "react-hot-toast";
import Input from "../../../../components/UI/Input";
import ModalWindow from "../../../../components/ModalWindow";

const AdminPanelRejectionOrder = () => {
    const params = useParams();
    const [order, setOrder] = useState();

    const [comment, setComment] = useState("");
    const [commentPopup, setCommentPopup] = useState(false);
    const [currentItemID, setCurrentItemID] = useState();

    useEffect(() => {
        axios
            .get(`/api/user/order/${params.id}`)
            .then(({ data }) => {
                getOrderWithCalculatePrice(
                    data,
                    JSON.parse(localStorage.getItem("user")),
                ).then(order => setOrder(order));
            })
            .catch(err => console.log(err));
    }, []);

    const handleClickYes = itemID => {
        axios
            .patch(`/api/admin/order/refund/${itemID}`)
            .then(_ => {
                toast.success("Отмена принята")
                setTimeout(() => {
                    window.location.href = "/platform/admin-panel/rejections";
                }, 1200)
            })
            .catch(err => {
                console.log(err)
                toast.error("Невозможно принять отказ")
            });
    };

    const handleClickNo = itemID => {
        setCurrentItemID(itemID);
        setCommentPopup(true);
    };

    return (
        <LayoutPage title={`Отказ от заявки №${params?.id}`}>
            <LayoutBlocks>
                <LayoutBlock>
                    {order && (
                        <div className="order">
                            <div className="order__row">
                                <div className="order__row-title">
                                    Дата создания:
                                </div>
                                <div className="order__row-text">
                                    {new Date(
                                        order.createdAt,
                                    ).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">
                                    Направление бизнеса:
                                </div>
                                <div className="order__row-text">
                                    {order.nomeclature[0].join(" / ")}
                                </div>
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">
                                    Регион покупателя:
                                </div>
                                <div className="order__row-text">
                                    {order.region.join(" / ")}
                                </div>
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">
                                    Текст заявки:
                                </div>
                                <div className="order__row-text">
                                    {order.text}
                                </div>
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">
                                    Вложения к заявке:
                                </div>
                                <div className="order__row-text order__row-text--uploads">
                                    {order.upload.map(upload => (
                                        <>
                                            <a
                                                href={`/uploads/${upload.filename}`}
                                                download={
                                                    upload.originalname
                                                }
                                                className="order__row-text-upload"
                                                target="_blank"
                                            >
                                                {getUploadShortName(
                                                    upload.originalname,
                                                )}
                                            </a>
                                        </>
                                    ))}
                                </div>
                            </div>
                            <div className="order__row">
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
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">Оценка:</div>
                                <div className="order__row-text">
                                    {order.score}
                                </div>
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">
                                    Тип покупателя:
                                </div>
                                <div className="order__row-text">
                                    {order.type_buyer}
                                </div>
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">Закупка:</div>
                                <div className="order__row-text">
                                    {order.type_order}
                                </div>
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">Срочная:</div>
                                <div className="order__row-text">
                                    {order.is_urgent}
                                </div>
                            </div>
                            <div className="order__row">
                                <div className="order__row-title">
                                    Стоимость:
                                </div>
                                <div className="order__row-text">
                                    {order.price} руб.
                                </div>
                            </div>
                        </div>
                    )}
                </LayoutBlock>
            </LayoutBlocks>
            <div className="order__buttons">
                <Button text="Одобрить" click={() => handleClickYes(params.id)}/>
                <Button type="fill" text="Отказать" click={() => handleClickNo(params.id)}/>
            </div>
            <ModalWindow trigger={commentPopup}>
                <Input placeholder={"Введите комментарий"} value={comment} setValue={text => setComment(text)} />
                <div className="modalWindow__body-buttons">
                    <Button
                        type="fill"
                        text="Подтвердить"
                        click={() => {
                            if (comment !== "") {
                                axios
                                    .patch(`/api/admin/order/canceled/${currentItemID}`, {
                                        "is_canceled_text": comment
                                    })
                                    .then(_ => {
                                        setCommentPopup(false)
                                        setTimeout(() => {
                                            window.location.href = "/platform/admin-panel/rejections";
                                        }, 1200)
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        toast.error("Не удалось отменить отмену")
                                    })
                            } else {
                                toast.error("Введите комментарий")
                            }
                        }}
                    />
                    <Button
                        text="Отменить"
                        click={() => {
                            setCurrentItemID(null);
                            setCommentPopup(false);
                        }}
                    />
                </div>
            </ModalWindow>
        </LayoutPage>
    );
}

export default AdminPanelRejectionOrder