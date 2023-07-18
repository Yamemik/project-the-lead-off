import LayoutPage from "../../../../components/Layouts/LayoutPage";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "../../../../components/Layouts/LayoutBlock";

import Input from "../../../../components/UI/Input";
import Button from "../../../../components/UI/Button";

import "./AdminPanelSettings.scss";
import List from "../../../../components/UI/List";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../../../utils/axios";
import DatePicker from "react-datepicker";
import { toast } from "react-hot-toast";

const AdminPanelSettings = () => {
    const [category, setCategory] = useState(["", "", ""]);
    const [categories, setCategories] = useState([]);
    const [region, setRegion] = useState(["", ""]);
    const [regions, setRegions] = useState([]);

    const [globalConfig, setGlobalConfig] = useState({
        baseOrderPrice: "",
        weekendDays: [null],
        adminEmail: "",
        rates: {
            regions: [],
            score: [0, 0, 0, 0],
            buyer: [0, 0, 0],
            type_buyer: [0, 0],
            quickly: [0, 0],
        },
    });

    const getRegions = async () => {
        const res = await axios.get("/api/admin/settings/region");
        let countries = [];
        res.data.map(({ country }) => {
            if (!countries.includes(country)) countries.push(country);
        });
        let arr = [];
        countries.map((item, index) => {
            arr[index] = { main: item, children: [] };
            res.data.map(({ country, city }) => {
                if (arr[index].main === country) arr[index].children.push(city);
            });
        });
        setRegions(arr);
    };

    const getCategories = async () => {
        const res = await axios.get("https://lothugrale.beget.app/api/admin/settings/category", {
            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` },
        });
        let mainCategories = [];
        res.data.map(({ category }) => {
            if (!mainCategories.includes(category[0])) mainCategories.push(category[0]);
        });
        let arr = [];
        mainCategories.map((item, index) => {
            arr[index] = { main: item, children: [] };
            res.data.map(({ category }) => {
                if (arr[index].main === category[0])
                    arr[index].children = [...arr[index].children, `${category[1]} / ${category[2]}`];
            });
        });
        setCategories(arr);
    };

    useEffect(() => {
        getRegions();
        getCategories();
        axios
            .get("/api/admin/settings/setting")
            .then(res => {
                setGlobalConfig(res.data[0].settings[0]);
                if (!res.data[0].settings[0]?.rates?.regions || res.data[0].settings[0]?.rates?.regions?.length === 0) {
                    axios
                        .get("/api/admin/settings/region")
                        .then(({ data }) => {
                            let arr = [];
                            data.map(({ city }) => (arr = [...arr, { title: city, rate: "0" }]));
                            setGlobalConfig({
                                ...res.data[0].settings[0],
                                rates: {
                                        regions: arr,
                                        score: [0, 0, 0, 0],
                                        buyer: [0, 0, 0],
                                        type_buyer: [0, 0],
                                        quickly: [0, 0],
                                },
                            });
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    }, []);

    const addRegion = () => {
        axios
            .post(
                "https://lothugrale.beget.app/api/admin/settings/region",
                { country: region[0], city: region[1] },
                {
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` },
                },
            )
            .then(res => {
                setRegion(["", ""]);
                getRegions();
            })
            .catch(err => console.log(err));
    };

    const editRegion = (oldCities, newCities, country) => {
        const getAndDeleteRegs = async () => {
            const {data} = await axios.get("/api/admin/settings/region");
            let idsForDelete = []
            await data.map(({_id, city}) => {
                if (oldCities.includes(city)) {
                    idsForDelete.push(_id)
                }
            })
            axios.delete("/api/admin/settings/region", {data: {
                regions: idsForDelete
            }})
        }
        getAndDeleteRegs()
        .then(_ => {
            newCities.map(city => axios.post("/api/admin/settings/region", {country: country, city: city}).then(_ => getRegions()).catch(err => console.log(err)))
        })
    }

    const deleteRegion = ctry => {
        const deleteRegionAsync = async () => {
            const res = await axios.get("https://lothugrale.beget.app/api/admin/settings/region", {
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` },
            });
            res.data.map(({ country, _id }) => {
                if (ctry === country) {
                    axios
                        .delete(`https://lothugrale.beget.app/api/admin/settings/region/${_id}`, {
                            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` },
                        })
                        .then(res => getRegions())
                        .catch(err => console.log(err));
                }
            });
        };
        deleteRegionAsync();
    };

    const addCategory = () => {
        axios
            .post(
                "https://lothugrale.beget.app/api/admin/settings/category",
                { category },
                {
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` },
                },
            )
            .then(res => {
                axios
                    .get("https://lothugrale.beget.app/api/admin/settings/category", {
                        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` },
                    })
                    .then(res => {
                        setCategories([]);
                        setCategory(["", "", ""]);
                        getCategories();
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    };

    const deleteCategory = main => {
        const deleteCategoryAsync = async () => {
            const res = await axios.get("https://lothugrale.beget.app/api/admin/settings/category", {
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` },
            });
            res.data.map(({ category, _id }) => {
                if (main === category[0]) {
                    axios
                        .delete(`https://lothugrale.beget.app/api/admin/settings/category/${_id}`, {
                            headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` },
                        })
                        .then(res => getCategories())
                        .catch(err => console.log(err));
                }
            });
        };
        deleteCategoryAsync();
    };

    const handleSaveSettings = () => {
        axios
            .patch("/api/admin/settings/setting", {
                settings: [
                    {
                        ...globalConfig
                    },
                ],
            })
            .then(_ => toast.success("Настройки сохранены"))
            .catch(_ => toast.error("Произошла ошибка"));
    };

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
                                        <Input
                                            placeholder="Уровень 1"
                                            value={category[0]}
                                            setValue={arg => setCategory([arg, category[1], category[2]])}
                                        />
                                        {category[0].length > 0 && (
                                            <Input
                                                placeholder="Уровень 2"
                                                value={category[1]}
                                                setValue={arg => setCategory([category[0], arg, category[2]])}
                                            />
                                        )}
                                        {category[1].length > 0 && category[0].length > 0 && (
                                            <Input
                                                placeholder="Уровень 3"
                                                value={category[2]}
                                                setValue={arg => setCategory([category[0], category[1], arg])}
                                            />
                                        )}
                                        <Button text="Добавить" click={addCategory} />
                                    </div>
                                </div>
                                <div className="adminPanelSettings__categories-block-content-subblock">
                                    <div className="adminPanelSettings__categories-block-content-subblock-title">
                                        Добавленные
                                    </div>
                                    <List
                                        type="category"
                                        items={categories}
                                        clickDelete={main => deleteCategory(main)}
                                    />
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
                                        <Input
                                            placeholder="Страна"
                                            value={region[0]}
                                            setValue={arg => setRegion([arg, region[1]])}
                                        />
                                        {region[0].length > 0 && (
                                            <Input
                                                placeholder="Область"
                                                value={region[1]}
                                                setValue={arg => setRegion([region[0], arg])}
                                            />
                                        )}
                                        <Button text="Добавить" click={addRegion} />
                                    </div>
                                </div>
                                <div className="adminPanelSettings__categories-block-content-subblock">
                                    <div className="adminPanelSettings__categories-block-content-subblock-title">
                                        Добавленные
                                    </div>
                                    <List type="category" items={regions} clickEdit={(oldEditItems, newEditItems, country) => editRegion(oldEditItems, newEditItems, country)} clickDelete={ctry => deleteRegion(ctry)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </LayoutBlock>
                {/* <LayoutBlock title="Биллинг">
                    <div className="adminPanelSettings__billing">
                        <Input placeholder={"Название"} />
                        <Input placeholder={"Адрес API"} />
                        <Input placeholder={"Страница оплаты"} />
                    </div>
                </LayoutBlock> */}
                <LayoutBlock title="Коэффициенты">
                    <div className="adminPanelSettings__rate">
                        <div className="adminPanelSettings__rate-block">
                            <div className="adminPanelSettings__rate-block-title">Регион</div>
                            <List
                                setValue={(newValue, index) => {
                                    let arr = [...globalConfig.rates.regions]
                                    arr[index].rate = newValue
                                    setGlobalConfig(prev => ({...prev, rates: { ...prev.rates,  regions: arr}}))
                                }}
                                items={
                                    globalConfig?.rates?.regions?.length > 0
                                        ? globalConfig?.rates?.regions
                                        : [{ title: "", rate: "" }]
                                }
                            />
                        </div>
                        <div className="adminPanelSettings__rate-block">
                            <div className="adminPanelSettings__rate-block-title">Оценка</div>
                            <List
                                setValue={(newValue, index) => {
                                    let arr = [...globalConfig.rates.score]
                                    arr[index] = newValue
                                    setGlobalConfig(prev => ({...prev, rates: { ...prev.rates,  score: arr}}))
                                }}
                                items={[
                                    {
                                        title: "Мелкая",
                                        rate: globalConfig?.rates?.score[0],
                                    },
                                    {
                                        title: "Средняя",
                                        rate: globalConfig?.rates?.score[1],
                                    },
                                    {
                                        title: "Крупная",
                                        rate: globalConfig?.rates?.score[2],
                                    },
                                    {
                                        title: "Крупная+",
                                        rate: globalConfig?.rates?.score[3],
                                    },
                                ]}
                            />
                        </div>
                        <div className="adminPanelSettings__rate-block">
                            <div className="adminPanelSettings__rate-block-title">Тип покупателя</div>
                            <List
                                setValue={(newValue, index) => {
                                    let arr = [...globalConfig.rates.buyer]
                                    arr[index] = newValue
                                    setGlobalConfig(prev => ({...prev, rates: { ...prev.rates,  buyer: arr}}))
                                }}
                                items={[
                                    {
                                        title: "Частная компания",
                                        rate: globalConfig?.rates?.buyer[0],
                                    },
                                    {
                                        title: "Гос. организация",
                                        rate: globalConfig?.rates?.buyer[1],
                                    },
                                    {
                                        title: "Неизвестно",
                                        rate: globalConfig?.rates?.buyer[2],
                                    },
                                ]}
                            />
                        </div>
                        <div className="adminPanelSettings__rate-block">
                            <div className="adminPanelSettings__rate-block-title">Тип закупки</div>
                            <List
                            setValue={(newValue, index) => {
                                    let arr = [...globalConfig.rates.type_buyer]
                                    arr[index] = newValue
                                    setGlobalConfig(prev => ({...prev, rates: { ...prev.rates,  type_buyer: arr}}))
                                }}
                                items={[
                                    {
                                        title: "Прямая",
                                        rate: globalConfig?.rates?.type_buyer[0],
                                    },
                                    {
                                        title: "Тендер",
                                        rate: globalConfig?.rates?.type_buyer[1],
                                    },
                                ]}
                            />
                        </div>
                        <div className="adminPanelSettings__rate-block">
                            <div className="adminPanelSettings__rate-block-title">Срочность</div>
                            <List
                            setValue={(newValue, index) => {
                                    let arr = [...globalConfig.rates.quickly]
                                    arr[index] = newValue
                                    setGlobalConfig(prev => ({...prev, rates: { ...prev.rates,  quickly: arr}}))
                                }}
                                items={[
                                    {
                                        title: "Да",
                                        rate: globalConfig?.rates?.quickly[0],
                                    },
                                    {
                                        title: "Нет",
                                        rate: globalConfig?.rates?.quickly[1],
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </LayoutBlock>
                <LayoutBlock title="Базовая стоимость заявки, руб">
                    <div className="adminPanelSettings__inputs">
                        <Input
                            placeholder={"Введите сумму"}
                            type="number"
                            value={globalConfig.baseOrderPrice}
                            setValue={text => setGlobalConfig(prev => ({ ...prev, baseOrderPrice: text }))}
                        />
                    </div>
                </LayoutBlock>
                <LayoutBlock title="Праздничные и выходные дни">
                    <div className="adminPanelSettings__dates">
                        {globalConfig.weekendDays.map((day, index) => (
                            <DatePicker
                                className="adminPanelSettings__dates-date"
                                minDate={new Date()}
                                placeholderText="Выберите день"
                                dateFormat="dd.MM.yyyy"
                                selected={
                                    globalConfig.weekendDays[index] ? new Date(globalConfig.weekendDays[index]) : null
                                }
                                onChange={date => {
                                    let arr = [...globalConfig.weekendDays];
                                    arr[index] = date;
                                    setGlobalConfig(prev => ({ ...prev, weekendDays: [...arr] }));
                                }}
                            />
                        ))}
                        {globalConfig.weekendDays[globalConfig.weekendDays.length - 1] && (
                            <img
                                className="adminPanelSettings__dates-plus"
                                src="/img/filters/plus.svg"
                                alt=""
                                onClick={() =>
                                    setGlobalConfig(prev => ({
                                        ...prev,
                                        weekendDays: [...globalConfig.weekendDays, null],
                                    }))
                                }
                            />
                        )}
                    </div>
                </LayoutBlock>
                <LayoutBlock title="Электронная почта администратора">
                    <div className="adminPanelSettings__inputs">
                        <Input
                            placeholder={"Введите адрес"}
                            value={globalConfig.adminEmail}
                            setValue={text => setGlobalConfig(prev => ({ ...prev, adminEmail: text }))}
                        />
                    </div>
                </LayoutBlock>
            </LayoutBlocks>
            <Button type="fill" text="Сохранить" click={handleSaveSettings} />
        </LayoutPage>
    );
};

export default AdminPanelSettings;
