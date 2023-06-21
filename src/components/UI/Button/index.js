import { Link } from "react-router-dom";
import "./Button.scss";

const Button = ({ text = "Кнопка", type = "default", toUrl, addClass }) => {
    return (
        <div className={`button button--${type} ${addClass}`}>
            {toUrl ? (
                <Link to={toUrl} className="button__content" reloadDocument>
                    {text}
                </Link>
            ) : (
                <button className={`button__content`}>{text}</button>
            )}
        </div>
    );
};

export default Button;
