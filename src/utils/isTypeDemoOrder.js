const isTypeDemoOrder = id => {
	let type = "";

	let suitables = [...JSON.parse(localStorage.getItem("demo")).orders.suitables];
	let sales = [...JSON.parse(localStorage.getItem("demo")).orders.sales];
	let archives = [...JSON.parse(localStorage.getItem("demo")).orders.archives];
	let actives = [...JSON.parse(localStorage.getItem("demo")).orders.actives];

	suitables.map(order => {
		if (Number(order._id) === Number(id)) {
			type = "suitable";
		}
	});
	sales.map(order => {
		if (Number(order._id) === Number(id)) {
			type = "sale";
		}
	});
	archives.map(order => {
		if (Number(order._id) === Number(id)) {
			type = "archive";
		}
	});
	actives.map(order => {
		if (Number(order._id) === Number(id)) {
			type = "active";
		}
	});

	return type;
};

export default isTypeDemoOrder;
