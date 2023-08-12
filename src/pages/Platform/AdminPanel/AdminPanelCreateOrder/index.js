import LayoutBlock from "../../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutPage from "../../../../components/Layouts/LayoutPage";
import Button from "../../../../components/UI/Button";
import Input from "../../../../components/UI/Input";
import Checkbox from "../../../../components/UI/Checkbox";
import DropdownList from "../../../../components/UI/DropdownList";
import ModalWindow from "../../../../components/ModalWindow";

import "./AdminPanelCreateOrder.scss";
import { useEffect, useState } from "react";
import axios from "../../../../utils/axios";
import { toast } from "react-hot-toast";

const AdminPanelCreateOrder = () => {
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
    const [newOrderPrice, setNewOrderPrice] = useState(0)
    const [duplicatesOrders, setDuplicatesOrders] = useState([]);

    const [categories, setCategories] = useState([["", "", ""]]);
    const [regions, setRegions] = useState(["", ""]);

    const [openUploads, setOpenUploads] = useState([]);
    const [closeUploads, setCloseUploads] = useState([]);

    const [resetCurrentValueDropdown, setResentCurrentValueDropdown] = useState(false);
    const [duplicatesPopup, setDuplicatesPopup] = useState(false);

    useEffect(() => {
        axios
            .get("/api/admin/settings/region")
            .then(res => setRegions(res.data))
            .catch(err => console.log(err));
        axios
            .get("/api/admin/settings/category")
            .then(res => setCategories(res.data))
            .catch(err => console.log(err));
    }, []);
    
    // const addOrder = () => {
    //     const getOrderPrice = () => {
    //         let order_price = 0;
    //         axios
    //             .get("/api/admin/settings/category")
    //             .then(({ data }) => {
    //                 let rate_base_price = data.find(item => item.category[0] === newOrder.nomeclature[0][0]).basePrice;
    //                 order_price += rate_base_price;
    //                 axios
    //                     .get("/api/admin/settings/setting")
    //                     .then(({ data }) => {
    //                         const rates = data[0].settings[0].rates;
    //                         let rate_region = rates.regions.find(item => item.title === newOrder.region[1]).rate;
    //                         let rate_buyer = newOrder.type_buyer === "частная организация" ? rates.buyer[0] : newOrder.type_buyer === "государственная организация" ? rates.buyer[1] : newOrder.type_buyer === "неизвестно" ? rates.buyer[2] : 1;
    //                         let rate_purchase = newOrder.type_order === "прямая" ? rates.type_buyer[0] : newOrder.type_order === "тендер" ? rates.type_buyer[1] : 1;
    //                         let rate_score = newOrder.score === "мелкая" ? rates.score[0] : newOrder.score === "средняя" ? rates.score[1] : newOrder.score === "крупная" ? rates.score[2] : newOrder.score === "крупная+" ? rates.score[3] : 1;
    //                         let rate_express = newOrder.is_urgent === "да" ? rates.extra[0] : 1;
    //                         axios
    //                             .get("/api/admin/user")
    //                             .then(({data}) => {
    //                                 let current_user = null
    //                                 let rate_user_regions = 1;
    //                                 let rate_close = 1;
    //                                 data.map(user => {
    //                                     if (user.fio.toLowerCase() === newOrder.fio.toLowerCase()) {
    //                                         current_user = user
    //                                     }
    //                                 })
    //                                 if (current_user) {
    //                                     // дописать
    //                                 }
    //                                 order_price *=
    //                                         Number(rate_region) *
    //                                         Number(rate_user_regions) *
    //                                         Number(rate_buyer) *
    //                                         Number(rate_purchase) *
    //                                         Number(rate_score) *
    //                                         Number(rate_close) *
    //                                         Number(rate_express);
    //                                 console.log(+order_price.toFixed(2))
    //                                 return (+order_price.toFixed(2))
    //                             })
    //                             .catch(err => {
    //                                 console.log(err);
    //                                 return 0;
    //                             });
    //                     })
    //                     .catch(err => {
    //                         console.log(err);
    //                         return 0;
    //                     });
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //                 return 0;
    //             });
    //     };
    //     const formDataOpen = new FormData();
    //     const formDataClose = new FormData();
    //     const allUploads = []
    //     openUploads.map(({ file }) => {
    //         formDataOpen.append("file", file);
    //     });
    //     closeUploads.map(({ file }) => {
    //         formDataClose.append("file", file);
    //     });
    //     try {
    //         axios
    //             .post("/api/admin/uploads", formDataOpen, {
    //                 headers: {
    //                     "Content-Type": "multipart/form-data",
    //                 },
    //             })
    //             .then(({data}) => {
    //                 data.map(file => allUploads.push({...file, open: true}))
    //                 axios
    //                     .post("/api/admin/uploads", formDataClose, {
    //                         headers: {
    //                             "Content-Type": "multipart/form-data",
    //                         },
    //                     })
    //                     .then(({data}) => {
    //                         data.map(file => allUploads.push({...file, open: false}))
    //                         axios
    //                             .post("/api/admin/order", { ...newOrder, upload: [...allUploads], price: getOrderPrice() })
    //                             .then(_ => {
    //                                 toast.success("Заявка создана")
    //                                 handleResetOrder()
    //                             })
    //                             .catch(_ => toast.error("Ошибка при создании заявки"));
    //                     })
    //                     .catch(_ => {
    //                         toast.error("Невозможно загрузить закрытые вложения");
    //                     });
    //             })
    //             .catch(_ => {
    //                 toast.error("Невозможно загрузить открытые вложения");
    //             });
    //     } catch {
    //         toast.error("Невозможно загрузить вложения");
    //     }
    // };

    const addOrder = () => {
        // const getOrderPrice = async () => {
        //     let order_price = 0;

        //     let res = await axios.get("/api/admin/settings/category")
        //     order_price += await res.data.find(item => item.category[0] === newOrder.nomeclature[0][0]).basePrice;

        //     res = await axios.get("/api/admin/settings/setting")
        //     const rates = await res.data[0].settings[0].rates;
        //     let rate_region = await rates.regions.find(item => item.title === newOrder.region[1]).rate;
        //     let rate_buyer = await newOrder.type_buyer === "частная организация" ? rates.buyer[0] : newOrder.type_buyer === "государственная организация" ? rates.buyer[1] : newOrder.type_buyer === "неизвестно" ? rates.buyer[2] : 1;
        //     let rate_purchase = await newOrder.type_order === "прямая" ? rates.type_buyer[0] : newOrder.type_order === "тендер" ? rates.type_buyer[1] : 1;
        //     let rate_score = await newOrder.score === "мелкая" ? rates.score[0] : newOrder.score === "средняя" ? rates.score[1] : newOrder.score === "крупная" ? rates.score[2] : newOrder.score === "крупная+" ? rates.score[3] : 1;
        //     let rate_express = await newOrder.is_urgent === "да" ? rates.extra[0] : 1;

        //     order_price *=
        //                                     Number(rate_region) *
        //                                     Number(1) *
        //                                     Number(rate_buyer) *
        //                                     Number(rate_purchase) *
        //                                     Number(rate_score) *
        //                                     Number(1) *
        //                                     Number(rate_express);
        //     return Number(order_price.toFixed(2))
        // };
        // getOrderPrice().then(res => setNewOrderPrice(res)).catch(err => console.log(err))
        const formDataOpen = new FormData();
            const formDataClose = new FormData();
            const allUploads = []
            openUploads.map(({ file }) => {
                formDataOpen.append("file", file);
            });
            closeUploads.map(({ file }) => {
                formDataClose.append("file", file);
            });
            try {
                axios
                    .post("/api/admin/uploads", formDataOpen, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    })
                    .then(({data}) => {
                        data.map(file => allUploads.push({...file, open: true}))
                        axios
                            .post("/api/admin/uploads", formDataClose, {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            })
                            .then(({data}) => {
                                data.map(file => allUploads.push({...file, open: false}))
                                console.log({...newOrder, price: newOrderPrice})
                                axios
                                    .post("/api/admin/order", { ...newOrder, upload: [...allUploads] })
                                    .then(_ => {
                                        toast.success("Заявка создана")
                                        setNewOrderPrice(0)
                                        handleResetOrder()
                                    })
                                    .catch(_ => toast.error("Ошибка при создании заявки"));
                            })
                            .catch(_ => {
                                setNewOrderPrice(0)
                                toast.error("Невозможно загрузить закрытые вложения");
                            });
                    })
                    .catch(_ => {
                        setNewOrderPrice(0)
                        toast.error("Невозможно загрузить открытые вложения");
                    });
            } catch {
                setNewOrderPrice(0)
                toast.error("Невозможно загрузить вложения");
            }
    };

    const checkDuplicates = async () => {
        const isHaveTelephoneEqual = (currentOrderPhones, newOrderPhones) => {
            let flag = false;
            currentOrderPhones.map(phone => {
                if (newOrderPhones.includes(phone)) {
                    flag = true;
                }
            });
            return flag;
        };
        const res = await axios.get("/api/admin/order");
        let arr = [];
        await res.data.map(order => {
            if (
                order.email.toLowerCase() === newOrder.email.toLowerCase() ||
                order.fio.toLowerCase() === newOrder.fio.toLowerCase() ||
                isHaveTelephoneEqual(order.telephone, newOrder.telephone)
            )
                arr.push(order);
        });
        setDuplicatesOrders(arr);
        return await arr;
    };

    const handleAddOrder = () => {
        checkDuplicates().then(res => {
            if (res.length > 0) {
                setDuplicatesPopup(true);
            } else {
                addOrder();
            }
        });
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

    const getDuplicatesURL = () => {
        let arr = [];
        duplicatesOrders.map(order => arr.push(order._id));
        return arr.join("$");
    };

    return (
        <LayoutPage title="Создание заявки">
            <LayoutBlocks>
                <LayoutBlock>
                    <div className="order order--createUser order--createOrder">
                        <div className="order__row">
                            <div className="order__row-title">
                                <span style={{ color: "red" }}>*</span> Направление бизнеса:
                            </div>
                            <div className="order__row-text">
                                <DropdownList
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
                                    curVal={resetCurrentValueDropdown}
                                    setCurVal={() => setResentCurrentValueDropdown(false)}
                                    values={getRegion("country")}
                                    itemClick={arg => setNewOrder({ ...newOrder, region: [arg, newOrder.region[1]] })}
                                />
                                {newOrder.region[0] && (
                                    <DropdownList
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
                    </div>
                </LayoutBlock>
            </LayoutBlocks>
            <div className="order__buttons">
                <Button text="Сбросить" click={handleResetOrder} />
                <Button type="fill" text="Добавить" click={handleAddOrder} />
            </div>
            <ModalWindow trigger={duplicatesPopup}>
                <h1>
                    {duplicatesOrders.length === 1
                        ? "Найден 1 дубликат"
                        : duplicatesOrders.length === 2 ||
                          duplicatesOrders.length === 3 ||
                          duplicatesOrders.length === 4
                        ? `Найдено ${duplicatesOrders.length} дубликата`
                        : `Найдено ${duplicatesOrders.length} дубликатов`}
                </h1>
                <div className="modalWindow__body-buttons modalWindow__body-buttons--column">
                    <Button
                        text="Создать заявку"
                        type="fill"
                        click={() => {
                            setDuplicatesPopup(false);
                            addOrder();
                        }}
                    />
                    <Button
                        text="Посмотреть дубли"
                        toUrl={`/platform/admin-panel/duplicates/${getDuplicatesURL()}`}
                        openLinkInNewTab
                    />
                    <Button text="Закрыть окно" click={() => setDuplicatesPopup(false)} />
                </div>
            </ModalWindow>
        </LayoutPage>
    );
};

export default AdminPanelCreateOrder;