import "./FinanceTable.scss";

const FinanceTable = ({ data, type, demo }) => {
    return (
        <div className="financeTable">
            <div className="financeTable-row financeTable-row--title">
                <div className="financeTable-row-text">Дата</div>
                <div className="financeTable-row-text">Сумма</div>
                <div className="financeTable-row-text">{type === "offs" ? "ID заявки" : "Статус платежа"}</div>
            </div>
            {data.map(({ time, price, id, _id }) => (
                <div className="financeTable-row financeTable-row--content">
                    <div className="financeTable-row-text">{time}</div>
                    <div className="financeTable-row-text">{price} руб.</div>
                    <div className="financeTable-row-text">
                        {type === "offs" ? (
                            <span className="financeTable-row-text-id" onClick={() => window.location.href = demo ? `/platform/demo/order/${_id}` : `/platform/order/${_id}`}>{id}</span>
                        ) : (
                            <span
                                className={`financeTable-row-text-status financeTable-row-text-status${
                                    id === "Успешно" ? "--succeded" : id === "Неуспешно" ? "--canceled" : "--process"
                                }`}>
                                {id}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FinanceTable;
