
const stageText = {
    '-3' : 'Load Building',
    '-2' : 'Quote',
    '-1' : 'Cancelled',
    '0' : 'Pickup',
    '1' : 'Linehaul',
    '2' : 'Delivery',
    '3' : 'Delivery',
    '4' : 'Delivery',
    '5' : 'Complete',
    '100' : 'Inspection',
    '101' : 'Trailer',
    '777' : 'Drayage'
};

const userInfo = {
    userName : '',
    userEmail : '',
    userFirstLast : '',
    userCompanyId : '',
    userCompanyName : '',
    userGroupId : '',
    userGroupName :'',
    userGroups : '',
    userGroupIdParent : '',
    userSuper : '',
    userBiller : '',
    userId : '',
    userAdmin : 0,
    userAp : 0,
    userCustomer : 0,
    userLocationId :'',
    userLocationCode : '',
    userLocationName : '',
    userLocationStreet : '',
    userLocationCity : '',
    userLocationState : '',
    userLocationZip : '',
    userLocationBillto : '',
} ;

const formData = {
    userName:'', 
    passWord:'',
    remeberMe:false,
    forgotEmail:'',
    sendForgotEmailMsg:'',
    sendForgotEmailstaus:0,
    loginFail:false,
    loginFailMsg:'',

    proNumber:'',
    originDate:'',
    originLocation:'',
    originChose: false,
    transitDate:'',
    transitLocation:'',
    transitChose: false,
    destinationDate:'',
    destinationLocation:'',
    destinationChose: false,
    showLoding:false,
    trackTable:'',
    hasTrackTableRows:false,
    trackFail:false,
    trackResultMsg:'',
}; 

const messageModel = {
   messageName:  "messageModel",
   isShowMessageModel: false,
   messageModelTitle:'message',
   messageModelMessage:'',
};

const login = {

    stageText,
    formData,
    messageModel,
    userInfo,
};


export default login;