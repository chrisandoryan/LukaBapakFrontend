import Request from "../utilities/Request";


class PopularTagService {
    getPopularTags() {
        return Request.make("GET", 'populars')
    }
}

export default PopularTagService;