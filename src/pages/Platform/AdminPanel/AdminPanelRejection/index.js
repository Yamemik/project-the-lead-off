import LayoutPage from "./../../../../components/Layouts/LayoutPage";
import LayoutBlocks from "./../../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "./../../../../components/Layouts/LayoutBlock";
import Pagination from "../../../../components/Pagination";
import ModalWindow from "../../../../components/ModalWindow";
import Button from "../../../../components/UI/Button";
import Input from "../../../../components/UI/Input";

import { useEffect, useState } from "react";

import axios from "../../../../utils/axios";
import { toast } from "react-hot-toast";

const AdminPanelRejections = () => {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [comment, setComment] = useState("");
    const [commentPopup, setCommentPopup] = useState(false);
    const [currentItemID, setCurrentItemID] = useState();

    useEffect(() => {
        axios
            .get("/api/admin/order")
            .then(({ data }) => {
                data.filter(order => order.is_canceled).map(order => {
                    setOrders(prev => [
                        ...prev,
                        {
                            _id: order._id,
                            id: order.number_order,
                            create_date: new Date(order.createdAt).toLocaleDateString(),
                            login: `${order.nomeclature[0][0]} / ${order.nomeclature[0][1]}`,
                            FIO: order.nomeclature[0][2],
                            region: order.score,
                            phone: order.region.join(" / "),
                            balance: `${order.price} руб.`,
                            category: order.is_canceled_text,
                        },
                    ]);
                });
            })
            .catch(err => console.log(err));
    }, []);

    const handleClickYes = itemID => {
        axios
            .patch(`/api/admin/order/refund/${itemID}`)
            .then(_ => {
                toast.success("Отмена принята")
                setOrders([])
                axios
                    .get("/api/admin/order")
                    .then(({ data }) => {
                        data.filter(order => order.is_canceled).map(order => {
                            setOrders(prev => [
                                ...prev,
                                {
                                    _id: order._id,
                                    id: order.number_order,
                                    create_date: new Date(order.createdAt).toLocaleDateString(),
                                    login: `${order.nomeclature[0][0]} / ${order.nomeclature[0][1]}`,
                                    FIO: order.nomeclature[0][2],
                                    region: order.score,
                                    phone: order.region.join(" / "),
                                    balance: `${order.price} руб.`,
                                    category: order.is_canceled_text,
                                },
                            ]);
                        });
                    })
                    .catch(err => console.log(err));
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
        <LayoutPage
            title="Отказы"
            isRejectionsTable
            searchQuery={searchQuery}
            setSearchQuery={value => setSearchQuery(value)}>
            <LayoutBlocks>
                <LayoutBlock>
                    {orders.length > 0 && (
                        <Pagination
                            items={orders.filter(
                                order =>
                                    order?.FIO?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
                                    order.login.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    order.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    order.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    String(order.balance).includes(searchQuery) ||
                                    order.category.toLowerCase().includes(searchQuery.toLowerCase()),
                            )}
                            itemsPerPage={5}
                            isAdminPanelTable
                            isRejections
                            clickSee={(id) => window.location = `/platform/admin-panel/rejection-order/${id}`}
                            head={[
                                "ID",
                                "Дата создания",
                                "Товарная группа",
                                "Номенклатура",
                                "Регион",
                                "Оценка",
                                "Стоимость",
                                "Комментарий",
                            ]}
                            clickYes={itemID => handleClickYes(itemID)}
                            clickNo={itemID => handleClickNo(itemID)}
                        />
                    )}
                </LayoutBlock>
            </LayoutBlocks>
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
                                        setOrders([])
                                        axios
                                            .get("/api/admin/order")
                                            .then(({ data }) => {
                                                data.filter(order => order.is_canceled).map(order => {
                                                    setOrders(prev => [
                                                        ...prev,
                                                        {
                                                            _id: order._id,
                                                            id: order.number_order,
                                                            create_date: new Date(order.createdAt).toLocaleDateString(),
                                                            login: `${order.nomeclature[0][0]} / ${order.nomeclature[0][1]}`,
                                                            FIO: order.nomeclature[0][2],
                                                            region: order.score,
                                                            phone: order.region.join(" / "),
                                                            balance: `${order.price} руб.`,
                                                            category: order.is_canceled_text,
                                                        },
                                                    ]);
                                                });
                                            })
                                            .catch(err => console.log(err));
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
};

export default AdminPanelRejections;