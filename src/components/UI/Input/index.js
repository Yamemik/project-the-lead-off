import "./Input.scss";

const Input = ({ type = "text", placeholder }) => {
    return <input className="input" type={type} placeholder={placeholder} min={type === "number" && 0} />;
};

export default Input;
