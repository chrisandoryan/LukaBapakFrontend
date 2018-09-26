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
    static makeExternal(method, basepoint, endpoint, data = {}) {
        // alert(`${basepoint}${endpoint}`);
        // console.log(data);
        return axios({
            method: method,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            url: `${basepoint}${endpoint}`,
            params: data
        });
    }
}