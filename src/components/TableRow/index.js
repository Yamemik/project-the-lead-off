import "./TableRow.scss";
import Addition from "./Addition";

const TableRow = ({ id, productGroup, nomenclature, region, estimation, price, additions }) => {
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
                <p className="tableRow__price-text">{price} руб.</p>
            </div>
            <div className="tableRow__additions">
                <Addition name="lock" />
                <Addition name="clock" />
                <Addition name="fire" />
            </div>
        </div>
    );
};

export default TableRow;
