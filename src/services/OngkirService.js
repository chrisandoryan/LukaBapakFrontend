import Request from "../utilities/Request";

const RajaOngkirAPI = "https://api.rajaongkir.com/starter/";
const ROKey = "8ac01b66375eb0256122ae2b67a76902";

class OngkirService {
    getProvinces() {
        return Request.makeExternalGet(RajaOngkirAPI, "province", {key: ROKey});
    };
    getCities(province_id) {
        return Request.makeExternalGet(RajaOngkirAPI, "city", {key: ROKey, province: province_id});
    };
    getCost(originId, destinationId, weightNumber, courierId) {
        let d = new FormData();
        d.append('key', ROKey);
        d.append('origin', originId);
        d.append('destination', destinationId);
        d.append('weight', weightNumber);
        d.append('courier', courierId);
        return Request.makeExternalPost(RajaOngkirAPI, "cost", d);
    };
}

export default OngkirService;