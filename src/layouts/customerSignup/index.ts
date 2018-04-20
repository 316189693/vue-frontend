import Vue from "vue";
import template from "./customerSignup.vue";
import { Component, Provide, Watch } from "vue-property-decorator";
import BreadcrumbStageHeader from "../../components/breadcrumbStageHeader";
import MainButtonSet from "../../components/mainButtonSet";
import * as $ from "jquery";
import commonUtilService from "../../services/commonUtil/commonUtilService";
import DefaultModal from "../../components/modal";
import OneButtonModal from "../../components/oneButtonModal";
@Component({
    mixins: [ template],
    components: {
        BreadcrumbStageHeader,
        MainButtonSet,
        DefaultModal,
        OneButtonModal
    },
})
export default class CustomerSignup extends Vue {

    // Error Modal
    errorModal: string = "customerSignupErrorModel";
    @Provide()
    errorWidth: number = 423;
    errorModalTitle: string = "Error";
    closeSignupErrorModal() {
        this.$modal.hide(this.errorModal);
    }
    showXBtn: boolean = false;
    get createAccountError() {
        return this.$store.getters.getCreateAccountError;
    }
    // watch
    @Watch("createAccountError", { deep: true, immediate: true })
    onForgotPasswordSend(val: any, oldVal: any, event: any) {
        if (val != 0 && val != oldVal) {
            this.$modal.show(this.errorModal);
        }
    }

    // nav header
    get breadcrumbStageHeader() {
        return this.$store.getters.customerSignupHeader;
    }
    // nav header

    get formData() {
        return this.$store.getters.customerSignupBody;
    }

    get currentStage() {
        return this.$store.getters.currentStage;
    }

    get stateArray () {
       return  commonUtilService.getStateArrayAbbr();
    }

    sameAsShippingAddressChanged() {
        this.$store.dispatch("sameAsShippingAddressChanged");
    }

    onShippingSameAsAddressInput() {
        if (this.formData.signupPart.sameAsShippingAddress) {
            this.$store.dispatch("syncBillingInfoOnInput");
        }
    }


    // btn action
    signupCancel() {
        this.showModal();
    }
    signupBack() {
        this.$store.dispatch("updateStage", {currentStage: (this.currentStage - 1)});
    }

    async signupNext() {
        let result = await this.$validator.validateAll('form-signup');
        if (result) {
            this.$store.dispatch("updateStage", {currentStage: 2});
            $("html,body").animate({ "scrollTop": "0px" }, 300);
        }
    }

    async addInfoNext() {
        let result = await this.$validator.validateAll('form-addinfo');
        if (result) {
            this.$store.dispatch("updateStage", {currentStage: 3});
            $("html,body").animate({ "scrollTop": "0px" }, 300);
        }
    }


    addInfoCancel() {
        this.$store.dispatch("updateStage", {currentStage : 1});
    }

    reviewCancel() {
        this.showModal();
    }

    async reviewCreateAccount() {
        let result01 = await this.$validator.validateAll('form-signup');
        if (!result01) {
            this.$store.dispatch("updateStage", {currentStage : 1});
            return;
        }
        let result02 = await this.$validator.validateAll('form-addinfo');
        if (!result02) {
            this.$store.dispatch("updateStage", {currentStage : 2});
            return;
        }
        this.$store.dispatch("createAccount", this.formData);
    }

    editButtonClick() {
        this.$store.dispatch("updateStage", {currentStage : 1});
    }
    // btn action

    mounted() {
        this.$store.dispatch("clearCustomerSignup");
    }

// Modal
    @Provide()
    modalName: string = "cancelSignup";

    @Provide()
    modalMessage: string = `Are you sure you want to cancel this customer signup?`;

    @Provide()
    modalTitle: string = "Cancel Signup";

    @Provide()
    modalConfirmText: string = "yes, cancel signup";

    @Provide()
    modalCancelText: string = "Nevermind";

    @Provide()
    maxWidth: number = 700;

    @Provide()
    width: number = 600;

    @Provide()
    maxHeight: number = 250;
    @Provide()
    height: number = 250;
    showModal() {
        this.$modal.show(this.modalName);
    }

    closeModal() {
        this.$modal.hide(this.modalName);
    }

    confirmModal() {
        this.$store.dispatch("clearCustomerSignup");
        this.closeModal();
        window.location.href = "#/home";
    }

    // Modal


}