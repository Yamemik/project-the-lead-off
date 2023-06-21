import { useState } from "react";
import "./MenuAdminPanel.scss";
import { useEffect } from "react";

const MenuAdminPanel = () => {
    const [miniMenu, setMiniMenu] = useState(false);
    const [currentPage, setCurrentPage] = useState();

    useEffect(() => {
        setCurrentPage(window.location.href.split("/").at(-1));
    }, []);

    return (
        <div className={`menuAdminPanel ${miniMenu ? "menuAdminPanel--mini" : ""}`}>
            <div class="menuAdminPanel__item menuAdminPanel__item-burger" onClick={() => setMiniMenu(!miniMenu)}>
                <div class="menuAdminPanel__item-burger-line"></div>
                <div class="menuAdminPanel__item-burger-line"></div>
                <div class="menuAdminPanel__item-burger-line"></div>
            </div>
            {[
                { title: "Главная", shortcode: "home" },
                { title: "Пользователи", shortcode: "users" },
                { title: "Заявки", shortcode: "orders" },
                { title: "Аналитика", shortcode: "analytics" },
                { title: "Настройки", shortcode: "settings" },
            ].map(({ title, shortcode }) => (
                <a
                    class={`menuAdminPanel__item menuAdminPanel__item-link ${
                        currentPage === shortcode ? "menuAdminPanel__item-link--active" : ""
                    }`}
                    href={`/platform/admin-panel/${shortcode}`}>
                    <img className="menuAdminPanel__item-link-icon" src={`/img/adminPanel/${shortcode}.svg`} alt="" />
                    <p className="menuAdminPanel__item-link-text">{title}</p>
                </a>
            ))}
        </div>
    );
};

export default MenuAdminPanel;
