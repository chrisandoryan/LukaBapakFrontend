import axios from "axios";
import decode from 'jwt-decode';
import Request from "../utilities/Request";

class AuthService {
    checkUsername(username) {
        return Request.make("GET", `checkUsername/${username}`);
    }
    login(email, password, mode) {
        var formData = new FormData();
        formData.append("password", password);
        formData.append("email", email);
        formData.append("mode", mode);

        return axios
            .post("http://localhost:8000/api/login", formData)
            .then(response => {
                if (response.data.message) {
                    alert(response.data.message);                
                }   
                else {
                    const access_token = response.data.access_token;
                    this.setToken(access_token);
                    return access_token;
                }
            })
    }
    register(username, name, password, email, gender, phone) {
        var formData = new FormData();
        formData.append("password", password);
        formData.append("email", email);
        formData.append("name", name);
        formData.append("username", username);
        formData.append("gender", gender);
        formData.append("phone", phone);
        // console.log(formData);

        return axios
            .post("http://localhost:8000/api/register", formData)
            .then(response => {
                // console.log(response);
                return response;
            })
            .then(json => {
                // console.log(json.data);
                if (json.data) {
                    alert(`Registration Successful!`);

                    // let userData = {
                    //     name: json.data.data.name,
                    //     uuid: json.data.data.uuid,
                    //     email: json.data.data.email,
                    //     username: json.data.data.username,
                    //     auth_token: json.data.access_token,
                    //     timestamp: new Date().toString()
                    // };

                    // let appState = {
                    //     isLoggedIn: true,
                    //     auth_token: json.data.access_token
                    // };

                    // // save app state with user date in local storage
                    // localStorage["appState"] = JSON.stringify(appState);
                    // return ({
                    //     isLoggedIn: appState.isLoggedIn,
                    //     auth_token: json.data.access_token
                    // });

                    // const access_token = json.data.access_token;
                    // console.log(access_token);
                    // this.setToken(access_token);
                    alert("Success. Please check your email");
                    
                } else {
                    console.log("registration failed");
                }
            })
            .catch(error => {
                alert("An Error Occured!" + error);
                console.log(`${formData} ${error}`);
            });
    };
    logout() {
        localStorage.removeItem('access_token');
        return axios
            .get("http://localhost:8000/api/logout")
            .then(response => {
                console.log(response);
                return response;
            })
    }
    isLoggedIn() {
        const token = this.getToken() // GEtting token from localstorage
        // console.log(token);
        // return !!token && !this.isTokenExpired(token) // handwaiving here
        return axios
            .post("http://localhost:8000/api/me", {token: token})
            .then(response => {
                // console.log(response);
                if (response.status == 200) {
                    // alert('yey');
                    return response.data;
                }
            })
            .catch(err => {
                // alert('boo');
                return false;
            })
    }
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }
    getToken() {
        return localStorage.getItem('access_token');
    }
    setToken(token) {
        localStorage.setItem('access_token', token)
    }
}

export default AuthService;