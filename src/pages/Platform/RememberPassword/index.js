import { useState } from "react";
import Header from "../../../components/Header";
import LayoutBlocks from "../../../components/Layouts/LayoutBlocks";
import Button from "../../../components/UI/Button";
import axios from "axios";

const RememberPassword = () => {
    const [email, setEmail] = useState("");
    const [showError, setShowError] = useState(false);
    const [showEndText, setShowEndText] = useState(false);

    const handleRemember = () => {
        if (email && email.includes("@")) {
            axios
                .post(
                    "https://project-the-leads.onrender.com/api/user/resentpass",
                    {
                        email,
                    },
                    {},
                )
                .then(res => setShowEndText(true))
                .catch(err => {
                    setShowError(true);
                    setEmail("");
                });
        } else {
            setShowError(true);
            setEmail("");
        }
    };

    return (
        <>
            <Header needAuth />
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100vw",
                    height: "calc(100vh - 150px)",
                }}>
                <div className="form">
                    <>
                        <h1 className="form__title">Сброс пароля</h1>
                        <LayoutBlocks>
                            <form className="form__box" action="#">
                                {!showEndText ? (
                                    <>
                                        <input
                                            className="form__box-input"
                                            type="text"
                                            placeholder="Электронная почта"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                        {showError && <p className="form__box-error">Пользователь не найден</p>}
                                        <Button text="Восстановить" click={handleRemember} />
                                    </>
                                ) : (
                                    <><p className="form__box-text">Письмо с новым паролем отправлено на указанный адрес!</p>
                                    <Button text="Перейти к входу" toUrl="/platform/auth" />
                                    </>
                                )}
                            </form>
                        </LayoutBlocks>
                    </>
                </div>
            </div>
        </>
    );
};

export default RememberPassword;
