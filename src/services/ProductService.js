import Request from "../utilities/Request";
import IndexedDB from "../utilities/IndexedDB";

const ElasticAPI = "http://localhost:9200/products/products/"

class ProductService {
    getProduct(uuid) {
        return Request.make("GET", `products/${uuid}`);
    };
    getProductsByCategory(category) {

    }
    searchProducts(keyword) {
        return Request.makeExternalGet(ElasticAPI, `_search?q=name:${keyword}&pretty`);
        // return Axios.get(ElasticAPI + '_search?q=name:jaket');
    }
    
}

export default ProductService;