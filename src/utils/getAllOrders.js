import axios from "../utils/axios";

const getAllOrders = async () => {
    const res = await axios.get("/api/admin/order");
    try {
        return await res;
    } catch (err) {
        return err;
    }
};

export default getAllOrders;
