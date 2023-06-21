import "./Input.scss";

const Input = ({ type = "text", placeholder, addClass }) => {
    return <input className={`input ${addClass}`} type={type} placeholder={placeholder} min={type === "number" && 0} />;
};

export default Input;
