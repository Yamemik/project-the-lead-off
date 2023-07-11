import LayoutBlock from "./../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "./../../../components/Layouts/LayoutBlocks";
import LayoutPage from "./../../../components/Layouts/LayoutPage";
import Checkbox from "./../../../components/UI/Checkbox";
import Input from "./../../../components/UI/Input";
import Button from "./../../../components/UI/Button";
import FinanceTable from "../../../components/FinanceTable";
import { useEffect } from "react";
import axios from "../../../utils/axios";
import uuid from "react-uuid";

const Profile = () => {
    useEffect(() => {
        axios
            .get("/api/user/me")
            .then(res => {
                localStorage.setItem(
                    "user",
                    JSON.stringify(Object.assign({}, res.data, JSON.parse(localStorage.getItem("user")))),
                );
            })
            .catch(err => console.log(err));
        axios
            .post(
                "/api/user/me/ukassa",
                {
                    amount: "150.00",
                    capture: true,
                    type: "redirect",
                    return_url: "http://localhost:3000/platform/profile"
                },
            )
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }, []);

    const getCreatedUserDate = () => {
        const date = new Date(JSON.parse(localStorage.getItem("user")).createdAt);
        return date.toLocaleDateString();
    };

    const getUserTelephone = () => {
        const telephone = JSON.parse(localStorage.getItem("user")).telephone;
        return `+7 ${telephone.slice(1, 4)} ${telephone.slice(4, 7)} ${telephone.slice(7, 9)} ${telephone.slice(
            9,
            11,
        )}`;
    };

    return (
        <LayoutPage title="Личный счёт и информация">
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
                        <Input addClass={"profile__deposit-box-input"} type="number" placeholder={0} />
                        <Button text="Пополнить" type="fill" addClass="profile__deposit-box-button" />
                    </div>
                    <Checkbox addClass="profile__checkbox">
                        Согласен с условиями <span className="profile__deposit-offert">договора оферты</span>
                    </Checkbox>
                </LayoutBlock>
                <LayoutBlock title="История списаний">
                    <FinanceTable
                        type="offs"
                        data={[
                            {
                                time: "20.04.2023 16:40",
                                price: 1500,
                                id: "542",
                            },
                            {
                                time: "20.04.2023 16:40",
                                price: 1500,
                                id: "531",
                            },
                            {
                                time: "20.04.2023 16:40",
                                price: 950,
                                id: "42",
                            },
                            {
                                time: "20.04.2023 16:40",
                                price: 1800,
                                id: "752",
                            },
                            {
                                time: "20.04.2023 16:40",
                                price: 1200,
                                id: "1030",
                            },
                        ]}
                    />
                    <Button text="Посмотреть ещё" />
                </LayoutBlock>
                <LayoutBlock title="История операций">
                    <FinanceTable
                        type="transactions"
                        data={[
                            {
                                time: "20.04.2023 16:40",
                                price: 1500,
                                id: "542",
                            },
                            {
                                time: "20.04.2023 16:40",
                                price: 1500,
                                id: "531",
                            },
                            {
                                time: "20.04.2023 16:40",
                                price: 950,
                                id: "42",
                            },
                            {
                                time: "20.04.2023 16:40",
                                price: 1800,
                                id: "752",
                            },
                            {
                                time: "20.04.2023 16:40",
                                price: 1200,
                                id: "1030",
                            },
                        ]}
                    />
                    <Button text="Посмотреть ещё" />
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default Profile;
