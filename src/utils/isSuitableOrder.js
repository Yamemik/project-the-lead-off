import getDifferenceBetweenTwoDates from "./getDifferenceBetweenTwoDates";

const hasArray = (arr1, arr2) => {
    return arr2.some(item => item[0] === arr1[0][0] && item[1] === arr1[0][1] && item[2] === arr1[0][2]);
};

const isSuitableOrder = order => {
    if (order) {
        if (
            !order?.answer &&
            !order.is_buy &&
            !order.is_sale &&
            !order.is_canceled &&
            getDifferenceBetweenTwoDates(order?.createdAt, new Date()) <= 72 &&
            !order?.is_sale &&
            hasArray(order.nomeclature, JSON.parse(localStorage.getItem("user")).business_line)
        ) {
            return true;
        }
    }
    return false;
};

export default isSuitableOrder;