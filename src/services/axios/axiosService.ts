import axios from 'axios';
import qs from 'qs';
// var baseURL = process.env.NODE_ENV === 'production' ? 'https://client.com/':'https://clientdev.com/';

let host = window.location.hostname;

if (host === "localhost" || host === "shipdev.com") {
    host = "clientdev.com";
} else if (host == "shipstage.com") {
    host = "clientstage.com";
} else if (host === "ship.com") {
    host = "client.com";
}

axios.defaults.transformRequest = function (data: any) {
    const UserToken = localStorage.getItem("UserToken");
    const UserID = localStorage.getItem("UserID");
    let parseData = qs.parse(data);
    let requestData = qs.stringify({
        UserID: UserID,
        UserToken: UserToken,
        .parseData
    });

    return requestData;
};

let instance = axios.create({
    baseURL: `https://${host}`,
    timeout: 5000,
    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }
});


export default instance;