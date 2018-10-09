import Request from "../utilities/Request";
import IndexedDB from "../utilities/IndexedDB";

const ElasticAPI = "http://localhost:9200/products/products/"

class ProductService {
    getProduct(uuid) {
        return Request.make("GET", `products/${uuid}`);
    };
    getProductsByCategory(category_uuid, pagenum) {
        return Request.make("GET", `products?category=${category_uuid}&page=${pagenum}`);
    }
    searchProducts(keyword) {
        // return Request.makeExternalGet(ElasticAPI, `_search?q=name:${keyword}&pretty`);
        return Request.make("GET", `products?search=${keyword}`);
        // return Axios.get(ElasticAPI + '_search?q=name:jaket');
    }
    addProduct(data) {
        // console.log(_image);
        // Request.makeToProtected("POST", "images", data);
        return Request.makeToProtected("POST", "products", data);
    }
    getProductsByPromo(_promoId) {
        return Request.make("GET", `promotions/${_promoId}`);
    }
}

export default ProductService;