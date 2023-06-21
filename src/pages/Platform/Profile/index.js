import LayoutBlock from "./../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "./../../../components/Layouts/LayoutBlocks";
import LayoutPage from "./../../../components/Layouts/LayoutPage";
import Checkbox from "./../../../components/UI/Checkbox";
import Input from "./../../../components/UI/Input";
import Button from "./../../../components/UI/Button";
import FinanceTable from "../../../components/FinanceTable";

const Profile = () => {
    return (
        <LayoutPage title="Личный счёт и информация">
            <LayoutBlocks addClass="layoutBlocks__profile">
                <LayoutBlock>
                    <ul className="profile__info">
                        <li className="profile__info-row">
                            <span className="profile__info-row-title">Дата регистрации:</span>
                            <span className="profile__info-row-text">24.04.2023</span>
                        </li>
                        <li className="profile__info-row">
                            <span className="profile__info-row-title">ФИО:</span>
                            <span className="profile__info-row-text">Петренко Иван Сергеевич</span>
                        </li>
                        <li className="profile__info-row">
                            <span className="profile__info-row-title">Email:</span>
                            <span className="profile__info-row-text">email@mail.ru</span>
                        </li>
                        <li className="profile__info-row">
                            <span className="profile__info-row-title">Телефон:</span>
                            <span className="profile__info-row-text">+ 7 999 999-99-99</span>
                        </li>
                        <li className="profile__info-row">
                            <span className="profile__info-row-title">Организация:</span>
                            <span className="profile__info-row-text">частная</span>
                        </li>
                        <li className="profile__info-row">
                            <span className="profile__info-row-title">Регион:</span>
                            <span className="profile__info-row-text">Россия / Москва</span>
                        </li>
                        <li className="profile__info-row">
                            <span className="profile__info-row-title">Направление бизнеса:</span>
                            <span className="profile__info-row-text">
                                Строительные материалы / Отделочные материалы / Лакокрасочные материалы
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
