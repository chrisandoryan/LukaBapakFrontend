import Request from "../utilities/Request";
import Axios from "axios";

class CategoryService {
    addCategory(parentUuid, categoryName) {
        return Request.make("POST", 'categories', {parent_uuid: parentUuid, category_name: categoryName});
    }
    getAllCategories() {
        return Request.make("GET", 'categories');
    }
    deleteCategory(_id) {
        return Request.makeToProtected("DELETE", `categories/${_id}`);
    }
    getNestedCategories(_id) {
        return Request.make("GET", `nestedCategory?leaf=${_id}`)
    }
}

export default CategoryService;