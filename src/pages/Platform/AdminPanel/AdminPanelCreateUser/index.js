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
	const [currentRegions, setCurrentRegions] = useState([["", ""]]);

	const [organization, setOrganization] = useState();
	const [accessOpenOrders, setAccessOpenOrders] = useState(false);

	const [regions, setRegions] = useState([]);
	const [categories, setCategories] = useState([["", "", ""]]);

	const [resetCurrentValueDropdown, setResentCurrentValueDropdown] =
		useState(false);

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
		axios
			.post(
				"https://lothugrale.beget.app/api/auth/reg",
				{
					...newUser,
					balance: Number(newUser.balance),
				},
				{
					headers: {
						Authorization: `Bearer ${
							JSON.parse(localStorage.getItem("user")).token
						}`,
					},
				},
			)
			.then(res => {
				toast.success("Пользователь добавлен");
				resetAddUser();
				console.log(res);
			})
			.catch(err => {
				if (
					err?.response?.data?.message?.includes(
						"Failed to register: MongoServerError: E11000 duplicate key error collection: test.users index: email_1 dup key",
					)
				) {
					toast.error("Неуникальный email");
				} else {
					toast.error("Ошибка добавления пользователя");
				}
			});
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
		});
		setOrganization();
		setAccessOpenOrders(false);
		setCurrentCategories([["", "", ""]]);
		setCurrentRegions([["", ""]]);
		for (const elem of document.querySelectorAll(".checkbox__input")) {
			elem.checked = false;
		}
		setResentCurrentValueDropdown(true);
	};

	const getRegion = (type, index) => {
		let arr = [];
		if (type === "country") {
			regions.map(({ country }) => {
				if (!arr.includes(country)) arr.push(country);
			});
		}
		if (type === "city") {
			regions.map(({ country, city }) => {
				if (country === currentRegions[index][0]) arr.push(city);
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

	useEffect(() => {
		axios
			.get("https://lothugrale.beget.app/api/admin/settings/region", {
				headers: {
					Authorization: `Bearer ${
						JSON.parse(localStorage.getItem("user")).token
					}`,
				},
			})
			.then(res => setRegions(res.data))
			.catch(err => console.log(err));
		axios
			.get("https://lothugrale.beget.app/api/admin/settings/category", {
				headers: {
					Authorization: `Bearer ${
						JSON.parse(localStorage.getItem("user")).token
					}`,
				},
			})
			.then(res => setCategories(res.data))
			.catch(err => console.log(err));
	}, []);

	useEffect(() => {
		setNewUser(prev => ({
			...prev,
			access_to_open: accessOpenOrders,
			region: [...currentRegions],
			organization,
			business_line: currentCategories,
		}));
	}, [currentRegions, accessOpenOrders, organization, currentCategories]);

	return (
		<LayoutPage title="Добавление пользователя">
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
									setValue={arg =>
										setNewUser({ ...newUser, fio: arg })
									}
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
									setValue={arg =>
										setNewUser({ ...newUser, email: arg })
									}
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
									setValue={arg =>
										setNewUser({
											...newUser,
											telephone: arg,
										})
									}
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
									click={arg =>
										setOrganization("государственная")
									}
								/>
							</div>
						</div>
						<div className="order__row">
							<div className="order__row-title">Регион:</div>
							<div className="order__row-text-businessLine">
								{currentRegions.map((item, index) => (
									<div className="order__row-text-businessLine-line">
										<DropdownList
											curVal={resetCurrentValueDropdown}
											setCurVal={() =>
												setResentCurrentValueDropdown(
													false,
												)
											}
											values={getRegion("country")}
											itemClick={arg => {
												let arr = [...currentRegions];
												arr[index][0] = arg;
												setCurrentRegions(arr);
											}}
										/>
										{currentRegions[index][0] && (
											<DropdownList
												curVal={
													resetCurrentValueDropdown
												}
												setCurVal={() =>
													setResentCurrentValueDropdown(
														false,
													)
												}
												values={getRegion(
													"city",
													index,
												)}
												itemClick={arg => {
													let arr = [
														...currentRegions,
													];
													arr[index][1] = arg;
													setCurrentRegions(arr);
												}}
											/>
										)}
										{currentRegions.at(-1)[0] &&
											currentRegions.at(-1)[1] &&
											index ===
												currentRegions.length - 1 && (
												<img
													className="order__row-text-add"
													src="/img/filters/plus.svg"
													alt=""
													onClick={() =>
														setCurrentRegions([
															...currentRegions,
															["", ""],
														])
													}
												/>
											)}
										{index !== 0 && (
											<img
												className="order__row-text-add"
												src="/img/UI/delete.svg"
												alt="Удалить"
												onClick={() => {
													let arr = [
														...currentRegions,
													];
													arr.splice(index, 1);
													setCurrentRegions(arr);
												}}
											/>
										)}
									</div>
								))}
							</div>
						</div>
						<div className="order__row">
							<div className="order__row-title">
								Направление бизнеса:
							</div>
							<div className="order__row-text">
								<div className="order__row-text-businessLine">
									{currentCategories.map(
										(category, index) => (
											<div className="order__row-text-businessLine-line">
												<DropdownList
													curVal={
														resetCurrentValueDropdown
													}
													itemClick={text => {
														let arr = [
															...currentCategories,
														];
														arr[index][0] = text;
														setCurrentCategories(
															arr,
														);
													}}
													values={getCategories(1)}
												/>
												{currentCategories[
													index
												][0] && (
													<DropdownList
														curVal={
															resetCurrentValueDropdown
														}
														itemClick={text => {
															let arr = [
																...currentCategories,
															];
															arr[index][1] =
																text;
															setCurrentCategories(
																arr,
															);
														}}
														values={getCategories(
															2,
															index,
														)}
													/>
												)}
												{currentCategories[
													index
												][1] && (
													<DropdownList
														curVal={
															resetCurrentValueDropdown
														}
														itemClick={text => {
															let arr = [
																...currentCategories,
															];
															arr[index][2] =
																text;
															setCurrentCategories(
																arr,
															);
														}}
														values={getCategories(
															3,
															index,
														)}
													/>
												)}
												{currentCategories.at(-1)[0] &&
													currentCategories.at(
														-1,
													)[1] &&
													currentCategories.at(
														-1,
													)[2] &&
													index ===
														currentCategories.length -
															1 && (
														<img
															className="order__row-text-add"
															src="/img/filters/plus.svg"
															alt=""
															onClick={() =>
																setCurrentCategories(
																	[
																		...currentCategories,
																		[
																			"",
																			"",
																			"",
																		],
																	],
																)
															}
														/>
													)}
												{index !== 0 && (
													<img
														className="order__row-text-add"
														src="/img/UI/delete.svg"
														alt="Удалить"
														onClick={() => {
															let arr = [
																...currentCategories,
															];
															arr.splice(
																index,
																1,
															);
															setCurrentCategories(
																arr,
															);
														}}
													/>
												)}
											</div>
										),
									)}
								</div>
							</div>
						</div>
						<div className="order__row">
							<div className="order__row-title">
								Доступ к закрытым заявкам:
							</div>
							<div className="order__row-text">
								<Checkbox
									text="Да"
									data_group="access"
									click={() => setAccessOpenOrders(true)}
								/>
								<Checkbox
									text="Нет"
									data_group="access"
									click={() => setAccessOpenOrders(false)}
								/>
							</div>
						</div>
						<div className="order__row">
							<div className="order__row-title">Баланс:</div>
							<div className="order__row-text">
								<Input
									placeholder={"2000"}
									value={newUser.balance}
									setValue={arg =>
										setNewUser({ ...newUser, balance: arg })
									}
								/>
							</div>
						</div>
					</div>
				</LayoutBlock>
			</LayoutBlocks>
			<div className="order__buttons">
				<Button text="Сбросить" click={resetAddUser} />
				<Button
					type="fill"
					text="Добавить пользователя"
					click={handleAddUser}
				/>
			</div>
		</LayoutPage>
	);
};

export default AdminPanelCreateUser;
