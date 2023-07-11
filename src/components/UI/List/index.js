import { useEffect, useState } from "react";
import "./List.scss";

const List = ({ items, type = "default", clickDelete }) => {
    const [itemsCategory, setItemsCategory] = useState([]);

    useEffect(() => {
        const arr = [];
        items.map((item, index) => {
            arr.push({ ...item, open: false, id: index + 1 });
        });
        setItemsCategory(arr);
    }, [items]);

    const changePopup = (id) => {
        const arr = []
        itemsCategory.map(item => {
            if (item.id === id) {
                item.open = !item.open
                arr.push({...item})
            } else {
                arr.push(item)
            }
        })
        setItemsCategory(arr)
    }

    return (
        <>
            {type === "category" ? (
                <div className={`list list--category ${itemsCategory.length > 6 ? "list--scroll" : ""}`}>
                    {itemsCategory.map(({ id, main, children, open }) => (
                        <>
                            <div className="list__item">
                                <div className="list__item-boxTitle" onClick={() => changePopup(id)}>
                                    <img src={`/img/UI/${open ? "minus" : "plus"}.svg`} alt="" />
                                    <p className="list__item-title">{main}</p>
                                </div>
                                <div className="list__item-boxIcons">
                                    <img className="list__item-boxIcons-icon" src="/img/UI/edit.svg" alt="" />
                                    <img
                                        onClick={() => clickDelete(main)}
                                        className="list__item-boxIcons-icon"
                                        src="/img/UI/delete.svg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            {open && children.length > 0 && <ul className="list__extra">
                                {
                                    children.map(item => <li className="list__extra-item">{item}</li>)
                                }
                            </ul>}
                        </>
                    ))}
                </div>
            ) : (
                <div className={`list ${items.length > 6 ? "list--scroll" : ""}`}>
                    {items.map(({ title, rate }) => (
                        <div className="list__item">
                            <p className="list__item-title">{title}</p>
                            <input className="list__item-rate" type="number" value={rate} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default List;
