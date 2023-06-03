import { useState } from "react";
import "./Header.scss";
import ThemeToggler from "./ThemeToggler";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Header = () => {
    const { theme } = useSelector(state => state);

    useEffect(() => {
        if (theme === "dark") {
            document.getElementById("root").className = "root--dark"
        } else {
            document.getElementById("root").className = "root--light"
        }
    }, [theme])

    const [popupOrders, setPopupOrders] = useState(false);

    // мобильные попапы
    const [popupOrdersMobile, setPopupOrdersMobile] = useState(false);
    const [popupUserMobile, setPopupUserMobile] = useState(false);
    const [popupMenuMobile, setPopupMenuMobile] = useState(false);

    return (
        <>
            <header className="header">
                <div className="header__burger" onClick={() => setPopupMenuMobile(!popupMenuMobile)}>
                    <div class="header__burger-line"></div>
                    <div class="header__burger-line"></div>
                    <div class="header__burger-line"></div>
                </div>
                <div className="header__left">
                    <a className="header__left-logo" href="/">
                        <img className="header__left-logo-img" src={`/img/header/logo-${theme}.svg`} alt="Логотип" />
                    </a>
                    {
                        window.innerWidth >= 1280 && <ThemeToggler />
                    }
                </div>
                <nav className="header__center">
                    <a className="header__center-link" href="#">
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
                    <a className="header__center-link" href="#">
                        <img className="header__center-link-icon" src="/img/header/user.svg" alt="" />
                        <p className="header__center-link-text">Личный счёт и информация</p>
                    </a>
                    {popupOrders && (
                        <div className="header__center-popupOrders">
                            {["Подходящие", "Активные", "Отказы", "Архив", "Распродажа"].map(page => (
                                <a href="#" className="header__center-popupOrders-link">
                                    {page}
                                </a>
                            ))}
                        </div>
                    )}
                </nav>
                <div className="header__right">
                    <div className="header__right-wallet">
                        <img className="header__right-wallet-icon" src="/img/header/wallet.svg" alt="Кошелек" />
                        <p className="header__right-wallet-balance">Баланс: 2000 руб.</p>
                    </div>
                    <div className="header__right-user">
                        <div className="header__right-user-avatar"></div>
                        <div className="header__right-user-info">
                            <p className="header__right-user-info-name">Клиент Лидофф</p>
                            <p className="header__right-user-info-email">client@gmail.com</p>
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
                    <div className="header__right-exit">
                        <img className="header__right-exit-icon" src="/img/header/exit.svg" alt="Выйти из аккаунта" />
                    </div>
                </div>
                {popupUserMobile && (
                    <div className="header__popupUserMobile">
                        <div className="header__popupUserMobile-info">
                            <div className="header__popupUserMobile-info-about">
                                <p className="header__popupUserMobile-info-about-name">Клиент Лидофф</p>
                                <p className="header__popupUserMobile-info-about-email">client@gmail.com</p>
                            </div>
                            <div className="header__popupUserMobile-info-exit">
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
                            <p className="header__popupUserMobile-wallet-balance">Баланс: 2000 руб.</p>
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
                        <a className="popupMenuMobile__body-list-link" href="#">
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
                                    {["Подходящие", "Активные", "Отказы", "Архив", "Распродажа"].map(page => (
                                        <a href="#" className="popupMenuMobile__body-list-link-orders-order">
                                            {page}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </a>
                        {/* <div className="popupMenuMobile__body-list-linkOrder">
                                <div className="popupMenuMobile__body-list-linkOrder-box">
                                    <img className="popupMenuMobile__body-list-linkOrder-box-icon" src="/img/header/orders.svg" alt="" />
                                    <p className="popupMenuMobile__body-list-linkOrder-box-text">Заявки</p>
                                    <img
                                        className="popupMenuMobile__body-list-linkOrder-box-icon"
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
                                        {["Подходящие", "Активные", "Отказы", "Архив", "Распродажа"].map(page => (
                                            <a href="#" className="popupMenuMobile__body-list-link-orders-order">
                                                {page}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div> */}
                        <a className="popupMenuMobile__body-list-link" href="#">
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
