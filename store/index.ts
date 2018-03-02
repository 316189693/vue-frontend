import Vue from "vue";
import Vuex from "vuex";
import getQuoteModule from "./getQuote/getQuoteModule";
import schedulePickupModule from "./schedulePickup/schedulePickupModule";
import mainModule from "./main/mainModule";
import loginModule from "./login/loginModule";

Vue.use(Vuex);



export default new Vuex.Store({
  modules: {
    mainModule,
    getQuoteModule,
    schedulePickupModule,
    loginModule
  }
  // strict: true
});