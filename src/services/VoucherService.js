import Request from "../utilities/Request";
import Axios from "axios";

class VoucherService {
    storeVoucher(_code, _name) {
        var d = new FormData();
        d.append('code', _code);
        d.append('name', _name);
        return Request.makeToProtected("POST", 'vouchers', d);
    }
    getVouchers() {
        return Request.makeToProtected("GET", `vouchers`);
    }
}

export default VoucherService;