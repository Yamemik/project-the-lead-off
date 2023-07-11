import axios from "axios";
import "./Addition.scss";

const Addition = ({ item_id, name }) => {
    return (
        <div
            onClick={() => {
                if (name === "close") {
                    axios
                        .patch(`/api/admin/order/${item_id}`, {})
                        .then(res => res)
                        .catch(err => console.log(err));
                }
            }}
            className={`addition ${name === "cart" ? "addition--cart" : ""} ${
                name === "sale" ? "addition--sale" : ""
            } ${name === "close" ? "addition--close" : ""}`}>
            <img className="addition__img" src={`/img/tableRow/additions/${name}.svg`} alt="" />
        </div>
    );
};

export default Addition;
