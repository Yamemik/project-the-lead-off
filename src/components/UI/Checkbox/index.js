import cryptoRandomString from "crypto-random-string";

import "./Checkbox.scss";

const Checkbox = ({ isChecked, handleChecked, text = "Чекбокс" }) => {
    const randomString = cryptoRandomString({ length: 12 });

    return (
        <div className="checkbox">
            <input
                className="checkbox__input"
                type="checkbox"
                id={randomString}
                checked={isChecked}
                onChange={handleChecked}
            />
            <label className="checkbox__label" for={randomString}>
                {text}
            </label>
        </div>
    );
};

export default Checkbox;
