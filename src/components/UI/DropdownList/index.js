import { useEffect, useState } from "react";
import "./DropdownList.scss";

const DropdownList = ({
    label,
    placeholder = "Выбрать",
    values = ["Пункт 1", "Пункт 2", "Пункт 3"],
    itemClick,
    curVal
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState();

    useEffect(() => {
        const handleOutClick = e => {
            if (
                !["dropdown", "dropdown__arrow", "dropdown__list-item", "dropdown__list", "dropdown__text"].includes(
                    e.target.className,
                )
            ) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("click", handleOutClick);
        } else {
            document.removeEventListener("click", handleOutClick);
        }
    }, [isOpen]);

    useEffect(() => {
        if (curVal) {
            setCurrentValue()
        }
    }, [curVal])

    return (
        <div className="dropdown" onClick={() => setIsOpen(!isOpen)}>
            <p
                className="dropdown__text"
                style={{
                    color: currentValue ? "#1f2a37" : "#A6ACBE",
                }}>
                {currentValue ? currentValue : placeholder}
            </p>
            <img
                className="dropdown__arrow"
                src="/img/filters/dropdown-arrow.svg"
                alt="Стрелочка"
                style={{
                    transform: `rotate(${isOpen ? "-180deg" : "0deg"})`,
                    transition: "transform .2s",
                }}
            />
            {isOpen && (
                <ul className="dropdown__list">
                    {values.map((value, index) => (
                        <li
                            key={index}
                            className="dropdown__list-item"
                            onClick={e => {
                                setCurrentValue(e.target.innerText)
                                if (typeof itemClick === "function") {
                                    itemClick(e.target.innerText)
                                }
                            }}>
                            {value}
                        </li>
                    ))}
                </ul>
            )}
            {label && <p className="dropdown__label">{label}</p>}
        </div>
    );
};

export default DropdownList;
