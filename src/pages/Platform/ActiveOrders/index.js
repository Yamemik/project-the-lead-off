import { useState, useEffect } from "react";

import LayoutBlock from "./../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "./../../../components/Layouts/LayoutBlocks";
import LayoutPage from "./../../../components/Layouts/LayoutPage";
import Pagination from "../../../components/Pagination";
import Loader from "../../../components/Loader";
import ModalWindow from "../../../components/ModalWindow";

import getAllOrders from "../../../utils/getAllOrders";
import Button from "../../../components/UI/Button";
import { toast } from "react-hot-toast";
import axios from "../../../utils/axios";
import getOrderWithCalculatePrice from "../../../utils/getOrderWithCalculatePrice";

const ActiveOrders = () => {
    const [activeOrders, setActiveOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [rejectInput, setRejectInput] = useState("");
    const [rejectPopup, setRejectPopup] = useState(false);
    const [rejectID, setRejectID] = useState(null);

    useEffect(() => {
        getAllOrders()
            .then(({ data }) => {
                data.reverse().filter(
                    order =>
                        order?.user?._id === JSON.parse(localStorage.getItem("user"))._id &&
                        !order?.is_archive &&
                        !order.is_canceled &&
                        !order?.answer,
                ).map(order =>
                    getOrderWithCalculatePrice(order, JSON.parse(localStorage.getItem("user"))).then(order =>
                        setActiveOrders(prev => [...prev, order]),
                    ),
                );
                setTimeout(() => {
                    setIsLoading(false)
                }, 1200)
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <LayoutPage title="Активные заявки">
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
                                        getAllOrders()
                                            .then(({ data }) => {
                                                setActiveOrders(
                                                    data.filter(
                                                        order =>
                                                            order?.user?._id ===
                                                                JSON.parse(localStorage.getItem("user"))._id &&
                                                            !order?.is_archive &&
                                                            !order.is_canceled &&
                                                            !order?.answer,
                                                    ),
                                                );
                                                setIsLoading(false);
                                            })
                                            .catch(err => console.log(err));
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
                <LayoutBlock title="Фильтры">
                    <Pagination
                        setNewData_parent_2={arg => setActiveOrders(arg)}
                        items={activeOrders}
                        itemsPerPage={5}
                        isCanClose
                        setRejectPopup={() => setRejectPopup(true)}
                        setRejectID={id => setRejectID(id)}
                    />
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

// number_order #23

export default ActiveOrders;
