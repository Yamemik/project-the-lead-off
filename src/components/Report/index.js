import "./Report.scss";
const Report = ({ data, type }) => {
	const renderLinksForOrders = arr => {
            try {
                if (arr.length > 0) {
                    return (
                        <>
                            ({arr.map((order, index) => {
                            if (index !== arr.length - 1) {
                                return (
                                    <a
                                        target="_blank"
                                        href={`/platform/admin-panel/order/${order._id}`}
                                    >
                                        {order.number_order},{" "}
                                    </a>
                                )
                            } else {
                                return (
                                    <a
                                        target="_blank"
                                        href={`/platform/admin-panel/order/${order._id}`}
                                    >
                                        {order.number_order}
                                    </a>
                                )
                            }
                        })})
                        </>
                    )
                }
                return <></>
            } catch {}
	};

    const getCategoryLine = () => {
        let str = [data.level_1, "—", "—"]

        if (data?.level_2) {
            str[1] = data.level_2
        }

        if (data?.level_3) {
            str[2] = data.level_3
        }

        return str.join(" / ");
    }

	if (type === "users") {
        return (
            <div className="report">
                <div className="report__block">
                    <h6 className="report__block-subtitle">Входные данные</h6>
                    <div className="report__block-row">
                        Выбранный период:{" "}
                        <span className="report__block-row-value">
						{data.period !== "Другой период"
                            ? data.period.toLowerCase()
                            : `${new Date(data.date_begin).toLocaleDateString()} — ${new Date(data.date_end).toLocaleDateString()}`}
					</span>
                    </div>
                    <div className="report__block-row">
                        Выбранный пользователь:{" "}
                        {data.user !== "Все пользователи" ? (
                            <a
                                href={`/platform/admin-panel/user/${data.user_id}`}
                                target="_blank"
                            >
                                {data.user}
                            </a>
                        ) : (
                            <span className="report__block-row-value">
							все пользователи
						</span>
                        )}
                    </div>
                </div>
                <div className="report__block">
                    <h6 className="report__block-subtitle">Выходные данные</h6>
                    <div className="report__block-row">
                        Принятые заявки:{" "}
                        <span className="report__block-row-value">
						{data.accepted_orders}
					</span>{" "}
                        {renderLinksForOrders(data.accepted_orders_list)}
                    </div>
                    <div className="report__block-row">
                        Активные заявки:{" "}
                        <span className="report__block-row-value">
						{data.active_orders}
					</span>{" "}
                        {renderLinksForOrders(data.active_orders_list)}
                    </div>
                    <div className="report__block-row">
                        Приобретенные заявки:{" "}
                        <span className="report__block-row-value">
						{data.count_buy_orders}
					</span>{" "}
                        {renderLinksForOrders(data.buy_orders)}
                    </div>
                    <div className="report__block-row">
                        Отмененные заявки:{" "}
                        <span className="report__block-row-value">
						{data.canceled_orders}
					</span>{" "}
                        {renderLinksForOrders(data.canceled_orders_list)}
                    </div>
                    <div className="report__block-row">
                        Деактивированные заявки:{" "}
                        <span className="report__block-row-value">
						{data.deactivated_orders}
					</span>{" "}
                        {renderLinksForOrders(data.deactivated_orders_list)}
                    </div>
                    <div className="report__block-row">
                        Средняя цена приобретенных заявок:{" "}
                        <span className="report__block-row-value">
						{data.average_price_buy_orders} руб.
					</span>
                    </div>
                    <div className="report__block-row">
                        Сумма всех приобретенных заявок:{" "}
                        <span className="report__block-row-value">
						{data.sum_price_buy_orders} руб.
					</span>
                    </div>
                </div>
            </div>
        );
    } else if (type === "categories") {
        return (
            <div className="report">
                <div className="report__block">
                    <h6 className="report__block-subtitle">Входные данные</h6>
                    <div className="report__block-row">
                        Выбранный период:{" "}
                        <span className="report__block-row-value">
						{data.period !== "Другой период"
                            ? data.period.toLowerCase()
                            : `${new Date(data.date_begin).toLocaleDateString()} — ${new Date(data.date_end).toLocaleDateString()}`}
					</span>
                    </div>
                    <div className="report__block-row">
                        Глубина поиска:{" "}
                        <span className="report__block-row-value">
						    {data.depth.toLowerCase()}
					    </span>
                    </div>
                    <div className="report__block-row">
                        Категория:{" "}
                        <span className="report__block-row-value">
						    {data.depth === "Все категории" ? "все" : (
                                getCategoryLine()
                            )}
					    </span>
                    </div>
                </div>
                <div className="report__block">
                    <h6 className="report__block-subtitle">Выходные данные</h6>
                    <div className="report__block-row">
                        Принятые заявки:{" "}
                        <span className="report__block-row-value">
						{data.accepted_orders}
					</span>{" "}
                        {renderLinksForOrders(data.accepted_orders_list)}
                    </div>
                    <div className="report__block-row">
                        Отмененные заявки:{" "}
                        <span className="report__block-row-value">
						    {data.canceled_orders}
					    </span>{" "}
                        {renderLinksForOrders(data.canceled_orders_list)}
                    </div>
                    <div className="report__block-row">
                        Опубликованные заявки:{" "}
                        <span className="report__block-row-value">
						    {data.public_orders}
					    </span>{" "}
                        {renderLinksForOrders(data.public_orders_list)}
                    </div>
                </div>
            </div>
        )
    }
};

export default Report;
