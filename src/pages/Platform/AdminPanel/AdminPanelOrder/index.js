import { useParams } from "react-router-dom";

import LayoutBlock from "../../../../components/Layouts/LayoutBlock";
import LayoutBlocks from "../../../../components/Layouts/LayoutBlocks";
import LayoutPage from "../../../../components/Layouts/LayoutPage";
import Button from "../../../../components/UI/Button";

const AdminPanelOrder = () => {
    const params = useParams();
    return (
        <LayoutPage title={`Заявка №${params?.id}`}>
            <LayoutBlocks>
                <LayoutBlock>
                    <div className="order">
                        <div className="order__row">
                            <div className="order__row-title">Дата создания:</div>
                            <div className="order__row-text">24.04.2023</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Товарная группа / номенклатура:</div>
                            <div className="order__row-text">Строительные материалы / Отделочные материалы</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Регион покупателя:</div>
                            <div className="order__row-text">Россия / Москва</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Текст заявки:</div>
                            <div className="order__row-text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit pariatur excepturi
                                mollitia sint unde porro quis maxime cupiditate distinctio sequi dignissimos accusantium
                                ipsam error magni, reprehenderit quisquam vel, totam quibusdam. Quisquam quas nihil
                                perferendis, facilis adipisci perspiciatis excepturi voluptatum velit voluptas non aut
                                sapiente, necessitatibus delectus libero sint accusantium, neque rem dolor pariatur
                                deleniti id animi aspernatur optio! Odit, harum! Natus non, qui explicabo, animi saepe
                                vero, rem exercitationem vel laudantium voluptates odit. Dolorem et nihil ullam, non
                                dignissimos ad modi quasi sed aliquid cum quos quisquam pariatur debitis beatae.
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Вложения к заявке:</div>
                            <div className="order__row-text">image.png</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Контактные данные:</div>
                            <div className="order__row-text">
                                {
                                    window.innerWidth <= 768 ? (
                                        <>
                                        email@mail.ru<br/>
                                        + 7 999 999-99-99<br/>
                                        Иванов Иван Иванович
                                        </>
                                    ) : (
                                        <pre>email@mail.ru      + 7 999 999-99-99       Иванов Иван Иванович</pre>
                                    )
                                }
                            </div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Оценка:</div>
                            <div className="order__row-text">Крупная</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Тип покупателя:</div>
                            <div className="order__row-text">Частная организация</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Закупка:</div>
                            <div className="order__row-text">Тендер</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Срочная:</div>
                            <div className="order__row-text">Да</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Тип заявки:</div>
                            <div className="order__row-text">Открытая</div>
                        </div>
                        <div className="order__row">
                            <div className="order__row-title">Стоимость:</div>
                            <div className="order__row-text">900 руб.</div>
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
}

export default AdminPanelOrder