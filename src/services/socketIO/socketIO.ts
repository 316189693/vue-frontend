import * as io from 'socket.io-client';

var dev_site = 0;

if(process.env.NODE_ENV !== 'production'){
    dev_site = 1;
}

var page_name = location.hash;

if(page_name.indexOf('#') !== -1){
    var new_style = 1;
    page_name = page_name.replace('#', '');

} else {
    var new_style = 0;
    page_name = window.location.pathname;
    page_name = page_name.replace('/', '');
    page_name = page_name.replace('.php', '');
    page_name = page_name.replace('.html', '');
}

if(dev_site === 1){
    var socket2 = io.connect('https://r00.freightapp.com:7790/data_channel', { secure: true, 
        query: 'new_style='+new_style+'&page_name='+page_name+'&UserID='+localStorage.getItem('UserID')+'&UserToken='+localStorage.getItem('UserToken')
    });
} else {
    var socket2 = io.connect('https://api.freightapp.com:7788/data_channel', { secure: true, 
        query: 'new_style='+new_style+'&page_name='+page_name+'&UserID='+localStorage.getItem('UserID')+'&UserToken='+localStorage.getItem('UserToken')
    });
}

function sendPushToRoom(input_type:any, input_room:any, input_message:any, input_priority:any) {

    socket2.emit('data_channel', { 
        data_type : input_type,
        data_msg : input_message,
        data_to_room : input_room,
        data_priority : input_priority,
        data_from_user_id : localStorage.getItem('UserID'),
        token: localStorage.getItem('UserToken'),
        userID: localStorage.getItem('UserID')
    });

}

const socketIO = {
    sendPushToRoom,
};

export default  socketIO;