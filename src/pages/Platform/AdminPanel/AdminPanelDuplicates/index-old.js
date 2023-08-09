import LayoutPage from "../../../../components/Layouts/LayoutPage";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "../../../../components/Layouts/LayoutBlock";
import Button from "../../../../components/UI/Button";
import Draggable from "react-draggable";

const AdminPanelDuplicates = () => {
    const data = [
        {
            id: 1,
            create_date: "23.04.2023",
            login: "Строй. материалы",
            FIO: "Лаки и краски",
            phone: "Москва",
            region: "Крупная",
            balance: "900 руб.",
            category: "Новая",
        },
        {
            id: 1,
            create_date: "23.04.2023",
            login: "Строй. материалы",
            FIO: "Лаки и краски",
            phone: "Москва",
            region: "Крупная",
            balance: "900 руб.",
            category: "Новая",
        },
        {
            id: 1,
            create_date: "23.04.2023",
            login: "Строй. материалы",
            FIO: "Лаки и краски",
            phone: "Москва",
            region: "Крупная",
            balance: "900 руб.",
            category: "Новая",
        },
    ];

    return (
        <LayoutPage title="Работа с дублями" isDuplicatesTable>
            <LayoutBlocks>
                <LayoutBlock>
                    {window.innerWidth <= 1420 ? (
                        <Draggable axis="x">
                            <div className="tableAdminPanel tableAdminPanel--duplicates">
                                <div className="tableAdminPanel__head">
                                    {[
                                        "ID",
                                        "Дата создания",
                                        "Товарная группа",
                                        "Номенклатура",
                                        "Регион",
                                        "Оценка",
                                        "Стоимость",
                                        "Статус",
                                    ].map(item => (
                                        <div className="tableAdminPanel__head-item">{item}</div>
                                    ))}
                                </div>
                                <div className="tableAdminPanel__duplicatesBox">
                                    {data.map(({ id, create_date, login, FIO, phone, region, balance, category }) => (
                                        <div className="tableAdminPanel__row">
                                            <div className="tableAdminPanel__row-item">{id}</div>
                                            <div className="tableAdminPanel__row-item">{create_date}</div>
                                            <div className="tableAdminPanel__row-item">{login}</div>
                                            <div className="tableAdminPanel__row-item">{FIO}</div>
                                            <div className="tableAdminPanel__row-item">{phone}</div>
                                            <div className="tableAdminPanel__row-item">{region}</div>
                                            <div className="tableAdminPanel__row-item">{balance}</div>
                                            <div className="tableAdminPanel__row-item">{category}</div>
                                            <div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
                                                <img src="/img/UI/edit.svg" alt="Редактировать" />
                                                <img src="/img/UI/delete.svg" alt="Удалить" />
                                            </div>
                                            <div class="tableAdminPanel__row--bg"></div>
                                        </div>
                                    ))}
                                    <Button text="Объединить" type="fill" />
                                </div>
                                <div className="tableAdminPanel__duplicatesBox">
                                    {data.map(({ id, create_date, login, FIO, phone, region, balance, category }) => (
                                        <div className="tableAdminPanel__row">
                                            <div className="tableAdminPanel__row-item">{id}</div>
                                            <div className="tableAdminPanel__row-item">{create_date}</div>
                                            <div className="tableAdminPanel__row-item">{login}</div>
                                            <div className="tableAdminPanel__row-item">{FIO}</div>
                                            <div className="tableAdminPanel__row-item">{phone}</div>
                                            <div className="tableAdminPanel__row-item">{region}</div>
                                            <div className="tableAdminPanel__row-item">{balance}</div>
                                            <div className="tableAdminPanel__row-item">{category}</div>
                                            <div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
                                                <img src="/img/UI/edit.svg" alt="Редактировать" />
                                                <img src="/img/UI/delete.svg" alt="Удалить" />
                                            </div>
                                            <div class="tableAdminPanel__row--bg"></div>
                                        </div>
                                    ))}
                                    <Button text="Объединить" type="fill" />
                                </div>
                                <div className="tableAdminPanel__duplicatesBox">
                                    {data.map(({ id, create_date, login, FIO, phone, region, balance, category }) => (
                                        <div className="tableAdminPanel__row">
                                            <div className="tableAdminPanel__row-item">{id}</div>
                                            <div className="tableAdminPanel__row-item">{create_date}</div>
                                            <div className="tableAdminPanel__row-item">{login}</div>
                                            <div className="tableAdminPanel__row-item">{FIO}</div>
                                            <div className="tableAdminPanel__row-item">{phone}</div>
                                            <div className="tableAdminPanel__row-item">{region}</div>
                                            <div className="tableAdminPanel__row-item">{balance}</div>
                                            <div className="tableAdminPanel__row-item">{category}</div>
                                            <div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
                                                <img src="/img/UI/edit.svg" alt="Редактировать" />
                                                <img src="/img/UI/delete.svg" alt="Удалить" />
                                            </div>
                                            <div class="tableAdminPanel__row--bg"></div>
                                        </div>
                                    ))}
                                    <Button text="Объединить" type="fill" />
                                </div>
                            </div>
                        </Draggable>
                    ) : (
                        <div className="tableAdminPanel tableAdminPanel--duplicates">
                            <div className="tableAdminPanel__head">
                                {[
                                    "ID",
                                    "Дата создания",
                                    "Товарная группа",
                                    "Номенклатура",
                                    "Регион",
                                    "Оценка",
                                    "Стоимость",
                                    "Статус",
                                ].map(item => (
                                    <div className="tableAdminPanel__head-item">{item}</div>
                                ))}
                            </div>
                            <div className="tableAdminPanel__duplicatesBox">
                                {data.map(({ id, create_date, login, FIO, phone, region, balance, category }) => (
                                    <div className="tableAdminPanel__row">
                                        <div className="tableAdminPanel__row-item">{id}</div>
                                        <div className="tableAdminPanel__row-item">{create_date}</div>
                                        <div className="tableAdminPanel__row-item">{login}</div>
                                        <div className="tableAdminPanel__row-item">{FIO}</div>
                                        <div className="tableAdminPanel__row-item">{phone}</div>
                                        <div className="tableAdminPanel__row-item">{region}</div>
                                        <div className="tableAdminPanel__row-item">{balance}</div>
                                        <div className="tableAdminPanel__row-item">{category}</div>
                                        <div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
                                            <img src="/img/UI/edit.svg" alt="Редактировать" />
                                            <img src="/img/UI/delete.svg" alt="Удалить" />
                                        </div>
                                        <div class="tableAdminPanel__row--bg"></div>
                                    </div>
                                ))}
                                <Button text="Объединить" type="fill" />
                            </div>
                            <div className="tableAdminPanel__duplicatesBox">
                                {data.map(({ id, create_date, login, FIO, phone, region, balance, category }) => (
                                    <div className="tableAdminPanel__row">
                                        <div className="tableAdminPanel__row-item">{id}</div>
                                        <div className="tableAdminPanel__row-item">{create_date}</div>
                                        <div className="tableAdminPanel__row-item">{login}</div>
                                        <div className="tableAdminPanel__row-item">{FIO}</div>
                                        <div className="tableAdminPanel__row-item">{phone}</div>
                                        <div className="tableAdminPanel__row-item">{region}</div>
                                        <div className="tableAdminPanel__row-item">{balance}</div>
                                        <div className="tableAdminPanel__row-item">{category}</div>
                                        <div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
                                            <img src="/img/UI/edit.svg" alt="Редактировать" />
                                            <img src="/img/UI/delete.svg" alt="Удалить" />
                                        </div>
                                        <div class="tableAdminPanel__row--bg"></div>
                                    </div>
                                ))}
                                <Button text="Объединить" type="fill" />
                            </div>
                            <div className="tableAdminPanel__duplicatesBox">
                                {data.map(({ id, create_date, login, FIO, phone, region, balance, category }) => (
                                    <div className="tableAdminPanel__row">
                                        <div className="tableAdminPanel__row-item">{id}</div>
                                        <div className="tableAdminPanel__row-item">{create_date}</div>
                                        <div className="tableAdminPanel__row-item">{login}</div>
                                        <div className="tableAdminPanel__row-item">{FIO}</div>
                                        <div className="tableAdminPanel__row-item">{phone}</div>
                                        <div className="tableAdminPanel__row-item">{region}</div>
                                        <div className="tableAdminPanel__row-item">{balance}</div>
                                        <div className="tableAdminPanel__row-item">{category}</div>
                                        <div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
                                            <img src="/img/UI/edit.svg" alt="Редактировать" />
                                            <img src="/img/UI/delete.svg" alt="Удалить" />
                                        </div>
                                        <div class="tableAdminPanel__row--bg"></div>
                                    </div>
                                ))}
                                <Button text="Объединить" type="fill" />
                            </div>
                        </div>
                    )}
                </LayoutBlock>
            </LayoutBlocks>
        </LayoutPage>
    );
};

export default AdminPanelDuplicates;
