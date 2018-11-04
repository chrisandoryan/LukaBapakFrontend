import Request from "../utilities/Request";


class PelapakService {
    getPelapak(userId) {
        return Request.make("GET", `users/${userId}`)
    }

    updateUserProfile(d, uuid) {
        d.append('_method', "PUT");
        return Request.makeToProtected("POST", `users/${uuid}`, d);
    }

    updateLapakProfile(d, uuid) {
        d.append('_method', "PUT");
        return Request.makeToProtected("POST", `users/${uuid}`, d);
    }
}

export default PelapakService;