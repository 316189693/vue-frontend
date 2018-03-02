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
import customMessage from "./validation";

import VModal from "vue-js-modal";



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
    if (to.name !== 'Login' && !store.getters.formData.isLogin) {  
      next('/')
      store.dispatch("changeHideForLogin",'/');
    }  else {
      store.dispatch("changeHideForLogin", to.path);
      next();
    }
    
});

Vue.use(VeeValidate, customMessage);
Vue.use(VModal);

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

