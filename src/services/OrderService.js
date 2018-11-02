import Request from "../utilities/Request";

class OrderService {
    getOrders() {
        return Request.makeToProtected("GET", "transactions");
    }

    acceptOrRejectOrder(order_id, data) {
        return Request.makeToProtected("POST", `transactions/${order_id}`, data);
    }

    getAcceptedOrders() {
        return Request.makeToProtected("GET", "orders");
    }

    addResi(id, data) {
        return Request.makeToProtected("POST", `add-resi/${id}`, data);
    }

    getOngoingTransactions() {
        return Request.makeToProtected("GET", 'ongoing-orders');
    }

    getFinishedTransactions() {
        return Request.makeToProtected("GET", 'finished-orders');
    }
}

export default OrderService;