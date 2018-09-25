import Request from "../utilities/Request";

class ProductService {
    getProduct(uuid) {
        return Request.make("GET", `products/${uuid}`);
    };
    getProductsByCategory(category) {

    }
    searchProducts(keyword) {

    }
}

export default ProductService;