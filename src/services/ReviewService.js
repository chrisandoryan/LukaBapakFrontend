import Request from "../utilities/Request";
import IndexedDB from "../utilities/IndexedDB";

class ReviewService {
    addReview(productId, _message) {
        var d = new FormData();
        alert(_message);
        d.append('message', _message);
        d.append('product_uuid', productId);
        return Request.makeToProtected("POST", "reviews", d);
    }
    
}

export default ReviewService;