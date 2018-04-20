import Vue from "vue";
import { Component, Prop, Provide, Watch, Inject } from "vue-property-decorator";
import * as Logger from "js-logger";
import template from "./myAccountEdit.vue";
import ChangePassword from "../../components/changePassword";
import { Validator } from "vee-validate";
import tmsService from "../../services/axios/tmsService";
import qs from "qs";

import MessageModal from "../../components/messageModel";

@Component({
  mixins: [template],
  components: { ChangePassword , MessageModal },
})
export default class MyAccountEdit extends Vue {

  myAccountData: any = this.$store.getters.myAccountData;
  locationTypeOptions: any = this.$store.getters.locationTypeOptions;
  stateOptions: any = this.$store.getters.stateOptions;

  @Inject()
  $validator: Validator;

  // life cycle methods
  created() {
    this.$store.commit("initEdit");
  }

  mounted() {
    if (this.myAccountData.billing.locationName == "") {
      this.$store.dispatch("getMyAccountData").then(response => {
        this.$store.commit("initEdit");
      }, error => {
        console.log(error);
      });
    }
  }

  edit(section: number) {
    this.$store.commit("setInEdit", section);
  }

  saving: boolean = false;

  async save(section: number) {
    let result = await this.$validator.validateAll();
    if (result) {
      let accountData = { shipping: null, billing: null, user: null };
      if (section == 1) {
        accountData.shipping = this.myAccountData["shipping"];
      } else if (section == 2) {
        accountData.billing = this.myAccountData["billing"];
      } else if (section == 3) {
        accountData.user = this.myAccountData["user"];
      }
      this.saving = true;
      await tmsService.post("write_new/write_customer_account.php", qs.stringify({ accountData: accountData })).then(function (response) {
        if (response.data == 1) {
          window.location.href = "#/myAccount";
        }
      }).catch(function (error) {
        console.log(error);
      });
      this.saving = false;
    }
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
    this.$store.commit("clearPassword");
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
