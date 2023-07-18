import { useEffect, useState } from "react";
import "./List.scss";

const List = ({ items, type = "default", clickEdit, clickDelete, setValue }) => {
    const [itemsCategory, setItemsCategory] = useState([]);

    useEffect(() => {
        let arr = [];
        if (items) {
            items.map((item, index) => {
                arr.push({ ...item, open: false, id: index + 1 });
            });
            setItemsCategory(arr);
        } else {
            setItemsCategory([{ title: "Тест", rate: "0" }]);
        }
    }, [items]);

    const [oldEditItem, setOldEditItem] = useState(null)
    const [editItem, setEditItem] = useState(null)

    const changePopup = id => {
        const arr = [];
        itemsCategory.map(item => {
            if (item.id === id) {
                item.open = !item.open;
                arr.push({ ...item });
            } else {
                arr.push(item);
            }
        });
        setItemsCategory(arr);
    };

    return (
        <>
            {type === "category" ? (
                <div className={`list list--category ${itemsCategory.length > 6 ? "list--scroll" : ""}`}>
                    {itemsCategory.map(({ id, main, children, open }) => (
                        <>
                            <div className="list__item">
                                <div className="list__item-boxTitle" onClick={() => {
                                    if (!editItem || editItem?.id !== id) changePopup(id)
                                }}>
                                    { (!editItem || editItem?.id !== id) && <img src={`/img/UI/${open ? "minus" : "plus"}.svg`} alt="" />}
                                    {/* {
                                        editItem && editItem?.id === id ? (
                                            <input
                                            value={editItem?.main}
                                            onChange={e => setEditItem(prev => ({...prev, main: e.target.value}))}
                                             style={{
                                                maxWidth: "150px"
                                            }}/>
                                        ) : (
                                            
                                        )
                                    } */}
                                    <p className="list__item-title">{main}</p>
                                </div>
                                <div className="list__item-boxIcons">
                                    {
                                        editItem && editItem?.id === id ? (
                                            <>
                                                
                                                <img
                                                    onClick={() => {
                                                        clickEdit(oldEditItem.children, editItem.children, oldEditItem.main)
                                                        setOldEditItem(null)
                                                        setEditItem(null)
                                                    }}
                                                    className="list__item-boxIcons-icon"
                                                    src="/img/adminPanel/yes.svg"
                                                    alt=""
                                                />
                                                <img
                                                    onClick={() => {
                                                        setOldEditItem(null)
                                                        setEditItem(null)
                                                    }}
                                                    className="list__item-boxIcons-icon"
                                                    src="/img/adminPanel/no.svg"
                                                    alt=""
                                                />
                                                
                                            </>
                                        ) : (
                                            <>
                                                
                                                <img
                                                    onClick={() => {
                                                        if (editItem) {
                                                            let arr = [...itemsCategory]
                                                            arr.map((item, index) => {
                                                                if (item.id === editItem.id) {
                                                                    arr[index].open = false
                                                                }
                                                            })
                                                            setItemsCategory([...itemsCategory])
                                                        }
                                                        setOldEditItem({id: id, main: main, children: children})
                                                        setEditItem({id: id, main: main, children: children})
                                                        let arr = [...itemsCategory]
                                                        arr.map((item, index) => {
                                                            if (item.id === id) {
                                                                arr[index].open = true
                                                            }
                                                        })
                                                        setItemsCategory([...itemsCategory])
                                                    }}
                                                    className="list__item-boxIcons-icon"
                                                    src="/img/UI/edit.svg"
                                                    alt=""
                                                />
                                                <img
                                                    onClick={() => clickDelete(main)}
                                                    className="list__item-boxIcons-icon"
                                                    src="/img/UI/delete.svg"
                                                    alt=""
                                                />
                                                
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                            {open && children.length > 0 && (
                                <ul className="list__extra">
                                    {children.map((item, index) => (
                                        editItem && editItem?.id === id ? <input
                                            value={editItem?.children[index]}
                                            onChange={e => {
                                                let arr = [...editItem?.children]
                                                arr[index] = e.target.value
                                                setEditItem(prev => ({...prev, children: [...arr]}))
                                            }}
                                             style={{
                                                marginTop: "12px",
                                                marginLeft: "45px",
                                                maxWidth: "150px"
                                            }}/> : <li className="list__extra-item">{item}</li>
                                    ))}
                                </ul>
                            )}
                        </>
                    ))}
                </div>
            ) : (
                <div className={`list ${items?.length > 6 ? "list--scroll" : ""}`}>
                    {items &&
                        items?.map(({ title, rate }, index) => (
                            <div className="list__item">
                                <p className="list__item-title">{title}</p>
                                <input
                                    className="list__item-rate"
                                    type="number"
                                    value={rate}
                                    onChange={e => setValue(e.target.value, index)}
                                />
                            </div>
                        ))}
                </div>
            )}
        </>
    );
};

export default List;
