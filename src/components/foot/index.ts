import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import * as Logger from "js-logger";
import template from "./foot.vue";
import config from "../../config.json";

@Component({
  mixins: [template],
})
export default class Foot extends Vue {
  version: string = `${config.version}`;
  build: string = `${config.build}`;

  // using iframe to login to TMS, so that it allows ajax call to TMS
  iframeLoginSource: string = `https://${this.getDomain()}/js/crosslogin.php?CompanyID=${localStorage.CompanyID}&UserGroupID=${localStorage.UserGroupID}&UserID=${localStorage.UserID}&UserToken=${localStorage.UserToken}`;



  getDomain() {
    let host = window.location.hostname;
    let domain;

    if (host == "localhost" || host == "clientdev..com") {
      domain = "dev..com";
    }
    else if (host == "clientstage..com" || host == "shipstage..com") {
      domain = "staging..com";
    }
    else if (host == "client..com" || host == "ship..com") {
      domain = "tms..com";
    }

    return domain;
  }
}