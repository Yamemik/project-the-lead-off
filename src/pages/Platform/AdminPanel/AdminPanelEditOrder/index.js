import LayoutBlock from "../../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutPage from "../../../../components/Layouts/LayoutPage";
import Button from "../../../../components/UI/Button";
import Input from "../../../../components/UI/Input";
import Checkbox from "../../../../components/UI/Checkbox";
import DropdownList from "../../../../components/UI/DropdownList";
import ModalWindow from "../../../../components/ModalWindow";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "../../../../utils/axios";
import toast from "react-hot-toast"

const AdminPanelEditOrder = () => {
    const params = useParams();
    const [newOrder, setNewOrder] = useState({
        nomeclature: [["", "", ""]],
        region: [],
        text: "",
        upload: [],
        fio: "",
        email: "",
        telephone: [""],
        score: "",
        type_buyer: "",
        type_order: "",
        is_urgent: "",
        is_open: "",
    });
    const [currentNumberOrder, setCurrentNumberOrder] = useState(0);

    const [categories, setCategories] = useState([["", "", ""]]);
    const [regions, setRegions] = useState(["", ""]);

    const [openUploads, setOpenUploads] = useState([]);
    const [closeUploads, setCloseUploads] = useState([]);
    const [deleteOrderPopup, setDeleteOrderPopup] = useState(false)

    const [resetCurrentValueDropdown, setResentCurrentValueDropdown] = useState(false);

    useEffect(() => {
        axios
            .get("/api/admin/settings/region")
            .then(res => setRegions(res.data))
            .catch(err => console.log(err));
        axios
            .get("/api/admin/settings/category")
            .then(res => setCategories(res.data))
            .catch(err => console.log(err));
        axios
            .get(`/api/user/order/${params.id}`)
            .then(({ data }) => {
                setNewOrder({
                    nomeclature: data.nomeclature,
                    region: data.region,
                    text: data.text,
                    upload: data.upload,
                    fio: data.fio,
                    email: data.email,
                    telephone: data.telephone,
                    score: data.score,
                    type_buyer: data.type_buyer,
                    type_order: data.type_order,
                    is_urgent: data.is_urgent,
                    is_open: data.is_open,
                })
                for (const item of document.getElementsByClassName("checkbox__input")) {
                    if (data.is_urgent === "да") {
                        if (item.getAttribute("data-text") === "да") {
                            item.checked = true;
                        }
                    } else {
                        if (item.getAttribute("data-text") === "нет") {
                            item.checked = true;
                        }
                    }
                    if (data.type_order === "прямая") {
                        if (item.getAttribute("data-text") === "прямая") {
                            item.checked = true;
                        }
                    } else {
                        if (item.getAttribute("data-text") === "тендер") {
                            item.checked = true;
                        }
                    }
                    if (data.type_buyer === "частная организация") {
                        if (item.getAttribute("data-text") === "частная организация") {
                            item.checked = true;
                        }
                    } else if (data.type_buyer === "неизвестно") {
                        if (item.getAttribute("data-text") === "неизвестно") {
                            item.checked = true;
                        }
                    } else {
                        if (item.getAttribute("data-text") === "государственная организация") {
                            item.checked = true;
                        }
                    }
                }
                setCurrentNumberOrder(data.number_order)
            })
            .catch(err => console.log(err));
    }, []);

    const handleSaveOrder = () => {
        // const formDataOpen = new FormData();
        // const formDataClose = new FormData();
        // const allUploads = [];
        // openUploads.map(({ file }) => {
        //     formDataOpen.append("file", file);
        // });
        // closeUploads.map(({ file }) => {
        //     formDataClose.append("file", file);
        // });
        // try {
        //     axios
        //         .post("/api/admin/uploads", formDataOpen, {
        //             headers: {
        //                 "Content-Type": "multipart/form-data",
        //             },
        //         })
        //         .then(({ data }) => {
        //             data.map(file => allUploads.push({ ...file, open: true }));
        //             axios
        //                 .post("/api/admin/uploads", formDataClose, {
        //                     headers: {
        //                         "Content-Type": "multipart/form-data",
        //                     },
        //                 })
        //                 .then(({ data }) => {
        //                     data.map(file => allUploads.push({ ...file, open: false }));
        //                     axios
        //                         .post("/api/admin/order", { ...newOrder, upload: [...allUploads] })
        //                         .then(_ => {
        //                             toast.success("Заявка создана");
        //                             handleResetOrder();
        //                         })
        //                         .catch(_ => toast.error("Ошибка при создании заявки"));
        //                 })
        //                 .catch(_ => {
        //                     toast.error("Невозможно загрузить закрытые вложения");
        //                 });
        //         })
        //         .catch(_ => {
        //             toast.error("Невозможно загрузить открытые вложения");
        //         });
        // } catch {
        //     toast.error("Невозможно загрузить вложения");
        // }
        axios
            .patch(`/api/admin/order/${params.id}`, newOrder)
            .then(_ => {
                toast.success("Заявка обновлена")
                for (const item of document.getElementsByClassName("checkbox__input")) {
                    item.checked = false
                }
                axios
                    .get(`/api/user/order/${params.id}`)
                    .then(({ data }) => {
                        setNewOrder({
                            nomeclature: data.nomeclature,
                            region: data.region,
                            text: data.text,
                            upload: data.upload,
                            fio: data.fio,
                            email: data.email,
                            telephone: data.telephone,
                            score: data.score,
                            type_buyer: data.type_buyer,
                            type_order: data.type_order,
                            is_urgent: data.is_urgent,
                            is_open: data.is_open,
                        })
                        for (const item of document.getElementsByClassName("checkbox__input")) {
                            if (data.is_urgent === "да") {
                                if (item.getAttribute("data-text") === "да") {
                                    item.checked = true;
                                }
                            } else {
                                if (item.getAttribute("data-text") === "нет") {
                                    item.checked = true;
                                }
                            }
                            if (data.type_order === "прямая") {
                                if (item.getAttribute("data-text") === "прямая") {
                                    item.checked = true;
                                }
                            } else {
                                if (item.getAttribute("data-text") === "тендер") {
                                    item.checked = true;
                                }
                            }
                            if (data.type_buyer === "частная организация") {
                                if (item.getAttribute("data-text") === "частная организация") {
                                    item.checked = true;
                                }
                            } else if (data.type_buyer === "неизвестно") {
                                if (item.getAttribute("data-text") === "неизвестно") {
                                    item.checked = true;
                                }
                            } else {
                                if (item.getAttribute("data-text") === "государственная организация") {
                                    item.checked = true;
                                }
                            }
                        }
                        setCurrentNumberOrder(data.number_order)
                    })
                    .catch(err => console.log(err));
                    })
            .catch(_ => toast.error("Не удалось обновить заявку"))
    };

    const handleResetOrder = () => {
        setOpenUploads([]);
        setCloseUploads([]);
        setResentCurrentValueDropdown(true);
        setNewOrder({
            nomeclature: [["", "", ""]],
            region: [],
            text: "",
            upload: [],
            fio: "",
            email: "",
            telephone: [""],
            score: "",
            type_buyer: "",
            type_order: "",
            is_urgent: "",
            is_open: "",
        });
        for (const elem of document.querySelectorAll(".checkbox__input")) {
            elem.checked = false;
        }
    };

    const deleteOrder = () => {
        axios
            .delete(`/api/admin/order/${params.id}`)
            .then(_ => {
                setDeleteOrderPopup(false)
                toast.success("Заявка удалена");
                setTimeout(() => {
                    window.location.href = "/platform/admin-panel/orders"
                }, 1200)
            })
            .catch(_ => toast.error("Ошибка при удалении заявки"));
    }

    const handleDeleteOrder = () => {
        setDeleteOrderPopup(true)
    }

    const getCategories = level => {
        let arr = [];
        try {
            if (level === 1) {
                categories.map(({ category }) => {
                    if (!arr.includes(category[0])) arr.push(category[0]);
                });
            }
            if (level === 2) {
                let mainCat = newOrder.nomeclature[0][0];
                categories.map(({ category }) => {
                    if (mainCat === category[0]) {
                        if (!arr.includes(category[1])) arr.push(category[1]);
                    }
                });
            }
            if (level === 3) {
                let mainCat = newOrder.nomeclature[0][0];
                let extraCat = newOrder.nomeclature[0][1];
                categories.map(({ category }) => {
                    if (mainCat === category[0] && extraCat === category[1]) {
                        if (!arr.includes(category[2])) arr.push(category[2]);
                    }
                });
            }
        } catch {
            return [];
        }
        return arr;
    };

    const getRegion = type => {
        let arr = [];
        if (type === "country") {
            regions.map(({ country }) => {
                if (!arr.includes(country)) arr.push(country);
            });
        }
        if (type === "city") {
            regions.map(({ country, city }) => {
                if (country === newOrder.region[0]) arr.push(city);
            });
        }
        return arr;
    };

    return (
        <LayoutPage title={`Редактирование заявки №${currentNumberOrder}`}>
            <LayoutBlocks>
                <LayoutBlock>
                    <div className="order order--createUser order--createOrder">
                        <div className="order__row">
                            <div className="order__row-title">
                                <span style={{ color: "red" }}>*</span> Категория:
                            </div>
                            <div className="order__row-text">
                                <DropdownList
                                    startValue={newOrder.nomeclature[0][0]}
                                    curVal={resetCurrentValueDropdown}
                                    setCurVal={() => setResentCurrentValueDropdown(false)}
                                    values={getCategories(1)}
                                    itemClick={text =>
                                        setNewOrder({
                                            ...newOrder,
                                            nomeclature: [
                                                [text, newOrder.nomeclature[0][1], newOrder.nomeclature[0][2]],
                                            ],
                                        })
                                    }
                                />
                                {newOrder.nomeclature[0][0] && (
                                    <DropdownList
                                        startValue={newOrder.nomeclature[0][1]}
                                        curVal={resetCurrentValueDropdown}
                                        setCurVal={() => setResentCurrentValueDropdown(false)}
                                        values={getCategories(2)}
                                        itemClick={text =>
                                            setNewOrder({
                                                ...newOrder,
                                                nomeclature: [
                                                    [newOrder.nomeclature[0][0], text, newOrder.nomeclature[0][2]],
                                                ],
                                            })
                                        }
                                    />
                                )}
                                {newOrder.nomeclature[0][0] && newOrder.nomeclature[0][1] && (
                                    <DropdownList
                                        startValue={newOrder.nomeclature[0][2]}
                                        curVal={resetCurrentValueDropdown}
                                        setCurVal={() => setResentCurrentValueDropdown(false)}
                                        values={getCategories(3)}
                                        itemClick={text =>
                                            setNewOrder({
                                                ...newOrder,
                                                nomeclature: [
                                                    [newOrder.nomeclature[0][0], newOrder.nomeclature[0][1], text],
                                                ],
                                            })
                                        }
                                    />
                                )}
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">
                                <span style={{ color: "red" }}>*</span> Регион покупателя:
                            </div>
                            <div className="order__row-text">
                                <DropdownList
                                    startValue={newOrder.region[0]}
                                    curVal={resetCurrentValueDropdown}
                                    setCurVal={() => setResentCurrentValueDropdown(false)}
                                    values={getRegion("country")}
                                    itemClick={arg => setNewOrder({ ...newOrder, region: [arg, newOrder.region[1]] })}
                                />
                                {newOrder.region[0] && (
                                    <DropdownList
                                        startValue={newOrder.region[1]}
                                        curVal={resetCurrentValueDropdown}
                                        setCurVal={() => setResentCurrentValueDropdown(false)}
                                        values={getRegion("city")}
                                        itemClick={arg =>
                                            setNewOrder({ ...newOrder, region: [newOrder.region[0], arg] })
                                        }
                                    />
                                )}
                            </div>
                        </div>
                        <div className="order__row">
                            <textarea
                                placeholder="Текст заявки"
                                value={newOrder.text}
                                onChange={e => setNewOrder({ ...newOrder, text: e.target.value })}
                            />
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Открытые вложения:</div>
                            <div className="order__row-text">
                                <Input
                                    oldFiles={newOrder.upload.filter(file => file.open)}
                                    placeholder={"Прикрепить"}
                                    type="upload"
                                    setFiles={files => setOpenUploads(files)}
                                    setFilesType={true}
                                    curVal={resetCurrentValueDropdown}
                                    setCurVal={() => setResentCurrentValueDropdown(false)}
                                />
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Закрытые вложения:</div>
                            <div className="order__row-text">
                                <Input
                                    oldFiles={newOrder.upload.filter(file => !file.open)}
                                    placeholder={"Прикрепить"}
                                    type="upload"
                                    setFiles={files => setCloseUploads(files)}
                                    setFilesType={false}
                                    curVal={resetCurrentValueDropdown}
                                    setCurVal={() => setResentCurrentValueDropdown(false)}
                                />
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">
                                <span style={{ color: "red" }}>*</span> Контактные данные:
                            </div>
                            <div className="order__row-text">
                                <Input
                                    placeholder={"Email"}
                                    value={newOrder.email}
                                    setValue={arg => setNewOrder({ ...newOrder, email: arg })}
                                />
                                <div className="order__row-text-phones">
                                    {newOrder.telephone.map((item, index) => (
                                        <Input
                                            placeholder={"Телефон"}
                                            value={newOrder.telephone[index]}
                                            setValue={arg => {
                                                let telephones = newOrder.telephone;
                                                telephones[index] = arg;
                                                setNewOrder({ ...newOrder, telephone: telephones });
                                            }}
                                        />
                                    ))}
                                    {newOrder.telephone[newOrder.telephone.length - 1] && (
                                        <div
                                            className="order__row-text-phones-add"
                                            onClick={() =>
                                                setNewOrder({ ...newOrder, telephone: [...newOrder.telephone, ""] })
                                            }>
                                            <img
                                                className="order__row-text-phones-add-icon"
                                                src="/img/filters/plus.svg"
                                                alt="Добавить номер"
                                            />
                                            <p className="order__row-text-phones-add-text">добавить номер</p>
                                        </div>
                                    )}
                                </div>
                                <Input
                                    placeholder={"ФИО"}
                                    value={newOrder.fio}
                                    setValue={arg => setNewOrder({ ...newOrder, fio: arg })}
                                />
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">
                                <span style={{ color: "red" }}>*</span> Оценка:
                            </div>
                            <div className="order__row-text">
                                <DropdownList
                                    startValue={newOrder.score}
                                    curVal={resetCurrentValueDropdown}
                                    setCurVal={() => setResentCurrentValueDropdown(false)}
                                    values={["мелкая", "средняя", "крупная", "крупная+"]}
                                    itemClick={text => setNewOrder({ ...newOrder, score: text })}
                                />
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">
                                <span style={{ color: "red" }}>*</span> Тип покупателя:
                            </div>
                            <div className="order__row-text order__row-text--cg50">
                                <Checkbox
                                    text="частная организация"
                                    data_group={"Тип покупателя"}
                                    click={() => setNewOrder({ ...newOrder, type_buyer: "частная организация" })}
                                />
                                <Checkbox
                                    text="государственная организация"
                                    data_group={"Тип покупателя"}
                                    click={() =>
                                        setNewOrder({ ...newOrder, type_buyer: "государственная организация" })
                                    }
                                />
                                <Checkbox
                                    text="неизвестно"
                                    data_group={"Тип покупателя"}
                                    click={() => setNewOrder({ ...newOrder, type_buyer: "неизвестно" })}
                                />
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">
                                <span style={{ color: "red" }}>*</span> Закупка:
                            </div>
                            <div className="order__row-text order__row-text--cg50">
                                <Checkbox
                                    text="прямая"
                                    data_group={"Закупка"}
                                    click={() => setNewOrder({ ...newOrder, type_order: "прямая" })}
                                />
                                <Checkbox
                                    text="тендер"
                                    data_group={"Закупка"}
                                    click={() => setNewOrder({ ...newOrder, type_order: "тендер" })}
                                />
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">
                                <span style={{ color: "red" }}>*</span> Срочная:
                            </div>
                            <div className="order__row-text order__row-text--cg50">
                                <Checkbox
                                    text="да"
                                    data_group={"Срочная"}
                                    click={() => setNewOrder({ ...newOrder, is_urgent: "да" })}
                                />
                                <Checkbox
                                    text="нет"
                                    data_group={"Срочная"}
                                    click={() => setNewOrder({ ...newOrder, is_urgent: "нет" })}
                                />
                            </div>
                        </div>
                        {/* <div className="order__row">
                            <div className="order__row-title"><span style={{color: "red"}}>*</span> Тип заявки:</div>
                            <div className="order__row-text">
                                <DropdownList values={["Открытая", "Закрытая"]} itemClick={(text) => setNewOrder({...newOrder, is_open: text})}/>
                            </div>
                        </div> */}
                        {/* <div className="order__row">
                            <div className="order__row-title">Стоимость:</div>
                            <div className="order__row-text">
                                <Input placeholder={"2000"} value={newOrder.balance} setValue={arg => setNewOrder({...newOrder, balance: Number(arg)})}/>
                            </div>
                        </div> */}
                    </div>
                </LayoutBlock>
            </LayoutBlocks>
            <div className="order__buttons">
                <Button text="Сбросить" click={handleResetOrder}/>
                <Button text="Удалить заявку" click={handleDeleteOrder}/>
                <Button type="fill" text="Сохранить" click={handleSaveOrder}/>
            </div>
            <ModalWindow trigger={deleteOrderPopup}>
                <h1>Вы уверены, что хотите удалить заявку?</h1>
                <div className="modalWindow__body-buttons">
                    <Button text="Подтвердить" type="fill" click={deleteOrder} />
                    <Button text="Отменить" click={() => setDeleteOrderPopup(false)} />
                </div>
            </ModalWindow>
        </LayoutPage>
    );
};

export default AdminPanelEditOrder;
