import Draggable from "react-draggable";
import "./TableAdminPanel.scss";

const TableAdminPanel = ({ head, data, canEdit, canDelete, canYes, canNo }) => {
    return (
        <>
            {window.innerWidth <= 1420 ? (
                <Draggable
                axis="x"
                >
                        <div className="tableAdminPanel">
                            <div className="tableAdminPanel__head">
                                {head.map(item => (
                                    <div className="tableAdminPanel__head-item">{item}</div>
                                ))}
                            </div>
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
                                    {canEdit && canDelete && (
                                        <div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
                                            <img src="/img/UI/edit.svg" alt="Редактировать" />
                                            <img src="/img/UI/delete.svg" alt="Удалить" />
                                        </div>
                                    )}
                                    {canYes && canNo && (
                                <div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
                                    <img src="/img/adminPanel/yes.svg" alt="Принять" />
                                    <img src="/img/adminPanel/no.svg" alt="Отклонить" />
                                </div>
                            )}
                                </div>
                            ))}
                        </div>
                </Draggable>
            ) : (
                <div className="tableAdminPanel">
                    <div className="tableAdminPanel__head">
                        {head.map(item => (
                            <div className="tableAdminPanel__head-item">{item}</div>
                        ))}
                    </div>
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
                            {canEdit && canDelete && (
                                <div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
                                    <img src="/img/UI/edit.svg" alt="Редактировать" />
                                    <img src="/img/UI/delete.svg" alt="Удалить" />
                                </div>
                            )}
                            {canYes && canNo && (
                                <div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
                                    <img src="/img/adminPanel/yes.svg" alt="Принять" />
                                    <img src="/img/adminPanel/no.svg" alt="Отклонить" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default TableAdminPanel;
