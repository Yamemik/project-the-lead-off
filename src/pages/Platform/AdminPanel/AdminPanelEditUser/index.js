import LayoutBlock from "../../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutPage from "../../../../components/Layouts/LayoutPage";
import Button from "../../../../components/UI/Button";
import Input from "../../../../components/UI/Input";
import Checkbox from "../../../../components/UI/Checkbox";
import DropdownList from "../../../../components/UI/DropdownList";

const AdminPanelEditUser = () => {
    return <LayoutPage title="Редактирование пользователя">
    <LayoutBlocks>
        <LayoutBlock>
            <div className="order order--createUser">
                <div className="order__row">
                    <div className="order__row-title">ФИО:</div>
                    <div className="order__row-text">
                        <Input placeholder={"ФИО"} />
                    </div>
                </div>
                <div className="order__row">
                    <div className="order__row-title">Email:</div>
                    <div className="order__row-text">
                        <Input placeholder={"Email"} />
                    </div>
                </div>
                <div className="order__row">
                    <div className="order__row-title">Телефон:</div>
                    <div className="order__row-text">
                        <Input placeholder={"Телефон"} />
                        <Input placeholder={"Телефон"} />
                        <img src="/img/filters/plus.svg" alt="" />
                    </div>
                </div>
                <div className="order__row">
                    <div className="order__row-title">Организация:</div>
                    <div className="order__row-text">
                        <Checkbox text="частная организация" />
                        <Checkbox text="государственная организация" />
                    </div>
                </div>
                <div className="order__row">
                    <div className="order__row-title">Регион:</div>
                    <div className="order__row-text">
                        <DropdownList />
                        <DropdownList />
                    </div>
                </div>
                <div className="order__row">
                    <div className="order__row-title">Направление бизнеса:</div>
                    <div className="order__row-text">
                        <DropdownList />
                        <DropdownList />
                        <DropdownList />
                    </div>
                </div>
                <div className="order__row">
                    <div className="order__row-title">Доступ к закрытым заявкам:</div>
                    <div className="order__row-text">
                        <Checkbox text="Да" />
                        <Checkbox text="Нет" />
                    </div>
                </div>
                <div className="order__row">
                    <div className="order__row-title">Баланс:</div>
                    <div className="order__row-text">
                        <Input placeholder={"2000"} />
                    </div>
                </div>
            </div>
        </LayoutBlock>
    </LayoutBlocks>
    <div className="order__buttons">
        <Button text="Сбросить" />
        <Button text="Удалить пользователя" />
        <Button type="fill" text="Сохранить" />
    </div>
</LayoutPage>;
};

export default AdminPanelEditUser;
