import IndexedDB from "../utilities/IndexedDB";
import Request from "../utilities/Request";

class CartService {
    addProductToCart(productId, amount) {
        let d = new FormData();
        d.set('product_uuid', productId);
        d.set('amount', amount);
        return Request.makeToProtected("POST", "carts", d);
    }
    getCart() {
        return Request.makeToProtected("GET", "carts");
    }
    addProductToIndexedDBCart(productId, _amount) {
        const db = new IndexedDB("lukabapak", "cart");
        const data = {
            product_uuid: productId,
            amount: _amount,
        }
        return db.store(data);
    }
}

export default CartService;