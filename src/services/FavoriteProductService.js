import Request from "../utilities/Request";

class FavoriteProductService {
    getFavoriteProducts() {
        return Request.makeToProtected("GET", "favorites");
    };
    addFavoriteProduct(productId) {
        return Request.makeToProtected("POST", "favorites", {product_id: productId});
    };
}

export default FavoriteProductService;