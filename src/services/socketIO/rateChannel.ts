import * as io from 'socket.io-client';

let host = window.location.hostname;
let domain;

if (host == "localhost" || host == "clientdev..com") {
    domain = "dev..com:7771";
}
else if (host == "clientstage..com" || host == "shipstage..com") {
    domain = "dev..com:7781";
}
else if (host == "client..com" || host == "ship..com") {
    domain = "api..com:7791";
}


let socket = io.connect(`https://${domain}/rate_channel`);

socket.on('connection', () => {
    console.log("rate channel connected");
});


export default socket;