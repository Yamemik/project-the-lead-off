import LayoutPage from "../../../../components/Layouts/LayoutPage";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "../../../../components/Layouts/LayoutBlock";

import Input from "../../../../components/UI/Input";
import Button from "../../../../components/UI/Button";

import "./AdminPanelSettings.scss";
import List from "../../../../components/UI/List";
import { useEffect, useState } from "react";
import axios from "../../../../utils/axios";
import DatePicker from "react-datepicker";
import { toast } from "react-hot-toast";

const AdminPanelSettings = () => {
	const [category, setCategory] = useState(["", "", ""]);
	const [categories, setCategories] = useState([]);
	const [region, setRegion] = useState(["", ""]);
	const [regions, setRegions] = useState([]);

	const [advantages, setAdvantages] = useState([]);

	const [globalConfig, setGlobalConfig] = useState({
		weekendDays: [null],
		adminEmail: "",
		rates: {
			countries: [],
			regions: [],
			countRegions: [0, 0, 0],
			score: [0, 0, 0, 0],
			buyer: [0, 0],
			type_buyer: [0, 0],
			extra: [0, 0, 0, 0],
		},
		landing: {
			banner: {
				title: "CRM-система управления бизнес‑процессами в сфере продаж",
				text: "Вся информация для работы собрана в одном месте: наглядный список задач для сотрудников,прозрачность в работе для руководителей, полные отчеты для директоров",
				button: "Попробовать бесплатно",
			},
			numbers: {
				title: "Мы в цифрах",
				nums: [
					{
						number: "8000",
						opinion: "клиентов",
					},
					{
						number: "50000",
						opinion: "заявок",
					},
					{
						number: "5000",
						opinion: "сделок",
					},
				],
			},
			tarifs: [
				{
					title: "Демо",
					opinion:
						"Задачи и проекты для работы распределенных команд и взаимодействия отделов, без базы клиентов",
					advantages: [
						"До 200 пользователей",
						"Выделенные облачные ресурсы",
						"Автономность решения",
						"SLA 99,95%",
					],
					button: "Попробовать",
				},
				{
					title: "Демо",
					opinion:
						"Задачи и проекты для работы распределенных команд и взаимодействия отделов, без базы клиентов",
					advantages: [
						"До 200 пользователей",
						"Выделенные облачные ресурсы",
						"Автономность решения",
						"SLA 99,95%",
					],
					button: "Попробовать",
				},
				{
					title: "Демо",
					opinion:
						"Задачи и проекты для работы распределенных команд и взаимодействия отделов, без базы клиентов",
					advantages: [
						"До 200 пользователей",
						"Выделенные облачные ресурсы",
						"Автономность решения",
						"SLA 99,95%",
					],
					button: "Попробовать",
				},
			],
			feedbacks: [
				{
					fio: "Иванов Иван Иванович",
					post: "Генеральный директор компании «Юмисофт»",
					text: "Отличная программа для планирования, контроля и управления всеми задачами. Она помогает нам организовать внутренние процессы. В ней мы ставим задачи сотрудникам и контролируем сроки. Это удобно: теперь никто не забывает о своих задачах",
					img: "https://get.wallhere.com/photo/telephone-Person-beard-professional-conversation-businessman-business-executive-619479.jpg",
				},
				{
					fio: "Иванов Иван Иванович",
					post: "Генеральный директор компании «Юмисофт»",
					text: "Отличная программа для планирования, контроля и управления всеми задачами. Она помогает нам организовать внутренние процессы. В ней мы ставим задачи сотрудникам и контролируем сроки. Это удобно: теперь никто не забывает о своих задачах",
					img: "https://get.wallhere.com/photo/telephone-Person-beard-professional-conversation-businessman-business-executive-619479.jpg",
				},
				{
					fio: "Иванов Иван Иванович",
					post: "Генеральный директор компании «Юмисофт»",
					text: "Отличная программа для планирования, контроля и управления всеми задачами. Она помогает нам организовать внутренние процессы. В ней мы ставим задачи сотрудникам и контролируем сроки. Это удобно: теперь никто не забывает о своих задачах",
					img: "https://get.wallhere.com/photo/telephone-Person-beard-professional-conversation-businessman-business-executive-619479.jpg",
				},
				{
					fio: "Иванов Иван Иванович",
					post: "Генеральный директор компании «Юмисофт»",
					text: "Отличная программа для планирования, контроля и управления всеми задачами. Она помогает нам организовать внутренние процессы. В ней мы ставим задачи сотрудникам и контролируем сроки. Это удобно: теперь никто не забывает о своих задачах",
					img: "https://get.wallhere.com/photo/telephone-Person-beard-professional-conversation-businessman-business-executive-619479.jpg",
				},
				{
					fio: "Иванов Иван Иванович",
					post: "Генеральный директор компании «Юмисофт»",
					text: "Отличная программа для планирования, контроля и управления всеми задачами. Она помогает нам организовать внутренние процессы. В ней мы ставим задачи сотрудникам и контролируем сроки. Это удобно: теперь никто не забывает о своих задачах",
					img: "https://get.wallhere.com/photo/telephone-Person-beard-professional-conversation-businessman-business-executive-619479.jpg",
				},
				{
					fio: "Иванов Иван Иванович",
					post: "Генеральный директор компании «Юмисофт»",
					text: "Отличная программа для планирования, контроля и управления всеми задачами. Она помогает нам организовать внутренние процессы. В ней мы ставим задачи сотрудникам и контролируем сроки. Это удобно: теперь никто не забывает о своих задачах",
					img: "https://get.wallhere.com/photo/telephone-Person-beard-professional-conversation-businessman-business-executive-619479.jpg",
				},
			],
			footer: {
				preview: {
					title: "Получить демо доступ бесплатно",
					text: "Задачи и проекты для работы распределенных команд",
					button: "Получить",
				},
				main: {
					copyright: "© 2023 lead-off.net / Все права защищены",
					telephone: "+ 7 000 000 00 00",
					email: "info@lead-off.net",
					map: "Москва ул. Садовая, 450, офис 10",
					license: "Текст лицензии",
					offert: "Текст офферты",
					politic: "Текст политики",
				},
			},
		},
	});

	const getRegions = async () => {
		const res = await axios.get("/api/admin/settings/region");
		let countries = [];
		await res.data.map(({ country }) => {
			if (!countries.includes(country)) countries.push(country);
		});
		let arr = [];
		countries.map((item, index) => {
			arr[index] = { main: item, children: [] };
			res.data.map(({ country, city }) => {
				if (arr[index].main === country) arr[index].children.push(city);
			});
		});
		return arr.sort((a, b) => a.main.localeCompare(b.main));
	};

	const getCategories = async () => {
		const res = await axios.get("/api/admin/settings/category");
		let mainCategories = [];
		await res.data.map(({ category }) => {
			if (!mainCategories.includes(category[0]))
				mainCategories.push(category[0]);
		});
		let arr = [];
		mainCategories.map((item, index) => {
			arr[index] = { main: item, children: [], base_price: 0 };
			res.data.map(({ category, basePrice }) => {
				if (arr[index].main === category[0])
					if (category[1] === "" && category[2] === "") {
						arr[index] = {
							...arr[index],
							children: [...arr[index].children, `— / —`],
							base_price: basePrice,
						};
					} else if (category[2] === "") {
						arr[index] = {
							...arr[index],
							children: [
								...arr[index].children,
								`${category[1]} / —`,
							],
							base_price: basePrice,
						};
					} else {
						arr[index] = {
							...arr[index],
							children: [
								...arr[index].children,
								`${category[1]} / ${category[2]}`,
							],
							base_price: basePrice,
						};
					}
			});
		});
		setCategories(arr.sort((a, b) => a.main.localeCompare(b.main)));
	};

	useEffect(() => {
		getCategories();
		getRegions().then(regions => {
			setRegions(regions);
			axios
				.get("/api/admin/settings/setting")
				.then(res => {
					let cfg = res.data[0].settings[0];
					setGlobalConfig(cfg);

					let all_cities = regions.reduce((acc, obj) => {
						return acc.concat(obj.children);
					}, []);

					let all_countries = regions.reduce((acc, obj) => {
						return acc.concat(obj.main);
					}, []);

					let all_cities_in_cfg = cfg.rates.regions.reduce(
						(acc, obj) => {
							return acc.concat(obj.title);
						},
						[],
					);

					let all_countries_in_cfg = cfg.rates.countries.reduce(
						(acc, obj) => {
							return acc.concat(obj.title);
						},
						[],
					);

					let new_cities_for_cfg = [];
					all_cities.map(city => {
						if (!all_cities_in_cfg.includes(city)) {
							new_cities_for_cfg.push({ title: city, rate: "0" });
						}
					});

					let new_countries_for_cfg = [];
					all_countries.map(country => {
						if (!all_countries_in_cfg.includes(country)) {
							new_countries_for_cfg.push({
								title: country,
								rate: "0",
							});
						}
					});

					new_cities_for_cfg.map(item =>
						setGlobalConfig(prev => ({
							...prev,
							rates: {
								...prev.rates,
								regions: [...prev.rates.regions, item],
							},
						})),
					);

					new_countries_for_cfg.map(item =>
						setGlobalConfig(prev => ({
							...prev,
							rates: {
								...prev.rates,
								countries: [...prev.rates.countries, item],
							},
						})),
					);
				})
				.catch(err => console.log(err));
		});
		axios
			.get("/api/admin/settings/about")
			.then(({ data }) => setAdvantages(data[0].privilege))
			.catch(err => console.log(err));
	}, []);

	const addRegion = () => {
		axios
			.post("/api/admin/settings/region", {
				country: region[0],
				city: region[1],
			})
			.then(_ => {
				setRegion(["", ""]);
				getRegions().then(res => setRegions(res));
			})
			.catch(err => console.log(err));
	};

	const editRegion = (oldCities, newCities, country) => {
		const getAndDeleteRegs = async () => {
			const { data } = await axios.get("/api/admin/settings/region");
			let idsForDelete = [];
			await data.map(({ _id, city }) => {
				if (oldCities.includes(city)) {
					idsForDelete.push(_id);
				}
			});
			axios.delete("/api/admin/settings/region", {
				data: {
					regions: idsForDelete,
				},
			});
		};
		getAndDeleteRegs().then(_ => {
			newCities.map(city =>
				axios
					.post("/api/admin/settings/region", {
						country: country,
						city: city,
					})
					.then(_ => getRegions().then(res => setRegions(res)))
					.catch(err => console.log(err)),
			);
		});
	};

	const deleteRegion = ctry => {
		const deleteRegionAsync = async () => {
			const res = await axios.get(
				"https://lothugrale.beget.app/api/admin/settings/region",
				{
					headers: {
						Authorization: `Bearer ${
							JSON.parse(localStorage.getItem("user")).token
						}`,
					},
				},
			);
			res.data.map(({ country, _id }) => {
				if (ctry === country) {
					axios
						.delete(
							`https://lothugrale.beget.app/api/admin/settings/region/${_id}`,
							{
								headers: {
									Authorization: `Bearer ${
										JSON.parse(localStorage.getItem("user"))
											.token
									}`,
								},
							},
						)
						.then(res => getRegions().then(res => setRegions(res)))
						.catch(err => console.log(err));
				}
			});
		};
		deleteRegionAsync();
	};

	const addCategory = () => {
		const getCategory = () => {
			return category.map(str => (str === "" ? "—" : str));
		};
		axios
			.post("/api/admin/settings/category", {
				category: getCategory(),
				base_price: (() => {
					let val = 0;
					categories.map(({ main, base_price }) => {
						if (main === category[0]) {
							val = base_price;
						}
					});
					return val;
				})(),
			})
			.then(_ => {
				setCategories([]);
				setCategory(["", "", ""]);
				getCategories();
			})
			.catch(err => console.log(err));
	};

	const editCategory = (oldChilds, newChilds, main, newBasePrice) => {
		console.log({ oldChilds, newChilds });
		const getAndDeleteCategories = async () => {
			const { data } = await axios.get("/api/admin/settings/category");
			let idsForDelete = [];
			await data.map(({ _id, category }) => {
				oldChilds.map(oldChild => {
					/*if (category[2] === oldChild.split("/")[1].trim()) {
						idsForDelete.push(_id);
					}*/
					console.log({
						cats: [category[1], category[2]],
						oldChild: [
							oldChild.split("/")[0].trim(),
							oldChild.split("/")[1].trim(),
						],
					});
					if (
						category[1].trim() === oldChild.split("/")[0].trim() &&
						category[2].trim() === oldChild.split("/")[1].trim()
					) {
						idsForDelete.push(_id);
					}
				});
			});
			axios.delete("/api/admin/settings/category", {
				data: {
					categories: idsForDelete,
				},
			});
		};
		getAndDeleteCategories().then(_ => {
			newChilds.map(newChild =>
				axios
					.post("/api/admin/settings/category", {
						category: [
							main,
							newChild.split("/")[0].trim(),
							newChild.split("/")[1].trim(),
						],
						base_price: newBasePrice,
					})
					.then(_ => getCategories())
					.catch(err => console.log(err)),
			);
		});
	};

	const deleteCategory = async main => {
		const res = await axios.get("/api/admin/settings/category");
		await res.data.map(({ category, _id }) => {
			if (main === category[0]) {
				axios
					.delete(`/api/admin/settings/category/${_id}`)
					.then(_ => getCategories())
					.catch(err => console.log(err));
			}
		});
	};

	const handleSaveSettings = () => {
		axios
			.patch("/api/admin/settings/setting", {
				settings: [
					{
						...globalConfig,
					},
				],
			})
			.then(_ => toast.success("Настройки сохранены"))
			.catch(_ => toast.error("Произошла ошибка"));
		axios
			.patch("/api/admin/settings/about", {
				privilege: [...advantages],
			})
			.catch(err => console.log(err));
	};

	return (
		<LayoutPage title="Настройки">
			<LayoutBlocks>
				<LayoutBlock title="Категории">
					<div className="adminPanelSettings__categories">
						<div className="adminPanelSettings__categories-block">
							<h6 className="adminPanelSettings__categories-block-title">
								Общая
							</h6>
							<div className="adminPanelSettings__categories-block-content">
								<div className="adminPanelSettings__categories-block-content-subblock">
									<div className="adminPanelSettings__categories-block-content-subblock-title">
										Добавить категорию
									</div>
									<div className="adminPanelSettings__categories-block-content-subblock-add">
										<Input
											placeholder="Уровень 1"
											value={category[0]}
											setValue={arg =>
												setCategory([
													arg,
													category[1],
													category[2],
												])
											}
										/>
										{category[0].length > 0 && (
											<Input
												placeholder="Уровень 2"
												value={category[1]}
												setValue={arg =>
													setCategory([
														category[0],
														arg,
														category[2],
													])
												}
											/>
										)}
										{category[1].length > 0 &&
											category[0].length > 0 && (
												<Input
													placeholder="Уровень 3"
													value={category[2]}
													setValue={arg =>
														setCategory([
															category[0],
															category[1],
															arg,
														])
													}
												/>
											)}
										{category[0].length > 0 && (
											<Button
												text="Добавить"
												click={addCategory}
											/>
										)}
									</div>
								</div>
								<div className="adminPanelSettings__categories-block-content-subblock">
									<div className="adminPanelSettings__categories-block-content-subblock-title">
										Добавленные
									</div>
									<List
										type="category"
										items={categories}
										clickDelete={main =>
											deleteCategory(main)
										}
										clickEdit={(
											oldChilds,
											newChilds,
											main,
											newBasePrice,
										) =>
											editCategory(
												oldChilds,
												newChilds,
												main,
												newBasePrice,
											)
										}
										addBasePrice
									/>
								</div>
							</div>
						</div>
						<div className="adminPanelSettings__categories-block">
							<h6 className="adminPanelSettings__categories-block-title">
								Регион
							</h6>
							<div className="adminPanelSettings__categories-block-content">
								<div className="adminPanelSettings__categories-block-content-subblock">
									<div className="adminPanelSettings__categories-block-content-subblock-title">
										Добавить регион
									</div>
									<div className="adminPanelSettings__categories-block-content-subblock-add">
										<Input
											placeholder="Страна"
											value={region[0]}
											setValue={arg =>
												setRegion([arg, region[1]])
											}
										/>
										{region[0].length > 0 && (
											<Input
												placeholder="Область"
												value={region[1]}
												setValue={arg =>
													setRegion([region[0], arg])
												}
											/>
										)}
										{region[1].length > 0 &&
											region[0].length > 0 && (
												<Button
													text="Добавить"
													click={addRegion}
												/>
											)}
									</div>
								</div>
								<div className="adminPanelSettings__categories-block-content-subblock">
									<div className="adminPanelSettings__categories-block-content-subblock-title">
										Добавленные
									</div>
									<List
										type="category"
										items={regions}
										clickEdit={(
											oldEditItems,
											newEditItems,
											country,
										) =>
											editRegion(
												oldEditItems,
												newEditItems,
												country,
											)
										}
										clickDelete={ctry => deleteRegion(ctry)}
									/>
								</div>
							</div>
						</div>
					</div>
				</LayoutBlock>
				<LayoutBlock title="Коэффициенты">
					<div className="adminPanelSettings__rate">
						<div className="adminPanelSettings__rate-block">
							<div className="adminPanelSettings__rate-block-title">
								Страна
							</div>
							<List
								setValue={(newValue, index) => {
									let arr = [
										...globalConfig.rates.countries.filter(
											({ title }) => {
												let flag = false;
												regions.map(({ main }) => {
													if (main.includes(title)) {
														flag = true;
													}
												});
												return flag;
											},
										),
									];
									arr[index].rate = newValue;
									setGlobalConfig(prev => ({
										...prev,
										rates: {
											...prev.rates,
											countries: arr,
										},
									}));
								}}
								items={
									globalConfig?.rates?.countries?.length > 0
										? globalConfig?.rates?.countries.filter(
												({ title }) => {
													let flag = false;
													regions.map(({ main }) => {
														if (
															main.includes(title)
														) {
															flag = true;
														}
													});
													return flag;
												},
										  )
										: [{ title: "", rate: "" }]
								}
							/>
						</div>
						<div className="adminPanelSettings__rate-block">
							<div className="adminPanelSettings__rate-block-title">
								Регион
							</div>
							<List
								setValue={(newValue, index) => {
									let arr = [
										...globalConfig.rates.regions.filter(
											({ title }) => {
												let flag = false;
												regions.map(({ children }) => {
													if (
														children.includes(title)
													) {
														flag = true;
													}
												});
												return flag;
											},
										),
									];
									arr[index].rate = newValue;
									setGlobalConfig(prev => ({
										...prev,
										rates: { ...prev.rates, regions: arr },
									}));
								}}
								items={
									globalConfig?.rates?.regions?.length > 0
										? globalConfig?.rates?.regions.filter(
												({ title }) => {
													let flag = false;
													regions.map(
														({ children }) => {
															if (
																children.includes(
																	title,
																)
															) {
																flag = true;
															}
														},
													);
													return flag;
												},
										  )
										: [{ title: "", rate: "" }]
								}
							/>
						</div>
						<div className="adminPanelSettings__rate-block">
							<div className="adminPanelSettings__rate-block-title">
								Кол-во регионов
							</div>
							<List
								setValue={(newValue, index) => {
									let arr = [
										...globalConfig.rates.countRegions,
									];
									arr[index] = newValue;
									setGlobalConfig(prev => ({
										...prev,
										rates: {
											...prev.rates,
											countRegions: arr,
										},
									}));
								}}
								items={[
									{
										title: "Один",
										rate: globalConfig?.rates
											?.countRegions[0],
									},
									{
										title: "Два",
										rate: globalConfig?.rates
											?.countRegions[1],
									},
									{
										title: "Три и более",
										rate: globalConfig?.rates
											?.countRegions[2],
									},
								]}
							/>
						</div>
						<div className="adminPanelSettings__rate-block">
							<div className="adminPanelSettings__rate-block-title">
								Оценка
							</div>
							<List
								setValue={(newValue, index) => {
									let arr = [...globalConfig.rates.score];
									arr[index] = newValue;
									setGlobalConfig(prev => ({
										...prev,
										rates: { ...prev.rates, score: arr },
									}));
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
							<div className="adminPanelSettings__rate-block-title">
								Тип покупателя
							</div>
							<List
								setValue={(newValue, index) => {
									let arr = [...globalConfig.rates.buyer];
									arr[index] = newValue;
									setGlobalConfig(prev => ({
										...prev,
										rates: { ...prev.rates, buyer: arr },
									}));
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
								]}
							/>
						</div>
						<div className="adminPanelSettings__rate-block">
							<div className="adminPanelSettings__rate-block-title">
								Тип закупки
							</div>
							<List
								setValue={(newValue, index) => {
									let arr = [
										...globalConfig.rates.type_buyer,
									];
									arr[index] = newValue;
									setGlobalConfig(prev => ({
										...prev,
										rates: {
											...prev.rates,
											type_buyer: arr,
										},
									}));
								}}
								items={[
									{
										title: "Прямая",
										rate: globalConfig?.rates
											?.type_buyer[0],
									},
									{
										title: "Тендер",
										rate: globalConfig?.rates
											?.type_buyer[1],
									},
								]}
							/>
						</div>
						<div className="adminPanelSettings__rate-block">
							<div className="adminPanelSettings__rate-block-title">
								Дополнительно
							</div>
							<List
								setValue={(newValue, index) => {
									let arr = [...globalConfig.rates.extra];
									arr[index] = newValue;
									setGlobalConfig(prev => ({
										...prev,
										rates: { ...prev.rates, extra: arr },
									}));
								}}
								items={[
									{
										title: "Срочная",
										rate: globalConfig?.rates?.extra[0],
									},
									{
										title: "Закрытая",
										rate: globalConfig?.rates?.extra[1],
									},
									{
										title: "Уцененная",
										rate: globalConfig?.rates?.extra[2],
									},
									{
										title: "Горящая",
										rate: globalConfig?.rates?.extra[3],
									},
								]}
							/>
						</div>
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
									globalConfig.weekendDays[index]
										? new Date(
												globalConfig.weekendDays[index],
										  )
										: null
								}
								onChange={date => {
									let arr = [...globalConfig.weekendDays];
									arr[index] = date;
									setGlobalConfig(prev => ({
										...prev,
										weekendDays: [...arr],
									}));
								}}
							/>
						))}
						{globalConfig.weekendDays[
							globalConfig.weekendDays.length - 1
						] && (
							<img
								className="adminPanelSettings__dates-plus"
								src="/img/filters/plus.svg"
								alt=""
								onClick={() =>
									setGlobalConfig(prev => ({
										...prev,
										weekendDays: [
											...globalConfig.weekendDays,
											null,
										],
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
							setValue={text =>
								setGlobalConfig(prev => ({
									...prev,
									adminEmail: text,
								}))
							}
						/>
					</div>
				</LayoutBlock>
				<LayoutBlock title="Управление лендингом">
					<div className="adminPanelSettings__landing">
						<div className="adminPanelSettings__landing-item">
							<h6 className="adminPanelSettings__landing-item-title">
								[ Баннер ]
							</h6>
							<div className="adminPanelSettings__landing-item-banner">
								<Input
									placeholder={"Заголовок"}
									value={globalConfig.landing.banner.title}
									setValue={value =>
										setGlobalConfig(prev => ({
											...prev,
											landing: {
												...prev.landing,
												banner: {
													...prev.landing.banner,
													title: value,
												},
											},
										}))
									}
								/>
								<textarea
									placeholder={"Текст"}
									value={globalConfig.landing.banner.text}
									onChange={e =>
										setGlobalConfig(prev => ({
											...prev,
											landing: {
												...prev.landing,
												banner: {
													...prev.landing.banner,
													text: e.target.value,
												},
											},
										}))
									}
								/>
								<Input
									placeholder={"Кнопка"}
									value={globalConfig.landing.banner.button}
									setValue={value =>
										setGlobalConfig(prev => ({
											...prev,
											landing: {
												...prev.landing,
												banner: {
													...prev.landing.banner,
													button: value,
												},
											},
										}))
									}
								/>
							</div>
						</div>
						<div className="adminPanelSettings__landing-item">
							<h6 className="adminPanelSettings__landing-item-title">
								[ Преимущества ]
							</h6>
							<div className="adminPanelSettings__landing-item-advantages">
								{advantages.map(({ title, text }, index) => (
									<div className="adminPanelSettings__landing-item-advantages-advantage">
										<h6 className="adminPanelSettings__landing-item-advantages-advantage-number">
											#{index + 1}
										</h6>
										<Input
											placeholder={"Заголовок"}
											value={title}
											setValue={val => {
												let arr = [...advantages];
												arr[index].title = val;
												setAdvantages(arr);
											}}
										/>
										<textarea
											placeholder={"Текст"}
											value={text}
											onChange={e => {
												let arr = [...advantages];
												arr[index].text =
													e.target.value;
												setAdvantages(arr);
											}}
										/>
									</div>
								))}
							</div>
						</div>
						<div className="adminPanelSettings__landing-item">
							<h6 className="adminPanelSettings__landing-item-title">
								[ Цифры ]
							</h6>
							<div className="adminPanelSettings__landing-item-numbers">
								<Input
									placeholder={"Заголовок"}
									value={globalConfig.landing.numbers.title}
									setValue={value =>
										setGlobalConfig(prev => ({
											...prev,
											landing: {
												...prev.landing,
												numbers: {
													...prev.landing.numbers,
													title: value,
												},
											},
										}))
									}
								/>
								<div className="adminPanelSettings__landing-item-numbers-box">
									<div className="adminPanelSettings__landing-item-numbers-box-item">
										<h6>#1</h6>
										<Input
											placeholder={"Число"}
											value={
												globalConfig.landing.numbers
													.nums[0].number
											}
											setValue={value => {
												let arr = [
													...globalConfig.landing
														.numbers.nums,
												];
												arr[0].number = value;
												setGlobalConfig(prev => ({
													...globalConfig,
													landing: {
														...globalConfig.landing,
														numbers: {
															...globalConfig
																.landing
																.numbers,
															nums: [...arr],
														},
													},
												}));
											}}
										/>
										<Input
											placeholder={"Описание"}
											value={
												globalConfig.landing.numbers
													.nums[0].opinion
											}
											setValue={value => {
												let arr = [
													...globalConfig.landing
														.numbers.nums,
												];
												arr[0].opinion = value;
												setGlobalConfig(prev => ({
													...globalConfig,
													landing: {
														...globalConfig.landing,
														numbers: {
															...globalConfig
																.landing
																.numbers,
															nums: [...arr],
														},
													},
												}));
											}}
										/>
									</div>
									<div className="adminPanelSettings__landing-item-numbers-box-item">
										<h6>#2</h6>
										<Input
											placeholder={"Число"}
											value={
												globalConfig.landing.numbers
													.nums[1].number
											}
											setValue={value => {
												let arr = [
													...globalConfig.landing
														.numbers.nums,
												];
												arr[1].number = value;
												setGlobalConfig(prev => ({
													...globalConfig,
													landing: {
														...globalConfig.landing,
														numbers: {
															...globalConfig
																.landing
																.numbers,
															nums: [...arr],
														},
													},
												}));
											}}
										/>
										<Input
											placeholder={"Описание"}
											value={
												globalConfig.landing.numbers
													.nums[1].opinion
											}
											setValue={value => {
												let arr = [
													...globalConfig.landing
														.numbers.nums,
												];
												arr[1].opinion = value;
												setGlobalConfig(prev => ({
													...globalConfig,
													landing: {
														...globalConfig.landing,
														numbers: {
															...globalConfig
																.landing
																.numbers,
															nums: [...arr],
														},
													},
												}));
											}}
										/>
									</div>
									<div className="adminPanelSettings__landing-item-numbers-box-item">
										<h6>#3</h6>
										<Input
											placeholder={"Число"}
											value={
												globalConfig.landing.numbers
													.nums[2].number
											}
											setValue={value => {
												let arr = [
													...globalConfig.landing
														.numbers.nums,
												];
												arr[2].number = value;
												setGlobalConfig(prev => ({
													...globalConfig,
													landing: {
														...globalConfig.landing,
														numbers: {
															...globalConfig
																.landing
																.numbers,
															nums: [...arr],
														},
													},
												}));
											}}
										/>
										<Input
											placeholder={"Описание"}
											value={
												globalConfig.landing.numbers
													.nums[2].opinion
											}
											setValue={value => {
												let arr = [
													...globalConfig.landing
														.numbers.nums,
												];
												arr[2].opinion = value;
												setGlobalConfig(prev => ({
													...globalConfig,
													landing: {
														...globalConfig.landing,
														numbers: {
															...globalConfig
																.landing
																.numbers,
															nums: [...arr],
														},
													},
												}));
											}}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="adminPanelSettings__landing-item">
							<h6 className="adminPanelSettings__landing-item-title">
								[ Тарифы ]
							</h6>
							<div className="adminPanelSettings__landing-item-tarifs">
								<div className="adminPanelSettings__landing-item-tarifs-item">
									<h6>#1</h6>
									<Input
										placeholder={"Заголовок"}
										value={
											globalConfig.landing.tarifs[0].title
										}
										setValue={value => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[0].title = value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
									<textarea
										placeholder={"Текст"}
										value={
											globalConfig.landing.tarifs[0]
												.opinion
										}
										onChange={e => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[0].opinion = e.target.value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
									<Input
										placeholder={"Преимущество 1"}
										value={
											globalConfig.landing.tarifs[0]
												.advantages[0]
										}
										setValue={value => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[0].advantages[0] = value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
									<Input
										placeholder={"Преимущество 2"}
										value={
											globalConfig.landing.tarifs[0]
												.advantages[1]
										}
										setValue={value => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[0].advantages[1] = value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
									<Input
										placeholder={"Преимущество 3"}
										value={
											globalConfig.landing.tarifs[0]
												.advantages[2]
										}
										setValue={value => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[0].advantages[2] = value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
									<Input
										placeholder={"Преимущество 4"}
										value={
											globalConfig.landing.tarifs[0]
												.advantages[3]
										}
										setValue={value => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[0].advantages[3] = value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
									<Input
										placeholder={"Кнопка"}
										value={
											globalConfig.landing.tarifs[0]
												.button
										}
										setValue={value => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[0].button = value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
								</div>
								<div className="adminPanelSettings__landing-item-tarifs-item">
									<h6>#2</h6>
									<Input
										placeholder={"Заголовок"}
										value={
											globalConfig.landing.tarifs[1].title
										}
										setValue={value => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[1].title = value;
											setGlobalConfig({
												...globalConfig,
												landing: {
													...globalConfig.landing,
													tarifs: [...arr],
												},
											});
										}}
									/>
									<textarea
										placeholder={"Текст"}
										value={
											globalConfig.landing.tarifs[1]
												.opinion
										}
										onChange={e => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[1].opinion = e.target.value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
									<Input
										placeholder={"Преимущество 1"}
										value={
											globalConfig.landing.tarifs[1]
												.advantages[0]
										}
										setValue={value => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[1].advantages[0] = value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
									<Input
										placeholder={"Преимущество 2"}
										value={
											globalConfig.landing.tarifs[1]
												.advantages[1]
										}
										setValue={value => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[1].advantages[1] = value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
									<Input
										placeholder={"Преимущество 3"}
										value={
											globalConfig.landing.tarifs[1]
												.advantages[2]
										}
										setValue={value => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[1].advantages[2] = value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
									<Input
										placeholder={"Преимущество 4"}
										value={
											globalConfig.landing.tarifs[1]
												.advantages[3]
										}
										setValue={value => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[1].advantages[3] = value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
									<Input
										placeholder={"Кнопка"}
										value={
											globalConfig.landing.tarifs[1]
												.button
										}
										setValue={value => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[1].button = value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
								</div>
								<div className="adminPanelSettings__landing-item-tarifs-item">
									<h6>#3</h6>
									<Input
										placeholder={"Заголовок"}
										value={
											globalConfig.landing.tarifs[2].title
										}
										setValue={value => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[2].title = value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
									<textarea
										placeholder={"Текст"}
										value={
											globalConfig.landing.tarifs[2]
												.opinion
										}
										onChange={e => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[2].opinion = e.target.value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
									<Input
										placeholder={"Преимущество 1"}
										value={
											globalConfig.landing.tarifs[2]
												.advantages[0]
										}
										setValue={value => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[2].advantages[0] = value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
									<Input
										placeholder={"Преимущество 2"}
										value={
											globalConfig.landing.tarifs[2]
												.advantages[1]
										}
										setValue={value => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[2].advantages[1] = value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
									<Input
										placeholder={"Преимущество 3"}
										value={
											globalConfig.landing.tarifs[2]
												.advantages[2]
										}
										setValue={value => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[2].advantages[2] = value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
									<Input
										placeholder={"Преимущество 4"}
										value={
											globalConfig.landing.tarifs[2]
												.advantages[3]
										}
										setValue={value => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[2].advantages[3] = value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
									<Input
										placeholder={"Кнопка"}
										value={
											globalConfig.landing.tarifs[2]
												.button
										}
										setValue={value => {
											let arr = [
												...globalConfig.landing.tarifs,
											];
											arr[2].button = value;
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													tarifs: [...arr],
												},
											}));
										}}
									/>
								</div>
							</div>
						</div>
						<div className="adminPanelSettings__landing-item">
							<h6 className="adminPanelSettings__landing-item-title">
								[ Отзывы ]
							</h6>
							<div className="adminPanelSettings__landing-item-tarifs">
								{globalConfig.landing.feedbacks.map(
									(feedback, index) => (
										<div className="adminPanelSettings__landing-item-tarifs-item">
											<h6>#{index + 1}</h6>
											<Input
												placeholder={"ФИО"}
												value={
													globalConfig.landing
														.feedbacks[index].fio
												}
												setValue={value => {
													let arr = [
														...globalConfig.landing
															.feedbacks,
													];
													arr[index].fio = value;
													setGlobalConfig(prev => ({
														...prev,
														landing: {
															...prev.landing,
															feedbacks: [...arr],
														},
													}));
												}}
											/>
											<Input
												placeholder={"Должность"}
												value={
													globalConfig.landing
														.feedbacks[index].post
												}
												setValue={value => {
													let arr = [
														...globalConfig.landing
															.feedbacks,
													];
													arr[index].post = value;
													setGlobalConfig(prev => ({
														...prev,
														landing: {
															...prev.landing,
															feedbacks: [...arr],
														},
													}));
												}}
											/>
											<textarea
												placeholder={"Текст"}
												value={
													globalConfig.landing
														.feedbacks[index].text
												}
												onChange={e => {
													let arr = [
														...globalConfig.landing
															.feedbacks,
													];
													arr[index].text =
														e.target.value;
													setGlobalConfig(prev => ({
														...prev,
														landing: {
															...prev.landing,
															feedbacks: [...arr],
														},
													}));
												}}
											/>
											<Input
												placeholder={"Ссылка на фото"}
												value={
													globalConfig.landing
														.feedbacks[index].img
												}
												setValue={value => {
													let arr = [
														...globalConfig.landing
															.feedbacks,
													];
													arr[index].img = value;
													setGlobalConfig(prev => ({
														...prev,
														landing: {
															...prev.landing,
															feedbacks: [...arr],
														},
													}));
												}}
											/>
										</div>
									),
								)}
							</div>
						</div>
						<div className="adminPanelSettings__landing-item">
							<h6 className="adminPanelSettings__landing-item-title">
								[ Футер ]
							</h6>
							<div className="adminPanelSettings__landing-item-footer">
								<div className="adminPanelSettings__landing-item-footer-preview">
									<h6>Превью</h6>
									<Input
										placeholder={"Заголовок"}
										value={
											globalConfig.landing.footer.preview
												.title
										}
										setValue={value =>
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													footer: {
														...prev.landing.footer,
														preview: {
															...prev.landing
																.footer.preview,
															title: value,
														},
													},
												},
											}))
										}
									/>
									<Input
										placeholder={"Текст"}
										value={
											globalConfig.landing.footer.preview
												.text
										}
										setValue={value =>
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													footer: {
														...prev.landing.footer,
														preview: {
															...prev.landing
																.footer.preview,
															text: value,
														},
													},
												},
											}))
										}
									/>
									<Input
										placeholder={"Кнопка"}
										value={
											globalConfig.landing.footer.preview
												.button
										}
										setValue={value =>
											setGlobalConfig(prev => ({
												...prev,
												landing: {
													...prev.landing,
													footer: {
														...prev.landing.footer,
														preview: {
															...prev.landing
																.footer.preview,
															button: value,
														},
													},
												},
											}))
										}
									/>
								</div>
								<div className="adminPanelSettings__landing-item-footer-main">
									<h6>Остальное</h6>
									<div className="adminPanelSettings__landing-item-footer-main-littleRows">
										<Input
											placeholder={"Копирайт"}
											value={
												globalConfig.landing.footer.main
													.copyright
											}
											setValue={value =>
												setGlobalConfig(prev => ({
													...prev,
													landing: {
														...prev.landing,
														footer: {
															...prev.landing
																.footer,
															main: {
																...prev.landing
																	.footer
																	.main,
																copyright:
																	value,
															},
														},
													},
												}))
											}
										/>
										<Input
											placeholder={"Телефон"}
											value={
												globalConfig.landing.footer.main
													.telephone
											}
											setValue={value =>
												setGlobalConfig(prev => ({
													...prev,
													landing: {
														...prev.landing,
														footer: {
															...prev.landing
																.footer,
															main: {
																...prev.landing
																	.footer
																	.main,
																telephone:
																	value,
															},
														},
													},
												}))
											}
										/>
										<Input
											placeholder={"Почта"}
											value={
												globalConfig.landing.footer.main
													.email
											}
											setValue={value =>
												setGlobalConfig(prev => ({
													...prev,
													landing: {
														...prev.landing,
														footer: {
															...prev.landing
																.footer,
															main: {
																...prev.landing
																	.footer
																	.main,
																email: value,
															},
														},
													},
												}))
											}
										/>
										<Input
											placeholder={"Адрес"}
											value={
												globalConfig.landing.footer.main
													.map
											}
											setValue={value =>
												setGlobalConfig(prev => ({
													...prev,
													landing: {
														...prev.landing,
														footer: {
															...prev.landing
																.footer,
															main: {
																...prev.landing
																	.footer
																	.main,
																map: value,
															},
														},
													},
												}))
											}
										/>
									</div>
									<div className="adminPanelSettings__landing-item-footer-main-bigRows">
										<textarea
											placeholder={"Лицензия"}
											value={
												globalConfig.landing.footer.main
													.license
											}
											onChange={e =>
												setGlobalConfig(prev => ({
													...prev,
													landing: {
														...prev.landing,
														footer: {
															...prev.landing
																.footer,
															main: {
																...prev.landing
																	.footer
																	.main,
																license:
																	e.target
																		.value,
															},
														},
													},
												}))
											}
										/>
										<textarea
											placeholder={"Офферта"}
											value={
												globalConfig.landing.footer.main
													.offert
											}
											onChange={e =>
												setGlobalConfig(prev => ({
													...prev,
													landing: {
														...prev.landing,
														footer: {
															...prev.landing
																.footer,
															main: {
																...prev.landing
																	.footer
																	.main,
																offert: e.target
																	.value,
															},
														},
													},
												}))
											}
										/>
										<textarea
											placeholder={"Политика"}
											value={
												globalConfig.landing.footer.main
													.politic
											}
											onChange={e =>
												setGlobalConfig(prev => ({
													...prev,
													landing: {
														...prev.landing,
														footer: {
															...prev.landing
																.footer,
															main: {
																...prev.landing
																	.footer
																	.main,
																politic:
																	e.target
																		.value,
															},
														},
													},
												}))
											}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</LayoutBlock>
			</LayoutBlocks>
			<Button type="fill" text="Сохранить" click={handleSaveSettings} />
		</LayoutPage>
	);
};

export default AdminPanelSettings;
