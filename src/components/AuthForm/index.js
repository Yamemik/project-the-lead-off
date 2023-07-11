import Checkbox from "./../UI/Checkbox";
import Button from "./../UI/Button";
import LayoutBlocks from "../../components/Layouts/LayoutBlocks";

import "./AuthForm.scss";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const AuthForm = ({ type, rememberPassword, demo }) => {
    const [phoneOrEmail, setPhoneOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const [remember, setRemember] = useState(false);

    useEffect(() => {
        if (type === "admin-auth" && localStorage.getItem("adminAuthData")) {
            setPhoneOrEmail(JSON.parse(localStorage.getItem("adminAuthData")).login)
            setPassword(JSON.parse(localStorage.getItem("adminAuthData")).password)
        }
        if (type === "user-auth" && localStorage.getItem("userAuthData")) {
            setPhoneOrEmail(JSON.parse(localStorage.getItem("userAuthData")).login)
            setPassword(JSON.parse(localStorage.getItem("userAuthData")).password)
        }
    }, [])

    const handleAuth = () => {
        if (phoneOrEmail && password && phoneOrEmail.includes("@") && password.length > 7) {
            if (type === "admin-auth") {
                axios
                    .post(
                        "https://project-the-leads.onrender.com/api/auth/log",
                        {
                            login: phoneOrEmail,
                            password,
                        },
                        {},
                    )
                    .then(res => {
                        if (res.data.is_admin) {
                            if (remember) {
                                localStorage.setItem("adminAuthData", JSON.stringify({login: phoneOrEmail, password: password}))
                            }
                            localStorage.setItem("user", JSON.stringify(res.data))
                            setTimeout(() => {
                                window.location.href = "/platform/admin-panel/home"
                            }, 1200)
                        }
                    })
                    .catch(err => {
                        setShowError(true);
                        setPhoneOrEmail("");
                        setPassword("");
                        for (const item of document.querySelectorAll(".checkbox__input")) {
                            item.checked = false;
                        }
                        setRemember(false);
                    });
            }
            if (type === "user-auth") {
                axios
                    .post(
                        "https://project-the-leads.onrender.com/api/auth/log",
                        {
                            login: phoneOrEmail,
                            password,
                        },
                        {},
                    )
                    .then(res => {
                        if (remember) {
                            localStorage.setItem("userAuthData", JSON.stringify({login: phoneOrEmail, password: password}))
                        }
                        localStorage.setItem("user", JSON.stringify(res.data))
                        setTimeout(() => {
                            window.location.href = "/platform/home"
                        }, 1200)
                    })
                    .catch(err => {
                        setShowError(true);
                        setPhoneOrEmail("");
                        setPassword("");
                        for (const item of document.querySelectorAll(".checkbox__input")) {
                            item.checked = false;
                        }
                        setRemember(false);
                    });
            }
        } else {
            setShowError(true);
            setPhoneOrEmail("");
            setPassword("");
            for (const item of document.querySelectorAll(".checkbox__input")) {
                item.checked = false;
            }
            setRemember(false);
        }
    };

    return (
        <div className="form">
            {demo ? (
                <>
                    <h1 className="form__title">Демо доступ</h1>
                    <LayoutBlocks addClass={"layoutBlocks__form"}>
                        <form className="form__box" action="#">
                            <input className="form__box-input" type="text" placeholder="ФИО" />
                            <input className="form__box-input" type="text" placeholder="Контактный номер телефона" />
                            <input className="form__box-input" type="text" placeholder="Электронная почта" />
                            <Button text="Оставить заявку" />
                            <Checkbox
                                addClass={"form__box-sogl"}
                                text={
                                    window.innerWidth <= 768
                                        ? "Согласие на обработку данных"
                                        : "Даю согласие на обработку персональных данных"
                                }
                            />
                        </form>
                    </LayoutBlocks>
                </>
            ) : (
                <>
                    <h1 className="form__title">Вход</h1>
                    <LayoutBlocks>
                        <form className="form__box" action="#">
                            <input
                                className="form__box-input"
                                type="text"
                                placeholder="Телефон или почта"
                                value={phoneOrEmail}
                                onChange={e => setPhoneOrEmail(e.target.value)}
                            />
                            <input
                                className="form__box-input"
                                type="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Checkbox text="Запомнить пароль" click={() => setRemember(!remember)}/>
                            {showError && <p className="form__box-error">Неверный логин или пароль</p>}
                            <Button text="Войти" click={handleAuth} />
                            {rememberPassword && <div className="form__box-remember" onClick={() => window.location.href = "/platform/remember-password"}>Забыли пароль?</div>}
                        </form>
                    </LayoutBlocks>
                </>
            )}
        </div>
    );
};

export default AuthForm;
