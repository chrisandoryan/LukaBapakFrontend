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
    removePromo(_promoId) {
        return Request.makeToProtected("DELETE", `promotions/${_promoId}`);
    }
    getPromoDetail(_id) {
        return Request.makeToProtected("GET", `promotions/${_id}`);
    }
}

export default PromoService;