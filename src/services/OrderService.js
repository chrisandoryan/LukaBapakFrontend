import Request from "../utilities/Request";

class OrderService {
    getOrders() {
        return Request.makeToProtected("GET", "transactions");
    }

    acceptOrRejectOrder(order_id, data) {
        return Request.makeToProtected("PUT", `transactions/${order_id}`, data);
    }
}

export default OrderService;