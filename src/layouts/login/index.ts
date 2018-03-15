import Vue from "vue";
import { Component, Model, Provide, Watch } from "vue-property-decorator";
import * as Logger from "js-logger";

import template from "./login.vue";
import DefaultModal from "../../components/modal";

import * as $ from "jquery";

@Component({
    mixins: [template],
    components: {
        DefaultModal
    },
})
export default class Login extends Vue {


    @Provide()
    loginData: any = this.$store.getters.loginData;


    @Provide()
    formData: object = this.$store.getters.formData;

    trackShipment() {
        this.$store.dispatch("trackShipment", this.formData);
    }

    async signIn() {
        let result = await this.$validator.validateAll();
        if (result) {
            this.$store.dispatch("signIn", this.formData);
        }

    }

    @Watch("formData.hasTrackTableRows", { deep: true, immediate: true })
    scrollDown(val: any, oldVal: any, event: any) {
        if (val) {
            $("html,body").animate({ "scrollTop": "400px" }, 300);
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

    // watch
    @Watch("formData.sendForgotEmailstaus", { deep: true, immediate: true })
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

    // Modal
}

