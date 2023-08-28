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
import DatePicker from "react-datepicker";

const AdminPanelEditUser = () => {
	const params = useParams();

	const [currentCategories, setCurrentCategories] = useState([["", "", ""]]);
	const [currentRegions, setCurrentRegions] = useState([["", ""]]);
	const [organization, setOrganization] = useState();
	const [accessOpenOrders, setAccessOpenOrders] = useState(JSON.parse(localStorage.getItem("user")).access_to_open);

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
		balance: 0,
		credit: 0,
		date_credit: null,
	});
	const [newUserOldCredit, setNewUserOldCredit] = useState(0);

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
				setNewUserOldCredit(data.credit);
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
					credit: data.credit,
					date_credit: data.date_credit,
				}));
				setCurrentRegions(data.region);
				setCurrentCategories(data.business_line);
				for (const item of document.getElementsByClassName(
					"checkbox__input",
				)) {
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
						if (
							item.getAttribute("data-text") ===
							"частная организация"
						) {
							item.checked = true;
						}
					} else if (data.organization === "государственная") {
						if (
							item.getAttribute("data-text") ===
							"государственная организация"
						) {
							item.checked = true;
						}
					}
				}
			})
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
	}, [accessOpenOrders, organization, currentCategories, currentRegions]);

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
			credit: 0,
			date_credit: null,
		});
		setOrganization();
		setAccessOpenOrders(false);
		setCurrentRegions([["", ""]]);
		setCurrentCategories([["", "", ""]]);
		for (const elem of document.querySelectorAll(".checkbox__input")) {
			elem.checked = false;
		}
		setResentCurrentValueDropdown(true);
	};

	const handleDeleteUser = () => {
		axios
			.delete(`/api/admin/user/${params.id}`)
			.then(_ => {
				toast.success("Пользователь удален");
				setTimeout(() => {
					window.location.href = "/platform/admin-panel/users";
				}, 1200);
			})
			.catch(_ => toast.error("Ошибка при удалении пользователя"));
	};

	const validation = () => {
		if (
			newUser.fio === "" ||
			newUser.email === "" ||
			newUser.telephone === "" ||
			(newUser.region[0][0] === "" && newUser.region[0][1]) ||
			(newUser.business_line[0][0] === "" && newUser.business_line[0][1] === "" && newUser.business_line[0][2] === "")
		) {
			toast.error("Заполните обязательные поля")
			return false;
		} else if (
			newUser.email.length <= 3 || !newUser.email.includes("@")
		) {
			toast.error("Некорректная электронная почта")
			return false
		} else if (
			newUser.telephone.length <= 6
		) {
			toast.error("Некорректный номер телефона")
			return false
		} else if (
			newUser.fio.split(" ").length !== 3
		) {
			toast.error("Некорректное ФИО")
			return false
		} else if (
			newUser.region.some(innerArr => innerArr.some(str => str === ""))
		) {
			toast.error("Неккоректный регион")
			return false
		} else if (
			newUser.business_line.some(innerArr => innerArr[0] === "")
		) {
			toast.error("Неккоректное направление бизнеса")
			return false
		}

		return true;
	}

	const handleSaveUser = () => {
		if (validation()) {
			axios
				.patch(`/api/admin/user/${params.id}`, {
					...newUser,
					balance:
						Number(newUser.credit) > Number(newUserOldCredit)
							? Number(newUser.balance) +
							(Number(newUser.credit) - Number(newUserOldCredit))
							: newUser.balance,
				})
				.then(_ => {
					toast.success("Пользователь обновлен");
					for (const item of document.getElementsByClassName(
						"checkbox__input",
					)) {
						item.checked = false;
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
								credit: data.credit,
								date_credit: data.date_credit,
							}));
							setCurrentRegions(data.region);
							setCurrentCategories(data.business_line);
							for (const item of document.getElementsByClassName(
								"checkbox__input",
							)) {
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
									if (
										item.getAttribute("data-text") ===
										"частная организация"
									) {
										item.checked = true;
									}
								} else {
									if (
										item.getAttribute("data-text") ===
										"государственная организация"
									) {
										item.checked = true;
									}
								}
							}
						})
						.catch(err => console.log(err));
				})
				.catch(_ => toast.error("Ошибка при обновлении пользователя"));
		}
	};

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
							<div className="order__row-title"><span style={{ color: "red" }}>*</span> Регион:</div>
							<div className="order__row-text-businessLine">
								{currentRegions.map((item, index) => (
									<div class="order__row-text-businessLine-line">
										<DropdownList
											needValue={currentRegions[index][0]}
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
												arr[index][1] = "";
												setCurrentRegions(arr);
											}}
										/>
										{currentRegions[index][0] && (
											<DropdownList
												needValue={
													currentRegions[index][1]
												}
												curVal={
													resetCurrentValueDropdown
												}
												setCurVal={() =>
													setResentCurrentValueDropdown(
														false,
													)
												}
												values={[
													"Вся",
													...getRegion("city", index),
												]}
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
								<span style={{ color: "red" }}>*</span> Направления бизнеса:
							</div>
							<div className="order__row-text">
								<div class="order__row-text-businessLine">
									{currentCategories.map(
										(category, index) => (
											<div class="order__row-text-businessLine-line">
												<DropdownList
													needValue={
														currentCategories[
															index
														][0]
													}
													curVal={
														resetCurrentValueDropdown
													}
													itemClick={text => {
														let arr = [
															...currentCategories,
														];
														arr[index][0] = text;
														arr[index][1] = "";
														arr[index][2] = "";
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
														needValue={
															currentCategories[
																index
															][1]
														}
														curVal={
															resetCurrentValueDropdown
														}
														itemClick={text => {
															let arr = [
																...currentCategories,
															];
															arr[index][1] =
																text;
															arr[index][2] = "";
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
														needValue={
															currentCategories[
																index
															][2]
														}
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
									type={"number"}
									placeholder={"2000"}
									value={newUser.balance}
									setValue={arg =>
										setNewUser({ ...newUser, balance: arg })
									}
								/>
							</div>
						</div>
						<div className="order__row">
							<div className="order__row-title">Кредит:</div>
							<div className="order__row-text">
								<Input
									type={"number"}
									placeholder={"Сумма"}
									value={newUser.credit}
									setValue={arg =>
										setNewUser({ ...newUser, credit: arg })
									}
								/>
								<DatePicker
									className="order__row-text-datepicker"
									minDate={new Date().setDate(new Date().getDate() + 1)}
									placeholderText="Выберите срок окончания"
									dateFormat="dd.MM.yyyy"
									selected={
										newUser?.date_credit
											? new Date(newUser.date_credit)
											: newUser.date_credit
									}
									onChange={date =>
										setNewUser({
											...newUser,
											date_credit: date,
										})
									}
								/>
							</div>
						</div>
					</div>
				</LayoutBlock>
			</LayoutBlocks>
			<div className="order__buttons">
				<Button text="Сбросить" click={resetAddUser} />
				<Button text="Удалить пользователя" click={handleDeleteUser} />
				<Button type="fill" text="Сохранить" click={handleSaveUser} />
			</div>
		</LayoutPage>
	);
};

export default AdminPanelEditUser;
