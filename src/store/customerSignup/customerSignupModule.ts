import customerSignup from "./state";
import tmsService from "../../services/axios/tmsService";
import qs from "qs";
import { isUndefined } from "util";

const state = {
    customerSignup
};

function cleanObj(obj: any) {
    for (let key of Object.keys(obj)) {
        obj[key] = "";
    }
}

const mutations = {
    updateCreateAccountError(state: any, createAccountError: number) {
        if (createAccountError != 0) {
            Object.assign(state.customerSignup, { createAccountError : (parseInt(state.customerSignup.createAccountError) + 1)} );
        } else {
            Object.assign(state.customerSignup, { createAccountError : 0} );
        }
    },
    resetCustomerSignup(state: any) {
        state.customerSignup.customerSignupHeader.currentStage = 1;
        state.customerSignup.customerSignupBody.signupPart.sameAsShippingAddress = 1;
        cleanObj(state.customerSignup.customerSignupBody.signupPart.shipInfo);
        cleanObj(state.customerSignup.customerSignupBody.signupPart.billInfo);
        cleanObj(state.customerSignup.customerSignupBody.signupPart.billInfoTemp);
        cleanObj(state.customerSignup.customerSignupBody.signupPart.accountCreation);
        state.customerSignup.customerSignupBody.signupPart.sameAsShippingAddress = false;
        state.customerSignup.customerSignupBody.signupPart.billInfo.creditLimit = "500";
        cleanObj(state.customerSignup.customerSignupBody.addInfoPart);
    },
    updateStage(state: any, formData: any) {
        state.customerSignup.customerSignupHeader.currentStage = formData.currentStage;
    },
    updateShipAddress(state: any, formData: any) {
        state.customerSignup.customerSignupBody.signupPart.shipInfo.state = formData.state;
        state.customerSignup.customerSignupBody.signupPart.shipInfo.zip = formData.zip;
        state.customerSignup.customerSignupBody.signupPart.shipInfo.city = formData.city;
    },
    updateBillingAddress(state: any, formData: any) {
        state.customerSignup.customerSignupBody.signupPart.billInfo.state = formData.state;
        state.customerSignup.customerSignupBody.signupPart.billInfo.zip = formData.zip;
        state.customerSignup.customerSignupBody.signupPart.billInfo.city = formData.city;
    },
    updateBillingInfo(state: any) {
        if (state.customerSignup.customerSignupBody.signupPart.sameAsShippingAddress) {
            // copy bill info to temp
            state.customerSignup.customerSignupBody.signupPart.billInfoTemp = {...state.customerSignup.customerSignupBody.signupPart.billInfo};
            // copy ship info to bill info
            for (let key of Object.keys(state.customerSignup.customerSignupBody.signupPart.billInfo)) {
                if (!isUndefined(state.customerSignup.customerSignupBody.signupPart.shipInfo[key])) {
                    state.customerSignup.customerSignupBody.signupPart.billInfo[key] = state.customerSignup.customerSignupBody.signupPart.shipInfo[key];
                }
            }
        } else {
            // copy temp to bill info
            state.customerSignup.customerSignupBody.signupPart.billInfo = {...state.customerSignup.customerSignupBody.signupPart.billInfoTemp};
        }
    },
    syncBillingInfoOnInput(state: any) {
        // copy ship info to bill info
        for (let key of Object.keys(state.customerSignup.customerSignupBody.signupPart.billInfo)) {
            if (!isUndefined(state.customerSignup.customerSignupBody.signupPart.shipInfo[key])) {
                state.customerSignup.customerSignupBody.signupPart.billInfo[key] = state.customerSignup.customerSignupBody.signupPart.shipInfo[key];
            }
        }
    },
    updateShowLoding(state: any, showLoding: boolean) {
        state.customerSignup.customerSignupBody.showLoding = showLoding;
    },
};

const actions = {
    updateStage(store: any, formData: any) {
        store.commit("updateStage", formData);
    },
    sameAsShippingAddressChanged(store: any) {
        store.commit("updateBillingInfo");
    },
    updateShipAddress(store: any, formData: any) {
        store.commit("updateShipAddress", formData);
    },
    updateBillingAddress(store: any, formData: any) {
        store.commit("updateBillingAddress", formData);
    },
    syncBillingInfoOnInput(store: any) {
        store.commit("syncBillingInfoOnInput");
    },
    async createAccount(store: any, formData: any) {

        store.commit("updateShowLoding", true);
        try {
            let response = await tmsService.post("write_new/write_customer_signup.php", qs.stringify({accountData: collectData(store)}));
            if (response.data == -1 || !response.data.userId) {
                store.commit("updateCreateAccountError", 1);
                console.log("Create Account Fail!");
                console.log(response.data);
            } else {
                store.commit("updateCreateAccountError", 0);
                let messageModel = {};
                messageModel["isShowMessageModel"] = true;
                messageModel["messageModelTitle"] = "Success";
               // messageModel["messageModelMessage"] = "signup Success! user account:" + response.data.userId + ", password:" + response.data.password;
                messageModel["messageModelMessage"] = "Customer account successfully created.";
               // messageModel["waitMillsSecondsToClose"] = 0;
                store.dispatch("updateMessageModel", messageModel);
                store.commit("resetCustomerSignup");
                window.location.href = "index.html#/home";
            }
        } catch (error) {
            store.commit("updateCreateAccountError", 1);
            console.log("Create Account Fail!");
            console.log(error);
        } finally {
            store.commit("updateShowLoding", false);
        }
    },
    clearCustomerSignup(store: any) {
        store.commit("resetCustomerSignup");
    },
};

function collectData(store: any) {
    let signupBody = store.getters.customerSignupBody;
    let formData = {
        shipping: {
            locationName: signupBody.signupPart.shipInfo.company,
            address1: signupBody.signupPart.shipInfo.address1,
            address2: signupBody.signupPart.shipInfo.address2,
            city: signupBody.signupPart.shipInfo.city,
            state: signupBody.signupPart.shipInfo.state,
            zip: signupBody.signupPart.shipInfo.zip,
            phone: signupBody.signupPart.shipInfo.phone,
            fax: signupBody.signupPart.shipInfo.fax,
        },
        billing: {
            locationName: signupBody.signupPart.billInfo.company,
            address1: signupBody.signupPart.billInfo.address1,
            address2: signupBody.signupPart.billInfo.address2,
            city: signupBody.signupPart.billInfo.city,
            state: signupBody.signupPart.billInfo.state,
            zip: signupBody.signupPart.billInfo.zip,
            phone: signupBody.signupPart.billInfo.phone,
            fax: signupBody.signupPart.billInfo.fax,
            creditLimit: signupBody.signupPart.billInfo.creditLimit,
        },
        user: {
            userName: signupBody.signupPart.accountCreation.userName,
            email: signupBody.signupPart.accountCreation.email,
            firstName: signupBody.signupPart.accountCreation.firstName,
            lastName: signupBody.signupPart.accountCreation.lastName,
        },
        question: signupBody['addInfoPart']
    };
    return formData;
}

function waitSeconds(time: number) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    });
}
const getters = {
    getCreateAccountError(state: any) {
       return state.customerSignup.createAccountError;
    },
    customerSignupHeader(state: any) {
        return state.customerSignup.customerSignupHeader;
    },
    currentStage(state: any) {
        return state.customerSignup.customerSignupHeader.currentStage;
    },
    customerSignupBody(state: any) {
        return state.customerSignup.customerSignupBody;
    }

};

const customerSignupModule = {
    state,
    mutations,
    actions,
    getters
};

export default customerSignupModule;