import "./polyfill";
import "./localisation";

import Vue from "vue";
import { Component, Provide, Watch } from "vue-property-decorator";
import VueRouter from "vue-router";
import * as Logger from "js-logger";
import MessageModel from "./components/messageModel";
import { mapGetters, mapActions } from "vuex";

import Config from "./config.json";

import store from "./store";
import router from "./router";
import $script from "scriptjs";

// vue validation
import VeeValidate from "vee-validate";
import { Validator } from "vee-validate";
import customMessage from "./validation/customMessages";
import customValidationRules from "./validation/customRules";

// vue plugins
import VModal from "vue-js-modal";
import VTooltip from "v-tooltip";
import VueScrollTo from "vue-scrollto";


// components
import Navbar from "./components/navbar";
import Foot from "./components/foot";
import template from "./main.vue";

// styles sheets
import "./style.scss";

// bootstrap
// import "bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

// external scripts
// $script("https://maps.googleapis.com/maps/api/js?key=AIzaSyCFTTjrHQpuFUHEPrxzTiD80Su2VXD9EMk&signed_in=true&libraries=places");



let logLevel = (Config.debug ? Logger.DEBUG : Logger.ERROR);
Logger.useDefaults();
Logger.setLevel(logLevel);

Vue.config.errorHandler = function (err, vm, info) {
  Logger.error("Vue error: ", err);
};

router.beforeEach(function (to, from, next) {
  // hide nav bar and foot for login page
  store.dispatch("changeHideForLogin", to.path);
  let userId = localStorage.getItem("UserID") ? parseInt(String(localStorage.getItem("UserID"))) : undefined;
  let UserToken = localStorage.getItem("UserToken") ? localStorage.getItem("UserToken") : "";
  if (to.name !== "Login" && !store.getters.formData.isLogin) {
    if (userId && userId > 0 && UserToken) {
      store.dispatch("checkLogin").then(function (isLogin: boolean) {
        if (isLogin) {
          next();
        } else {
          store.dispatch("changeHideForLogin", "/");
          next("/");
        }
      }).catch(error => { console.log(error); });
    } else {
      store.dispatch("changeHideForLogin", "/");
      next("/");
    }
  } else {
    next();
  }

});

Vue.use(VeeValidate, customMessage);
customValidationRules();

Vue.use(VModal);
Vue.use(VueScrollTo);
Vue.use(VTooltip);


@Component({
  mixins: [template],
  store,
  components: {
    Navbar,
    Foot,
    MessageModel
  },
  router
})
class App extends Vue {
  mounted() {
    Logger.log("mounted");
    console.log("mounted");
  }

  hideForLogin() {
    return this.$store.getters.hideForLogin;
  }
    // messageModel
    @Provide()
    messageModel: any = this.$store.getters.messageModel;

    @Watch("messageModel.isShowMessageModel", { deep: true, immediate: true })
    onMessageModelChange(val: any, oldVal: any, event: any) {
        if (val && val !== oldVal) {
            this.showMessageModal();
        }
    }

    showMessageModal() {
        this.$modal.show(this.messageModel.messageName);
    }


    closeMessageModel() {
        this.messageModel.isShowMessageModel = false;
        this.messageModel.messageModelTitle = "";
        this.messageModel.messageModelMessage = "";
        this.$store.dispatch("updateMessageModel", this.messageModel);
    }

    // messageModel
}

window.onerror = function (errorMsg, url, lineNo, colNo, error) {
  Logger.error("Global event: ", errorMsg);
};

export const app = new App().$mount("#app");

