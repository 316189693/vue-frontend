import Vue from "vue";
import Vuex from "vuex";
import getQuoteModule from "./getQuote/getQuoteModule";
import schedulePickupModule from "./schedulePickup/schedulePickupModule";
import trackModule from "./track/trackModule";
import myAccountModule from "./myAccount/myAccountModule";
import mainModule from "./main/mainModule";
import loginModule from "./login/loginModule";
import homeModule from "./home/homeModule";
import orderReviewModule from "./orderReview/orderReviewModule";
import customerSignupModule from "./customerSignup/customerSignupModule";

Vue.use(Vuex);



export default new Vuex.Store({
  modules: {
    mainModule,
    getQuoteModule,
    schedulePickupModule,
    trackModule,
    myAccountModule,
    loginModule,
    homeModule,
    orderReviewModule,
    customerSignupModule
  }
  // strict: true
});
