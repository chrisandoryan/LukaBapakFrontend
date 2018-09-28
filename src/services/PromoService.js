import Request from "../utilities/Request";
import Axios from "axios";

class PromoService {
    storePromo(name) {
        return Request.make("POST", 'promotions', {promo_name: name});
    }
    addPromotedProduct(promoId, productUuid) {
        return Request.make("POST", 'promotions', {promo_id: promoId, product_uuid: productUuid });
    }
    getProduct(uuid) {
        return Request.make("GET", `products/${uuid}`);
    };
    getProductsByCategory(category) {

    }
}

export default PromoService;