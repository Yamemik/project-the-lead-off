import LayoutBlock from "../../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutPage from "../../../../components/Layouts/LayoutPage";
import Button from "../../../../components/UI/Button";
import Input from "../../../../components/UI/Input";
import Checkbox from "../../../../components/UI/Checkbox";
import DropdownList from "../../../../components/UI/DropdownList";

import "./AdminPanelCreateOrder.scss"
import { useEffect, useState } from "react";
import axios from "axios";
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
        is_open: ""
    });

    const [categories, setCategories] = useState([["", "", ""]]);
    const [regions, setRegions] = useState(["", ""])

    const [uploads, setUploads] = useState([]);

    const [resetCurrentValueDropdown, setResentCurrentValueDropdown] = useState(false)

    useEffect(() => {
        axios.get("https://project-the-leads.onrender.com/api/admin/settings/region", {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` }
        }).then(res => setRegions(res.data)).catch(err => console.log(err));
        axios.get("https://project-the-leads.onrender.com/api/admin/settings/category", {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` }
        }).then(res => setCategories(res.data)).catch(err => console.log(err));
    }, [])

    const handleAddOrder = () => {
        const formDataOpen = new FormData()
        const formDataClose = new FormData()
        uploads.map(({open, file}) => {
            if (open) {
                formDataOpen.append("file", file)
            } else {
                formDataClose.append("file", file)
            }
        })
        const uploadsFiles = async (formData, nameFormData) => {
            const res = await axios.post(
                "https://project-the-leads.onrender.com/api/admin/uploads", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` }
                },
            )
           try {
                if (nameFormData === "open") {
                    uploads.map(({open, file}) => {
                        if (open) {
                            setNewOrder({...newOrder, upload: [...newOrder.upload, {open: true, file: file}]})
                        }
                    })
                } else {
                    uploads.map(({open, file}) => {
                        if (!open) {
                            setNewOrder({...newOrder, upload: [...newOrder.upload, {open: false, file: file}]})
                        }
                    })
                }
           } catch (err) {
                console.log(err)
           }
        }
        uploadsFiles(formDataOpen, "open")
        uploadsFiles(formDataClose, "close")
        const addOrder = async () => {
            const res = await axios.post(
                "https://project-the-leads.onrender.com/api/admin/order", {...newOrder},
                {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` }
                },
            )
            try {
                toast.success("Заявка создана")
                handleResetOrder()
                console.log(newOrder)
                console.log(res)
            } catch (err) {
                toast.error("Ошибка при создании заявки")
                console.log(err)
            }
        }
        addOrder()
    }

    const handleResetOrder = () => {
        setUploads([])
        setResentCurrentValueDropdown(true)
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
            is_open: ""
        })
        for (const elem of document.querySelectorAll(".checkbox__input")) {
            elem.checked = false
        }
    }

    const getCategories = (level) => {
        let arr = []
        try {
            if (level === 1) {
                categories.map(({category}) => {
                    if (!arr.includes(category[0])) arr.push(category[0])
                })
            }
            if (level === 2) {
                let mainCat = newOrder.nomeclature[0][0]
                categories.map(({category}) => {
                    if (mainCat === category[0]) {
                        if (!arr.includes(category[1])) arr.push(category[1])
                    }
                })
            }
            if (level === 3) {
                let mainCat = newOrder.nomeclature[0][0]
                let extraCat = newOrder.nomeclature[0][1]
                categories.map(({category}) => {
                    if (mainCat === category[0] && extraCat === category[1]) {
                        if (!arr.includes(category[2])) arr.push(category[2])
                    }
                })
            }
        } catch {
            return []
        }
        return arr
    }

    const getRegion = (type) => {
        let arr = []
        if (type === "country") {
            regions.map(({country}) => {
                if (!arr.includes(country)) arr.push(country)
            })
        }
        if (type === "city") {
            regions.map(({country, city}) => {
                if (country === newOrder.region[0]) arr.push(city)
            })
        }
        return arr
    }

    return (
        <LayoutPage title="Создание заявки">
            <LayoutBlocks>
                <LayoutBlock>
                    <div className="order order--createUser order--createOrder">
                        <div className="order__row">
                            <div className="order__row-title"><span style={{color: "red"}}>*</span> Категория:</div>
                            <div className="order__row-text">
                                <DropdownList values={getCategories(1)} itemClick={text =>setNewOrder({...newOrder, nomeclature: [[text, newOrder.nomeclature[0][1], newOrder.nomeclature[0][2]]]})}/>
                                { newOrder.nomeclature[0][0] && <DropdownList values={getCategories(2)} itemClick={text =>setNewOrder({...newOrder, nomeclature: [[newOrder.nomeclature[0][0], text, newOrder.nomeclature[0][2]]]})}/> }
                                { newOrder.nomeclature[0][0] && newOrder.nomeclature[0][1] && <DropdownList values={getCategories(3)} itemClick={text =>setNewOrder({...newOrder, nomeclature: [[newOrder.nomeclature[0][0], newOrder.nomeclature[0][1], text]]})}/> }
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title"><span style={{color: "red"}}>*</span> Регион покупателя:</div>
                            <div className="order__row-text">
                                <DropdownList curVal={resetCurrentValueDropdown} values={getRegion("country")}
                                    itemClick={arg => setNewOrder({...newOrder, region: [arg, newOrder.region[1]]})}/>
                                {
                                    newOrder.region[0] && <DropdownList curVal={resetCurrentValueDropdown} values={
                                            getRegion("city")
                                        }
                                        itemClick={arg => setNewOrder({...newOrder, region: [newOrder.region[0], arg]})}/>
                                }
                            </div>
                        </div>
                        <div className="order__row">
                            <textarea placeholder="Текст заявки" value={newOrder.text} onChange={e => setNewOrder({...newOrder, text: e.target.value})}/>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Открытые вложения:</div>
                            <div className="order__row-text">
                                <Input placeholder={"Прикрепить"} type="upload" setFiles={files => {
                                    files.map(file => setUploads(prev => [...prev, {open: true, file: file}]))
                                }}/>
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Закрытые вложения:</div>
                            <div className="order__row-text">
                                <Input placeholder={"Прикрепить"} type="upload" setFiles={files => {
                                    files.map(file => setUploads(prev => [...prev, {open: false, file: file}]))
                                }}/>
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title"><span style={{color: "red"}}>*</span> Контактные данные:</div>
                            <div className="order__row-text">
                                <Input placeholder={"Email"} value={newOrder.email} setValue={arg => setNewOrder({...newOrder, email: arg})}/>
                                <div className="order__row-text-phones">
                                    {
                                        newOrder.telephone.map((item, index) => (
                                            <Input placeholder={"Телефон"} value={newOrder.telephone[index]} setValue={arg => {
                                                let telephones = newOrder.telephone
                                                telephones[index] = arg
                                                setNewOrder({...newOrder, telephone: telephones})
                                            }}/>
                                        ))
                                    }
                                    {
                                        newOrder.telephone[newOrder.telephone.length - 1] && <div className="order__row-text-phones-add" onClick={() => setNewOrder({...newOrder, telephone: [...newOrder.telephone, ""]})}>
                                            <img className="order__row-text-phones-add-icon" src="/img/filters/plus.svg" alt="Добавить номер"/>
                                            <p className="order__row-text-phones-add-text">добавить номер</p>
                                        </div>
                                    }
                                </div>
                                <Input placeholder={"ФИО"} value={newOrder.fio} setValue={arg => setNewOrder({...newOrder, fio: arg})}/>
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title"><span style={{color: "red"}}>*</span> Оценка:</div>
                            <div className="order__row-text">
                                <DropdownList values={["мелкая", "средняя", "крупная", "крупная+"]} itemClick={(text) => setNewOrder({...newOrder, score: text})}/>
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title"><span style={{color: "red"}}>*</span> Тип покупателя:</div>
                            <div className="order__row-text order__row-text--cg50">
                                <Checkbox text="частная организация" data_group={"Тип покупателя"} click={() => setNewOrder({...newOrder, type_buyer: "частная организация"})}/>
                                <Checkbox text="государственная организация" data_group={"Тип покупателя"} click={() => setNewOrder({...newOrder, type_buyer: "государственная организация"})}/>
                                <Checkbox text="неизвестно" data_group={"Тип покупателя"} click={() => setNewOrder({...newOrder, type_buyer: "неизвестно"})}/>
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title"><span style={{color: "red"}}>*</span> Закупка:</div>
                            <div className="order__row-text order__row-text--cg50">
                                <Checkbox text="прямая" data_group={"Закупка"} click={() => setNewOrder({...newOrder, type_order: "прямая"})}/>
                                <Checkbox text="тендер" data_group={"Закупка"} click={() => setNewOrder({...newOrder, type_order: "тендер"})}/>
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title"><span style={{color: "red"}}>*</span> Срочная:</div>
                            <div className="order__row-text order__row-text--cg50">
                                <Checkbox text="да" data_group={"Срочная"} click={() => setNewOrder({...newOrder, is_urgent: "да"})}/>
                                <Checkbox text="нет" data_group={"Срочная"} click={() => setNewOrder({...newOrder, is_urgent: "нет"})}/>
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
                <Button type="fill" text="Добавить" click={handleAddOrder}/>
            </div>
        </LayoutPage>
    );
};

export default AdminPanelCreateOrder;
