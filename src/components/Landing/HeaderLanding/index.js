import "./HeaderLanding.scss"

import Button from "../../../components/UI/Button"
import { useState } from "react";

const HeaderLanding = () => {
    const [popupMenuMobile, setPopupMenuMobile] = useState(false);

    return (
        <>
            <header className="headerLanding">
                <div className="headerLanding__logo" onClick={() => window.location.href = "/landing"}>
                    {/* <div className="header__burger" onClick={() => setPopupMenuMobile(!popupMenuMobile)}>
                        <div class="header__burger-line"></div>
                        <div class="header__burger-line"></div>
                        <div class="header__burger-line"></div>
                    </div> */}
                    <img className="headerLanding__logo-img" src="/img/header/logo.png" alt="Логотип" />
                </div>
                {/* <nav className="headerLanding__menu">
                    <a className="headerLanding__menu-item" href="/">
                        Menu 1
                    </a>
                    <a className="headerLanding__menu-item" href="/">
                        Menu 2
                    </a>
                    <a className="headerLanding__menu-item" href="/">
                        Menu 3
                    </a>
                    <a className="headerLanding__menu-item" href="/">
                        Menu 4
                    </a>
                    <a className="headerLanding__menu-item" href="/">
                        Menu 5
                    </a>
                </nav> */}
                <img onClick={() => window.location.href = "/landing"} className="headerLanding__logoMobile" src="/img/header/logo-mobile.png" alt="Логотип"/>
                <div className="headerLanding__button">
                    <Button click={() => window.location.href = "/platform/auth"} text={[window.innerWidth > 590 ? "Войти" : "", "user"]} type="fill" />
                </div>
            </header>
            <div
                className={`popupMenuMobile ${popupMenuMobile ? "popupMenuMobile--active" : "popupMenuMobile--disactive"
                    }`}>
                <div className="popupMenuMobile__body">
                    <div className="popupMenuMobile__body-header">
                        <img
                            onClick={() => setPopupMenuMobile(false)}
                            className="popupMenuMobile__body-header-close"
                            src="/img/header/close.svg"
                            alt="Закрыть меню"
                        />
                    </div>
                    <div className="popupMenuMobile__body-list">
                        <a className="popupMenuMobile__body-list-link" href="/">
                            <p className="popupMenuMobile__body-list-link-text">Menu 1</p>
                        </a>
                        <a className="popupMenuMobile__body-list-link" href="/">
                            <p className="popupMenuMobile__body-list-link-text">Menu 2</p>
                        </a>
                        <a className="popupMenuMobile__body-list-link" href="/">
                            <p className="popupMenuMobile__body-list-link-text">Menu 3</p>
                        </a>
                        <a className="popupMenuMobile__body-list-link" href="/">
                            <p className="popupMenuMobile__body-list-link-text">Menu 4</p>
                        </a>
                        <a className="popupMenuMobile__body-list-link" href="/">
                            <p className="popupMenuMobile__body-list-link-text">Menu 5</p>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderLanding