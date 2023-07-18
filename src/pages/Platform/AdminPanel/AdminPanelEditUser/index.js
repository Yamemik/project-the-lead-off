import LayoutBlock from "../../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutPage from "../../../../components/Layouts/LayoutPage";
import Button from "../../../../components/UI/Button";
import Input from "../../../../components/UI/Input";
import Checkbox from "../../../../components/UI/Checkbox";
import DropdownList from "../../../../components/UI/DropdownList";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import axios from "../../../../utils/axios";
import { toast } from "react-hot-toast";

const AdminPanelEditUser = () => {
    const params = useParams();

    const [currentCategories, setCurrentCategories] = useState([["", "", ""]]);
    const [regionCountry, setRegionCountry] = useState();
    const [regionCity, setRegionCity] = useState();
    const [organization, setOrganization] = useState();
    const [accessOpenOrders, setAccessOpenOrders] = useState(false);

    const [regions, setRegions] = useState([]);
    const [categories, setCategories] = useState([["", "", ""]]);

    const [resetCurrentValueDropdown, setResentCurrentValueDropdown] = useState(false);

    const [newUser, setNewUser] = useState({
        fio: "",
        email: "",
        telephone: "",
        organization: "",
        region: "",
        business_line: [],
        access_to_open: false,
        balance: 0,
    });

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
            .get(`/api/admin/user/${params.id}`)
            .then(({ data }) => {
                setNewUser(prev => ({
                    ...prev,
                    fio: data.fio,
                    email: data.email,
                    telephone: data.telephone,
                    organization: data.organization,
                    region: data.region,
                    business_line: data.business_line,
                    access_to_open: data.access_to_open,
                    balance: data.balance,
                }));
                setRegionCountry(data.region[0])
                setRegionCity(data.region[1])
                setCurrentCategories(data.business_line)
                for (const item of document.getElementsByClassName("checkbox__input")) {
                    if (data.access_to_open) {
                        if (item.getAttribute("data-text") === "Да") {
                            item.checked = true;
                        }
                    } else {
                        if (item.getAttribute("data-text") === "Нет") {
                            item.checked = true;
                        }
                    }
                    if (data.organization === "частная") {
                        if (item.getAttribute("data-text") === "частная организация") {
                            item.checked = true;
                        }
                    } else {
                        if (item.getAttribute("data-text") === "государственная организация") {
                            item.checked = true;
                        }
                    }
                }
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        setNewUser(prev => ({ ...prev, access_to_open: accessOpenOrders, region: [regionCountry, regionCity], organization, business_line: currentCategories }));
    }, [regionCountry, accessOpenOrders, regionCity, organization, currentCategories]);

    const getRegion = type => {
        let arr = [];
        if (type === "country") {
            regions.map(({ country }) => {
                if (!arr.includes(country)) arr.push(country);
            });
        }
        if (type === "city") {
            regions.map(({ country, city }) => {
                if (country === regionCountry) arr.push(city);
            });
        }
        return arr;
    };

    const getCategories = (level, index) => {
        let arr = [];
        try {
            if (level === 1) {
                categories.map(({ category }) => {
                    if (!arr.includes(category[0])) arr.push(category[0]);
                });
            }
            if (level === 2) {
                let mainCat = currentCategories[index][0];
                categories.map(({ category }) => {
                    if (mainCat === category[0]) {
                        if (!arr.includes(category[1])) arr.push(category[1]);
                    }
                });
            }
            if (level === 3) {
                let mainCat = currentCategories[index][0];
                let extraCat = currentCategories[index][1];
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

    const handleDeleteUser = () => {
        axios
            .delete(`/api/admin/user/${params.id}`)
            .then(_ => {
                toast.success("Пользователь удален");
                setTimeout(() => {
                    window.location.href = "/platform/admin-panel/users"
                }, 1200)
            })
            .catch(_ => toast.error("Ошибка при удалении пользователя"));
    };

    const handleSaveUser = () => {
        axios.patch(`/api/admin/user/${params.id}`, newUser).then(_ => {
            toast.success("Пользователь обновлен")
            for (const item of document.getElementsByClassName("checkbox__input")) {
                item.checked = false
            }
            axios
                .get(`/api/admin/user/${params.id}`)
                .then(({ data }) => {
                    setNewUser(prev => ({
                        ...prev,
                        fio: data.fio,
                        email: data.email,
                        telephone: data.telephone,
                        organization: data.organization,
                        region: data.region,
                        business_line: data.business_line,
                        access_to_open: data.access_to_open,
                        balance: data.balance,
                    }));
                    setRegionCountry(data.region[0])
                    setRegionCity(data.region[1])
                    setCurrentCategories(data.business_line)
                    for (const item of document.getElementsByClassName("checkbox__input")) {
                        if (data.access_to_open) {
                            if (item.getAttribute("data-text") === "Да") {
                                item.checked = true;
                            }
                        } else {
                            if (item.getAttribute("data-text") === "Нет") {
                                item.checked = true;
                            }
                        }
                        if (data.organization === "частная") {
                            if (item.getAttribute("data-text") === "частная организация") {
                                item.checked = true;
                            }
                        } else {
                            if (item.getAttribute("data-text") === "государственная организация") {
                                item.checked = true;
                            }
                        }
                    }
                })
                .catch(err => console.log(err));
        })
        .catch(_ => toast.error("Ошибка при обновлении пользователя"))
    }

    return (
        <LayoutPage title="Редактирование пользователя">
            <LayoutBlocks>
                <LayoutBlock>
                    <div className="order order--createUser">
                        <div className="order__row">
                            <div className="order__row-title">
                                <span style={{ color: "red" }}>*</span> ФИО:
                            </div>
                            <div className="order__row-text">
                                <Input
                                    placeholder={"ФИО"}
                                    value={newUser.fio}
                                    setValue={arg => setNewUser({ ...newUser, fio: arg })}
                                />
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">
                                <span style={{ color: "red" }}>*</span> Email:
                            </div>
                            <div className="order__row-text">
                                <Input
                                    placeholder={"Email"}
                                    value={newUser.email}
                                    setValue={arg => setNewUser({ ...newUser, email: arg })}
                                />
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">
                                <span style={{ color: "red" }}>*</span> Телефон:
                            </div>
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
                                <Checkbox
                                    data_group="organization"
                                    text="частная организация"
                                    click={arg => setOrganization("частная")}
                                />
                                <Checkbox
                                    data_group="organization"
                                    text="государственная организация"
                                    click={arg => setOrganization("государственная")}
                                />
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Регион:</div>
                            <div className="order__row-text">
                                <DropdownList
                                    startValue={regionCountry}
                                    curVal={resetCurrentValueDropdown}
                                    setCurVal={() => setResentCurrentValueDropdown(false)}
                                    values={getRegion("country")}
                                    itemClick={arg => setRegionCountry(arg)}
                                />
                                {regionCountry && (
                                    <DropdownList
                                        startValue={regionCity}
                                        curVal={resetCurrentValueDropdown}
                                        setCurVal={() => setResentCurrentValueDropdown(false)}
                                        values={getRegion("city")}
                                        itemClick={arg => setRegionCity(arg)}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Направление бизнеса:</div>
                            <div className="order__row-text">
                                <div class="order__row-text-businessLine">
                                    {currentCategories.map((category, index) => (
                                        <div class="order__row-text-businessLine-line">
                                            <DropdownList
                                                startValue={category[0]}
                                                curVal={resetCurrentValueDropdown}
                                                itemClick={text => {
                                                    let arr = [...currentCategories];
                                                    arr[index][0] = text;
                                                    setCurrentCategories(arr);
                                                }}
                                                values={getCategories(1)}
                                            />
                                            {currentCategories[index][0] && (
                                                <DropdownList
                                                startValue={category[1]}
                                                    curVal={resetCurrentValueDropdown}
                                                    itemClick={text => {
                                                        let arr = [...currentCategories];
                                                        arr[index][1] = text;
                                                        setCurrentCategories(arr);
                                                    }}
                                                    values={getCategories(2, index)}
                                                />
                                            )}
                                            {currentCategories[index][1] && (
                                                <DropdownList
                                                startValue={category[2]}
                                                    curVal={resetCurrentValueDropdown}
                                                    itemClick={text => {
                                                        let arr = [...currentCategories];
                                                        arr[index][2] = text;
                                                        setCurrentCategories(arr);
                                                    }}
                                                    values={getCategories(3, index)}
                                                />
                                            )}
                                            {currentCategories.at(-1)[0] &&
                                                currentCategories.at(-1)[1] &&
                                                currentCategories.at(-1)[2] &&
                                                index === currentCategories.length - 1 && (
                                                    <img
                                                        className="order__row-text-add"
                                                        src="/img/filters/plus.svg"
                                                        alt=""
                                                        onClick={() =>
                                                            setCurrentCategories([...currentCategories, ["", "", ""]])
                                                        }
                                                    />
                                                )}
                                        </div>
                                    ))}
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
                <Button text="Удалить пользователя" click={handleDeleteUser}/>
                <Button type="fill" text="Сохранить" click={handleSaveUser}/>
            </div>
        </LayoutPage>
    );
};

export default AdminPanelEditUser;
