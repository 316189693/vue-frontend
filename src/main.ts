import "./polyfill";
import "./localisation";

import Vue from "vue";
import { Component } from "vue-property-decorator";
import VueRouter from "vue-router";
import * as Logger from "js-logger";

import { mapGetters, mapActions } from "vuex";

import Config from "./config.json";

import store from "./store";
import router from "./router";

//valiation
import VeeValidate from "vee-validate";
import { Validator } from "vee-validate";
import customMessage from "./validation/customMessages";
import customValidationRules from "./validation/customRules";

import VModal from "vue-js-modal";

const VueScrollTo = require('vue-scrollto');

import Navbar from "./components/navbar";
import Foot from "./components/foot";

import "./style.scss";
import template from "./main.vue";

// bootstrap
// import "bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';




let logLevel = (Config.debug ? Logger.DEBUG : Logger.ERROR);
Logger.useDefaults();
Logger.setLevel(logLevel);

Vue.config.errorHandler = function (err, vm, info) {
  Logger.error("Vue error: ", err);
};

router.beforeEach(function(to, from, next) {
   //hide nav bar and foot for login page
    store.dispatch("changeHideForLogin", to.path);
    let userId = localStorage.getItem('UserID') ? parseInt(String(localStorage.getItem('UserID'))) : null;
    let UserToken = localStorage.getItem("UserToken") ? localStorage.getItem('UserToken') : '';
    if (to.name !== 'Login' && !store.getters.formData.isLogin) {  
      if (userId && userId > 0 && UserToken) {
        store.dispatch('checkLogin').then(function(isLogin:boolean){
            if (isLogin){
              next();
            } else {
             store.dispatch("changeHideForLogin", '/');
             next('/');
            }
           }).catch(error=>{console.log(error);});
      } else {
        store.dispatch("changeHideForLogin", '/');
        next('/');
      }
    }  else {
      next();
    }
    
});

Vue.use(VeeValidate, customMessage);
customValidationRules();

Vue.use(VModal);
Vue.use(VueScrollTo);


@Component({
  mixins: [template],
  store,
  components: {
    Navbar,
    Foot
  },
  router
})
class App extends Vue {
  mounted () {
    Logger.log("mounted");
    console.log("mounted");
  }
   
  hideForLogin () {
     return this.$store.getters.hideForLogin;
  }

}

window.onerror = function (errorMsg, url, lineNo, colNo, error) {
  Logger.error("Global event: ", errorMsg);
};

export const app = new App().$mount("#app");

