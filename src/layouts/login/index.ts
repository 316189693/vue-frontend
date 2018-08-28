import Vue from "vue";
import {
 Component,
 Model,
 Provide,
 Watch
}
from "vue-property-decorator";
import * as Logger from "js-logger";

import template from "./login.vue";
import DefaultModal from "../../components/modal";
import clientService from "../../services/axios/axiosService";
import qs from "qs";

import * as $ from "jquery";

@Component({
    mixins: [template],
    components: {
        DefaultModal
    },
})
export default class Login extends Vue {

 // Data
 resetPassword: string = 'resetPassword';
 resetPasswordTitle: string = 'Reset Password';
 resetPasswordMessage: string = 'Enter your new password below:';
 resetPasswordStyle: any = {
  'display': 'none'
 };
 rightBtnStyle: any = {
  'background-color': '#15223d !important'
 };
 passwordHeight: number = 325;
 newPassword: string = '';
 retypePassword: string = '';
 validatePassword: boolean = false;

    @Provide()
    loginData: any = this.$store.getters.loginData;


    @Provide()
    formData: object = this.$store.getters.formData;

    trackShipment() {
        this.$store.dispatch("trackShipment", this.formData);
  $("input:radio:checked").prop("checked", false);
  $(".selected-row").removeClass("selected-row");
 }

 showOrder(index: number) {
      let orderData = this.formData["orders"][index];
      this.formData["originChose"] = orderData.originChose;
      this.formData["originDate"] = orderData.originDate;
      this.formData["originLocation"] = orderData.originLocation;
      this.formData["destinationDate"] = orderData.destinationDate;
      this.formData["destinationLocation"] = orderData.destinationLocation;
      this.formData["transitChose"] = orderData.transitChose;
      this.formData["destinationChose"] = orderData.destinationChose;
      this.formData["hasTrackTableRows"] = orderData.hasTrackTableRows;
      this.formData["trackFail"] = orderData.trackFail;
      this.formData["trackResultMsg"] = orderData.trackResultMsg;
      this.formData["trackTable"] = orderData.trackTable;
      this.formData["hasTrackTableRows"] = true;
      $(".selected-row").removeClass("selected-row");
      $("#orderRow" + index).addClass("selected-row");

    }

    async signIn() {
        let result = await this.$validator.validateAll();
        if (result) {
            this.$store.dispatch("signIn", this.formData);
        }

    }

 @Watch("formData.hasTrackTableRows", {
  deep: true,
  immediate: true
 })
    scrollDown(val: any, oldVal: any, event: any) {
        if (val) {
   $("html,body").animate({
    "scrollTop": "800px"
   }, 200);
  }

 }

 @Watch("formData.showMultiOrder", {
  deep: true,
  immediate: true
 })
 scrollDown2(val: any, oldVal: any, event: any) {
  if (val) {
   $("html,body").animate({
    "scrollTop": "400px"
   }, 200);
        }

    }

    inputChangeEvent() {
        this.$store.dispatch("clearLoginFailMsg");
    }

    clearTrackErrorMsg() {
        this.$store.dispatch("clearTrackErrorMsg");
    }

    remeberMe() {
        this.$store.dispatch("changeRemeberMe", this.formData);
    }

    created() {
        this.$store.dispatch("validatedAndLogin");
    }

 mounted() {
  if (typeof this.$route.query.token == 'string' && typeof this.$route.query.email == 'string') {
   this.showPasswordModal();
  }
 }

    // watch
 @Watch("formData.sendForgotEmailstaus", {
  deep: true,
  immediate: true
 })
    onForgotPasswordSend(val: any, oldVal: any, event: any) {
        if (val >= 1) {
            this.$modal.hide(this.modalName);
        }
    }

    // Modal
    @Provide()
    modalName: string = "forgotPassWord";

    @Provide()
    modalMessage: string = `Tell us your email address and we'll email you a link to re-set your password.`;

    @Provide()
    modalTitle: string = "Forgot Password";

    @Provide()
    modalConfirmText: string = "reset password";

    @Provide()
    modalCancelText: string = "Nevermind";

    @Provide()
    maxWidth: number = 700;

    @Provide()
    width: number = 600;

    @Provide()
    maxHeight: number = 340;
    @Provide()
    height: number = 340;
    showModal() {
        this.$modal.show(this.modalName);
    }

    closeModal() {
        this.$modal.hide(this.modalName);
        this.$store.dispatch("cancelForgotModel");
    }

    inputForgotPassword() {
        this.$store.dispatch("validateForgotMsg", this.formData);
    }

    confirmModal() {
        this.$store.dispatch("forgotPassword", this.formData);
    }

 showPasswordModal() {
  this.$modal.show(this.resetPassword);
 }

 async confirmReset() {
  let newPaswordResult = await this.$validator.validate('newPassword', this.newPassword);
  let retypePaswordResult = await this.$validator.validate('retypePassword', this.retypePassword);
  let token = this.$route.query.token;
  let email = this.$route.query.email;
  if (newPaswordResult && retypePaswordResult && !this.validatePassword) {
   let url = "write/write_reset_password.php";
   let json3 = {
    'email': email,
    'token': token,
    'new_password': this.newPassword
   };

   clientService
    .post(url, qs.stringify(json3))
    .then(res => {
     if (res.data == 1) {
      let messageModel = {};
      messageModel["isShowMessageModel"] = true;
      messageModel["messageModelTitle"] = "Success";
      messageModel["messageModelMessage"] = "Password successfully changed!";
      messageModel["titleColor"] = "green";
      this.$store.dispatch("updateMessageModel", messageModel);
      this.$modal.hide(this.resetPassword);
      this.$router.push("Login");
     } else {
      let messageModel = {};
      messageModel["isShowMessageModel"] = true;
      messageModel["messageModelTitle"] = "Failed";
      messageModel["messageModelMessage"] = "The token has been expired. Please request for a new password again.";
      messageModel["titleColor"] = "red";
      this.$store.dispatch("updateMessageModel", messageModel);
      this.$modal.hide(this.resetPassword);
      this.$router.push("Login");
     }
    })
    .catch(error => {
     console.log(error);
    });
  } else {
   console.log(false);
  }
 }

    // Modal

 checkPassword() {
  if (this.newPassword != this.retypePassword && this.retypePassword != '') {
   this.validatePassword = true;
  } else {
   this.validatePassword = false;
  }
 }

 isPasswordComplete() {
  return this.newPassword && this.retypePassword;
 }
}
