import "./FinanceTable.scss";

const FinanceTable = ({ data, type }) => {
    return (
        <div className="financeTable">
            <div className="financeTable-row financeTable-row--title">
                <div className="financeTable-row-text">Дата</div>
                <div className="financeTable-row-text">Стоимость заявки</div>
                <div className="financeTable-row-text">
                    {
                        type === "offs" ? "ID заявки" : "Изменение баланса"
                    }
                </div>
            </div>
            {data.map(({ time, price, id }) => (
                <div className="financeTable-row financeTable-row--content">
                    <div className="financeTable-row-text">{time}</div>
                    <div className="financeTable-row-text">{price} руб.</div>
                    <div className="financeTable-row-text">
                        {type === "offs" ? <span className="financeTable-row-text-id">{id}</span> : price + ' руб.'}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FinanceTable;
