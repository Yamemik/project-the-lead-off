import axios from "../../../utils/axios";
import "./Addition.scss";
import { toast } from "react-hot-toast";

const Addition = ({ item_id, name, setNewData, orderSum, setRejectPopup, setRejectID, demo, order }) => {
    return (
        <>
            <div
                onClick={() => {
                    if (name === "close") {
                        setRejectPopup();
                        setRejectID(item_id);
                    } else if (name === "cart") {
                        if (demo) {
                            localStorage.setItem(
                                "demo",
                                JSON.stringify({
                                    ...JSON.parse(localStorage.getItem("demo")),
                                    finance_history: [
                                        ...JSON.parse(localStorage.getItem("demo"))
                                            .finance_history,
                                        {
                                            date: new Date().toLocaleDateString(),
                                            sum: order.price,
                                            status: order._id,
                                            event: "buy"
                                        },
                                    ],
                                    balance:
                                        Number(
                                            JSON.parse(
                                                localStorage.getItem("demo"),
                                            ).balance,
                                        ) - Number(order.price),
                                    orders: {
                                        ...JSON.parse(localStorage.getItem("demo")).orders,
                                        actives: [
                                            ...JSON.parse(localStorage.getItem("demo")).orders.actives,
                                            order
                                        ],
                                        sales: [...JSON.parse(localStorage.getItem("demo")).orders.sales.filter(item => Number(item._id)!== Number(order._id))],
                                        suitables: [...JSON.parse(localStorage.getItem("demo")).orders.suitables.filter(item => Number(item._id)!== Number(order._id))],
                                    }
                                }),
                            );
                            toast.success("Заявка успешно куплена");
                            setTimeout(() => {
                                window.location.href =
                                    "/platform/demo/active-orders";
                            }, 1200);
                        } else {
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
