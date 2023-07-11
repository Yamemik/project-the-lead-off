import { useState } from "react";
import "./HeaderAdminPanel.scss";

const HeaderAdminPanel = () => {
    const [popupUserMobile, setPopupUserMobile] = useState(false);

    return (
        <header className="headerAdminPanel">
                <div className="headerAdminPanel__left">
                    <a className="headerAdminPanel__left-logo" href="/platform/home">
                        <img className="headerAdminPanel__left-logo-img" src="/img/header/logo-light.svg" alt="Логотип" />
                    </a>
                </div>
                <div className="headerAdminPanel__right">
                    <div className="headerAdminPanel__right-user">
                        <div className="headerAdminPanel__right-user-avatar"></div>
                        <div className="headerAdminPanel__right-user-info">
                            <p className="headerAdminPanel__right-user-info-name">Администратор</p>
                            <p className="headerAdminPanel__right-user-info-email">{JSON.parse(localStorage.getItem("user")).email}</p>
                        </div>
                    </div>
                    <div className="headerAdminPanel__right-userMobile" onClick={() => setPopupUserMobile(!popupUserMobile)}>
                        <div className="headerAdminPanel__right-userMobile-avatar"></div>
                        <img
                            className="headerAdminPanel__right-userMobile-arrow"
                            src="/img/header/arrow-down.svg"
                            alt=""
                            style={{
                                transform: `rotate(${popupUserMobile ? "-180deg" : "0deg"})`,
                                transition: "transform .2s",
                            }}
                        />
                    </div>
                    <div className="headerAdminPanel__right-exit">
                        <img className="headerAdminPanel__right-exit-icon" src="/img/header/exit.svg" alt="Выйти из аккаунта" />
                    </div>
                </div>
                {popupUserMobile && (
                    <div className="headerAdminPanel__popupUserMobile">
                        <div className="headerAdminPanel__popupUserMobile-info">
                            <div className="headerAdminPanel__popupUserMobile-info-about">
                                <p className="headerAdminPanel__popupUserMobile-info-about-name">Администратор</p>
                                <p className="headerAdminPanel__popupUserMobile-info-about-email">client@gmail.com</p>
                            </div>
                            <div className="headerAdminPanel__popupUserMobile-info-exit">
                                <img
                                    className="headerAdminPanel__popupUserMobile-info-exit-icon"
                                    src="/img/header/exit.svg"
                                    alt="Выйти из аккаунта"
                                />
                            </div>
                        </div>
                    </div>
                )}
        </header>
    );
};

export default HeaderAdminPanel;