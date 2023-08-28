import LayoutBlock from "./../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "./../../../components/Layouts/LayoutBlocks";
import LayoutPage from "./../../../components/Layouts/LayoutPage";
import Checkbox from "./../../../components/UI/Checkbox";
import Input from "./../../../components/UI/Input";
import Button from "./../../../components/UI/Button";
import FinanceTable from "../../../components/FinanceTable";
import { useEffect } from "react";
import axios from "../../../utils/axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "../../../components/Loader";

import getUserRegionsLine from "../../../utils/getUserRegionsLine";
import getUserBusinessLine from "../../../utils/getUserBusinessLine";
import HeaderDemo from "../../../components/HeaderDemo";

const ProfileDemo = () => {
	const [depositSum, setDepositSum] = useState("");

	const [offsItems, setOffsItems] = useState([]);
	const [offsItemsOffset, setOffsItemsOffset] = useState(5);

	const [refillItems, setRefillItems] = useState([]);
	const [refillItemsOffset, setRefillItemsOffset] = useState(5);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		JSON.parse(localStorage.getItem("demo")).finance_history.map(
			({ date, sum, status, event }) => {
				if (event === "refill") {
					setRefillItems(prev => [
						...prev,
						{
							time: date,
							price: sum,
							id: status,
						},
					]);
				}
				if (event === "buy") {
					setOffsItems(prev => [
						...prev,
						{
							time: date,
							price: sum,
							id: status,
							_id: status
						},
					]);
				}
			},
		);
		setIsLoading(false);
	}, []);

	const handleDeposit = () => {
		for (const item of document.getElementsByClassName("checkbox__input")) {
			if (!item.checked) {
				toast.error("Согласитесь с офертой");
			} else {
				localStorage.setItem(
					"demo",
					JSON.stringify({
						...JSON.parse(localStorage.getItem("demo")),
						balance:
							Number(
								JSON.parse(localStorage.getItem("demo"))
									.balance,
							) + Number(depositSum),
						finance_history: [
							...JSON.parse(localStorage.getItem("demo"))
								.finance_history,
							{
								date: new Date().toLocaleDateString(),
								sum: depositSum,
								status: "Успешно",
								event: "refill"
							},
						],
					}),
				);
				toast.success(`Демо счет пополнен на ${depositSum} рублей`);
				setDepositSum("");
				setTimeout(() => {
					window.location.reload();
				}, 1200);
			}
		}
	};

	const getOffsHistory = () => {
		return offsItems.slice(0, offsItemsOffset);
	};

	const getRefillHistory = () => {
		return refillItems.slice(0, refillItemsOffset);
	};

	return (
		<>
			<HeaderDemo />
			<LayoutPage title="Личный счёт и информация">
				<Loader trigger={isLoading} />
				<LayoutBlocks addClass="layoutBlocks__profile">
					<LayoutBlock>
						<ul className="profile__info">
							<li className="profile__info-row">
								<span className="profile__info-row-title">
									Дата регистрации:
								</span>
								<span className="profile__info-row-text">
									01.01.1970
								</span>
							</li>
							<li className="profile__info-row">
								<span className="profile__info-row-title">
									ФИО:
								</span>
								<span className="profile__info-row-text">
									Клиент Лидофф
								</span>
							</li>
							<li className="profile__info-row">
								<span className="profile__info-row-title">
									Email:
								</span>
								<span className="profile__info-row-text">
									client@mail.ru
								</span>
							</li>
							<li className="profile__info-row">
								<span className="profile__info-row-title">
									Телефон:
								</span>
								<span className="profile__info-row-text">
									+7 904 454 54 54
								</span>
							</li>
							<li className="profile__info-row">
								<span className="profile__info-row-title">
									Организация:
								</span>
								<span className="profile__info-row-text">
									частная
								</span>
							</li>
							<li className="profile__info-row">
								<span className="profile__info-row-title">
									Регион:
								</span>
								<span className="profile__info-row-text">
									Россия / Москва, Беларусь / Вся
								</span>
							</li>
							<li className="profile__info-row">
								<span className="profile__info-row-title">
									Направления бизнеса:
								</span>
								<span className="profile__info-row-text">
									Строительство, Программирование / Создание сайтов / Frontend-разработка
								</span>
							</li>
						</ul>
					</LayoutBlock>
					<LayoutBlock title="Пополнение счета">
						<div className="profile__deposit-box">
							<Input
								addClass={"profile__deposit-box-input"}
								type="number"
								placeholder={0}
								value={depositSum}
								setValue={text => setDepositSum(text)}
							/>
							<Button
								text="Пополнить"
								type="fill"
								addClass="profile__deposit-box-button"
								click={handleDeposit}
							/>
						</div>
						<Checkbox addClass="profile__checkbox">
							Согласен с условиями{" "}
							<span
								className="profile__deposit-offert"
								onClick={() => {
									for (let item of document.getElementsByClassName(
										"checkbox__input",
									)) {
										item.checked = true;
									}
									window.open(
										"/landing/docs/offert",
										"_blank",
									);
								}}
							>
								договора оферты
							</span>
						</Checkbox>
					</LayoutBlock>
					<LayoutBlock title="История списаний">
						<FinanceTable demo type="offs" data={getOffsHistory()} />
						{offsItemsOffset < offsItems.length && (
							<Button
								text="Посмотреть ещё"
								click={() =>
									setOffsItemsOffset(prev => prev + 5)
								}
							/>
						)}
					</LayoutBlock>
					<LayoutBlock title="История пополнений">
						<FinanceTable demo
							type="transactions"
							data={getRefillHistory()}
						/>
						{refillItemsOffset < refillItems.length && (
							<Button
								text="Посмотреть ещё"
								click={() =>
									setRefillItemsOffset(prev => prev + 5)
								}
							/>
						)}
					</LayoutBlock>
				</LayoutBlocks>
			</LayoutPage>
		</>
	);
};

export default ProfileDemo;
