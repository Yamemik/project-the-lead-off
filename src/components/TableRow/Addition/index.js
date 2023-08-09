import axios from "../../../utils/axios";
import "./Addition.scss";

const Addition = ({ item_id, name, setNewData, orderSum, setRejectPopup, setRejectID }) => {
    return (
        <>
            <div
                onClick={() => {
                    if (name === "close") {
                        setRejectPopup();
                        setRejectID(item_id);
                    } else if (name === "cart") {
                        axios
                            .post(`/api/user/order/buyorder/${item_id}`, { sum: orderSum })
                            .then(_ =>
                                axios
                                    .get("/api/user/orders/all")
                                    .then(({ data }) => setNewData(data))
                                    .catch(err => console.log(err)),
                            )
                            .catch(err => console.log(err));
                    }
                }}
                className={`addition ${name === "cart" ? "addition--cart" : ""} ${
                    name === "sale" ? "addition--sale" : ""
                } ${name === "close" ? "addition--close" : ""}`}
                data-tooltip-id={(name !== "cart" && name !== "close") ? "default-tooltip" : ""}
                data-tooltip-content={
                    name === "private"
                        ? "Частная организация"
                        : name === "state"
                        ? "Государственная организация"
                        : name === "urgent"
                        ? "Срочная"
                        : name === "tender"
                        ? "Тендер"
                        : name === "express"
                        ? "Горящая"
                        : name === "sale"
                        ? "Распродажа"
                        : name
                }>
                <img className="addition__img" src={`/img/tableRow/additions/${name}.svg`} alt="" />
            </div>
        </>
    );
};

export default Addition;
