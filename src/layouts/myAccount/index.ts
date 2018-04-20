import Vue from "vue";
import { Component, Prop, Provide, Watch, Inject } from "vue-property-decorator";
import * as Logger from "js-logger";

import template from "./myAccount.vue";
import ChangePassword from "../../components/changePassword";
import { Validator } from "vee-validate";

import MessageModal from "../../components/messageModel";

@Component({
  mixins: [template],
  components: {
    ChangePassword, MessageModal
  }
})
export default class MyAccount extends Vue {
  @Provide()
  myAccountData: any = this.$store.getters.myAccountData;
  locationTypeOptions: any = this.$store.getters.locationTypeOptions;
  stateOptions: any = this.$store.getters.stateOptions;
  showMode: string = "show";
  showEdit: boolean = false;

  @Inject()
  $validator: Validator;

  created() {
    this.$store.commit("init");
    let self = this;
    this.$store.dispatch("getMyAccountData").then(response => {
      if (this.myAccountData.billing.locationName != "") {
        self.showEdit = true;
      }
    }, error => {
      console.log(error);
    });
  }

  edit(section: number) {
    this.$store.commit("setInEdit", section);
    window.location.href = "#/myAccount/edit";
  }

  // Modal
  modalName: string = "modal";
  modalMessage: string = "";
  modalTitle: string = "Change Password";
  modalConfirmText: string = "CHANGE PASSWORD";
  modalCancelText: string = "CANCEL";

  // message modal
  successModalName: string = "successModal";
  successModalTitle: string = "Success!";
  successModalMessage: string = "Password successfully changed.";


  oldPasswordError: boolean = false;

  showModal() {
    this.oldPasswordError = false;
    this.$modal.show(this.modalName);
  }

  closeModal() {
    this.$modal.hide(this.modalName);
  }

  async confirmModal() {
    let result = await this.$validator.validateAll({
      oldPassword: this.myAccountData.password.oldPassword,
      newPassword1: this.myAccountData.password.newPassword1,
      newPassword2: this.myAccountData.password.newPassword2
    });
    if (result) {
      const data = { oldPassword: this.myAccountData.password.oldPassword, newPassword: this.myAccountData.password.newPassword1 };
      this.$store.dispatch("changePassword", data);
    }
  }

  @Watch("myAccountData.password.success")
  onSuccessChanged(val: string, oldVal: string, event: any) {
    if (val) {
      this.$modal.hide(this.modalName);
      this.$modal.show(this.successModalName);
    }
  }

  @Watch("myAccountData.password.updateResult")
  onPasswordChanged(val: string, oldVal: string, event: any) {
    if (val == "-4") {
      this.oldPasswordError = true;
    } else {
      this.oldPasswordError = false;
    }
  }

  @Watch("myAccountData.password.oldPassword")
  onOldPasswordChanged(val: string, oldVal: string, event: any) {
    this.oldPasswordError = false;
  }

}
