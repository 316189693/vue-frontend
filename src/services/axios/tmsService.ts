import axios from 'axios';

let host = window.location.hostname;
let domain;

if (host == "localhost" || host == "clientdev.com") {
    domain = "dev.com";
}
else if (host == "clientstage.com") {
    domain = "staging.com";
}



let instance = axios.create({
    baseURL : `https://${domain}`,
    timeout: 5000,
    headers: { 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
});

export default instance;