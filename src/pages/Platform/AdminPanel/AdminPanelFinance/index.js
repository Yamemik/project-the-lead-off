import LayoutPage from "../../../../components/Layouts/LayoutPage";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "../../../../components/Layouts/LayoutBlock";
import DropdownList from "../../../../components/UI/DropdownList";
import Button from "../../../../components/UI/Button";

import "./AdminPanelAnalytic.scss";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import axios from "../../../../utils/axios";

import getDifferenceBetweenTwoDates from "../../../../utils/getDifferenceBetweenTwoDates";
import substractDaysFromCurrentDate from "../../../../utils/substractDaysFromCurrentDate";
import Report from "../../../../components/Report";

const AdminPanelFinance = () => {
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;

	const [dateRange2, setDateRange2] = useState([null, null]);
	const [startDate2, endDate2] = dateRange2;

	const [stat, setStat] = useState({
		users: {
			total_users: 0,
			total_users_balance: 0,
			total_purchases: 0,
			today_account_refill: 0,
			today_purchases_orders: 0,
		},
		orders: {
			total_active: 0,
			total_sale: 0,
			total_accepted: 0,
			total_rejected: 0,
			average_order_sum: 0,
			total_orders_sum: 0,
		},
	});

	const [users, setUsers] = useState([]);

    const [resetCurrentValueDropdown1, setResetCurrentValueDropdown1] = useState(false);
    const [resetCurrentValueDropdown2, setResetCurrentValueDropdown2] = useState(false);

	const [reportInput, setReportInput] = useState({
        users: {
            period: "Всё время",
            user: "Все пользователи"
        },
        categories: {
            depth: "Все категории",
            period: "Всё время",
            level_3: "",
            level_2: "",
            level_1: ""
        }
    });
	const [reportOutput, setReportOutput] = useState(null);

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		axios
			.get("/api/admin/user")
			.then(({ data }) => {
				setUsers(data);
				let total_users_balance = 0;
				data.map(user => (total_users_balance += user.balance));
				setStat(prev => ({
					...prev,
					users: {
						...prev.users,
						total_users: data.length,
						total_users_balance,
					},
				}));
			})
			.catch(err => console.log(err));
		axios
			.get("/api/admin/ukassa/getall")
			.then(({ data }) => {
				let total_purchases = 0;
				let today_account_refill = 0;
				let today_purchases_orders = 0;
				data.map(operation => {
					if (operation.status === "buy") total_purchases++;
					if (
						getDifferenceBetweenTwoDates(
							operation.createdAt,
							new Date(),
						) < 24
					) {
						if (operation.status === "succeeded")
							today_account_refill++;
						if (operation.status === "buy")
							today_purchases_orders++;
					}
				});
				setStat(prev => ({
					...prev,
					users: {
						...prev.users,
						total_purchases,
						today_account_refill,
						today_purchases_orders,
					},
				}));
			})
			.catch(err => console.log(err));
		axios
			.get("/api/admin/order")
			.then(({ data }) => {
				let total_active = 0;
				let total_sale = 0;
				let total_orders_sum = 0;
				data.map(order => {
					if (
						order?.user &&
						JSON.stringify(order?.user) !== "{}" &&
						order.is_buy
					)
						total_active++;
					if (order?.is_sale) total_sale++;
					total_orders_sum += Number(order.price);
				});
				setStat(prev => ({
					...prev,
					orders: {
						...prev.orders,
						total_active,
						total_sale,
						average_order_sum: total_orders_sum / data.length,
						total_orders_sum,
					},
				}));
			})
			.catch(err => console.log(err));
		axios
			.get("/api/admin/settings/category")
			.then(({ data }) => {
				data.map(({ category }) => {
					setCategories(prev => [...prev, category]);
				});
			})
			.catch(err => console.log(err));
	}, []);

	const getProductGroups = level => {
		let arr = [];
		if (level === 1) {
			categories.map(category => {
				if (!arr.includes(category[0])) arr.push(category[0]);
			});
		}
		if (level === 2) {
			categories.map(category => {
				if (
					!arr.includes(category[1]) &&
					category[0] === reportInput?.categories?.level_1
				)
					arr.push(category[1]);
			});
		}
		if (level === 3) {
			categories.map(category => {
				if (
					!arr.includes(category[2]) &&
					category[0] === reportInput?.categories?.level_1 &&
					category[1] === reportInput?.categories?.level_2
				)
					arr.push(category[2]);
			});
		}
		return arr;
	};

	const getReportUserData = ({ user, period }) => {
		let user_id = "";
		let date_begin = "";
		let date_end = new Date().toISOString();

		if (user === "Все пользователи") {
			user_id = "__all__";
		} else {
			users.map(({ fio, _id }) => {
				if (user === fio) user_id = _id;
			});
		}

		if (period === "Последние 24 часа") {
			date_begin = substractDaysFromCurrentDate(1);
		} else if (period === "Последняя неделя") {
			date_begin = substractDaysFromCurrentDate(7);
		} else if (period === "Последний месяц") {
			date_begin = substractDaysFromCurrentDate(30);
		} else if (period === "Всё время") {
			users.map(({ fio, _id }) => {
				if (user === fio) {
					date_begin = new Date(
						"2022-12-31T19:00:00.000Z",
					).toISOString();
				}
			});
		} else {
			date_begin = new Date(dateRange[0]).toISOString();
			date_end = new Date(dateRange[1]).toISOString();
		}

		return {
			user_id,
			date_begin,
			date_end,
		};
	};

	const getReportCategoryData = ({period, level_1, level_2, level_3, depth}) => {
        let nomeclature = "__all__";
        let date_begin = "";
        let date_end = new Date().toISOString();

        if (level_1 && level_1 !== "") {
            nomeclature = [level_1, "", ""]
            if (level_2) {
                nomeclature[1] = level_2
            }
            if (level_3) {
                nomeclature[2] = level_3
            }
        }

        if (period === "Последние 24 часа") {
            date_begin = substractDaysFromCurrentDate(1);
        } else if (period === "Последняя неделя") {
            date_begin = substractDaysFromCurrentDate(7);
        } else if (period === "Последний месяц") {
            date_begin = substractDaysFromCurrentDate(30);
        } else if (period === "Всё время") {
            date_begin = new Date(
                "2022-12-31T19:00:00.000Z",
            ).toISOString();
        } else {
            date_begin = new Date(dateRange2[0]).toISOString();
            date_end = new Date(dateRange2[1]).toISOString();
        }

        console.log({
            nomeclature,
            date_begin,
            date_end,
        });

        return {
            nomeclature,
            date_begin,
            date_end,
        };
    };

	return (
		<LayoutPage title="Аналитика">
			<LayoutBlocks addClass={"adminPanelAnalytic"}>
				<div className="adminPanelAnalytic__box">
					<LayoutBlock title={"Пользователи и покупки"}>
						<div className="adminPanelHome__rows">
							<div className="adminPanelHome__rows-row">
								Пользователей всего:{" "}
								<span>{stat.users.total_users}</span>
							</div>
							<div className="adminPanelHome__rows-row">
								Общий баланс всех пользователей:{" "}
								<span>
									{stat.users.total_users_balance} руб.
								</span>
							</div>
							<div className="adminPanelHome__rows-row">
								Покупок всего:{" "}
								<span>{stat.users.total_purchases}</span>
							</div>
							<div className="adminPanelHome__rows-row">
								Пополнений счета сегодня:{" "}
								<span>{stat.users.today_account_refill}</span>
							</div>
							<div className="adminPanelHome__rows-row">
								Покупок заявок сегодня:{" "}
								<span>{stat.users.today_purchases_orders}</span>
							</div>
						</div>
					</LayoutBlock>
					<LayoutBlock title={"Заявки"}>
						<div className="adminPanelHome__rows">
							<div className="adminPanelHome__rows-row">
								Активные / уцененные заявки:{" "}
								<span>{stat.orders.total_active}</span> /{" "}
								<span>{stat.orders.total_sale}</span>
							</div>
							{/* <div className="adminPanelHome__rows-row">
                                Принятые / отклоненные заявки: <span>{stat.orders.total_accepted}</span> /{" "}
                                <span>{stat.orders.total_rejected}</span>
                            </div> */}
							<div className="adminPanelHome__rows-row">
								Средняя стоимость заявки:{" "}
								<span>
									{stat.orders.average_order_sum.toFixed(2)}{" "}
									руб.
								</span>
							</div>
							{/* <div className="adminPanelHome__rows-row">
                                Заявок в работе: <span>{stat.orders.orders_in_work}</span>
                            </div> */}
							<div className="adminPanelHome__rows-row">
								Общая стоимость заявок:{" "}
								<span>
									{stat.orders.total_orders_sum.toFixed(2)}{" "}
									руб.
								</span>
							</div>
						</div>
					</LayoutBlock>
				</div>
				<LayoutBlock title={"Отчеты по пользователям"}>
					<div className="adminPanelAnalytic__dropdowns">
						<DropdownList
                            curVal={resetCurrentValueDropdown2}
                            setCurVal={() =>
                                setResetCurrentValueDropdown2(
                                    false,
                                )
                            }
							label={"Выберите пользователя:"}
							values={[
								"Все пользователи",
								...(() => {
									let users_names = [];
									users.map(user =>
										users_names.push(user.fio),
									);
									return users_names;
								})(),
							]}
							itemClick={value => {
								setReportInput(prev => ({
									...prev,
									users: {
										...prev.users,
										user: value,
									},
								}));
							}}
						/>
						{reportInput?.users?.user && (
							<DropdownList
                                curVal={resetCurrentValueDropdown2}
                                setCurVal={() =>
                                    setResetCurrentValueDropdown2(
                                        false,
                                    )
                                }
								label={"Выберите период"}
								values={[
									"Последние 24 часа",
									"Последняя неделя",
									"Последний месяц",
									"Всё время",
									"Другой период",
								]}
								itemClick={value => {
									setReportInput(prev => ({
										...prev,
										users: {
											...prev.users,
											period: value,
										},
									}));
								}}
							/>
						)}
						{reportInput?.users?.period === "Другой период" && (
							<DatePicker
								placeholderText="Выберите период"
								selectsRange={true}
								startDate={startDate}
								endDate={endDate}
								onChange={update => {
									setDateRange(update);
								}}
							/>
						)}
						<Button
							text="Сбросить поля"
							click={() => {
                                setResetCurrentValueDropdown2(true)
                                setDateRange([null, null])
                                setReportInput(prev => ({...prev, users: {
                                        period: "Всё время",
                                        user: "Все пользователи"
                                    },}))
                                let obj = {...reportOutput}
								delete obj.users
								setReportOutput(obj)
							}}
						/>
						<Button
							text="Сформировать отчет"
							type="fill"
							click={() => {
								axios
									.post(
										"/api/admin/report/user",
										getReportUserData(reportInput.users),
									)
									.then(({ data }) =>
										setReportOutput(prev => ({
											...prev,
											users: {
												...data,
												...getReportUserData(
													reportInput.users,
												),
												...reportInput?.users,
											},
										})),
									)
									.catch(err => console.log(err));
							}}
						/>
					</div>
					{reportOutput?.users && (
						<Report data={reportOutput.users} type={"users"}/>
					)}
				</LayoutBlock>
				<LayoutBlock title={"Отчеты по категориям"}>
					<div className="adminPanelAnalytic__dropdowns">
						<DropdownList
                            curVal={resetCurrentValueDropdown1}
                            setCurVal={() =>
                                setResetCurrentValueDropdown1(
                                    false,
                                )
                            }
							label={"Глубина поиска:"}
							values={[
								"Все категории",
								"1 уровень",
								"2 уровня",
								"3 уровня",
							]}
							itemClick={value =>
								setReportInput(prev => ({
									...prev,
									categories: {
										...prev.categories,
										depth: value,
                                        level_1: "",
                                        level_2: "",
                                        level_3: "",
									},
								}))
							}
						/>
						{reportInput?.categories?.depth &&
							reportInput?.categories?.depth !==
								"Все категории" && (
								<DropdownList
                                    needValue={reportInput?.categories?.level_1}
									label={"Уровень 1:"}
									values={getProductGroups(1)}
									itemClick={value =>
										setReportInput(prev => ({
											...prev,
											categories: {
												...prev.categories,
												level_1: value,
                                                level_2: "",
                                                level_3: ""
											},
										}))
									}
								/>
							)}
						{reportInput?.categories?.depth &&
							reportInput?.categories?.depth !==
								"Все категории" &&
							reportInput?.categories?.depth !== "1 уровень" && (
								<DropdownList
                                    needValue={reportInput?.categories?.level_2}
									label={"Уровень 2:"}
									values={getProductGroups(2)}
									itemClick={value =>
										setReportInput(prev => ({
											...prev,
											categories: {
												...prev.categories,
												level_2: value,
                                                level_3: ""
											},
										}))
									}
								/>
							)}
						{reportInput?.categories?.depth &&
							reportInput?.categories?.depth !==
								"Все категории" &&
							reportInput?.categories?.depth !== "1 уровень" &&
							reportInput?.categories?.depth !== "2 уровня" && (
								<DropdownList
                                    needValue={reportInput?.categories?.level_3}
									label={"Уровень 3:"}
									values={getProductGroups(3)}
									itemClick={value =>
										setReportInput(prev => ({
											...prev,
											categories: {
												...prev.categories,
												level_3: value,
											},
										}))
									}
								/>
							)}
						<DropdownList
                            curVal={resetCurrentValueDropdown1}
                            setCurVal={() =>
                                setResetCurrentValueDropdown1(
                                    false,
                                )
                            }
							label={"Выберите период:"}
							values={[
								"Последние 24 часа",
								"Последняя неделя",
								"Последний месяц",
								"Всё время",
								"Другой период",
							]}
							itemClick={value => {
								setReportInput(prev => ({
									...prev,
									categories: {
										...prev.categories,
										period: value,
									},
								}));
							}}
						/>
						{reportInput?.categories?.period ===
							"Другой период" && (
							<DatePicker
								placeholderText="Выберите период"
								selectsRange={true}
								startDate={startDate2}
								endDate={endDate2}
								onChange={update => {
									setDateRange2(update);
								}}
							/>
						)}

						<Button text="Сбросить поля" click={() => {
                            setResetCurrentValueDropdown1(true)
                            setDateRange2([null, null])
                            setReportInput(prev => ({...prev, categories: {
                                    depth: "Все категории",
                                    period: "Всё время",
                                    level_3: "",
                                    level_2: "",
                                    level_1: ""
                                }}))
							let obj = {...reportOutput}
							delete obj.categories
							setReportOutput(obj)
                        }}/>
						<Button
							text="Сформировать отчет"
							type="fill"
							click={() => {
								axios
									.post(
										"/api/admin/report/category",
										getReportCategoryData(reportInput.categories),
									)
									.then(({ data }) =>
										setReportOutput(prev => ({
											...prev,
											categories: {
												...data,
												...getReportCategoryData(
													reportInput.categories,
												),
												...reportInput?.categories,
											},
										})),
									)
									.catch(err => console.log(err));
							}}
						/>
					</div>
					{reportOutput?.categories && (
						<Report data={reportOutput.categories} type={"categories"} />
					)}
				</LayoutBlock>
			</LayoutBlocks>
		</LayoutPage>
	);
};

export default AdminPanelFinance;
