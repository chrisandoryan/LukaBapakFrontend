import Request from "../utilities/Request";
import IndexedDB from "../utilities/IndexedDB";

class DiscussionService {
    addDiscussion(productId, _message, parentId) {
        if (parentId == "") parentId = "null";
        var d = new FormData();
        // alert(_message);
        d.append('message', _message);
        d.append('product_uuid', productId);
        d.append('parent_id', parentId);
        return Request.makeToProtected("POST", "discussions", d);
    }
    getDiscussions(productId) {
        return Request.makeToProtected("GET", `discussions?product_uuid=${productId}`);
    }
}

export default DiscussionService;