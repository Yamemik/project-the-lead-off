import "./Header.scss";

const Header = () => {
    return (
        <header className="header">
            <div className="header__left">
                <a className="header__left-logo" href="/">
                    <img className="header__left-logo-img" src="/img/header/logo.svg" alt="Логотип" />
                </a>
                <div className="header__left-theme">
                    <img className="header__left-theme-light" src="/img/header/light.svg" alt="Светлая тема" />
                    <label className="header__left-theme-toggler">
                        <input className="header__left-theme-toggler-checkbox" type="checkbox" />
                        <span className="header__left-theme-toggler-slider"></span>
                    </label>
                    <img className="header__left-theme-light" src="/img/header/dark.svg" alt="Темная тема" />
                </div>
            </div>
            <nav className="header__center">
                <a className="header__center-link" href="#">
                    <img className="header__center-link-icon" src="/img/header/home.svg" alt="" />
                    <p className="header__center-link-text">Главная</p>
                </a>
                <a className="header__center-link" href="#">
                    <img className="header__center-link-icon" src="/img/header/orders.svg" alt="" />
                    <p className="header__center-link-text">Заявки</p>
                    <img className="header__center-link-icon" src="/img/header/arrow-down.svg" alt="Заявки (открыть)" />
                </a>
                <a className="header__center-link" href="#">
                    <img className="header__center-link-icon" src="/img/header/user.svg" alt="" />
                    <p className="header__center-link-text">Личный счёт и информация</p>
                </a>
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
                <div className="header__right-exit">
                    <img className="header__right-exit-icon" src="/img/header/exit.svg" alt="Выйти из аккаунта" />
                </div>
            </div>
        </header>
    );
};

export default Header;
