import axios from "../../../utils/axios";
import "./Addition.scss";

const Addition = ({ item_id, name, setNewData }) => {
    return (
        <div
            onClick={() => {
                if (name === "close") {
                    axios
                        .patch(`/api/admin/order/${item_id}`, {
                            user: {},
                            is_buy: false,
                        })
                        .then(res => axios.get("/api/user/orders/all").then(({ data }) => setNewData(data)))
                        .catch(err => console.log(err))
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
