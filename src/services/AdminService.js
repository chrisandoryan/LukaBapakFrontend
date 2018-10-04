import IndexedDB from "../utilities/IndexedDB";
import Request from "../utilities/Request";

class AdminService {
    sendAdminInvitation(_email) {
        var d = new FormData();
        d.append('email', _email);
        return Request.makeToProtected("POST", "admin/invite", d);
    }
    getAdmins() {
        return Request.makeToProtected("GET", "admin");
    }
}

export default AdminService;