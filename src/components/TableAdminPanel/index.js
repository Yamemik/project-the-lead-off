import Draggable from "react-draggable";
import "./TableAdminPanel.scss";

const TableAdminPanel = ({
    head,
    data,
    canEdit,
    canDelete,
    canSee,
    clickSee,
    canYes,
    canNo,
    clickDelete,
    clickEdit,
    clickYes,
    clickNo,
    isDuplicatesTable,
}) => {
    return (
        <>
            {window.innerWidth <= 1420 ? (
                <Draggable axis="x">
                    <div className="tableAdminPanel">
                        <div className="tableAdminPanel__head">
                            {head.map(item => (
                                <div className="tableAdminPanel__head-item">{item}</div>
                            ))}
                        </div>
                        {data.map(({ _id, id, create_date, login, FIO, phone, region, balance, category }) => (
                            <div className="tableAdminPanel__row">
                                <div className="tableAdminPanel__row-item">{id}</div>
                                <div className="tableAdminPanel__row-item">{create_date}</div>
                                <div className="tableAdminPanel__row-item">{login}</div>
                                <div className="tableAdminPanel__row-item">{FIO}</div>
                                <div className="tableAdminPanel__row-item">{phone}</div>
                                <div className="tableAdminPanel__row-item">{region}</div>
                                <div className="tableAdminPanel__row-item">{balance}</div>
                                <div className="tableAdminPanel__row-item">{category}</div>
                                {canEdit && canDelete && canSee && !isDuplicatesTable && (
                                    <div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
                                        <img
                                            src="/img/adminPanel/eye.svg"
                                            alt="Смотреть"
                                            onClick={() => clickSee(_id)}
                                        />
                                        <img
                                            src="/img/UI/edit.svg"
                                            alt="Редактировать"
                                            onClick={() => clickEdit(_id)}
                                        />
                                        <img src="/img/UI/delete.svg" alt="Удалить" onClick={() => clickDelete(_id)} />
                                    </div>
                                )}
                                {isDuplicatesTable && (
                                    <div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
                                        <img
                                            src="/img/adminPanel/eye.svg"
                                            alt="Смотреть"
                                            onClick={() => clickSee(_id)}
                                        />
                                    </div>
                                )}
                                {canYes && canNo && (
                                    <div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
                                        <img
                                            src="/img/adminPanel/yes.svg"
                                            alt="Принять"
                                            onClick={() => clickYes(_id)}
                                        />
                                        <img
                                            src="/img/adminPanel/no.svg"
                                            alt="Отклонить"
                                            onClick={() => clickNo(_id)}
                                        />
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
                    {data.map(({ _id, id, create_date, login, FIO, phone, region, balance, category }) => (
                        <div className="tableAdminPanel__row">
                            <div className="tableAdminPanel__row-item">{id}</div>
                            <div className="tableAdminPanel__row-item">{create_date}</div>
                            <div className="tableAdminPanel__row-item">{login}</div>
                            <div className="tableAdminPanel__row-item">{FIO}</div>
                            <div className="tableAdminPanel__row-item">{phone}</div>
                            <div className="tableAdminPanel__row-item">{region}</div>
                            <div className="tableAdminPanel__row-item">{balance}</div>
                            <div className="tableAdminPanel__row-item">{category}</div>
                            {canEdit && canDelete && canSee && !isDuplicatesTable && (
                                <div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
                                    <img src="/img/adminPanel/eye.svg" alt="Смотреть" onClick={() => clickSee(_id)} />
                                    <img src="/img/UI/edit.svg" alt="Редактировать" onClick={() => clickEdit(_id)} />
                                    <img src="/img/UI/delete.svg" alt="Удалить" onClick={() => clickDelete(_id)} />
                                </div>
                            )}
                            {isDuplicatesTable && (
                                <div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
                                    <img src="/img/adminPanel/eye.svg" alt="Смотреть" onClick={() => clickSee(_id)} />
                                </div>
                            )}
                            {canYes && canNo && (
                                <div className="tableAdminPanel__row-item tableAdminPanel__row-item-addons">
                                    <img src="/img/adminPanel/yes.svg" alt="Принять" onClick={() => clickYes(_id)} />
                                    <img src="/img/adminPanel/no.svg" alt="Отклонить" onClick={() => clickNo(_id)} />
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
