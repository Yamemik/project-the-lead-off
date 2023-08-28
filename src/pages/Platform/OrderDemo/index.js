import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LayoutPage from "../../../components/Layouts/LayoutPage";
import Loader from "../../../components/Loader";
import Button from "../../../components/UI/Button";
import axios from "../../../utils/axios";
import { toast } from "react-hot-toast";
import LayoutBlocks from "../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "../../../components/Layouts/LayoutBlock";
import isTypeDemoOrder from "../../../utils/isTypeDemoOrder";
import HeaderDemo from "../../../components/HeaderDemo";
import getFormatUserTelephone from "../../../utils/getFormatUserTelephone";

const OrderDemo = () => {
	const params = useParams();
	const [order, setOrder] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const [demoData, setDemoData] = useState({});

	useEffect(() => {
		let allOrders = [
			...JSON.parse(localStorage.getItem("demo")).orders.suitables,
			...JSON.parse(localStorage.getItem("demo")).orders.sales,
			...JSON.parse(localStorage.getItem("demo")).orders.archives,
			...JSON.parse(localStorage.getItem("demo")).orders.actives,
		];
		allOrders.map(order => {
			if (Number(order._id) === Number(params.id)) {
				setOrder(order);
			}
		});
		setDemoData(JSON.parse(localStorage.getItem("demo")));
		setIsLoading(false);
	}, [params]);

	const getCreatedOrderDate = () => {
		const date = new Date(order?.createdAt);
		return date.toLocaleDateString();
	};

	return (
		<>
			<HeaderDemo />
			<LayoutPage title={`Заявка №${order?.number_order}`}>
				<Loader trigger={isLoading} />
				<LayoutBlocks>
					<LayoutBlock>
						{order && (
							<div className="order">
								<div className="order__row">
									<div className="order__row-title">
										Дата создания:
									</div>
									<div className="order__row-text">
										{getCreatedOrderDate()}
									</div>
								</div>
								<div className="order__row">
									<div className="order__row-title">
										Направление бизнеса:
									</div>
									<div className="order__row-text">
										{order.nomeclature[0].join(" / ")}
									</div>
								</div>
								<div className="order__row">
									<div className="order__row-title">
										Регион покупателя:
									</div>
									<div className="order__row-text">
										{order.region.join(" / ")}
									</div>
								</div>
								<div className="order__row">
									<div className="order__row-title">
										Контактные данные:
									</div>
									<div className="order__row-text">
										{window.innerWidth <= 768 ? (
											<>

												123qwerty@mail.ru
												<br />
												+79997030210
												<br />
												Сидр Петрович Иванов
											</>
										) : (
											<pre>
											123qwerty@mail.ru{" "}
												+79997030210{" "}
												Сидр Петрович Иванов
										</pre>
										)}
									</div>
								</div>
								<div className="order__row">
									<div className="order__row-title">
										Оценка:
									</div>
									<div className="order__row-text">
										{order.score}
									</div>
								</div>
								<div className="order__row">
									<div className="order__row-title">
										Тип покупателя:
									</div>
									<div className="order__row-text">
										{order.type_buyer}
									</div>
								</div>
								<div className="order__row">
									<div className="order__row-title">
										Закупка:
									</div>
									<div className="order__row-text">
										{order.type_order}
									</div>
								</div>
								<div className="order__row">
									<div className="order__row-title">
										Срочная:
									</div>
									<div className="order__row-text">
										{order.is_urgent}
									</div>
								</div>
								<div className="order__row">
									<div className="order__row-title">
										Стоимость:
									</div>
									<div className="order__row-text">
										{order.price} руб.
									</div>
								</div>
							</div>
						)}
					</LayoutBlock>
				</LayoutBlocks>
				<div className="order__buttons">
					{isTypeDemoOrder(params.id) === "active" && (
						<Button
							type="fill"
							text="В архив"
							click={() => {
								localStorage.setItem(
									"demo",
									JSON.stringify({
										...JSON.parse(localStorage.getItem("demo")),
										orders: {
											...JSON.parse(localStorage.getItem("demo")).orders,
											actives: [
												...JSON.parse(localStorage.getItem("demo")).orders.sales.filter(item => Number(item._id)!== Number(params.id))
											],
											archives: [
												...JSON.parse(localStorage.getItem("demo")).orders.archives,
												{...order, is_archive_date: new Date().toISOString()}
											]
										}
									}),
								);
								toast.success("Заявка успешно перемещена в архив");
								setTimeout(() => {
									window.location.href =
										"/platform/demo/archive-orders";
								}, 1200);
								/*axios
									.patch(
										`/api/user/order/setIsArchive/${order?._id}`,
										{ is_archive: true },
									)
									.then(
										_ =>
											(window.location.href =
												"/platform/active-orders"),
									)
									.catch(err => {
										console.log(err);
										toast.error(
											"Ошибка при добавлении заявки в архив",
										);
									});*/
							}}
						/>
					)}
					{(isTypeDemoOrder(params.id) === "suitable" ||
						isTypeDemoOrder(params.id) === "sale") && (
						<Button
							type="fill"
							text="Купить"
							click={() => {
								localStorage.setItem(
									"demo",
									JSON.stringify({
										...JSON.parse(localStorage.getItem("demo")),
										finance_history: [
											...JSON.parse(localStorage.getItem("demo"))
												.finance_history,
											{
												date: new Date().toLocaleDateString(),
												sum: order.price,
												status: order._id,
												event: "buy"
											},
										],
										balance:
											Number(
												JSON.parse(
													localStorage.getItem("demo"),
												).balance,
											) - Number(order.price),
										orders: {
											...JSON.parse(localStorage.getItem("demo")).orders,
											actives: [
												...JSON.parse(localStorage.getItem("demo")).orders.actives,
												order
											],
											sales: [...demoData.orders.sales.filter(item => Number(item._id)!== Number(params.id))],
											suitables: [...demoData.orders.suitables.filter(item => Number(item._id)!== Number(params.id))],
										}
									}),
								);
								toast.success("Заявка успешно куплена");
								setTimeout(() => {
									window.location.href =
										"/platform/demo/active-orders";
								}, 1200);
							}}
						/>
					)}
				</div>
			</LayoutPage>
		</>
	);
};

export default OrderDemo;
