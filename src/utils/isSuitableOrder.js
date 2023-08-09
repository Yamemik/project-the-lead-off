import getDifferenceBetweenTwoDates from "./getDifferenceBetweenTwoDates"

const isSuitableOrder = (order) => {
    if (order) {
        if (!order?.answer && !order.is_buy && !order.is_sale & !order.is_canceled && getDifferenceBetweenTwoDates(order?.createdAt, new Date()) <= 72 && !order?.is_sale) {
            return true
        }
    }
    return false
}

export default isSuitableOrder