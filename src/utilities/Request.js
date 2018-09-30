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
                'content-type': 'application/x-www-form-urlencoded',
                'key': 'ee085f49ba926d68cdf8773ecf5e2919',
            },
            url: `${basepoint}${endpoint}`,
            data: data
        });
    }
}