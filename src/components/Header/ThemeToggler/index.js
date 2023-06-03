import { useEffect, useState } from "react";
import "./ThemeToggler.scss";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../globalStore/theme/theme.slice";

const ThemeToggler = () => {
    const { theme } = useSelector(state => state);
    const dispatch = useDispatch();

    const [currentTheme, setCurrentTheme] = useState(null);

    useEffect(() => {
        if (!["light", "dark"].includes(localStorage.getItem("theme"))) {
            localStorage.setItem("theme", "light");
        }
        if (localStorage.getItem("theme") === "dark") {
            document.getElementsByClassName("themeToggler__toggler-checkbox")[0].checked = true;
        }
    }, []);

    useEffect(() => {
        if (currentTheme) {
            localStorage.setItem("theme", currentTheme);
            dispatch(actions.changeTheme(currentTheme));
        }
    }, [currentTheme]);

    return (
        <div className="themeToggler">
            <img className="themeToggler__light" src={`/img/header/light-${theme}.svg`} alt="Светлая тема" />
            <label className="themeToggler__toggler">
                <input
                    className="themeToggler__toggler-checkbox"
                    type="checkbox"
                    onClick={() => {
                        if (document.getElementsByClassName("themeToggler__toggler-checkbox")[0].checked) {
                            setCurrentTheme("dark");
                        } else {
                            setCurrentTheme("light");
                        }
                    }}
                />
                <span className="themeToggler__toggler-slider"></span>
            </label>
            <img className="themeToggler__light" src={`/img/header/dark-${theme}.svg`} alt="Темная тема" />
        </div>
    );
};

export default ThemeToggler;
