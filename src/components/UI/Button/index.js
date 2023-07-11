import { Link } from "react-router-dom";
import "./Button.scss";

const Button = ({ text = "Кнопка", type = "default", toUrl, addClass, click }) => {
    return (
        <div className={`button button--${type} ${addClass}`}>
            {toUrl ? (
                <Link to={toUrl} className="button__content" reloadDocument>
                    {text}
                </Link>
            ) : (
                <button className={`button__content`} onClick={(e) => {
                     e.preventDefault();
                     click()
                }}>
                    {typeof text !== "string" ? (
                        <>
                            <img src={`/img/button/${text[1]}.svg`} alt="" />
                            {text[0]}
                        </>
                    ) : (
                        text
                    )}
                </button>
            )}
        </div>
    );
};

export default Button;
