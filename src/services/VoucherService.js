import Request from "../utilities/Request";
import Axios from "axios";

class VoucherService {
    storeVoucher(_code, _name, _price, _image) {
        var d = new FormData();
        d.append('code', _code);
        d.append('name', _name);
        d.append('price_cut', _price);
        d.append('image', _image);
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
    checkVoucher(voucher) {
        return Request.make("GET", `applyvoucher/${voucher}`);
    }
}

export default VoucherService;