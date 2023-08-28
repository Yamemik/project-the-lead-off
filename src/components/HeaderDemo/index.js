import { useState } from "react";
import "./../Header/Header.scss";
import ThemeToggler from "./../Header/ThemeToggler";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const HeaderDemo = () => {
	const { theme } = useSelector(state => state);

	const [demoData, setDemoData] = useState({});

	useEffect(() => {
		if (!localStorage.getItem("demo")) {
			let demo = {
				balance: "50000",
				finance_history: [],
				orders: {
					suitables: [
						{
							_id: 1,
							number_order: 1,
							price: 500,
							nomeclature: [["Строительство", "Пиломатериалы", "Доски"]],
							region: ["Беларусь", "Гродно"],
							score: "мелкая",
							type_buyer: "частная организация",
							type_order: "тендер",
							is_urgent: "да",
							createdAt: "2030-08-20T20:02:39.967Z",
							express: true
						},
						{
							_id: 2,
							number_order: 2,
							price: 800,
							nomeclature: [["Строительство", "Пиломатериалы", "Доски"]],
							region: ["Россия", "Москва"],
							score: "крупная",
							type_buyer: "государственная организация",
							type_order: "прямая",
							is_urgent: "нет",
							createdAt: "2030-08-20T20:02:39.967Z",
							express: true
						},
						{
							_id: 3,
							number_order: 3,
							price: 250,
							nomeclature: [["Программирование", "Разработка сайтов", "Frontend-разработка"]],
							region: ["Россия", "Москва"],
							score: "мелкая",
							type_buyer: "частная организация",
							type_order: "тендер",
							is_urgent: "да",
							createdAt: "2030-08-20T20:02:39.967Z"
						},
						{
							_id: 4,
							number_order: 4,
							price: 300,
							nomeclature: [["Строительство", "—", "—"]],
							region: ["Россия", "Москва"],
							score: "средняя",
							type_buyer: "частная организация",
							type_order: "тендер",
							is_urgent: "нет",
							createdAt: "2030-08-20T20:02:39.967Z"
						},
						{
							_id: 5,
							number_order: 5,
							price: 1500,
							nomeclature: [["Строительство", "Пиломатериалы", "Сруб"]],
							region: ["Россия", "Москва"],
							score: "крупная+",
							type_buyer: "частная организация",
							type_order: "прямая",
							is_urgent: "нет",
							createdAt: "2030-08-20T20:02:39.967Z"
						}
					],
					sales: [
						{
							_id: 6,
							number_order: 6,
							price: 500,
							nomeclature: [["Строительство", "—", "—"]],
							region: ["Беларусь", "Минск"],
							score: "мелкая",
							type_buyer: "частная организация",
							type_order: "прямая",
							is_urgent: "да",
							createdAt: "2030-08-20T20:02:39.967Z"
						},
						{
							_id: 7,
							number_order: 7,
							price: 800,
							nomeclature: [["Строительство", "Пиломатериалы", "Доски"]],
							region: ["Россия", "Москва"],
							score: "крупная",
							type_buyer: "государственная организация",
							type_order: "прямая",
							is_urgent: "нет",
							createdAt: "2030-08-20T20:02:39.967Z"
						},
						{
							_id: 8,
							number_order: 8,
							price: 250,
							nomeclature: [["Строительство", "Пиломатериалы", "—"]],
							region: ["Россия", "Москва"],
							score: "средняя",
							type_buyer: "частная организация",
							type_order: "прямая",
							is_urgent: "да",
							createdAt: "2030-08-20T20:02:39.967Z"
						},
					],
					archives: [],
					actives: []
				}
			};
			setDemoData(demo);
			localStorage.setItem("demo", JSON.stringify(demo));
		} else {
			setDemoData(JSON.parse(localStorage.getItem("demo")));
		}
	}, []);

	useEffect(() => {
		if (theme === "dark") {
			document.getElementById("root").className = "root--dark";
			document.getElementsByTagName("body")[0].style.backgroundColor =
				"#1A232E";
		} else {
			document.getElementById("root").className = "root--light";
			document.getElementsByTagName("body")[0].style.backgroundColor =
				"#FBFCFD";
		}
	}, [theme]);

	const [popupOrders, setPopupOrders] = useState(false);

	// мобильные попапы
	const [popupOrdersMobile, setPopupOrdersMobile] = useState(false);
	const [popupUserMobile, setPopupUserMobile] = useState(false);
	const [popupMenuMobile, setPopupMenuMobile] = useState(false);

	return (
		<>
			<header className="header">
				<div
					className="header__burger"
					onClick={() => setPopupMenuMobile(!popupMenuMobile)}
				>
					<div className="header__burger-line"></div>
					<div className="header__burger-line"></div>
					<div className="header__burger-line"></div>
				</div>
				<div className="header__left">
					<a className="header__left-logo" href="/platform/demo">
						<img
							className="header__left-logo-img"
							src={`/img/header/logo-${theme}.svg`}
							alt="Логотип"
						/>
					</a>
					{window.innerWidth >= 1280 && <ThemeToggler />}
				</div>
				<nav className="header__center">
					<a className="header__center-link" href="/platform/demo">
						<img
							className="header__center-link-icon"
							src="/img/header/home.svg"
							alt=""
						/>
						<p className="header__center-link-text">Главная</p>
					</a>
					<a
						className="header__center-link"
						href="#"
						onClick={() => setPopupOrders(!popupOrders)}
					>
						<img
							className="header__center-link-icon"
							src="/img/header/orders.svg"
							alt=""
						/>
						<p className="header__center-link-text">Заявки</p>
						<img
							className="header__center-link-icon"
							src="/img/header/arrow-down.svg"
							alt="Заявки (открыть)"
							style={{
								transform: `rotate(${
									popupOrders ? "-180deg" : "0deg"
								})`,
								transition: "transform .2s",
							}}
						/>
					</a>

					<a
						className="header__center-link"
						href="/platform/demo/profile"
					>
						<img
							className="header__center-link-icon"
							src="/img/header/user.svg"
							alt=""
						/>
						<p className="header__center-link-text">
							Личный счёт и информация
						</p>
					</a>
					{popupOrders && (
						<div className="header__center-popupOrders">
							<a
								href="/platform/demo/suitable-orders"
								className="header__center-popupOrders-link"
							>
								Подходящие
							</a>
							<a
								href="/platform/demo/active-orders"
								className="header__center-popupOrders-link"
							>
								Активные
							</a>
							<a
								href="/platform/demo/archive-orders"
								className="header__center-popupOrders-link"
							>
								Архив
							</a>
							<a
								href="/platform/demo/sale-orders"
								className="header__center-popupOrders-link"
							>
								Распродажа
							</a>
						</div>
					)}
				</nav>
				<div className="header__right">
					<div className="header__right-wallet">
						<img
							className="header__right-wallet-icon"
							src="/img/header/wallet.svg"
							alt="Кошелек"
						/>
						<p className="header__right-wallet-balance">
							Баланс: {demoData.balance} руб.
						</p>
					</div>
					<div className="header__right-user">
						<div className="header__right-user-avatar"></div>
						<div className="header__right-user-info">
							<p className="header__right-user-info-name">
								Клиент Лидофф
							</p>
							<p className="header__right-user-info-email">
								client@mail.ru
							</p>
						</div>
					</div>
					<div
						className="header__right-userMobile"
						onClick={() => setPopupUserMobile(!popupUserMobile)}
					>
						<div className="header__right-userMobile-avatar"></div>
						<img
							className="header__right-userMobile-arrow"
							src="/img/header/arrow-down.svg"
							alt=""
							style={{
								transform: `rotate(${
									popupUserMobile ? "-180deg" : "0deg"
								})`,
								transition: "transform .2s",
							}}
						/>
					</div>
					<div
						className="header__right-exit"
						onClick={() => {
							localStorage.removeItem("demo");
							window.location.href = "/platform/auth";
						}}
					>
						<img
							className="header__right-exit-icon"
							src="/img/header/exit.svg"
							alt="Выйти из аккаунта"
						/>
					</div>
				</div>
				{popupUserMobile && (
					<div className="header__popupUserMobile">
						<div className="header__popupUserMobile-info">
							<div className="header__popupUserMobile-info-about">
								<p className="header__popupUserMobile-info-about-name">
									Клиент Лидофф
								</p>
								<p className="header__popupUserMobile-info-about-email">
									client@mail.ru
								</p>
							</div>
							<div
								className="header__popupUserMobile-info-exit"
								onClick={() => {
									localStorage.removeItem("demo");
									window.location.href = "/platform/auth";
								}}
							>
								<img
									className="header__popupUserMobile-info-exit-icon"
									src="/img/header/exit.svg"
									alt="Выйти из аккаунта"
								/>
							</div>
						</div>
						<div className="header__popupUserMobile-wallet">
							<img
								className="header__popupUserMobile-wallet-icon"
								src="/img/header/wallet.svg"
								alt="Кошелек"
							/>
							<p className="header__popupUserMobile-wallet-balance">
								Баланс: {demoData.balance} руб.
							</p>
						</div>
					</div>
				)}
			</header>
			<div
				className={`popupMenuMobile ${
					popupMenuMobile
						? "popupMenuMobile--active"
						: "popupMenuMobile--disactive"
				}`}
			>
				<div className="popupMenuMobile__body">
					<div className="popupMenuMobile__body-header">
						<ThemeToggler />
						<img
							onClick={() => setPopupMenuMobile(false)}
							className="popupMenuMobile__body-header-close"
							src="/img/header/close.svg"
							alt="Закрыть меню"
						/>
					</div>
					<div className="popupMenuMobile__body-list">
						<a
							className="popupMenuMobile__body-list-link"
							href="/platform/demo"
						>
							<img
								className="popupMenuMobile__body-list-link-icon"
								src="/img/header/home.svg"
								alt=""
							/>
							<p className="popupMenuMobile__body-list-link-text">
								Главная
							</p>
						</a>
						<a
							className="popupMenuMobile__body-list-link popupMenuMobile__body-list-link--orders"
							href="#"
						>
							<div
								className="popupMenuMobile__body-list-link-box"
								onClick={() =>
									setPopupOrdersMobile(!popupOrdersMobile)
								}
							>
								<img
									className="popupMenuMobile__body-list-link-box-icon"
									src="/img/header/orders.svg"
									alt=""
								/>
								<p className="popupMenuMobile__body-list-link-box-text">
									Заявки
								</p>
								<img
									className="popupMenuMobile__body-list-link-box-icon"
									src="/img/header/arrow-down.svg"
									alt="Заявки (открыть)"
									style={{
										transform: `rotate(${
											popupOrdersMobile
												? "-180deg"
												: "0deg"
										})`,
										transition: "transform .2s",
									}}
								/>
							</div>
							{popupOrdersMobile && (
								<div className="popupMenuMobile__body-list-link-orders">
									<a
										href="/platform/demo/suitable-orders"
										className="popupMenuMobile__body-list-link-orders-order"
									>
										Подходящие
									</a>
									<a
										href="/platform/demo/active-orders"
										className="popupMenuMobile__body-list-link-orders-order"
									>
										Активные
									</a>
									<a
										href="/platform/demo/archive-orders"
										className="popupMenuMobile__body-list-link-orders-order"
									>
										Архив
									</a>
									<a
										href="/platform/demo/sale-orders"
										className="popupMenuMobile__body-list-link-orders-order"
									>
										Распродажа
									</a>
								</div>
							)}
						</a>
						<a
							className="popupMenuMobile__body-list-link"
							href="/platform/demo/profile"
						>
							<img
								className="popupMenuMobile__body-list-link-icon"
								src="/img/header/user.svg"
								alt=""
							/>
							<p className="popupMenuMobile__body-list-link-text">
								Личный счёт и информация
							</p>
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default HeaderDemo;
