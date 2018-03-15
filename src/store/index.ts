import Vue from "vue";
import Vuex from "vuex";
import getQuoteModule from "./getQuote/getQuoteModule";
import schedulePickupModule from "./schedulePickup/schedulePickupModule";
import trackModule from "./track/trackModule";
import mainModule from "./main/mainModule";
import loginModule from "./login/loginModule";
import homeModule from "./home/homeModule";
import orderReviewModule from "./orderReview/orderReviewModule";
Vue.use(Vuex);



export default new Vuex.Store({
  modules: {
    mainModule,
    getQuoteModule,
    schedulePickupModule,
    trackModule,
    loginModule,
    homeModule,
    orderReviewModule
  }
  // strict: true
});