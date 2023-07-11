import axios from "axios";

const getAllOrders = async () => {
    const res = await axios.get("https://project-the-leads.onrender.com/api/admin/order", {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}` },
    });
    try {
        return await res;
    } catch (err) {
        return err;
    }
};

export default getAllOrders;
