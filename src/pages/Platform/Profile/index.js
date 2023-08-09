import LayoutBlock from "./../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "./../../../components/Layouts/LayoutBlocks";
import LayoutPage from "./../../../components/Layouts/LayoutPage";
import Checkbox from "./../../../components/UI/Checkbox";
import Input from "./../../../components/UI/Input";
import Button from "./../../../components/UI/Button";
import FinanceTable from "../../../components/FinanceTable";
import { useEffect } from "react";
import axios from "../../../utils/axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "../../../components/Loader";

const Profile = () => {
    const [depositSum, setDepositSum] = useState("");

    const [offsItems, setOffsItems] = useState([]);
    const [offsItemsOffset, setOffsItemsOffset] = useState(5);

    const [refillItems, setRefillItems] = useState([]);
    const [refillItemsOffset, setRefillItemsOffset] = useState(5);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/api/user/me/ukassa/getall")
            .then(({ data }) => {
                axios
                    .get("/api/user/me")
                    .then(res => {
                        let arr = [];
                        let arr_2 = [];

                        data.map(item => {
                            if (item.payment.status !== "buy" && item.payment.status !== "refund") {
                                console.log(item);
                                arr = [
                                    ...arr,
                                    {
                                        time: new Date(item.createdAt).toLocaleDateString(),
                                        price: item.payment.amount.value,
                                        id:
                                            item.status === "succeeded"
                                                ? "Успешно"
                                                : item.status === "canceled"
                                                ? "Неуспешно"
                                                : "В процессе",
                                    },
                                ];
                            } else {
                                arr_2 = [
                                    ...arr_2,
                                    {
                                        time: new Date(item.createdAt).toLocaleDateString(),
                                        price: item.payment.sum,
                                        id: item.payment.order.number_order,
                                        _id: item.payment.order._id,
                                    },
                                ];
                            }
                        });

                        setOffsItems(arr_2.reverse());
                        setRefillItems(arr.reverse());

                        localStorage.setItem(
                            "user",
                            JSON.stringify(
                                Object.assign({}, res.data, { token: JSON.parse(localStorage.getItem("user")).token }),
                            ),
                        );

                        setIsLoading(false);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }, []);

    const getCreatedUserDate = () => {
        const date = new Date(JSON.parse(localStorage.getItem("user")).createdAt);
        return date.toLocaleDateString();
    };

    const getUserTelephone = () => {
        const telephone = JSON.parse(localStorage.getItem("user")).telephone;
        return `+7 ${telephone.slice(2, 5)} ${telephone.slice(5, 8)} ${telephone.slice(8, 10)} ${telephone.slice(
            10,
            12,
        )}`;
    };

    const handleDeposit = () => {
        for (const item of document.getElementsByClassName("checkbox__input")) {
            if (!item.checked) {
                toast.error("Согласитесь с офертой");
            } else {
                axios
                    .post("/api/user/me/ukassa", {
                        amount_value: depositSum,
                        type: "redirect",
                        return_url: "http://localhost:3000/platform/profile",
                        description: "Пополнение счета LEAD-OFF",
                        capture: true,
                        metadata: {},
                    })
                    .then(({ data }) => {
                        window.location.href = data.confirmation.confirmation_url;
                    })
                    .catch(err => console.log(err));
            }
        }
    };

    const getOffsHistory = () => {
        return offsItems.slice(0, offsItemsOffset);
    };

    const getRefillHistory = () => {
        return refillItems.slice(0, refillItemsOffset);
    };

    return (
        <LayoutPage title="Личный счёт и информация">
            <Loader trigger={isLoading} />
            <LayoutBlocks addClass="layoutBlocks__profile">
                <LayoutBlock>
                    <ul className="profile__info">
                        <li className="profile__info-row">
                            <span className="profile__info-row-title">Дата регистрации:</span>
                            <span className="profile__info-row-text">{getCreatedUserDate()}</span>
                        </li>
                        <li className="profile__info-row">
                            <span className="profile__info-row-title">ФИО:</span>
                            <span className="profile__info-row-text">
                                {JSON.parse(localStorage.getItem("user")).fio}
                            </span>
                        </li>
                        <li className="profile__info-row">
                            <span className="profile__info-row-title">Email:</span>
                            <span className="profile__info-row-text">
                                {JSON.parse(localStorage.getItem("user")).email}
                            </span>
                        </li>
                        <li className="profile__info-row">
                            <span className="profile__info-row-title">Телефон:</span>
                            <span className="profile__info-row-text">{getUserTelephone()}</span>
                        </li>
                        <li className="profile__info-row">
                            <span className="profile__info-row-title">Организация:</span>
                            <span className="profile__info-row-text">
                                {JSON.parse(localStorage.getItem("user")).organization}
                            </span>
                        </li>
                        <li className="profile__info-row">
                            <span className="profile__info-row-title">Регион:</span>
                            <span className="profile__info-row-text">
                                {JSON.parse(localStorage.getItem("user")).region.join(" / ")}
                            </span>
                        </li>
                        <li className="profile__info-row">
                            <span className="profile__info-row-title">Направление бизнеса:</span>
                            <span className="profile__info-row-text">
                                {JSON.parse(localStorage.getItem("user")).business_line.join(" / ")}
                            </span>
                        </li>
                    </ul>
                </LayoutBlock>
                <LayoutBlock title="Пополнение счета">
                    <div className="profile__deposit-box">
                        <Input
                            addClass={"profile__deposit-box-input"}
                            type="number"
                            placeholder={0}
                            value={depositSum}
                            setValue={text => setDepositSum(text)}
                        />
                        <Button
                            text="Пополнить"
                            type="fill"
                            addClass="profile__deposit-box-button"
                            click={handleDeposit}
                        />
                    </div>
                    <Checkbox addClass="profile__checkbox">
                        Согласен с условиями{" "}
                        <span
                            className="profile__deposit-offert"
                            onClick={() => {
                                for (let item of document.getElementsByClassName("checkbox__input")) {
                                    item.checked = true;
                                }
                                window.open("/landing/docs/offert", "_blank");
                            }}>
                            договора оферты
                        </span>
                    </Checkbox>
                </LayoutBlock>
                <LayoutBlock title="История списаний">
                    <FinanceTable type="offs" data={getOffsHistory()} />
                    {offsItemsOffset < offsItems.length && (
                        <Button text="Посмотреть ещё" click={() => setOffsItemsOffset(prev => prev + 5)} />
                    )}
                </LayoutBlock>
                <LayoutBlock title="История пополнений">
                    <FinanceTable type="transactions" data={getRefillHistory()} />
                    {refillItemsOffset < refillItems.length && (
                        <Button text="Посмотреть ещё" click={() => setRefillItemsOffset(prev => prev + 5)} />
                    )}
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default Profile;
