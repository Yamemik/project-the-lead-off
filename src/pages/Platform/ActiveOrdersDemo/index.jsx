import { useEffect, useState } from "react";
import LayoutPage from "../../../components/Layouts/LayoutPage";
import Loader from "../../../components/Loader";
import LayoutBlocks from "../../../components/Layouts/LayoutBlocks";
import LayoutBlock from "../../../components/Layouts/LayoutBlock";
import Pagination from "../../../components/Pagination";
import HeaderDemo from "../../../components/HeaderDemo";

const ActiveOrdersDemo = () => {
	const [activeOrders, setActiveOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		JSON.parse(localStorage.getItem("demo")).orders.actives.map(order => {
			setActiveOrders(prev => [...prev, order])
		})
		setIsLoading(false);
	}, []);

	return (
		<>
			<HeaderDemo/>
			<LayoutPage title="Активные заявки">
				<Loader trigger={isLoading} />
				<LayoutBlocks>
					<LayoutBlock title="Фильтры">
						<Pagination
							demo
							setNewData_parent_2={arg => setActiveOrders(arg)}
							items={activeOrders}
							itemsPerPage={5}
							isCanClose
						/>
					</LayoutBlock>
				</LayoutBlocks>
			</LayoutPage>
		</>
	);
};

export default ActiveOrdersDemo;
