import * as io from 'socket.io-client';

let host = window.location.hostname;
let domain;

if (host == "localhost" || host == "clientdev.r.com") {
    domain = "tms-dev..com:7771";
}
else if (host == "clientstage..com" || host == "shipstage.unisco.com") {
    domain = "tms-dev..com:7781";
}
else if (host == "client..com" || host == "ship.unisco.com") {
    domain = "api..com:7791";
}


let socket = io.connect(`https://${domain}/rate_channel`);

socket.on('connection', () => {
    console.log("rate channel connected");
});


export default socket;