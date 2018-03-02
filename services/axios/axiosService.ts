import axios from 'axios';

var baseURL = process.env.NODE_ENV === 'production' ? 'https://client.com/':'https://clientdev.com/';

var instance = axios.create({
    baseURL : baseURL,
    timeout:5000,
    headers:{ 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
});

export default instance;