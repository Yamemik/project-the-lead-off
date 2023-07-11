import { useParams } from "react-router-dom";

import LayoutPage from "../../../../components/Layouts/LayoutPage";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "../../../../components/Layouts/LayoutBlock";
import Button from "../../../../components/UI/Button";

const AdminPanelUser = () => {
    const params = useParams();
    return (
        <LayoutPage title={`Пользователь №${params?.id}`}>
            <LayoutBlocks>
                <LayoutBlock>
                    <div className="order">
                        <div className="order__row">
                            <div className="order__row-title">Дата регистрации:</div>
                            <div className="order__row-text">24.04.2023</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">ФИО:</div>
                            <div className="order__row-text">Иванов Иван Иванович</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Email:</div>
                            <div className="order__row-text">mail@mail.ru</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Телефон:</div>
                            <div className="order__row-text">
                               + 7 999 999-88-88
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Организация:</div>
                            <div className="order__row-text">частная</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Регион:</div>
                            <div className="order__row-text">
                            Россия / Москва
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Направление бизнеса:</div>
                            <div className="order__row-text">Строительные материалы / Отделочные материалы / Лакокрасочные материалы</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Доступ к закрытым заявкам:</div>
                            <div className="order__row-text">да</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Баланс:</div>
                            <div className="order__row-text">2000 руб.</div>
                        </div>
                    </div>
                </LayoutBlock>
            </LayoutBlocks>
            <div className="order__buttons">
                <Button text="Удалить" />
                <Button type="fill" text="Редактировать" />
            </div>
        </LayoutPage>
    );
};

export default AdminPanelUser;
