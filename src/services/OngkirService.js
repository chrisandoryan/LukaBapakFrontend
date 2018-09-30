import Request from "../utilities/Request";

const RajaOngkirAPI = "https://api.rajaongkir.com/starter/";
const ROKey = "ee085f49ba926d68cdf8773ecf5e2919";

class OngkirService {
    getProvinces() {
        return Request.makeExternalGet(RajaOngkirAPI, "province", {key: ROKey});
    };
    getCities(province_id) {
        return Request.makeExternalGet(RajaOngkirAPI, "city", {key: ROKey, province: province_id});
    };
    getCost(originId, destinationId, weightNumber, courierId) {
        let d = new FormData();
        d.set('key', ROKey);
        d.set('origin', originId);
        d.set('destination', destinationId);
        d.set('weight', weightNumber);
        d.set('courier', courierId);
        return Request.makeExternalPost(RajaOngkirAPI, "cost", d);
    };
}

export default OngkirService;