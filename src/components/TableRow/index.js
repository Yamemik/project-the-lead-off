import "./TableRow.scss";
import Addition from "./Addition";

const TableRow = ({
    id,
    productGroup,
    nomenclature,
    region,
    estimation,
    price,
    additions,
    isHaveDateDelete,
    isHaveStatus,
    status
}) => {
    return (
        <div className="tableRow">
            <div className="tableRow__id">
                <h6 className="tableRow__id-title">ID</h6>
                <p className="tableRow__id-text">{id}</p>
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
                <p className="tableRow__region-text">{region}</p>
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
                        <img src={`/img/tableRow/${status}.svg`} alt={status}/>
                        {status === "approved" ? "Одобрено" : "Отказано"}
                    </div>
                )}
                {isHaveDateDelete && (
                    <div className="tableRow__additions-dateDelete">
                        {window.innerWidth < 375 ? "Удаление" : "Дата удаления"}: 07.04.2023
                    </div>
                )}
                {additions &&
                    !isHaveDateDelete &&
                    !isHaveStatus &&
                    additions.map(addition => <Addition name={addition} />)}
            </div>
        </div>
    );
};

export default TableRow;
