import { useEffect, useState } from "react";

import Button from "../UI/Button";
import DropdownList from "../UI/DropdownList";
import Input from "../UI/Input";
import Checkbox from "../UI/Checkbox";

import "./Filters.scss";
import axios from "../../utils/axios";

const Filters = ({ filters, setFilters, is_suitable_page }) => {
	const [notAcceptedFilters, setNotAcceptedFilters] = useState({
		product_groups: [["", "", ""]],
		// удалил nomenclatures и categories
		countries: [""],
		regions: [""],
		scores: [""],
		priceAt: "",
		priceTo: "",
		buyer: [],
		purchase: [],
		type_order: [],
	});

	const [resetCurrentValueDropdown, setResentCurrentValueDropdown] =
		useState(false);

	const [categoriesState, setCategoriesState] = useState([]);
	const [regionsState, setRegionsState] = useState({
		countries: [],
		regions: [],
	});

	useEffect(() => {
		axios
			.get("/api/admin/settings/category")
			.then(({ data }) => {
				data.map(({ category }) => {
					if (is_suitable_page) {
						JSON.parse(
							localStorage.getItem("user"),
						).business_line.map(productGroup => {
							if (((productGroup[1] === "") || (productGroup[1] === "—")) && ((productGroup[2] === "") || (productGroup[2] === "—"))) {
								if (
									productGroup[0] === category[0]
								) {
									setCategoriesState(prev => [...prev, category]);
								}
							} else if ((productGroup[2] === "") || (productGroup[2] === "—")) {
								if (
									productGroup[0] === category[0] && productGroup[1] === category[1]
								) {
									setCategoriesState(prev => [...prev, category]);
								}
							} else {
								if (
									productGroup[0] === category[0] &&
									productGroup[1] === category[1] &&
									productGroup[2] === category[2]
								) {
									setCategoriesState(prev => [...prev, category]);
								}
							}
							/*if (
								productGroup[0] === category[0] &&
								productGroup[1] === category[1] &&
								productGroup[2] === category[2]
							) {
								setCategoriesState(prev => [...prev, category]);
							}*/
						});
					} else {
						setCategoriesState(prev => [...prev, category]);
					}
				});
			})
			.catch(err => console.log(err));
		axios
			.get("/api/admin/settings/region")
			.then(({ data }) => {
				data.map(({ country, city }) => {
					if (is_suitable_page) {
						JSON.parse(localStorage.getItem("user")).region.map(
							region => {
								if (region[0] === country) {
									setRegionsState(prev => ({
										...prev,
										countries: !prev.countries.includes(
											country,
										)
											? [...prev.countries, country]
											: [...prev.countries],
									}));
								}
								if (region[1] === city) {
									setRegionsState(prev => ({
										...prev,
										regions: !prev.regions.includes(city)
											? [...prev.regions, city]
											: [...prev.regions],
									}));
								}
							},
						);
					} else {
						setRegionsState(prev => ({
							countries: !prev.countries.includes(country)
								? [...prev.countries, country]
								: [...prev.countries],
							regions: !prev.regions.includes(city)
								? [...prev.regions, city]
								: [...prev.regions],
						}));
					}
				});
			})
			.catch(err => console.log(err));
	}, []);

	const changeCheckboxFilters = (current_data_text, enter_in_object) => {
		let old_values = [...notAcceptedFilters[enter_in_object]];
		if (notAcceptedFilters[enter_in_object].includes(current_data_text)) {
			old_values = old_values.filter(
				value => value !== current_data_text,
			);
			setNotAcceptedFilters({
				...notAcceptedFilters,
				[enter_in_object]: old_values,
			});
		} else {
			setNotAcceptedFilters({
				...notAcceptedFilters,
				[enter_in_object]: [
					...notAcceptedFilters[enter_in_object],
					current_data_text,
				],
			});
		}
	};

	const changeDropdownFilters = (text, index, enter_in_object) => {
		let old_values = [...notAcceptedFilters[enter_in_object]];
		old_values[index] = text;
		setNotAcceptedFilters({
			...notAcceptedFilters,
			[enter_in_object]: old_values,
		});
	};

	const changeProductGroup = (level, text, index) => {
		const old_values = [...notAcceptedFilters.product_groups];
		old_values[index][level - 1] = text;
        if (level === 1) {
            old_values[index][1] = ""
            old_values[index][2] = ""
        } else if (level === 2) {
            old_values[index][2] = ""
        }
		setNotAcceptedFilters({
			...notAcceptedFilters,
			product_groups: [...old_values],
		});
	};

	const addItemFilter = enter_in_object => {
		let new_arr = [...notAcceptedFilters[enter_in_object], ""];
		setNotAcceptedFilters({
			...notAcceptedFilters,
			[enter_in_object]: new_arr,
		});
	};

	const getProductGroups = (level, index) => {
		let arr = [];
		if (level === 1) {
			categoriesState.map(category => {
				if (!arr.includes(category[0])) arr.push(category[0]);
			});
		}
		if (level === 2) {
			categoriesState.map(category => {
				if (
					!arr.includes(category[1]) &&
					category[0] === notAcceptedFilters.product_groups[index][0]
				)
					arr.push(category[1]);
			});
		}
		if (level === 3) {
			categoriesState.map(category => {
				if (
					!arr.includes(category[2]) &&
					category[0] ===
						notAcceptedFilters.product_groups[index][0] &&
					category[1] === notAcceptedFilters.product_groups[index][1]
				)
					arr.push(category[2]);
			});
		}
		return arr;
	};

	return (
		<>
			{notAcceptedFilters && (
				<section className="filters">
					<div className="fiters__filter">
						<h6 className="filters__filter-title">
							Направление бизнеса
						</h6>
						<div className="">
							<div class="filters__filter-box">
								{notAcceptedFilters.product_groups.map(
									(product_group, index) => (
										<div className="filters__filter-box-row">
											<DropdownList
                                                needValue={notAcceptedFilters.product_groups[index][0]}
												curVal={
													resetCurrentValueDropdown
												}
												setCurVal={() =>
													setResentCurrentValueDropdown(
														false,
													)
												}
												values={getProductGroups(
													1,
													index,
												)}
												itemClick={text =>
													changeProductGroup(
														1,
														text,
														index,
													)
												}
											/>
											{product_group[0] !== "" && (
												<DropdownList
                                                    needValue={notAcceptedFilters.product_groups[index][1]}
													curVal={
														resetCurrentValueDropdown
													}
													setCurVal={() =>
														setResentCurrentValueDropdown(
															false,
														)
													}
													values={getProductGroups(
														2,
														index,
													)}
													itemClick={text =>
														changeProductGroup(
															2,
															text,
															index,
														)
													}
												/>
											)}
											{product_group[0] !== "" &&
												product_group[1] !== "" && (
													<DropdownList
                                                        needValue={notAcceptedFilters.product_groups[index][2]}
														curVal={
															resetCurrentValueDropdown
														}
														setCurVal={() =>
															setResentCurrentValueDropdown(
																false,
															)
														}
														values={getProductGroups(
															3,
															index,
														)}
														itemClick={text =>
															changeProductGroup(
																3,
																text,
																index,
															)
														}
													/>
												)}
										</div>
									),
								)}
								{notAcceptedFilters.product_groups.at(-1)[0] !==
									"" &&
									notAcceptedFilters.product_groups.at(
										-1,
									)[1] !== "" &&
									notAcceptedFilters.product_groups.at(
										-1,
									)[2] !== "" && (
										<div className="filters__filter-add filters__filter-box-add">
											<div
												className="filters__filter-add-wrapper"
												onClick={() =>
													setNotAcceptedFilters(
														prev => ({
															...prev,
															product_groups: [
																...prev.product_groups,
																["", "", ""],
															],
														}),
													)
												}
											>
												<img
													className="filters__filter-add-wrapper-img"
													src="/img/filters/plus.svg"
													alt="Добавить фильтр"
												/>
												<p className="filters__filter-add-wrapper-text">
													добавить
												</p>
											</div>
										</div>
									)}
							</div>
						</div>
					</div>
					<div className="filters__filter">
						<h6 className="filters__filter-title">Страна</h6>
						{notAcceptedFilters.countries.map((_, index) => (
							<DropdownList
								curVal={resetCurrentValueDropdown}
								setCurVal={() =>
									setResentCurrentValueDropdown(false)
								}
								values={regionsState.countries}
								itemClick={text =>
									changeDropdownFilters(
										text,
										index,
										"countries",
									)
								}
							/>
						))}
						{notAcceptedFilters.countries.at(-1) && (
							<div className="filters__filter-add">
								<div
									className="filters__filter-add-wrapper"
									onClick={() => addItemFilter("countries")}
								>
									<img
										className="filters__filter-add-wrapper-img"
										src="/img/filters/plus.svg"
										alt="Добавить фильтр"
									/>
									<p className="filters__filter-add-wrapper-text">
										добавить
									</p>
								</div>
							</div>
						)}
					</div>
					<div className="filters__filter">
						<h6 className="filters__filter-title">Регион</h6>
						{notAcceptedFilters.regions.map((_, index) => (
							<DropdownList
								curVal={resetCurrentValueDropdown}
								setCurVal={() =>
									setResentCurrentValueDropdown(false)
								}
								values={regionsState.regions}
								itemClick={text =>
									changeDropdownFilters(
										text,
										index,
										"regions",
									)
								}
							/>
						))}
						{notAcceptedFilters.regions.at(-1) && (
							<div className="filters__filter-add">
								<div
									className="filters__filter-add-wrapper"
									onClick={() => addItemFilter("regions")}
								>
									<img
										className="filters__filter-add-wrapper-img"
										src="/img/filters/plus.svg"
										alt="Добавить фильтр"
									/>
									<p className="filters__filter-add-wrapper-text">
										добавить
									</p>
								</div>
							</div>
						)}
					</div>
					<div className="filters__filter">
						<h6 className="filters__filter-title">Оценка</h6>
						{notAcceptedFilters.scores.map((_, index) => (
							<DropdownList
								curVal={resetCurrentValueDropdown}
								setCurVal={() =>
									setResentCurrentValueDropdown(false)
								}
								values={[
									"Мелкая",
									"Средняя",
									"Крупная",
									"Крупная+",
								]}
								itemClick={text =>
									changeDropdownFilters(text, index, "scores")
								}
							/>
						))}
						{notAcceptedFilters.scores.at(-1) && (
							<div className="filters__filter-add">
								<div
									className="filters__filter-add-wrapper"
									onClick={() => addItemFilter("scores")}
								>
									<img
										className="filters__filter-add-wrapper-img"
										src="/img/filters/plus.svg"
										alt="Добавить фильтр"
									/>
									<p className="filters__filter-add-wrapper-text">
										добавить
									</p>
								</div>
							</div>
						)}
					</div>
					<div className="filters__filter">
						<h6 className="filters__filter-title">Цена</h6>
						<div className="filters__filter-price-box">
							<Input
								type="number"
								placeholder="От"
								value={notAcceptedFilters?.priceAt}
								setValue={text =>
									setNotAcceptedFilters({
										...notAcceptedFilters,
										priceAt: text,
									})
								}
							/>
							<Input
								type="number"
								placeholder="До"
								value={notAcceptedFilters?.priceTo}
								setValue={text =>
									setNotAcceptedFilters({
										...notAcceptedFilters,
										priceTo: text,
									})
								}
							/>
						</div>
					</div>
					<div className="filters__filter">
						<h6 className="filters__filter-title">Покупатель</h6>
						<Checkbox
							text="частная организация"
							click={e =>
								changeCheckboxFilters(
									e.target.getAttribute("data-text"),
									"buyer",
								)
							}
						/>
						<Checkbox
							text="государственная организация"
							click={e =>
								changeCheckboxFilters(
									e.target.getAttribute("data-text"),
									"buyer",
								)
							}
						/>
					</div>
					<div className="filters__filter">
						<h6 className="filters__filter-title">Закупка</h6>
						<Checkbox
							text="прямая"
							click={e =>
								changeCheckboxFilters(
									e.target.getAttribute("data-text"),
									"purchase",
								)
							}
						/>
						<Checkbox
							text="тендер"
							click={e =>
								changeCheckboxFilters(
									e.target.getAttribute("data-text"),
									"purchase",
								)
							}
						/>
					</div>
					<div className="filters__filter">
						<h6 className="filters__filter-title">Тип заявки</h6>
						<Checkbox
							text="горящая"
							click={e =>
								changeCheckboxFilters(
									e.target.getAttribute("data-text"),
									"type_order",
								)
							}
						/>
						<Checkbox
							text="срочная"
							click={e =>
								changeCheckboxFilters(
									e.target.getAttribute("data-text"),
									"type_order",
								)
							}
						/>
					</div>
				</section>
			)}
			<div className="filters__buttons">
				<Button
					text="Сбросить"
					click={() => {
						for (let item of document.getElementsByClassName(
							"checkbox__input",
						)) {
							item.checked = false;
						}
						setResentCurrentValueDropdown(true);
						setFilters({
							product_groups: [["", "", ""]],
							countries: [""],
							regions: [""],
							scores: [""],
							priceAt: "",
							priceTo: "",
							buyer: [],
							purchase: [],
							type_order: [],
						});
						setNotAcceptedFilters({
							product_groups: [["", "", ""]],
							countries: [""],
							regions: [""],
							scores: [""],
							priceAt: "",
							priceTo: "",
							buyer: [],
							purchase: [],
							type_order: [],
						});
					}}
				/>
				<Button
					type="fill"
					text="Применить"
					click={() => setFilters(notAcceptedFilters)}
				/>
			</div>
		</>
	);
};

export default Filters;
