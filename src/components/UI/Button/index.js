import { Link } from "react-router-dom";
import "./Button.scss";

const Button = ({ text = "Кнопка", type = "default", toUrl }) => {
    return (
        <div className={`button button--${type}`}>
            {toUrl ? (
                <Link to={toUrl} className="button__content" reloadDocument>
                    {text}
                </Link>
            ) : (
                <button className="button__content">{text}</button>
            )}
        </div>
    );
};

export default Button;
