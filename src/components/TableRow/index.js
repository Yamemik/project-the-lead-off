import "./TableRow.scss";
import Addition from "./Addition";
import sliceBigString from "../../utils/sliceBigString";

import { Tooltip } from "react-tooltip";

const TableRow = ({
    category,
    id,
    productGroup,
    nomenclature,
    region,
    estimation,
    price,
    additions,
    isHaveDateDelete,
    isHaveStatus,
    status,
    setNewData_parent,
    numberOrder,
    dateDeleteArchive,
    setRejectPopup,
    setRejectID,
    demo,
    order
}) => {
    return (
        <>
            <div
                className="tableRow"
                onClick={e => {
                    if (
                        ![
                            "additionaddition--sale",
                            "addition__img",
                            "addition",
                            "additionaddition--close",
                            "additionaddition--cart",
                        ].includes(e.target.className.replace(/\s/g, ""))
                    ) {
                        if (demo) {
                            window.location.href = `/platform/demo/order/${id}`;
                        } else {
                            window.location.href = `/platform/order/${id}`;
                        }
                    }
                }}
                onMouseOver={e => {
                    if (
                        ![
                            "additionaddition--sale",
                            "addition__img",
                            "addition",
                            "additionaddition--close",
                            "additionaddition--cart",
                        ].includes(e.target.className.replace(/\s/g, ""))
                    ) {
                        e.currentTarget.style.opacity = 0.75;
                        e.currentTarget.style.cursor = "pointer";
                    }
                }}
                onMouseOut={e => {
                    e.currentTarget.style.opacity = 1;
                    e.currentTarget.style.cursor = "default";
                }}>
                <Tooltip id="default-tooltip" place="bottom" offset={6} />
                <div className="tableRow__id">
                    <h6 className="tableRow__id-title">ID</h6>
                    <p className="tableRow__id-text">{numberOrder ? numberOrder : sliceBigString(id, 8, [0, 5])}</p>
                </div>
                <div className="tableRow__productGroup">
                    <h6 className="tableRow__productGroup-title">Категория</h6>
                    <p className="tableRow__productGroup-text">{category}</p>
                </div>
                <div className="tableRow__productGroup">
                    <h6 className="tableRow__productGroup-title">Товарная группа</h6>
                    <p className="tableRow__productGroup-text">{productGroup}</p>
                </div>
                <div className="tableRow__nomenclature">
                    <h6 className="tableRow__nomenclature-title">Номенклатура</h6>
                    <p className="tableRow__nomenclature-text">{nomenclature}</p>
                </div>
                <div className="tableRow__region">
                    <h6 className="tableRow__region-title">Регион</h6>
                    <p className="tableRow__region-text">{`${region[0]} / ${region[1]}`}</p>
                </div>
                <div className="tableRow__estimation">
                    <h6 className="tableRow__estimation-title">Оценка</h6>
                    <p className="tableRow__estimation-text">{estimation}</p>
                </div>
                <div className="tableRow__price">
                    <h6 className="tableRow__price-title">Стоимость</h6>
                    <p
                        className="tableRow__price-text"
                        style={{
                            color: additions.includes("express") ? "#EF5C5C" : "#438BCE",
                        }}>
                        {price} руб.
                    </p>
                </div>
                <div className="tableRow__additions">
                    {isHaveStatus && (
                        <div className="tableRow__additions-dateDelete">
                            <img src={`/img/tableRow/${status}.svg`} alt={status} />
                            {status === "approved" ? "Одобрено" : "Отказано"}
                        </div>
                    )}
                    {isHaveDateDelete && (
                        <div className="tableRow__additions-dateDelete">
                            {window.innerWidth < 375 ? "Добавлено" : "Дата добавления"}: {dateDeleteArchive}
                        </div>
                    )}
                    {additions &&
                        !isHaveDateDelete &&
                        !isHaveStatus &&
                        additions.map(addition => (
                            <Addition
                                order={order}
                                demo={demo}
                                setRejectID={id => setRejectID(id)}
                                setNewData={data => setNewData_parent(data)}
                                item_id={id}
                                name={addition}
                                orderSum={price}
                                setRejectPopup={setRejectPopup}
                            />
                        ))}
                </div>
            </div>
        </>
    );
};

export default TableRow;
