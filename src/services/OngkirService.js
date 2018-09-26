import Request from "../utilities/Request";

const RajaOngkirAPI = "https://api.rajaongkir.com/starter/";
const ROKey = "f627e87c6e3c413d3145c7e668b76015";

class OngkirService {
    getProvinces() {
        return Request.makeExternal("GET", RajaOngkirAPI, "province", {key: ROKey});
    };
    getCities(province_id) {
        return Request.makeExternal("GET", RajaOngkirAPI, "city", {key: ROKey, province: province_id});
    }
    getCost(origin, destination, weight, courier) {
        
    }
}

export default OngkirService;