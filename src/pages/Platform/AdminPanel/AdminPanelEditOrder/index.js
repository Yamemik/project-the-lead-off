import LayoutBlock from "../../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutPage from "../../../../components/Layouts/LayoutPage";
import Button from "../../../../components/UI/Button";
import Input from "../../../../components/UI/Input";
import Checkbox from "../../../../components/UI/Checkbox";
import DropdownList from "../../../../components/UI/DropdownList";
import { useParams } from "react-router-dom";

const AdminPanelEditOrder = () => {
    const params = useParams();
    return (
        <LayoutPage title={`Редактирование заявки №${params?.id}`}>
            <LayoutBlocks>
                <LayoutBlock>
                    <div className="order order--createUser order--createOrder">
                        <div className="order__row">
                            <div className="order__row-title">Товарная группа / номенклатура:</div>
                            <div className="order__row-text">
                                <DropdownList />
                                <DropdownList />
                                <DropdownList />
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Регион покупателя:</div>
                            <div className="order__row-text">
                                <DropdownList />
                                <DropdownList />
                            </div>
                        </div>
                        <div className="order__row">
                            <textarea placeholder="Текст заявки"/>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Вложения к заявке:</div>
                            <div className="order__row-text">
                                <Input placeholder={"Прикрепить"} type="upload"/>
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Контактные данные:</div>
                            <div className="order__row-text">
                                <Input placeholder={"Email"} />
                                <div className="order__row-text-phones">
                                    <Input placeholder={"Телефон"} />
                                    <div className="order__row-text-phones-add">
                                        <img className="order__row-text-phones-add-icon" src="/img/filters/plus.svg" alt="Добавить номер"/>
                                        <p className="order__row-text-phones-add-text">добавить номер</p>
                                    </div>
                                </div>
                                <Input placeholder={"ФИО"} />
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Оценка:</div>
                            <div className="order__row-text">
                                <DropdownList />
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Тип покупателя:</div>
                            <div className="order__row-text">
                                <Checkbox text="частная организация" />
                                <Checkbox text="государственная организация" />
                                <Checkbox text="неизвестно" />
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Закупка:</div>
                            <div className="order__row-text order__row-text--cg50">
                                <Checkbox text="прямая"/>
                                <Checkbox text="тендер"/>
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Срочная:</div>
                            <div className="order__row-text order__row-text--cg50">
                                <Checkbox text="да"/>
                                <Checkbox text="нет"/>
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Тип заявки:</div>
                            <div className="order__row-text">
                                <DropdownList/>
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Стоимость:</div>
                            <div className="order__row-text">
                                <Input placeholder={"2000"}/>
                            </div>
                        </div>
                    </div>
                </LayoutBlock>
            </LayoutBlocks>
            <div className="order__buttons">
                <Button text="Сбросить" />
                <Button text="Удалить заявку" />
                <Button type="fill" text="Сохранить" />
            </div>
        </LayoutPage>
    );
};

export default AdminPanelEditOrder;
