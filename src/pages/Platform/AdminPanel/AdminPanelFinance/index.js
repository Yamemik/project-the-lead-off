import LayoutPage from "../../../../components/Layouts/LayoutPage";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "../../../../components/Layouts/LayoutBlock";
import DropdownList from "../../../../components/UI/DropdownList";
import Button from "../../../../components/UI/Button";

import "./AdminPanelAnalytic.scss";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const AdminPanelFinance = () => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const [dateRange2, setDateRange2] = useState([null, null]);
    const [startDate2, endDate2] = dateRange2;
    return (
        <LayoutPage title="Аналитика">
            <LayoutBlocks addClass={"adminPanelAnalytic"}>
                <div className="adminPanelAnalytic__box">
                    <LayoutBlock title={"Пользователи и покупки"}>
                        <div className="adminPanelHome__rows">
                            <div className="adminPanelHome__rows-row">
                                Пользователей всего: <span>1 000</span>
                            </div>
                            <div className="adminPanelHome__rows-row">
                                Общий баланс всех пользователей: <span>666</span>
                            </div>
                            <div className="adminPanelHome__rows-row">
                                Покупок всего: <span>1 000</span>
                            </div>
                            <div className="adminPanelHome__rows-row">
                                Оплачено сегодня: <span>666</span>
                            </div>
                        </div>
                    </LayoutBlock>
                    <LayoutBlock title={"Заявки"}>
                        <div className="adminPanelHome__rows">
                            <div className="adminPanelHome__rows-row">
                                Активные / закрытые / уцененные заявки: <span>24</span> / <span>16</span> /{" "}
                                <span>3</span>
                            </div>
                            <div className="adminPanelHome__rows-row">
                                Принятые / отклоненные заявки: <span>24</span> / <span>16</span>
                            </div>
                            <div className="adminPanelHome__rows-row">
                                Средняя стоимость заявки: <span>650 руб.</span>
                            </div>
                            <div className="adminPanelHome__rows-row">
                                Заявок в работе: <span>1 000</span>
                            </div>
                            <div className="adminPanelHome__rows-row">
                                Общая стоимость: <span>666</span>
                            </div>
                        </div>
                    </LayoutBlock>
                </div>
                <LayoutBlock title={"Отчеты по пользователям"}>
                    <div className="adminPanelAnalytic__dropdowns">
                        <DropdownList label={"Выберите тип отчета:"} />
                        <DropdownList label={"Выберите пользователя:"} />
                        <DatePicker
                            placeholderText="Выберите период"
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={update => {
                                setDateRange(update);
                            }}
                        />
                        <Button text="Сбросить поля" />
                        <Button text="Сформировать отчет" type="fill" />
                    </div>
                </LayoutBlock>
                <LayoutBlock title={"Отчеты по категориям"}>
                    <div className="adminPanelAnalytic__dropdowns">
                        <DropdownList label={"Выберите тип отчета:"} />
                        <DropdownList label={"Выберите категорию (1):"} />
                        <DatePicker
                            placeholderText="Выберите период"
                            selectsRange={true}
                            startDate={startDate2}
                            endDate={endDate2}
                            onChange={update => {
                                setDateRange2(update);
                            }}
                        />
                        <Button text="Сбросить поля" />
                        <Button text="Сформировать отчет" type="fill" />
                    </div>
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default AdminPanelFinance;
