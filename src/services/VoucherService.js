import Request from "../utilities/Request";
import Axios from "axios";

class VoucherService {
    storeVoucher(_code, _name, _price) {
        var d = new FormData();
        d.append('code', _code);
        d.append('name', _name);
        d.append('price_cut', _price);
        return Request.makeToProtected("POST", 'vouchers', d);
    }
    getVouchers() {
        return Request.makeToProtected("GET", `vouchers`);
    }
    deleteVoucher(_id) {
        return Request.makeToProtected("DELETE", `vouchers/${_id}`);
    }
    updateVoucher(_newPriceCut, _id) {
        var d = new FormData();
        d.append('new_price', _newPriceCut);
        d.append('_method', "PUT");
        return Request.makeToProtected("POST", `vouchers/${_id}`, d);
    }
}

export default VoucherService;