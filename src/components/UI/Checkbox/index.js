import cryptoRandomString from "crypto-random-string";

import "./Checkbox.scss";

const Checkbox = ({ text = "Чекбокс", children, addClass, data_group, click }) => {
    const randomString = cryptoRandomString({ length: 12 });

    const handleChecked = e => {
        if (document.querySelectorAll(`[data-group="${data_group}"]`).length > 1) {
            // убрать все галки для этой группы
            for (let item of document.querySelectorAll(`[data-group="${data_group}"]`)) {
                item.checked = false;
            }
            // добавить галку к текущему клику
            e.target.checked = true;
        }
    };

    return (
        <div className={`checkbox ${addClass}`}>
            <input
                className="checkbox__input"
                type="checkbox"
                id={randomString}
                onChange={e => handleChecked(e)}
                data-group={data_group}
                data-text={text}
            />
            <label className="checkbox__label" for={randomString} onClick={click}>
                {children ? children : text}
            </label>
        </div>
    );
};

export default Checkbox;
