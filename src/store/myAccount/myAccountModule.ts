import myAccount from "./state";
import axiosService from "../../services/axios/axiosService";
import tmsService from "../../services/axios/tmsService";
import qs from "qs";

// state object
const state = {
  myAccount
};

// mutations are operations that actually mutates the state.
const mutations = {
  init(state: any) {
    let shipping = state.myAccount.myAccountData.shipping;
    for (let key in shipping) {
      shipping[key] = "";
    }
    let billing = state.myAccount.myAccountData.billing;
    for (let key in billing) {
      billing[key] = "";
    }
    let user = state.myAccount.myAccountData.user;
    for (let key in user) {
      user[key] = "";
    }
  },
  initEdit(state: any) {
    if (state.myAccount.myAccountData.shipping.state == "") {
      state.myAccount.myAccountData.shipping.state = "CA";
    }
    if (state.myAccount.myAccountData.billing.state == "") {
      state.myAccount.myAccountData.billing.state = "CA";
    }
  },
  setInEdit(state: any, section: number) {
    state.myAccount.myAccountData.shipping.inEdit = false;
    state.myAccount.myAccountData.billing.inEdit = false;
    state.myAccount.myAccountData.user.inEdit = false;
    if (section == 1) {
      state.myAccount.myAccountData.shipping.inEdit = true;
    } else if (section == 2) {
      state.myAccount.myAccountData.billing.inEdit = true;
    } else if (section == 3) {
      state.myAccount.myAccountData.user.inEdit = true;
    }
  },
  updateMyAccountData(state: any, res: any) {
    let billing = res["billing"];
    let shipping = res["shipping"];
    let user = res["user"];

    if (billing) { 
      state.myAccount.myAccountData.billing.locationId = billing["location_id"];
      state.myAccount.myAccountData.billing.locationName =
        billing["location_name"];
      state.myAccount.myAccountData.billing.address1 =
        billing["location_street"];
      state.myAccount.myAccountData.billing.address2 =
        billing["location_street2"];
      state.myAccount.myAccountData.billing.city = billing["location_city"];
      state.myAccount.myAccountData.billing.state = billing["location_state"];
      state.myAccount.myAccountData.billing.zip = billing["location_zip"];
      state.myAccount.myAccountData.billing.phone = billing["location_phone"];
      state.myAccount.myAccountData.billing.fax = billing["location_fax"];
      let paymentType = state.myAccount.getPaymentType(
        billing["location_payment_type"]
      );
      state.myAccount.myAccountData.billing.paymentType = paymentType;
      let creditLimit = billing["request_credit_limit"]
        ? "$" + billing["request_credit_limit"]
        : "";
      state.myAccount.myAccountData.billing.creditLimit = creditLimit;
      state.myAccount.myAccountData.billing.netTermDays =
        billing["request_netterm"];
    }

    if (shipping) {
      state.myAccount.myAccountData.shipping.locationId =
        shipping["location_id"];
      state.myAccount.myAccountData.shipping.locationName =
        shipping["location_name"];
      state.myAccount.myAccountData.shipping.address1 =
        shipping["location_street"];
      state.myAccount.myAccountData.shipping.address2 =
        shipping["location_street2"];
      state.myAccount.myAccountData.shipping.city = shipping["location_city"];
      state.myAccount.myAccountData.shipping.state = shipping["location_state"];
      state.myAccount.myAccountData.shipping.zip = shipping["location_zip"];
      state.myAccount.myAccountData.shipping.phone = shipping["location_phone"];
      state.myAccount.myAccountData.shipping.fax = shipping["location_fax"];
    }

    if (user) {
      state.myAccount.myAccountData.user.firstName = user["user_firstname"];
      state.myAccount.myAccountData.user.lastName = user["user_lastname"];
      state.myAccount.myAccountData.user.userName = user["user_username"];
      state.myAccount.myAccountData.user.email = user["user_email"];
      state.myAccount.myAccountData.user.userGroupName =
        user["user_active_group"];
    }
  },
  clearPassword(state: any) {
    state.myAccount.myAccountData.password.oldPassword = "";
    state.myAccount.myAccountData.password.newPassword1 = "";
    state.myAccount.myAccountData.password.newPassword2 = "";
  },
  updatePasswordResult(state: any, result: object) {
    state.myAccount.myAccountData.password.success = result["success"];
    state.myAccount.myAccountData.password.updateResult =
      result["updateResult"];
  }
};

// use actions to commit mutations
const actions = {
  getMyAccountData(store: any) {
    return new Promise((resolve, reject) => {
      tmsService
        .post("write_new/get_customer_account.php")
        .then(function(response) {
          store.commit("updateMyAccountData", response.data);
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  changePassword(store: any, data: object) {
    let updateResult = { updateResult: "", success: false };
    store.commit("updatePasswordResult", updateResult);
    tmsService
      .post(
        "write_new/write_update_password.php",
        qs.stringify({
          password_old: data["oldPassword"],
          password: data["newPassword"]
        })
      )
      .then(function(response) {
        let data = response.data;
        updateResult.updateResult = data.response;
        if (data.response == 1) {
          updateResult.success = true;
          store.commit("clearPassword");
        }
        store.commit("updatePasswordResult", updateResult);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};

const getters = {
  myAccountData(state: any) {
    return state.myAccount.myAccountData;
  },
  locationTypeOptions(state: any) {
    return state.myAccount.locationTypeOptions;
  },
  stateOptions(state: any) {
    return state.myAccount.stateOptions;
  }
};

const trackModule = {
  state,
  mutations,
  actions,
  getters
};

export default trackModule;
