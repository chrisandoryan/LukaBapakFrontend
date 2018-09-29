import Request from "../utilities/Request";
import Axios from "axios";

class CategoryService {
    addCategory(parentUuid, categoryName) {
        return Request.make("POST", 'categories', {parent_uuid: parentUuid, category_name: categoryName});
    }
}

export default CategoryService;