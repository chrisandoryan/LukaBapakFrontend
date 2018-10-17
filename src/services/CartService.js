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
    addProductForQuickBuy(productId, _amount) {
        const db = new IndexedDB("lukabapak", "quickBuy");
        const data = {
            product_uuid: productId,
            amount: _amount,
        }
        return db.store(data);
    }
    getProductsFromIndexedDBCart() {
        const db = new IndexedDB("lukabapak", "cart");
        return db.getAll();
        // db.getAll().then(res => {
        //     return res;
        // })
    }
    downloadPurchaseTransaction() {
        return Request.makeToProtectedDownload("GET", "payment/download");
    }

    createHeaderTransaction(seller_id) {
        var d = new FormData();
        d.append('seller_id', seller_id);
        return Request.makeToProtected("POST", 'header-transaction', d);
    }

    storeTransactionData(header_id, product_id, amount) {
        var d = new FormData();
        d.append('header_id', header_id);
        d.append('product_id', product_id);
        d.append('amount', amount);
        return Request.makeToProtected("POST", 'transactions', d);
    }
}

export default CartService;