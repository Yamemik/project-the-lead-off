import LayoutPage from "../../../../components/Layouts/LayoutPage";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "../../../../components/Layouts/LayoutBlock";

import Input from "../../../../components/UI/Input";
import Button from "../../../../components/UI/Button";

import "./AdminPanelSettings.scss";
import List from "../../../../components/UI/List";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const AdminPanelSettings = () => {
    const [category, setCategory] = useState(["", "", ""]);
    const [categories, setCategories] = useState([]);
    const [region, setRegion] = useState(["", ""]);
    const [regions, setRegions] = useState([]);

    const getRegions = async () => {
        const res = await axios.get("https://project-the-leads.onrender.com/api/admin/settings/region", {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` }
        });
            let countries = [];
            res.data.map(({country}) => {
                if (!countries.includes(country)) countries.push(country)
            })
            let arr = []
            countries.map((item, index) => {
                arr[index] = {main: item, children: []}
                res.data.map(({country, city}) => {
                    if (arr[index].main === country) arr[index].children.push(city)
                })
            })
            setRegions(arr)
    }

    const getCategories = async () => {
        const res = await axios.get("https://project-the-leads.onrender.com/api/admin/settings/category", {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` }
        });
        let mainCategories = []
        res.data.map(({category}) => {
            if (!mainCategories.includes(category[0])) mainCategories.push(category[0])
        })
        let arr = []
        mainCategories.map((item, index) => {
            arr[index] = {main: item, children: []}
            res.data.map(({category}) => {
                if (arr[index].main === category[0]) arr[index].children = [...arr[index].children, `${category[1]} / ${category[2]}`]
            })
        })
        setCategories(arr)
    }

    useEffect(() => {
        getRegions();
        getCategories()
    }, [])

    const addRegion = () => {
        axios
            .post("https://project-the-leads.onrender.com/api/admin/settings/region", { country: region[0], city: region[1] }, {
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` }
            })
            .then(res => {
                setRegion(["", ""])
                getRegions()
            })
            .catch(err => console.log(err))
    }

    const deleteRegion = (ctry) => {
        const deleteRegionAsync = async () => {
            const res = await axios.get("https://project-the-leads.onrender.com/api/admin/settings/region", {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` }
        })
            res.data.map(({country, _id}) => {
                if (ctry === country) {
                    axios.delete(`https://project-the-leads.onrender.com/api/admin/settings/region/${_id}`,{
                        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` }
                    }).then(res => getRegions()).catch(err => console.log(err))
                }
            })
        }
        deleteRegionAsync()
    }

    const addCategory = () => {
        axios
            .post("https://project-the-leads.onrender.com/api/admin/settings/category", { category }, {
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` }
            })
            .then(res => {
                axios.get("https://project-the-leads.onrender.com/api/admin/settings/category", {
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` }
                }).then(res => {
                    setCategories(["", "", ""])
                    getCategories()
                })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const deleteCategory = (main) => {
        const deleteCategoryAsync = async () => {
            const res = await axios.get("https://project-the-leads.onrender.com/api/admin/settings/category", {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` }
        })
            res.data.map(({category, _id}) => {
                if (main === category[0]) {
                    axios.delete(`https://project-the-leads.onrender.com/api/admin/settings/category/${_id}`,{
                        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` }
                    }).then(res => getCategories()).catch(err => console.log(err))
                }
            })
        }
        deleteCategoryAsync()
    }

    return (
        <LayoutPage title="Настройки">
            <LayoutBlocks>
                <LayoutBlock title="Категории">
                    <div className="adminPanelSettings__categories">
                        <div className="adminPanelSettings__categories-block">
                            <h6 className="adminPanelSettings__categories-block-title">Общая</h6>
                            <div className="adminPanelSettings__categories-block-content">
                                <div className="adminPanelSettings__categories-block-content-subblock">
                                    <div className="adminPanelSettings__categories-block-content-subblock-title">
                                        Добавить категорию
                                    </div>
                                    <div className="adminPanelSettings__categories-block-content-subblock-add">
                                        <Input placeholder="Уровень 1" value={category[0]} setValue={(arg) => setCategory([arg, category[1], category[2]])}/>
                                        {category[0].length > 0 && <Input placeholder="Уровень 2" value={category[1]} setValue={(arg) => setCategory([category[0], arg, category[2]])}/>}
                                        {category[1].length > 0 && category[0].length > 0 && <Input placeholder="Уровень 3" value={category[2]} setValue={(arg) => setCategory([category[0], category[1], arg])}/>}
                                        <Button text="Добавить" click={addCategory}/>
                                    </div>
                                </div>
                                <div className="adminPanelSettings__categories-block-content-subblock">
                                    <div className="adminPanelSettings__categories-block-content-subblock-title">
                                        Добавленные
                                    </div>
                                    <List type="category" items={categories} clickDelete={(main) => deleteCategory(main)}/>
                                </div>
                            </div>
                        </div>
                        <div className="adminPanelSettings__categories-block">
                            <h6 className="adminPanelSettings__categories-block-title">Регион</h6>
                            <div className="adminPanelSettings__categories-block-content">
                                <div className="adminPanelSettings__categories-block-content-subblock">
                                    <div className="adminPanelSettings__categories-block-content-subblock-title">
                                        Добавить регион
                                    </div>
                                    <div className="adminPanelSettings__categories-block-content-subblock-add">
                                        <Input placeholder="Страна" value={region[0]} setValue={(arg) => setRegion([arg, region[1]])}/>
                                        {region[0].length > 0 && <Input placeholder="Область" value={region[1]} setValue={(arg) => setRegion([region[0],arg ])}/>}
                                        <Button text="Добавить" click={addRegion}/>
                                    </div>
                                </div>
                                <div className="adminPanelSettings__categories-block-content-subblock">
                                    <div className="adminPanelSettings__categories-block-content-subblock-title">
                                        Добавленные
                                    </div>
                                    <List type="category" items={regions} clickDelete={(ctry) => deleteRegion(ctry)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </LayoutBlock>
                <LayoutBlock title="Биллинг">
                    <div className="adminPanelSettings__billing">
                        <Input placeholder={"Название"} />
                        <Input placeholder={"Адрес API"} />
                        <Input placeholder={"Страница оплаты"} />
                    </div>
                </LayoutBlock>
                <LayoutBlock title="Коэффициенты">
                    <div className="adminPanelSettings__rate">
                        <div className="adminPanelSettings__rate-block">
                            <div className="adminPanelSettings__rate-block-title">Регион</div>
                            <List
                                items={[
                                    {
                                        title: "Москва",
                                        rate: "0.8",
                                    },
                                    {
                                        title: "Москва",
                                        rate: "0.8",
                                    },
                                    {
                                        title: "Москва",
                                        rate: "0.8",
                                    },
                                    {
                                        title: "Москва",
                                        rate: "0.8",
                                    },
                                    {
                                        title: "Москва",
                                        rate: "0.8",
                                    },
                                    {
                                        title: "Москва",
                                        rate: "0.8",
                                    },
                                    {
                                        title: "Москва",
                                        rate: "0.8",
                                    },
                                    {
                                        title: "Москва",
                                        rate: "0.8",
                                    },
                                    {
                                        title: "Москва",
                                        rate: "0.8",
                                    },
                                ]}
                            />
                        </div>
                        <div className="adminPanelSettings__rate-block">
                            <div className="adminPanelSettings__rate-block-title">Оценка</div>
                            <List
                                items={[
                                    {
                                        title: "Мелкая",
                                        rate: "0.8",
                                    },
                                    {
                                        title: "Крупная",
                                        rate: "0.8",
                                    },
                                    {
                                        title: "Крупная+",
                                        rate: "0.8",
                                    },
                                ]}
                            />
                        </div>
                        <div className="adminPanelSettings__rate-block">
                            <div className="adminPanelSettings__rate-block-title">Тип покупателя</div>
                            <List
                                items={[
                                    {
                                        title: "Частная компания",
                                        rate: "0.8",
                                    },
                                    {
                                        title: "Гос. организация",
                                        rate: "0.8",
                                    },
                                    {
                                        title: "Неизвестно",
                                        rate: "0.8",
                                    },
                                ]}
                            />
                        </div>
                        <div className="adminPanelSettings__rate-block">
                            <div className="adminPanelSettings__rate-block-title">Тип закупки</div>
                            <List
                                items={[
                                    {
                                        title: "Прямая",
                                        rate: "0.8",
                                    },
                                    {
                                        title: "Тендер",
                                        rate: "0.8",
                                    },
                                ]}
                            />
                        </div>
                        <div className="adminPanelSettings__rate-block">
                            <div className="adminPanelSettings__rate-block-title">Срочность</div>
                            <List
                                items={[
                                    {
                                        title: "Да",
                                        rate: "0.8",
                                    },
                                    {
                                        title: "Нет",
                                        rate: "0.8",
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </LayoutBlock>
                <LayoutBlock title="Базовая стоимость заявки, руб">
                    <div className="adminPanelSettings__inputs">
                        <Input placeholder={"Введите сумму"} type="number" />
                    </div>
                </LayoutBlock>
                <LayoutBlock title="Праздничные и выходные дни:">
                    <div className="adminPanelSettings__inputs">
                        <Input placeholder={"Выберите дни"} />
                    </div>
                </LayoutBlock>
                <LayoutBlock title="Электронная почта администратора:">
                    <div className="adminPanelSettings__inputs">
                        <Input placeholder={"Введите адрес"} />
                    </div>
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default AdminPanelSettings;
