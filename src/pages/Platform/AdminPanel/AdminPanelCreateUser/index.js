import LayoutBlock from "../../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutPage from "../../../../components/Layouts/LayoutPage";
import Button from "../../../../components/UI/Button";
import Input from "../../../../components/UI/Input";
import Checkbox from "../../../../components/UI/Checkbox";
import DropdownList from "../../../../components/UI/DropdownList";

import "./AdminPanelCreateUser.scss";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AdminPanelCreateUser = () => {
    const [currentCategories, setCurrentCategories] = useState([["", "", ""]]);
    const [regionCountry, setRegionCountry] = useState();
    const [regionCity, setRegionCity] = useState();
    const [organization, setOrganization] = useState();
    const [accessOpenOrders, setAccessOpenOrders] = useState(false);

    const [regions, setRegions] = useState([]);
    const [categories, setCategories] = useState([["", "", ""]]);

    const [resetCurrentValueDropdown, setResentCurrentValueDropdown] = useState(false)

    const [newUser, setNewUser] = useState({
        fio: "",
        email: "",
        telephone: "",
        organization: "",
        region: "",
        business_line: [],
        access_to_open: false,
        is_admin: false,
        balance: 0,
    });

    const handleAddUser = () => {
        const getNewUserData = () => {
            let obj = {}
            if (typeof newUser.fio === "string") obj.fio = newUser.fio
            if (typeof newUser.email === "string") obj.email = newUser.email
            if (typeof newUser.telephone === "string") obj.telephone = newUser.telephone
            if (typeof newUser.organization === "string") obj.organization = newUser.organization
            if (typeof newUser.region[0] === "string" && typeof newUser.region[1] === "string") obj.region = newUser.region
            if (newUser.business_line) obj.business_line = newUser.business_line
            if (typeof newUser.access_to_open === "boolean") obj.access_to_open = newUser.access_to_open
            if (typeof newUser.is_admin === "boolean") obj.is_admin = newUser.is_admin
            if (typeof newUser.balance === "number" || typeof newUser.balance === "string") obj.balance = newUser.balance
            return obj
        }
        axios
            .post(
                "https://project-the-leads.onrender.com/api/auth/reg",
                {
                    ...getNewUserData()
                },
                {
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` }
                },
            )
            .then(res => {
                toast.success("Пользователь добавлен")
                console.log(res)
            })
            .catch(err => {
                toast.error("Ошибка добавления пользователя")
                console.log(err)
            });
    }

    const resetAddUser = () => {
        setNewUser({
            fio: "",
            email: "",
            telephone: "",
            organization: "",
            region: "",
            business_line: [],
            access_to_open: false,
            is_admin: false,
            balance: 0,
        })
        setOrganization()
        setAccessOpenOrders(false)
        setRegionCountry()
        setRegionCity()
        setCurrentCategories([["", "", ""]])
        for (const elem of document.querySelectorAll(".checkbox__input")) {
            elem.checked = false
        }
        setResentCurrentValueDropdown(true)
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
                if (country === regionCountry) arr.push(city)
            })
        }
        return arr
    }

    const getCategories = (level, index) => {
        let arr = []
        try {
            if (level === 1) {
                categories.map(({category}) => {
                    if (!arr.includes(category[0])) arr.push(category[0])
                })
            }
            if (level === 2) {
                let mainCat = currentCategories[index][0]
                categories.map(({category}) => {
                    if (mainCat === category[0]) {
                        if (!arr.includes(category[1])) arr.push(category[1])
                    }
                })
            }
            if (level === 3) {
                let mainCat = currentCategories[index][0]
                let extraCat = currentCategories[index][1]
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

    useEffect(() => {
        axios.get("https://project-the-leads.onrender.com/api/admin/settings/region", {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` }
        }).then(res => setRegions(res.data)).catch(err => console.log(err))
        axios.get("https://project-the-leads.onrender.com/api/admin/settings/category", {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` }
        }).then(res => setCategories(res.data)).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        setNewUser(prev => ({ ...prev, access_to_open: accessOpenOrders, region: [regionCountry, regionCity], organization, business_line: currentCategories }));
    }, [regionCountry, accessOpenOrders, regionCity, organization, currentCategories]);

    return (
        <LayoutPage title="Добавление пользователя">
            <LayoutBlocks>
                <LayoutBlock>
                    <div className="order order--createUser">
                        <div className="order__row">
                            <div className="order__row-title"><span style={{color: "red"}}>*</span> ФИО:</div>
                            <div className="order__row-text">
                                <Input
                                    placeholder={"ФИО"}
                                    value={newUser.fio}
                                    setValue={arg => setNewUser({ ...newUser, fio: arg })}
                                />
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title"><span style={{color: "red"}}>*</span> Email:</div>
                            <div className="order__row-text">
                                <Input
                                    placeholder={"Email"}
                                    value={newUser.email}
                                    setValue={arg => setNewUser({ ...newUser, email: arg })}
                                />
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title"><span style={{color: "red"}}>*</span> Телефон:</div>
                            <div className="order__row-text">
                                <Input
                                    placeholder={"Телефон"}
                                    value={newUser.telephone}
                                    setValue={arg => setNewUser({ ...newUser, telephone: arg })}
                                />
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Организация:</div>
                            <div className="order__row-text">
                                <Checkbox data_group="organization" text="частная организация" click={(arg) => setOrganization("частная")} />
                                <Checkbox data_group="organization" text="государственная организация" click={(arg) => setOrganization("государственная")} />
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Регион:</div>
                            <div className="order__row-text">
                                <DropdownList
                                        curVal={resetCurrentValueDropdown}
                                    values={getRegion("country")}
                                    itemClick={arg => setRegionCountry(arg)}
                                />
                                {regionCountry && (
                                    <DropdownList
                                        curVal={resetCurrentValueDropdown}
                                        values={
                                            getRegion("city")
                                        }
                                        itemClick={arg => setRegionCity(arg)}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Направление бизнеса:</div>
                            <div className="order__row-text">
                                <div class="order__row-text-businessLine">
                                    {
                                        currentCategories.map((category, index) => (
                                            <div class="order__row-text-businessLine-line">
                                                <DropdownList curVal={resetCurrentValueDropdown} itemClick={text => {
                                                    let arr = [...currentCategories]
                                                    arr[index][0] = text
                                                    setCurrentCategories(arr)
                                                }} values={getCategories(1)}/>
                                                {currentCategories[index][0] && <DropdownList curVal={resetCurrentValueDropdown} itemClick={text => {
                                                    let arr = [...currentCategories]
                                                    arr[index][1] = text
                                                    setCurrentCategories(arr)
                                                }} values={getCategories(2, index)}/>}
                                                {currentCategories[index][1] &&<DropdownList curVal={resetCurrentValueDropdown} itemClick={text => {
                                                    let arr = [...currentCategories]
                                                    arr[index][2] = text
                                                    setCurrentCategories(arr)
                                                }} values={getCategories(3, index)}/>}
                                                { currentCategories.at(-1)[0] && currentCategories.at(-1)[1] && currentCategories.at(-1)[2] && index === currentCategories.length - 1 && <img className="order__row-text-add" src="/img/filters/plus.svg" alt="" onClick={() => setCurrentCategories([...currentCategories, ["", "", ""]])} /> }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Доступ к закрытым заявкам:</div>
                            <div className="order__row-text">
                                <Checkbox text="Да" data_group="access" click={() => setAccessOpenOrders(true)} />
                                <Checkbox text="Нет" data_group="access" click={() => setAccessOpenOrders(false)} />
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Баланс:</div>
                            <div className="order__row-text">
                                <Input
                                    placeholder={"2000"}
                                    value={newUser.balance}
                                    setValue={arg => setNewUser({ ...newUser, balance: arg })}
                                />
                            </div>
                        </div>
                    </div>
                </LayoutBlock>
            </LayoutBlocks>
            <div className="order__buttons">
                <Button text="Сбросить" click={resetAddUser}/>
                <Button type="fill" text="Добавить пользователя" click={handleAddUser}/>
            </div>
        </LayoutPage>
    );
};

export default AdminPanelCreateUser;
