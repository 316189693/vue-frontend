import login from "./state";
import axiosService from "../../services/axios/axiosService";
import router from "../../router";
import socketIO from "../../services/socketIO/socketIO";
import { resolve } from "url";
import qs from "qs";
import  { menu_link_obj } from "../../router/state";
// state object
const state = {

    login

};
// mutations are operations that actually mutates the state.
const mutations = {
    clearLoginFailMsg(state: any) {
        state.login.formData.loginFail = false;
        state.login.formData.loginFailMsg = "";
    },
    cancelForgotMsg(state: any, formData: any) {
        state.login.formData.sendForgotEmailMsg = formData.sendForgotEmailMsg;
        state.login.formData.sendForgotEmailstaus = formData.sendForgotEmailstaus;
    },
    updateFormDataForgotEmail(state: any, formData: any) {
        state.login.formData.forgotEmail = formData.forgotEmail;
        state.login.formData.sendForgotEmailMsg = formData.sendForgotEmailMsg;
        state.login.formData.sendForgotEmailstaus = formData.sendForgotEmailstaus;
    },
    updateFormDataLoginInfo(state: any, formData: any) {
        state.login.formData.loginFail = formData.loginFail;
        state.login.formData.loginFailMsg = formData.loginFailMsg;
        state.login.formData.isLogin = formData.isLogin;
        // clear data
        state.login.formData.trackFail = false;
        state.login.formData.trackResultMsg = "";
        state.login.formData.trackTable = "";
        state.login.formData.hasTrackTableRows = false;
        state.login.formData.proNumber = "";
        state.login.formData.forgotEmail = "";
        state.login.formData.sendForgotEmailMsg = "";
        state.login.formData.sendForgotEmailstaus = 0;

    },
    updateFormDataRemeberMe(state: any, remeberMe: boolean) {
        state.login.formData.remeberMe = remeberMe;
    },
    updateUserInfo(state: any, data: any) {
        state.login.userInfo.userName = data["user_firstlast"];
        state.login.userInfo.userEmail = data["user_email"];
        state.login.userInfo.userFirstLast = data["user_firstlast"];
        state.login.userInfo.userCompanyId = data["company_id"];
        state.login.userInfo.userCompanyName = data["company_name"];
        state.login.userInfo.userGroupId = data["group_id"];
        state.login.userInfo.userGroupName = data["group_name"];
        state.login.userInfo.userGroups = data["user_groups"];
        state.login.userInfo.userGroupIdParent = data["parent_group_id"];
        state.login.userInfo.userSuper = data["group_admin"];
        state.login.userInfo.userBiller = data["group_biller"];
        state.login.userInfo.userId = data["user_id"];
        state.login.userInfo.userAdmin = data["contact_admin"];
        state.login.userInfo.userAp = data["contact_ap"];
        state.login.userInfo.userCustomer = data["group_customer"];
        state.login.userInfo.userLocationId = data["location_id"];
        state.login.userInfo.userLocationCode = data["location_code"];
        state.login.userInfo.userLocationName = data["location_name"];
        state.login.userInfo.userLocationStreet = data["location_street"];
        state.login.userInfo.userLocationCity = data["location_city"];
        state.login.userInfo.serLocationState = data["location_state"];
        state.login.userInfo.userLocationZip = data["location_zip"];
        state.login.userInfo.userLocationBillto = data["location_billto"];
    },
    updateShowLoading(state: any, showLoding: boolean) {
        state.login.formData.showLoding = showLoding;
    },
    updateTrackRequiredMsg(stae: any, data: any) {
        state.login.formData.trackFail = data.trackFail;
        state.login.formData.trackResultMsg = data.trackResultMsg;
    },
    // updateTrackProcess(state: any, data: any) {
    //     let originDate = formateDate(data["p_date"]);
    //     let destinationDate = data["d_date"] ? "Estimated: " + formateDate(data["d_date"]) : "";
    //     let originLocation = formateLocation(data["pickup_city"], data["pickup_state"]);
    //     let destinationLocation = formateLocation(data["delivery_city"], data["delivery_state"]);
    //     let stage = data["stage"];
    //     let status = data["status"];
    //     state.login.formData.originDate = originDate;
    //     state.login.formData.originLocation = originLocation;
    //     state.login.formData.destinationDate = destinationDate;
    //     state.login.formData.destinationLocation = destinationLocation;
    //     switch (status) {
    //         case "1":
    //             state.login.formData.originChose = true;
    //             state.login.formData.transitChose = false;
    //             state.login.formData.destinationChose = false;
    //             break;

    //         case "2":
    //             state.login.formData.originChose = true;
    //             state.login.formData.transitChose = true;
    //             state.login.formData.destinationChose = false;
    //             break;

    //         case "3":
    //             state.login.formData.originChose = true;
    //             state.login.formData.transitChose = true;
    //             state.login.formData.destinationChose = true;
    //             break;

    //         default:
    //             state.login.formData.originChose = false;
    //             state.login.formData.transitChose = false;
    //             state.login.formData.destinationChose = false;
    //             break;

    //     }
    // },
    updateTrackTable(state: any, data: any) {
        if (data == -1 || data == 0) {
            state.login.formData.trackTable = "";
            state.login.formData.hasTrackTableRows = false;
            state.login.formData.trackFail = true;
            state.login.formData.showMultiOrder = false;
            state.login.formData.trackResultMsg = "Could not find order";
            return;
        }

        state.login.formData.showMultiOrder = false;
        let orders = data.orders;
        if (orders) {
            if (orders.length == 1) {
                let order = orders[0];
                let orderData = getOrderData(state, order);
                state.login.formData.originChose = orderData.originChose;
                state.login.formData.originDate = orderData.originDate;
                state.login.formData.originLocation = orderData.originLocation;
                state.login.formData.destinationDate = orderData.destinationDate;
                state.login.formData.destinationLocation = orderData.destinationLocation;
                state.login.formData.transitChose = orderData.transitChose;
                state.login.formData.destinationChose = orderData.destinationChose;
                state.login.formData.hasTrackTableRows = orderData.hasTrackTableRows;
                state.login.formData.trackFail = orderData.trackFail;
                state.login.formData.trackResultMsg = orderData.trackResultMsg;
                state.login.formData.trackTable = orderData.trackTable;
            } else if (orders.length > 1) {
                let ordersData = [];
                for (let i = 0; i < orders.length; i++) {
                  let order = orders[i];
                  let orderData = getOrderData(state, order);
                  ordersData[i] = orderData;
                }
                state.login.formData.orders = ordersData;
                state.login.formData.showMultiOrder = true;
                state.login.formData.hasTrackTableRows = false;
                // state.track.trackData.showTrack = false;
            }
          } else {
              let orderData = getOrderData(state, data);
              state.login.formData.originChose = orderData.originChose;
              state.login.formData.originDate = orderData.originDate;
              state.login.formData.originLocation = orderData.originLocation;
              state.login.formData.destinationDate = orderData.destinationDate;
              state.login.formData.destinationLocation = orderData.destinationLocation;
              state.login.formData.transitChose = orderData.transitChose;
              state.login.formData.destinationChose = orderData.destinationChose;
              state.login.formData.hasTrackTableRows = orderData.hasTrackTableRows;
              state.login.formData.trackFail = orderData.trackFail;
              state.login.formData.trackResultMsg = orderData.trackResultMsg;
              state.login.formData.trackTable = orderData.trackTable;
          }
    }

};

function getOrderData(state: any, data: any) {
  let orderData = data;
  let originDate = formateDate(data["p_date"]);
  let destinationDate = data["d_date"] ? "Estimated: " + formateDate(data["d_date"]) : "";
  let originLocation = formateLocation(data["pickup_city"], data["pickup_state"]);
  let destinationLocation = formateLocation(data["delivery_city"], data["delivery_state"]);
  let stage = data["stage"];
  let status = data["status"];
  orderData.originDate = originDate;
  orderData.originLocation = originLocation;
  orderData.destinationDate = destinationDate;
  orderData.destinationLocation = destinationLocation;
  orderData.pro = data.pro;
  orderData.deliveryDate = data.d_date2;
  if (data.manifest_ref) {
    orderData.ref = data.manifest_ref;
  }
  if (data.manifest_pallet) {
    orderData.pallet = data.manifest_pallet;
  }
  switch (status) {
    case "1":
      orderData.originChose = true;
      orderData.transitChose = false;
      orderData.destinationChose = false;
      break;

    case "2":
      orderData.originChose = true;
      orderData.transitChose = true;
      orderData.destinationChose = false;
      break;

    case "3":
      orderData.originChose = true;
      orderData.transitChose = true;
      orderData.destinationChose = true;
      break;

    case "4":
      orderData.originChose = true;
      orderData.transitChose = true;
      orderData.destinationChose = true;
      break;

    default:
      orderData.originChose = false;
      orderData.transitChose = false;
      orderData.destinationChose = false;
      break;

  }

  orderData.hasTrackTableRows = true;
  orderData.trackFail = false;
  orderData.trackResultMsg = "";
  let history = data["history"];

  let trackTable = {};
  for (let i = 0; i < history.length; i++) {
    let element = history[i];

    let stage = element["tms_order_log_stage"];
    let stage_text = stage ? state.login.stageText[stage] : "";
    let outputDate = formateTrackTableDate(element["c_date"]);
    let outputTime = formateTrackTableTime(element["c_date"]);

    let location = "";
    let logText = element["tms_order_log_text"] || "";
    if (logText == "order check-in") {
      switch (stage) {
        case "0":
          logText = "Picked Up";
          location = originLocation;
          break;
        case "2":
        case "3":
        case "4":
          logText = "Delivered";
          location = destinationLocation;
          break;
      }
    } else if ((logText == "order updated") || (logText == "Delivery Apt - Order Appt. Update")) {
      logText = "Picked Up";
    }

    let statusCode = element["tms_order_log_status_code"] || "";

    let seperator = logText && statusCode ? " - " : "";
    if ((statusCode == "Pending Appointment") && (!destinationDate)) {

      orderData.destinationDate = "Pending Appointment";
    }

    let obj = {
      outputTime: outputTime,
      status: (statusCode + seperator + logText),
      location: location
    };

    if (trackTable[outputDate]) {
      trackTable[outputDate].push(obj);
    } else {
      trackTable[outputDate] = [obj];
    }
  }


  orderData.trackTable = trackTable;

  return orderData;
}

function formateLocation(city: string, state: string) {
    return (city && state) ? capitalize(city) + ", " + state : "";
}

function capitalize(str: string) {
    return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : "";
}

function formateTrackTableTime(timeStr: string) {
    if (!timeStr) return "";
    let timeFormat = {
        hour: "2-digit",
        minute: "2-digit"
    };
    return new Date(timeStr).toLocaleTimeString("en-US", timeFormat);
}

function formateTrackTableDate(dateStr: string) {
    if (!dateStr) return "";
    let dateFormat = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    return new Date(dateStr).toLocaleDateString("en-US", dateFormat);
}

function formateDate(dateStr: string) {
    if (!dateStr) return "";
    let dateFormat = {
        weekday: "short",
        month: "short",
        day: "numeric",
    };
    return new Date(dateStr).toLocaleDateString("en-US", dateFormat);
}

// use actions to commit mutations
const actions = {
    validateForgotMsg(store: any, formData: any) {
        let data = {};
        if (!formData || !formData.forgotEmail) {
            data["sendForgotEmailMsg"] = "This field is required!";
            data["sendForgotEmailstaus"] = -1;
        } else {
            data["sendForgotEmailMsg"] = "";
            data["sendForgotEmailstaus"] = "";
        }
        store.commit("cancelForgotMsg", data);
    },
    cancelForgotModel(store: any) {
        let data = {};
        data["sendForgotEmailMsg"] = "";
        data["sendForgotEmailstaus"] = "";
        data["forgotEmail"] = "";
        store.commit("updateFormDataForgotEmail", data);
    },
    forgotPassword(store: any, data: any) {
        if (!data || !data.forgotEmail) {
            data = {};
            data["sendForgotEmailMsg"] = "This field is required!";
            data["sendForgotEmailstaus"] = -1;
            data["forgotEmail"] = "";
            store.commit("updateFormDataForgotEmail", data);
            return;
        }

        axiosService.post("write/write_forgot_password.php", qs.stringify({ input_email_forgot: data.forgotEmail })).then(function (res) {
            let messageModel = {};
            let result = res.data;
            if (result === 0 || result == -1) {
                data.sendForgotEmailMsg = "Email not found.";
                data.sendForgotEmailstaus = -1;
            } else {
                data.sendForgotEmailMsg = "Password reset email has been sent to the registered address.";
                data.sendForgotEmailstaus = (data.sendForgotEmailstaus && data.sendForgotEmailstaus > 0) ? (data.sendForgotEmailstaus + 1) : 1;
                messageModel["isShowMessageModel"] = true;
                messageModel["messageModelTitle"] = "Success";
                messageModel["messageModelMessage"] = "Password reset email has been sent to the registered address.";
                messageModel["titleColor"] = "green";
                store.dispatch("updateMessageModel", messageModel);

            }
            store.commit("updateFormDataForgotEmail", data);
        }).catch(function (error) {
            console.log(error);
        });
    },
    validatedAndLogin(store: any) {
        store.dispatch("checkLogin").then(function (isLogin: boolean) {
            if (isLogin) {
                if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
                    window.location.href = "index.html#/home";
                } else {
                    window.location.href = "index.html#/home";
                }
            } else {
                return;
            }
        });
    },
    changeRemeberMe(store: any, formData: any) {
        store.commit("updateFormDataRemeberMe", formData.remeberMe);
    },
    clearTrackErrorMsg(store: any) {
        let track = {};
        track["trackFail"] = false;
        track["trackResultMsg"] = "";
        store.commit("updateTrackRequiredMsg", track);
        return;
    },
    trackShipment(store: any, formData: any) {
        if (!formData.proNumber) {
            let track = {};
            track["trackFail"] = true;
            track["trackResultMsg"] = "This is a required field.";
            store.commit("updateTrackRequiredMsg", track);
            return;
        }

        let params = new URLSearchParams();

        axiosService.post("write/get_history.php", qs.stringify({ pro: formData.proNumber, search_ref: false })).then(function (res) {
            store.commit("updateTrackTable", res.data);
        }).catch(function (error) {
            console.log(error);
        });

    },
    signIn(store: any, formData: any) {
        if (localStorage.getItem("ErrorMessage") !== null) {
            localStorage.removeItem("ErrorMessage");
        }
        store.commit("updateShowLoading", true);

        axiosService.post("write/check_login.php", qs.stringify({ username: formData.userName, password: formData.passWord })).then(function (res) {
            store.commit("updateShowLoading", false);
            let row = res["data"];
            if (!row || Number(row) === 10 || Number(row) == 1 || Number(row) == 0) {
                clearLocalStorage("Login failed" + row);
                formData.loginFail = true;
                formData.loginFailMsg = "Email or password incorrect";
                formData.isLogin = false;
            } else if (Number(row) == -1) {
                clearLocalStorage("Login permission" + row);
                formData.loginFail = true;
                formData.loginFailMsg = "Email or password incorrect";
                formData.isLogin = false;
                console.log("You don\'t have permission to access this site.");
            } else {
                formData.loginFail = false;
                formData.loginFailMsg = "";
                formData.isLogin = true;
                let UserID = parseInt(row["UserID"]);
                if (UserID > 0) {
                    localStorage.setItem("UserID", row["UserID"]);

                    localStorage.setItem("UserFirstLast", row["UserFirstLast"]);

                    localStorage.setItem("UserToken", row["UserToken"]);

                    localStorage.setItem("password_expire", row["password_expire"]);

                    localStorage.setItem("UserMenu", JSON.stringify(row["Menu"]));

                    localStorage.setItem("ParentMenuOrder", JSON.stringify(row["menu_category"]));

                    localStorage.setItem("UserGroupName", row["customerGroupName"]);

                    let remeberMe = formData.remeberMe;



                    if (remeberMe) {

                        localStorage.setItem("UserLogin", formData.userName);

                        localStorage.setItem("RememberMe", "1");

                    }

                    else {

                        localStorage.removeItem("UserLogin");

                        localStorage.setItem("RememberMe", "0");

                    }



                    if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {

                        window.location.href = "index.html#/home";

                    }

                    else {

                        window.location.href = "index.html#/home";

                    }

                }

                else {

                    alert("There seems to be a problem signing you in. Try again later or contact support.");

                    return false;

                }

            }
            store.commit("updateFormDataLoginInfo", formData);
        }).catch(function (error) {
            store.commit("updateShowLoading", false);
            console.log(error);
        });
    },
    logout(store: any) {
        let formData = {};
        formData["loginFail"] = false;
        formData["loginFailMsg"] = "";
        formData["isLogin"] = false;
        store.commit("updateFormDataLoginInfo", formData);
        clearLocalStorage("user log out");
        window.location.href = "index.html#/";
    },
    checkLogin(store: any) {
        return new Promise((resolve, reject) => {
            let userId = localStorage.getItem("UserID") ? parseInt(String(localStorage.getItem("UserID"))) : undefined;
            let UserToken = localStorage.getItem("UserToken") ? localStorage.getItem("UserToken") : "";
            let pageName = location.pathname + location.search;
            let menu_link_temp = window.location.hash;
            let menu_link = menu_link_temp.indexOf("?") != -1 ? menu_link_temp.slice(0, menu_link_temp.indexOf("?")).toUpperCase() : menu_link_temp.toUpperCase();
            for (let key of Object.keys(menu_link_obj)) {
                if (key.toUpperCase() === menu_link) {
                    menu_link = menu_link_obj[key]['parent'];
                    break;
                }
            }
            if (userId && userId > 0 && UserToken) {
                axiosService.post("write/check_user.php", qs.stringify({ pageName: pageName, menuLink: menu_link})).then(function (res: any) {
                    let data = res.data;
                    let formLoginData = {};
                    if (!data || String(data) === "-9999" || data == 0) {
                        return resolve('-9999');
                    }

                    if (data["user_password_require_change"] === 1) {
                        clearLocalStorage("change password");
                        formLoginData["loginFail"] = true;
                        formLoginData["loginFailMsg"] = "";
                        formLoginData["isLogin"] = false;
                        store.commit("updateFormDataLoginInfo", formLoginData);
                        console.log("change password");
                        return resolve('false');
                    }

                    if (data["site_offline"] === 1) {
                        console.log("site offline");
                        return resolve('false');
                    }
                    localStorage.setItem("UserCustomer", data["group_customer"]);
                    localStorage.setItem("UserGroupID", data["group_id"]);
                    localStorage.setItem("UserSuper", data["group_admin"]);
                    localStorage.setItem("company_id", data["company_id"]);
                    // update user info
                    store.commit("updateUserInfo", data);
                    formLoginData["loginFail"] = false;
                    formLoginData["loginFailMsg"] = "";
                    formLoginData["isLogin"] = true;
                    store.commit("updateFormDataLoginInfo", formLoginData);
                    return resolve('true');
                }).catch(error => {
                    console.log("check login error");
                    resolve('false');
                });

            }
            else {
                resolve('false');
            }
        });
    },
    clearLoginFailMsg(store: any) {
        store.commit("clearLoginFailMsg");
    }
};

function clearLocalStorage(str: string) {
    localStorage.setItem("ErrorMessage", "Your session has expired. Please login again.");
    // socketIO.sendPushToRoom("room_msg", "DEV", "ClearCache " + str + " site " + window.location.href + " token " + localStorage.getItem("UserToken") + " user " + localStorage.getItem("UserID"), 1);
    localStorage.removeItem("UserToken");
    localStorage.removeItem("UserID");
    localStorage.removeItem("UserFirstLast");
    localStorage.removeItem("UserCustomer");
    localStorage.removeItem("UserGroupID");
    localStorage.removeItem("UserSuper");
    localStorage.removeItem("password_expire");
    localStorage.removeItem("UserMenu");
    localStorage.removeItem("ParentMenuOrder");
    localStorage.removeItem("ErrorMessage");
    localStorage.removeItem("UserGroupName");
}


const getters = {
    loginData(state: any) {
        return state.login;
    },
    formData(state: any) {
        let remeberMe = localStorage.getItem("RememberMe");
        if (remeberMe && remeberMe === "1") {
            state.login.formData.userName = localStorage.getItem("UserLogin");
            state.login.formData.remeberMe = true;
        }
        return state.login.formData;
    },

};


const loginModule = {
    state,
    mutations,
    actions,
    getters
};

export default loginModule;