import axios from 'axios'
require('dotenv').config();

export default class Request {
    static make(method, endpoint, data = {}) {
        // console.log(`http://localhost:8000/api/${endpoint}`);
        return axios({
            method: method,
            url: `http://localhost:8000/api/${endpoint}`,
            data: data
        });
    }
    static makeToProtected(method, endpoint, data = {}) {
        return axios({
            method: method,
            url: `http://localhost:8000/api/${endpoint}`,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: {
                    toString() {
                        return `Bearer ${localStorage.getItem('access_token')}`
                    }
                }
            },
            data: data
        });
    }
    static makeToProtectedDownload(method, endpoint, data = {}) {
        return axios({
            method: method,
            responseType: 'blob',
            url: `http://localhost:8000/api/${endpoint}`,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: {
                    toString() {
                        return `Bearer ${localStorage.getItem('access_token')}`
                    }
                }
            },
            data: data
        });
    }
    static makeExternalGet(basepoint, endpoint, data = {}) {
        // alert(`${basepoint}${endpoint}`);
        // console.log(data);
        return axios({
            method: "GET",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            url: `${basepoint}${endpoint}`,
            params: data
        });
    }
    static makeExternalPost(basepoint, endpoint, data = {}) {
        // alert(`${basepoint}${endpoint}`);
        console.log(data);
        return axios({
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            url: `${basepoint}${endpoint}`,
            data: data
        });
    }

    static authenticationBearerRequest(basepoint, endpoint, data = {}) {
        const auth = axios.create({
            method: "POST",
            url: `${basepoint}${endpoint}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data
        });

        auth.interceptors.request.use(
            function (config) {
                const token = localStorage.getItem('access_token');;
                if (token) config.headers.Authorization = `Bearer ${token}`;
                return config;
            },
            function (error) {
                return Promise.reject(error);
            }
        );
    }
}