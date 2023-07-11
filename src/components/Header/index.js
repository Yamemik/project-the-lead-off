import { useState } from "react";
import "./Header.scss";
import ThemeToggler from "./ThemeToggler";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Button from "../UI/Button";

const Header = ({ needAuth }) => {
    const { theme } = useSelector(state => state);

    useEffect(() => {
        if (theme === "dark") {
            document.getElementById("root").className = "root--dark";
            document.getElementsByTagName("body")[0].style.backgroundColor = "#1A232E"
        } else {
            document.getElementById("root").className = "root--light";
            document.getElementsByTagName("body")[0].style.backgroundColor = "#FBFCFD"
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
                {!needAuth && <div className="header__burger" onClick={() => setPopupMenuMobile(!popupMenuMobile)}>
                    <div class="header__burger-line"></div>
                    <div class="header__burger-line"></div>
                    <div class="header__burger-line"></div>
                </div>}
                <div className="header__left">
                    <a className="header__left-logo" href="/platform/home">
                        <img className="header__left-logo-img" src={`/img/header/logo-${theme}.svg`} alt="Логотип" />
                    </a>
                    {window.innerWidth >= 1280 && <ThemeToggler />}
                </div>
                {!needAuth && <nav className="header__center">
                    <a className="header__center-link" href="/platform/home">
                        <img className="header__center-link-icon" src="/img/header/home.svg" alt="" />
                        <p className="header__center-link-text">Главная</p>
                    </a>
                    <a className="header__center-link" href="#" onClick={() => setPopupOrders(!popupOrders)}>
                        <img className="header__center-link-icon" src="/img/header/orders.svg" alt="" />
                        <p className="header__center-link-text">Заявки</p>
                        <img
                            className="header__center-link-icon"
                            src="/img/header/arrow-down.svg"
                            alt="Заявки (открыть)"
                            style={{
                                transform: `rotate(${popupOrders ? "-180deg" : "0deg"})`,
                                transition: "transform .2s",
                            }}
                        />
                    </a>
                    <a className="header__center-link" href="/platform/profile">
                        <img className="header__center-link-icon" src="/img/header/user.svg" alt="" />
                        <p className="header__center-link-text">Личный счёт и информация</p>
                    </a>
                    {popupOrders && (
                        <div className="header__center-popupOrders">
                            <a href="/platform/suitable-orders" className="header__center-popupOrders-link">
                                Подходящие
                            </a>
                            <a href="/platform/active-orders" className="header__center-popupOrders-link">
                                Активные
                            </a>
                            <a href="/platform/rejection-orders" className="header__center-popupOrders-link">
                                Отказы
                            </a>
                            <a href="/platform/archive-orders" className="header__center-popupOrders-link">
                                Архив
                            </a>
                            <a href="/platform/sale-orders" className="header__center-popupOrders-link">
                                Распродажа
                            </a>
                        </div>
                    )}
                </nav>}
                {!needAuth && <div className="header__right">
                    <div className="header__right-wallet">
                        <img className="header__right-wallet-icon" src="/img/header/wallet.svg" alt="Кошелек" />
                        <p className="header__right-wallet-balance">Баланс: {localStorage.getItem("user") ? (JSON.parse(localStorage.getItem("user"))).balance : "0"} руб.</p>
                    </div>
                    <div className="header__right-user">
                        <div className="header__right-user-avatar"></div>
                        <div className="header__right-user-info">
                            <p className="header__right-user-info-name">{localStorage.getItem("user") ? (JSON.parse(localStorage.getItem("user"))).fio.split(" ")[1] : "Клиент Лидофф"}</p>
                            <p className="header__right-user-info-email">{localStorage.getItem("user") ? (JSON.parse(localStorage.getItem("user"))).email : "client@mail.ru"}</p>
                        </div>
                    </div>
                    <div className="header__right-userMobile" onClick={() => setPopupUserMobile(!popupUserMobile)}>
                        <div className="header__right-userMobile-avatar"></div>
                        <img
                            className="header__right-userMobile-arrow"
                            src="/img/header/arrow-down.svg"
                            alt=""
                            style={{
                                transform: `rotate(${popupUserMobile ? "-180deg" : "0deg"})`,
                                transition: "transform .2s",
                            }}
                        />
                    </div>
                    <div className="header__right-exit" onClick={() =>{ localStorage.removeItem("user") 
                        window.location.href = "/platform/auth"}}>
                        <img className="header__right-exit-icon" src="/img/header/exit.svg" alt="Выйти из аккаунта" />
                    </div>
                </div>}
                {needAuth && <div className="header__right">
                    <div class="header__right-buttons">
                        <Button text={window.innerWidth <= 768 ? "Демо" : "Демо доступ"} click={() => window.location.href="/platform/demo"}/>
                        <Button type="fill" text={["Войти", "user"]} click={() => window.location.href="/platform/auth"}/>
                    </div>
                </div>}
                {popupUserMobile && (
                    <div className="header__popupUserMobile">
                        <div className="header__popupUserMobile-info">
                            <div className="header__popupUserMobile-info-about">
                                <p className="header__popupUserMobile-info-about-name">{localStorage.getItem("user") ? (JSON.parse(localStorage.getItem("user"))).fio.split(" ")[1] : "Клиент Лидофф"}</p>
                                <p className="header__popupUserMobile-info-about-email">{localStorage.getItem("user") ? (JSON.parse(localStorage.getItem("user"))).email : "client@mail.ru"}</p>
                            </div>
                            <div className="header__popupUserMobile-info-exit" onClick={() =>{ localStorage.removeItem("user") 
                        window.location.href = "/platform/auth"}}>
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
                            <p className="header__popupUserMobile-wallet-balance">Баланс: {localStorage.getItem("user") ? (JSON.parse(localStorage.getItem("user"))).balance : "0"} руб.</p>
                        </div>
                    </div>
                )}
            </header>
            <div
                className={`popupMenuMobile ${
                    popupMenuMobile ? "popupMenuMobile--active" : "popupMenuMobile--disactive"
                }`}>
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
                        <a className="popupMenuMobile__body-list-link" href="/platform/home">
                            <img className="popupMenuMobile__body-list-link-icon" src="/img/header/home.svg" alt="" />
                            <p className="popupMenuMobile__body-list-link-text">Главная</p>
                        </a>
                        <a className="popupMenuMobile__body-list-link popupMenuMobile__body-list-link--orders" href="#">
                            <div
                                className="popupMenuMobile__body-list-link-box"
                                onClick={() => setPopupOrdersMobile(!popupOrdersMobile)}>
                                <img
                                    className="popupMenuMobile__body-list-link-box-icon"
                                    src="/img/header/orders.svg"
                                    alt=""
                                />
                                <p className="popupMenuMobile__body-list-link-box-text">Заявки</p>
                                <img
                                    className="popupMenuMobile__body-list-link-box-icon"
                                    src="/img/header/arrow-down.svg"
                                    alt="Заявки (открыть)"
                                    style={{
                                        transform: `rotate(${popupOrdersMobile ? "-180deg" : "0deg"})`,
                                        transition: "transform .2s",
                                    }}
                                />
                            </div>
                            {popupOrdersMobile && (
                                <div className="popupMenuMobile__body-list-link-orders">
                                    <a
                                        href="/platform/suitable-orders"
                                        className="popupMenuMobile__body-list-link-orders-order">
                                        Подходящие
                                    </a>
                                    <a
                                        href="/platform/active-orders"
                                        className="popupMenuMobile__body-list-link-orders-order">
                                        Активные
                                    </a>
                                    <a
                                        href="/platform/rejection-orders"
                                        className="popupMenuMobile__body-list-link-orders-order">
                                        Отказы
                                    </a>
                                    <a
                                        href="/platform/archive-orders"
                                        className="popupMenuMobile__body-list-link-orders-order">
                                        Архив
                                    </a>
                                    <a
                                        href="/platform/sale-orders"
                                        className="popupMenuMobile__body-list-link-orders-order">
                                        Распродажа
                                    </a>
                                </div>
                            )}
                        </a>
                        <a className="popupMenuMobile__body-list-link" href="/platform/profile">
                            <img className="popupMenuMobile__body-list-link-icon" src="/img/header/user.svg" alt="" />
                            <p className="popupMenuMobile__body-list-link-text">Личный счёт и информация</p>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;