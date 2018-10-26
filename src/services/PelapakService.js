import Request from "../utilities/Request";


class PelapakService {
    getPelapak(userId) {
        return Request.make("GET", `users/${userId}`)
    }
}

export default PelapakService;