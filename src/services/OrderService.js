import Request from "../utilities/Request";

class OrderService {
    getOrders() {
        return Request.makeToProtected("GET", "transactions");
    }
}

export default OrderService;