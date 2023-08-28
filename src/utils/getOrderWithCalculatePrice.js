import axios from "./axios";
import getDifferenceBetweenTwoDates from "./getDifferenceBetweenTwoDates";

const getOrderWithCalculatePrice = async (
	order,
	user,
	is_sale_order = false,
) => {
	const { data } = await axios.get("/api/admin/settings/setting");
	const rates = await data[0].settings[0].rates;

	let res = await axios.get("/api/admin/settings/category");

	let base_category_price = 1;
	let rate_order_region = 1;
	let rate_user_number_regions = 1;
	let rate_user_tariff = 1;
	let rate_type_buyer = 1;
	let rate_type_purchase = 1;
	let rate_urgent = 1;
	let rate_express = 1;
	let rate_score = 1;
	let rate_sale = 1;

	try {
		base_category_price = await res.data.find(
			item => item.category[0] === order.nomeclature[0][0],
		).basePrice;
	} catch {}

	try {
	
		if (order.region[1].toLowerCase() === "вся") {
			rate_order_region = await +rates.countries.find(
				item => item.title === order.region[0],
			).rate;
		} else {
			rate_order_region = await +rates.regions.find(
				item => item.title === order.region[1],
			).rate;
		}
		
	} catch {}

	if (getDifferenceBetweenTwoDates(order.createdAt, new Date()) < 24) {
		rate_express = +rates.extra[3];
	}

	let counter_regions = 0;
	user.region.map(region => {
		if (region[1].toLowerCase() === "вся") {
			counter_regions += 3;
		} else {
			counter_regions += 1;
		}
	});

	if (counter_regions === 1) {
		rate_user_number_regions = +rates.countRegions[0];
	} else if (counter_regions === 2) {
		rate_user_number_regions = +rates.countRegions[1];
	} else {
		rate_user_number_regions = +rates.countRegions[2];
	}

	if (user.access_to_open) {
		rate_user_tariff = +rates.extra[1];
	}

	rate_type_buyer =
		order.type_buyer === "частная организация"
			? +rates.buyer[0]
			: order.type_buyer === "государственная организация"
			? +rates.buyer[1]
			: 1;

	rate_type_purchase =
		order.type_order === "прямая"
			? +rates.type_buyer[0]
			: order.type_order === "тендер"
			? +rates.type_buyer[1]
			: 1;

	rate_score =
		order.score === "мелкая"
			? +rates.score[0]
			: order.score === "средняя"
			? +rates.score[1]
			: order.score === "крупная"
			? +rates.score[2]
			: order.score === "крупная+"
			? +rates.score[3]
			: 1;

	rate_urgent = order.is_urgent === "да" ? +rates.extra[0] : 1;

	if (is_sale_order) {
		rate_sale = +rates.extra[2];
	}

/*	const average_count = 7

	const price = await (base_category_price *
		((rate_order_region +
			rate_user_number_regions +
			rate_user_tariff +
			rate_type_buyer +
			rate_type_purchase +
			rate_urgent +
			rate_express +
			rate_score +
			rate_sale) /
			average_count));*/

	let average_count = 0
	let average_rate = 0

	if (rate_order_region !== 1) {
		average_count += 1
		average_rate += rate_order_region
	}

	if (rate_user_number_regions !== 1) {
		average_count += 1
		average_rate += rate_user_number_regions
	}

	if (rate_user_tariff !== 1) {
		average_count += 1
		average_rate += rate_user_tariff
	}

	if (rate_type_buyer !== 1) {
		average_count += 1
		average_rate += rate_type_buyer
	}

	if (rate_type_purchase !== 1) {
		average_count += 1
		average_rate += rate_type_purchase
	}

	if (rate_urgent !== 1) {
		average_count += 1
		average_rate += rate_urgent
	}

	if (rate_express !== 1) {
		average_count += 1
		average_rate += rate_express
	}

	if (rate_score !== 1) {
		average_count += 1
		average_rate += rate_score
	}

	if (rate_sale !== 1) {
		average_count += 1
		average_rate += rate_sale
	}

	const price = base_category_price * (average_rate / average_count)

	if (user?.is_admin && localStorage.getItem("debug_mode") === "on") {
		console.log({
			order_id: order.number_order,
			base_category_price,
			rate_order_region,
			rate_user_number_regions,
			rate_user_tariff,
			rate_type_buyer,
			rate_type_purchase,
			rate_urgent,
			rate_express,
			rate_score,
			rate_sale,
			average_count,
			average_rate
		});
	}

	return { ...order, price: Math.ceil(+price / 5) * 5 };
};

export default getOrderWithCalculatePrice;
