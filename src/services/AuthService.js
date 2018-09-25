import axios from "axios";
import decode from 'jwt-decode';

class AuthService {
    login(email, password) {
        var formData = new FormData();
        formData.append("password", password);
        formData.append("email", email);

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
    register(username, name, password, email, gender) {
        var formData = new FormData();
        formData.append("password", password);
        formData.append("email", email);
        formData.append("name", name);
        formData.append("username", username);
        formData.append("gender", gender);
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

                    const access_token = json.data.access_token;
                    console.log(access_token);
                    this.setToken(access_token);
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
        // let appState = {
        //     isLoggedIn: false,
        //     auth_token: {}
        // };
        // // save app state with user date in local storage
        // localStorage["appState"] = JSON.stringify(appState);
        // this.setState(appState);
        localStorage.removeItem('access_token');
    }
    isLoggedIn() {
        const token = this.getToken() // GEtting token from localstorage
        console.log(token);
        return !!token && !this.isTokenExpired(token) // handwaiving here
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