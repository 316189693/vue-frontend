import login from "./state";
import axiosService from '../../services/axios/axiosService';
import router from "../../router";
import socketIO from '../../services/socketIO/socketIO';

// state object
const state = {

    login

};


// mutations are operations that actually mutates the state.
const mutations = {
    updateMessageModel(state:any, messageModel:any) {
        state.login.messageModel.isShowMessageModel = messageModel.isShowMessageModel;
        state.login.messageModel.messageModelTitle = messageModel.messageModelTitle;
        state.login.messageModel.messageModelMessage = messageModel.messageModelMessage;
    },
    updateFormDataForgotEmail(state:any, formData:any) {
        state.login.formData.forgotEmail = formData.forgotEmail;
        state.login.formData.sendForgotEmailMsg = formData.sendForgotEmailMsg;
        state.login.formData.sendForgotEmailstaus = formData.sendForgotEmailstaus;
    },
    updateFormDataLoginInfo(state:any, formData:any) {
        state.login.formData.loginFail = formData.loginFail;
        state.login.formData.loginFailMsg = formData.loginFailMsg;
        //clear data
        state.login.formData.trackFail = false;
        state.login.formData.trackResultMsg = '';  
        state.login.formData.trackTable ='';
        state.login.formData.hasTrackTableRows = false;
        state.login.formData.proNumber = "";
        state.login.formData.forgotEmail = "";
        state.login.formData.sendForgotEmailMsg = "";
        state.login.formData.sendForgotEmailstaus = 0;
     
    },
    updateFormDataRemeberMe(state:any, remeberMe:boolean) {
        state.login.formData.remeberMe = remeberMe;
    },
    updateUserInfo(state:any, data:any) {
        state.login.userInfo.userName = data['user_firstlast'];
        state.login.userInfo.userEmail = data['user_email'];
        state.login.userInfo.userFirstLast = data['user_firstlast'];
        state.login.userInfo.userCompanyId = data['company_id'];
        state.login.userInfo.userCompanyName = data['company_name'];
        state.login.userInfo.userGroupId = data['group_id'];
        state.login.userInfo.userGroupName = data['group_name'];
        state.login.userInfo.userGroups = data['user_groups'];
        state.login.userInfo.userGroupIdParent = data['parent_group_id'];
        state.login.userInfo.userSuper = data['group_admin'];
        state.login.userInfo.userBiller = data['group_biller'];
        state.login.userInfo.userId = data['user_id'];
        state.login.userInfo.userAdmin = data['contact_admin'];
        state.login.userInfo.userAp = data['contact_ap'];
        state.login.userInfo.userCustomer = data['group_customer'];
        state.login.userInfo.userLocationId = data['location_id'];
        state.login.userInfo.userLocationCode = data['location_code'];
        state.login.userInfo.userLocationName = data['location_name'];
        state.login.userInfo.userLocationStreet = data['location_street'];
        state.login.userInfo.userLocationCity = data['location_city'];
        state.login.userInfo.serLocationState = data['location_state'];
        state.login.userInfo.userLocationZip = data['location_zip'];
        state.login.userInfo.userLocationBillto = data['location_billto'];  
    },
    updateShowLoading(state: any, showLoding: boolean){
        state.login.formData.showLoding = showLoding;
    },
    updateTrackRequiredMsg(stae:any, data:any) {
        state.login.formData.trackFail = data.trackFail;
        state.login.formData.trackResultMsg = data.trackResultMsg;
    },
    updateTrackProcess(state: any, data: any){
        let originDate = formateDate(data['p_date']);
        let destinationDate = data['d_date'] ? "Estimated: " + formateDate(data['d_date']) : "";
        let originLocation = formateLocation(data['pickup_city'], data['pickup_state']);
        let destinationLocation = formateLocation(data['delivery_city'], data['delivery_state']);
        let stage = data['stage'];
        let status = data['status'];
        state.login.formData.originDate = originDate;
        state.login.formData.originLocation = originLocation;
        state.login.formData.destinationDate = destinationDate;
        state.login.formData.destinationLocation = destinationLocation;
        switch(status){
            case '1':
                state.login.formData.originChose = true;
                state.login.formData.transitChose= false;
                state.login.formData.destinationChose = false;
                break;

            case '2':
                state.login.formData.originChose = true;
                state.login.formData.transitChose= true;
                state.login.formData.destinationChose = false;
                break;

            case '3':
                state.login.formData.originChose = true;
                state.login.formData.transitChose= true;
                state.login.formData.destinationChose = true;
                break;

            default:
            state.login.formData.originChose = false;
            state.login.formData.transitChose= false;
            state.login.formData.destinationChose = false;
                break;

        }
    },
    updateTrackTable(state: any, data: any){
       if (!data || !data['history'] || data['history'] == 0 || data['history'].length <= 0){
           state.login.formData.trackTable = '';
           state.login.formData.hasTrackTableRows = false;
           state.login.formData.trackFail = true;
           state.login.formData.trackResultMsg = 'Could not find order';
           return;
       }
       state.login.formData.hasTrackTableRows = true;
       state.login.formData.trackFail = false;
       state.login.formData.trackResultMsg = '';
       let history = data['history'];
       
       let trackTable = {};
       let originLocation = formateLocation(data['pickup_city'], data['pickup_state']);
       let destinationLocation = formateLocation(data['delivery_city'], data['delivery_state']);
       let destinationDate = data['d_date'] ? "Estimated: " + formateDate(data['d_date']) : "";
       for(let i = 0; i < history.length; i++) {
           let element = history[i];
          
           let stage = element['tms_order_log_stage'];
           let stage_text = stage ? state.login.stageText[stage] : '';
           let outputDate = formateTrackTableDate(element['c_date']);
           let outputTime =  formateTrackTableTime(element['c_date']);
        
           let location = ""; 
           let logText = element['tms_order_log_text'] || '';
           if (logText == 'order check-in') {
               switch(stage) {
                    case '0':
                    logText = 'Picked Up';
                        location = originLocation;
                        break;
                    case '2':
                    case '3':
                    case '4':
                    logText = 'Delivered';
                        location = destinationLocation;
                    break;
            }
            } else if ((logText == 'order updated') || (logText == 'Delivery Apt - Order Appt. Update')) {
                logText = 'Picked Up';
            }

            let statusCode = element['tms_order_log_status_code'] || '';	

			var seperator = logText && statusCode ? ' - ' : '';	
            if ((statusCode == 'Pending Appointment') && (!destinationDate)) {
				 
                state.login.destinationDate = 'Pending Appointment';
            }
            
            let obj = {
                outputTime :outputTime,
                status : (statusCode + seperator + logText),
                location : location
            }
         
           if (trackTable[outputDate]) {
               trackTable[outputDate].push(obj);
           } else {
               trackTable[outputDate] = [obj];
           }
       }
     
       let trackTableStr = '';
       for (let key in trackTable) {
           let echo = '<tr class="date-info-row" >'
                    + '<td  colspan="3" >' + key + '</td>'
                    +"</tr>";
            let values = trackTable[key];
            for (let index in values) {
                 echo += '<tr>';
                 echo += ' <td class="time-info-column">' + values[index].outputTime + "</td>";
                 echo += ' <td class="status-info-column">' + values[index].status + "</td>";
                 echo += ' <td class="location-info-column">' + values[index].location + "</td>";
                 echo += '</tr>';
            }
            trackTableStr += echo;
       }
       state.login.formData.trackTable = trackTableStr;
    }

};

function formateLocation(city:string, state:string) {
    return (city && state) ? capitalize(city) + ", " + state : "";
}

function capitalize(str: string){
    return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : '';
}

function formateTrackTableTime(timeStr:string){
    if (!timeStr) return "";
    let timeFormat = {
        hour: "2-digit", 
        minute: "2-digit"  
    };
    return new Date(timeStr).toLocaleTimeString("en-US",timeFormat);
}

function formateTrackTableDate(dateStr:string){
    if (!dateStr) return "";
    let dateFormat = {  
        weekday: "long", 
        year: "numeric", 
        month: "long",  
        day: "numeric"
    };
    return new Date(dateStr).toLocaleDateString("en-US",dateFormat);
}

function formateDate(dateStr:string){
    if (!dateStr) return "";
    let dateFormat = {  
        weekday: "short", 
        month: "short", 
        day: "numeric", 
    };
    return new Date(dateStr).toLocaleDateString("en-US",dateFormat);
}

// use actions to commit mutations
const actions = {
    updateMessageModel(store:any, messageModelData:any) {
        store.commit('updateMessageModel', messageModelData);
    },
    cancelForgotModel(store:any) {
        var data = {};
        data['sendForgotEmailMsg'] = '';
        data['sendForgotEmailstaus'] = '';
        data['forgotEmail'] = '';
        store.commit('updateFormDataForgotEmail', data);
    },
    forgotPassword(store:any, data:any) {
       if (!data || !data.forgotEmail) {
           data = {};
           data['sendForgotEmailMsg'] = 'This field is required!';
           data['sendForgotEmailstaus'] = -1;
           data['forgotEmail'] = '';
           store.commit('updateFormDataForgotEmail', data);
           return;
       }
     
       var params = new URLSearchParams();
       params.append('input_email_forgot', data.forgotEmail);
       axiosService.post('write/write_forgot_password.php', params).then(function(res){
           var messageModel = {};
          var result = res.data;
          if(result === 0 || result == -1) {
             data.sendForgotEmailMsg = 'Email not found.';
             data.sendForgotEmailstaus = -1;
          } else {
             data.sendForgotEmailMsg = 'Password reset email has been sent to the registered address.';
             data.sendForgotEmailstaus = 1;
             messageModel['isShowMessageModel'] = true;
             messageModel['messageModelTitle'] = 'sucess';
             messageModel['messageModelMessage'] = 'Password reset email has been sent to the registered address.';
             store.commit('updateMessageModel', messageModel);

          }
          store.commit('updateFormDataForgotEmail', data);
       }).catch(function(error){
         console.log(error);
       });
    },
    checkLogin(store:any) {
        let userId = localStorage.getItem('UserID') ? parseInt(String(localStorage.getItem('UserID'))) : null;
        let UserToken = localStorage.getItem("UserToken") ? localStorage.getItem('UserToken') : '';
        let pageName = location.pathname+location.search;
        if (userId && userId > 0 && UserToken) {
            var params = new URLSearchParams();
            params.append('UserID', String(localStorage.getItem('UserID')));
            params.append('UserToken', UserToken);
            params.append('pageName', pageName);
            axiosService.post('write/check_user.php', params).then(function(res){
                var data = res.data;
               
                if(String(data) === '-9999' || data == 0 || data == null) {
                    clearLocalStorage("check_user fail")
                    return false;
                }

                if (data['user_password_require_change'] === 1) {
                    console.log('change password');
                    return false;
                }

                if (data['site_offline'] === 1) {
                    console.log('site offline');
                    return false;
                }

                localStorage.setItem('UserCustomer', data['group_customer']);
                localStorage.setItem('UserGroupID', data['group_id']);
                localStorage.setItem("UserSuper", data['group_admin']);
                // update user info
                store.commit('updateUserInfo', data);

                if(navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
                    window.location.href = 'index.html#/home';
                } else {
                    window.location.href = 'index.html#/home';
                } 
            }).catch(function(error){
                clearLocalStorage("check login fail");
            });
        }
    },
    changeRemeberMe(store:any, formData:any){
          store.commit('updateFormDataRemeberMe',formData.remeberMe);
    },
    trackShipment(store: any, formData: any) {
        if (!formData.proNumber) { 
            var track = {};
            track['trackFail'] = true;
            track['trackResultMsg'] = 'This is a required field.';
            store.commit("updateTrackRequiredMsg", track);
            return;
        }    

        var params = new URLSearchParams();
        params.append('pro', formData.proNumber);
        axiosService.post('write/get_pro_history.php',params).then(function(res){
            store.commit("updateTrackProcess", res.data);
            store.commit("updateTrackTable", res.data);
       }).catch(function(error){
           console.log(error);
       });
       
    },
    signIn(store: any, formData: any) {
        if (localStorage.getItem("ErrorMessage") !== null) {
			localStorage.removeItem("ErrorMessage");
		}
        store.commit("updateShowLoading", true);
        var params = new URLSearchParams();
        params.append('username', formData.userName);
        params.append('password', formData.passWord);
        axiosService.post('write/check_login.php', params).then(function(res){
            store.commit("updateShowLoading", false);
            var row = res['data'];
            if( row == null || Number(row) === 10 || Number(row) == 1 || Number(row) == 0){
                clearLocalStorage('Login failed'+row);
                formData.loginFail = true;
                formData.loginFailMsg = 'Email or password incorrect';
            } else if(Number(row) == -1) {
                clearLocalStorage('Login permission'+row);
                formData.loginFail = true;
                formData.loginFailMsg = 'Email or password incorrect';
                console.log('You don\'t have permission to access this site.');
            } else {		
                formData.loginFail = false;
                formData.loginFailMsg = '';
                var UserID = parseInt(row['UserID']);
                if(UserID > 0) {
                    localStorage.setItem("UserID", row['UserID']);

                    localStorage.setItem("UserToken", row['UserToken']);

                    localStorage.setItem("password_expire", row['password_expire']);

                    localStorage.setItem("UserMenu", JSON.stringify(row['Menu']));

                    localStorage.setItem("ParentMenuOrder", JSON.stringify(row['menu_category']));

                    var remeberMe = formData.remeberMe;



                    if(remeberMe) {

                        localStorage.setItem("UserLogin", formData.userName);

                        localStorage.setItem("RememberMe", '1');

                    }

                    else {

                        localStorage.removeItem("UserLogin");

                        localStorage.setItem("RememberMe", '0');

                    }



                    if(navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {

                        window.location.href = 'index.html#/home';

                    }

                    else {

                        window.location.href = 'index.html#/home';

                    } 

                }

                else {

                    alert('There seems to be a problem signing you in. Try again later or contact support.');

                    return false;

                }

            }		
            store.commit('updateFormDataLoginInfo', formData);
        }).catch(function(error){
            store.commit("updateShowLoading", false);
            console.log(error);
        });
    },
    logout(store:any){
        clearLocalStorage('user log out'); 
        window.location.href = 'index.html#/';
    }
};

 function clearLocalStorage(str: string) {
    localStorage.setItem("ErrorMessage", 'Your session has expired. Please login again.');
	socketIO.sendPushToRoom('room_msg', 'DEV', 'ClearCache ' + str + ' site '+window.location.href + ' token '+localStorage.getItem("UserToken") + ' user '+localStorage.getItem("UserID"), 1);
	localStorage.removeItem("UserToken");
	localStorage.removeItem("UserID");
}


const getters = {
    loginData(state: any) {
       return state.login;
    },
    formData(state:any) {
        let remeberMe = localStorage.getItem("RememberMe");
        if(remeberMe && remeberMe === "1") {
            state.login.formData.userName = localStorage.getItem("UserLogin");
            state.login.formData.remeberMe = true;
        }
        return state.login.formData;
    },
    messageModel(state:any) {
       return state.login.messageModel;
    },
};


const loginModule = {
    state,
    mutations,
    actions,
    getters
}

export default loginModule;