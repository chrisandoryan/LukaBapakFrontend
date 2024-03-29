import Request from "../utilities/Request";

class FavoriteProductService {
    getFavoriteProducts() {
        return Request.makeToProtected("GET", "favorites");
    };
    addFavoriteProduct(productId) {
        let d = new FormData();
        d.set('product_uuid', productId);
        return Request.makeToProtected("POST", "favorites", d);
    };
    deleteProductFromFavorite(productId) {
        // let d = new FormData();
        // d.set('product_uuid', productId);
        return Request.makeToProtected("DELETE", `favorites/${productId}`, {});
    }
}

export default FavoriteProductService;