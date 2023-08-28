import getDifferenceBetweenTwoDates from "./getDifferenceBetweenTwoDates";

const hasCategories = (arr1, arr2) => {
    let flag = false
    let arr1_filtered = arr1[0].filter(item => item !== "")

    arr2.map(item => {
        let item_filtered = item.filter(i => i!== "")
        if (item_filtered.length === 1) {
            if (item_filtered[0] === arr1_filtered[0]) {
                flag = true
            }
        }
        if (item_filtered.length === 2) {
            if (item_filtered[0] === arr1_filtered[0] && item_filtered[1] === arr1_filtered[1]) {
                flag = true
            }
        }
        if (item_filtered.length === 3) {
            if (item_filtered[0] === arr1_filtered[0] && item_filtered[1] === arr1_filtered[1] && item_filtered[2] === arr1_filtered[2]) {
                flag = true
            }
        }
    })

    return flag
};

const hasRegions = (order_arr, user_arr) => {
    let flag = false

    user_arr.map(user_region => {
        if ((user_region[1] === "Вся") && (user_region[0] === order_arr[0])) {
            flag = true
        }
        if ((user_region[0] === order_arr[0]) && (user_region[1] === order_arr[1])) {
            flag = true
        }
    })

    return flag
}

const isSuitableOrder = (order, is_sale_page=false) => {
	if (order) {
		if (is_sale_page) {
            if (
                (order?.answer === "" || !order?.answer) &&
                !order.is_buy &&
                order.is_sale &&
                !order.is_canceled &&
                hasCategories(
                    order.nomeclature,
                    JSON.parse(localStorage.getItem("user")).business_line,
                ) &&
                hasRegions(
                    order.region,
                    JSON.parse(localStorage.getItem("user")).region,
                )
            ) {
                return true;
            }
        } else {
            if (
                (order?.answer === "" || !order?.answer) &&
                !order.is_buy &&
                (!order.is_sale) &&
                !order.is_canceled &&
                getDifferenceBetweenTwoDates(order?.createdAt, new Date()) <= 72 &&
                hasCategories(
                    order.nomeclature,
                    JSON.parse(localStorage.getItem("user")).business_line,
                ) &&
                hasRegions(
                    order.region,
                    JSON.parse(localStorage.getItem("user")).region,
                )
            ) {
                return true;
            }
        }
	}
	return false;
};

export default isSuitableOrder;