import Vue from "vue";
import {
  Component,
  Prop,
  Provide,
  Watch,
  Inject
} from "vue-property-decorator";
import * as Logger from "js-logger";
import tmsService from "../../services/axios/tmsService";
import clientService from "../../services/axios/axiosService";
import qs from "qs";
import VueScrollTo from "vue-scrollto";
import rateSocket from "../../services/socketIO/rateChannel";
import googleAutoComplete from "../../services/googleAPI/autoComplete";
import { Validator } from "vee-validate";

// helper classes
import QuoteRequestBuilder from "./quoteRequestBuilder";
import QuoteResultAnalyzer from "./quoteResultAnalyzer";
import QuoteMapper from "./quoteMapper";

// Components
import template from "./getquote.vue";
import ShippingDetail from "../../components/shippingDetail";
import EstimatedQuote from "../../components/estimatedQuote";
import DefaultModal from "../../components/modal";
import MainButtonSet from "../../components/mainButtonSet";
import Datepicker from "vuejs-datepicker";
import OneButtonModal from "../../components/oneButtonModal";
import MessageModal from "../../components/messageModel";

@Component({
  mixins: [template],
  components: {
    ShippingDetail,
    Datepicker,
    EstimatedQuote,
    DefaultModal,
    MainButtonSet,
    OneButtonModal,
    MessageModal
  }
})
export default class GetQuote extends Vue {
  // Data
  quoteData = this.$store.getters.quoteData;
  accessorialData = [];

  hasQuote: boolean = this.$store.getters.quoteData.hasQuote;
  myAccountData: any = this.$store.getters.myAccountData;
  calculating: boolean = false;

  isEditMode: boolean = false;

  tooltipMessages: any = {
    wherePickup:
      "To make things easier for you, we default the shipping location to the address connected with your account. Feel free to change the address if you are shipping from a different location.",
    liftGate:
      "We can provide a lifting or lowering device to get your shipment onto our trucks for an additional fee.",
    limitedAccess:
      "Some locations are not easily accessible to the public during business hours and will incur an additional fee. Some examples include:<br/>" +
      "1. churches<br/>" +
      "2. commercial establishments not open to the walk-in public during normal business hours<br/>" +
      "3. construction sites<br/>" +
      "4. fairs, carnivals, etc.<br/>" +
      "5. individual (mini) storage units<br/>" +
      "6. military bases or installations<br/>" +
      "7. schools<br/>",
    palletJack:
      "For locations that do not have a forklift, we will need a pallet jack to move your shipments onto and off our trucks for an additional fee.",
    hazardousMaterial:
      "Does your shipment contain commodities that are hazardous as defined in the code of Federal Regulation, Title 49, by the US Department of Transportation? If so, you will be charged an additional fee and one of our representatives will contact you to get more information about the contents of the shipment."
  };

  keepQuote: boolean = false;

  validationStarted: boolean = true;
  // Data

  @Inject() $validator: Validator;

  // computed properties
  get palletSpaces() {
    let sum = 0;
    this.quoteData.pallets.forEach((item: any) => {
      sum += parseInt(item.palletSpace);
    });
    this.quoteData.palletSpaces = sum;
    return sum;
  }

  get allTotalWeight() {
    let sum = 0;
    this.quoteData.pallets.forEach((item: any) => {
      sum += parseInt(item.totalWeight);
    });
    return sum;
  }

  get totalPallets() {
    let sum = 0;
    this.quoteData.pallets.forEach((item: any) => {
      sum += parseInt(item.quantity);
    });
    return sum;
  }

  get pageTitle() {
    if (this.quoteData.quoteId) {
      return `Quote # ${this.quoteData.quoteId}`;
    } else {
      return "Get a Quote";
    }
  }

  get rightBtnText() {
    if (this.isEditMode) {
      return "Update Quote";
    } else {
      return "Get Quote";
    }
  }

  get exceedPalletSpaces() {
    return this.palletSpaces > 15;
  }

  get overWeight() {
    let result = false;

    this.quoteData.pallets.forEach((item: any) => {
      if (item.overWeight) {
        result = item.overWeight;
      }
    });

    return result;
  }
  // end of computed properties

  // life cycle methods
  beforeCreate() {
    this.$store.dispatch("changeQuotePageStage", "quoteStartPage");

    this.$store.dispatch("resetQuote");
    this.$store.dispatch("resetSchedule");
    this.$store.dispatch("resetEstimate");
  }

  created() {
    let query = this.$route.query;

    let quoteNumber = query.quoteNumber;
    this.quoteData.quoteId = quoteNumber;

    this.isEditMode = query.isEdit ? true : false;
    let schedule = query.schedule;

    if (!quoteNumber && !this.isEditMode && !schedule) {
      this.quoteData.hasQuote = false;

      // add one line of default pallet to array
      this.quoteData.pallets.push(this.quoteData.getPallet());
    }

    if (parseInt(quoteNumber) > 0) {
      this.getQuote(quoteNumber);
    }

    if (this.isEditMode) {
      this.quoteData.hasQuote = false;
      this.keepQuote = true;
    }

    if (schedule) {
      this.quoteData.hasQuote = true;
      this.keepQuote = true;
    }
    this.$store.dispatch("getMyAccountData");
    // this.$store.dispatch("getLocationData");
  }

  mounted() {
    // set up autocomplete for zip code
    this.pickupZipAutoComplete();
    this.deliveryZipAutoComplete();

    // set up event listener for socket result, need to remove when component is destroy, or it will call the callback function multiple times
    rateSocket.on("rate_request_result", this.onQuoteResult);

    this.getAccesorialConfig();
  }

  beforeDestroy() {
    if (!this.keepQuote && this.quoteData.quoteId) {
      this.deleteQuote();
    }

    // remove listener
    rateSocket.removeListener("rate_request_result", this.onQuoteResult);
  }
  // end of life cycle methods

  // methods
  addLine() {
    this.$store.dispatch("addLine");
  }

  goEdit() {
    // this.getQuote(this.quoteData.quoteId);
    // window.location.href = "getquote?isEdit=true&quoteNumber=3594392";
    this.quoteData.hasQuote = false;
    this.isEditMode = true;
  }

  get palletOverValue() {
    let overValue: boolean = false;

    this.quoteData.pallets.forEach((item: any) => {
      console.log(parseInt(item.quantity) + ", " + parseInt(item.totalWeight));
      if (parseInt(item.quantity) > 15 || parseInt(item.totalWeight) > 1800) {
        overValue = true;
      }
    });

    if (this.quoteData.hasHazardous) {
      overValue = true;
    }

    return overValue;
  }

  async validate() {
    this.validationStarted = true;

    let result = await this.$validator.validateAll();

    if (
      this.overWeight ||
      this.exceedPalletSpaces ||
      this.quoteData.hasHazardous
    ) {
      this.$modal.show(this.palletOverValueModal);
      return;
    }

    if (result && !this.overWeight && !this.exceedPalletSpaces) {
      this.socketSubmit();
    } else {
    }
  }

  submit() {
    if (this.isEditMode) {
      this.$modal.show(this.editQuoteModal);
    } else {
      this.validate();
    }
  }

  async pickupZipAutoComplete() {
    let pickupZipAutoComplete = new googleAutoComplete("input_zip_code_pickup");
    pickupZipAutoComplete.setShortStateName();

    while (true) {
      let result: any = await pickupZipAutoComplete.searchResult();

      this.quoteData.pickup.zipCode = result.postal_code;
      this.quoteData.pickup.city = result.city;
      this.quoteData.pickup.state = result.state;
    }
  }

  async deliveryZipAutoComplete() {
    let pickupZipAutoComplete = new googleAutoComplete(
      "input_zip_code_delivery"
    );
    pickupZipAutoComplete.setShortStateName();

    while (true) {
      let result: any = await pickupZipAutoComplete.searchResult();

      this.quoteData.delivery.zipCode = result.postal_code;
      this.quoteData.delivery.city = result.city;
      this.quoteData.delivery.state = result.state;
    }
  }

  async getAccesorialConfig() {
    try {
      let response = await tmsService.post("write_new/get_tms_acc_name_v2.php");
      this.accessorialData = response.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  async saveQuote() {
    this.keepQuote = true;
    this.savedQuote((res: any) => {
        let messageModel = {};
        messageModel["isShowMessageModel"] = true;
        messageModel["messageModelTitle"] = "Success!";
        messageModel["titleColor"] = "#15223d";
        messageModel["messageModelMessage"] = "Your quote has been saved as #" + res["quote_id"];
        messageModel["waitMillsSecondsToClose"] = 3000;
        messageModel["clickToClose"] = true;
        this.$store.dispatch("updateMessageModel", messageModel);
    }, (error: any) => {
        let messageModel = {};
        messageModel["isShowMessageModel"] = true;
        messageModel["messageModelTitle"] = "Error";
        messageModel["titleColor"] = "#15223d";
        messageModel["clickToClose"] = true;
        messageModel["messageModelMessage"] = "We were unable to save your quote at this time. Please, try again later.";
        messageModel["waitMillsSecondsToClose"] = 3000;
        this.$store.dispatch("updateMessageModel", messageModel);
    });

  }

  async schedulePickup() {
    this.keepQuote = true;
    this.savedQuote();
    this.$store.dispatch("changeQuotePageStage", "schedulePage");
    window.location.href = "#/schedulepickup";
  }

  async deleteQuote() {
    try {
      let response = await tmsService.post(
        "write_new/write_tms_quote_decline.php",
        { quote_id: this.quoteData.quoteId }
      );
    } catch (error) {
      console.log(error.message);
    }
  }
  // end of methods

  // Modal
  cancelQuoteModal: string = "cancelQuoteModal";
  cancelQuoteRightBtnAction() {
    window.location.href = "#/home";
  }
  cancelQuoteLeftBtnAction() {
    this.$modal.hide(this.cancelQuoteModal);
  }

  cancel() {
    if (this.isEditMode) {
      this.$modal.show(this.cancelSavedQuoteModal);
    } else {
      this.$modal.show(this.cancelQuoteModal);
    }
  }

  closeModal() {
    this.$modal.hide(this.cancelQuoteModal);
  }

  confirmModal() {
    window.location.href = "#/home";
  }
  // end of Modal

  // Error Modal
  noDataModal: string = "noDataModal";
  noDataModalTitle: string = "Calculation Failed";
  noDataModalMessage: string = "Please modify your input and try again.";
  closeNoDataModal() {
    this.$modal.hide(this.noDataModal);
  }
  // end of Error Modal

  // Error Modal
  errorModal: string = "errorModal";
  errorModalTitle: string = "Error";
  closeErrorModal() {
    this.$modal.hide(this.errorModal);
  }
  // end of Error Modal

  cancelSavedQuoteModal: string = "cancelSavedQuoteModal";
  cancelSavedQuoteRightBtnAction() {
    window.location.href = "#/savedquote";
  }
  cancelSavedQuoteLeftBtnAction() {
    this.$modal.hide(this.cancelSavedQuoteModal);
  }

  palletOverValueModal: string = "palletOverValueModal";
  palletOverValueModalRightBtnAction() {
    window.location.href = "index.html#/home";
  }
  palletOverValueModalRightBtnStyle: any = {
    display: "none !important"
  };

  editQuoteModal: string = "editQuoteModal";
  editQuoteModalRightBtnStyle: any = {
    "background-color": "#15223d !important"
  };
  editQuoteModalRightBtnAction() {
    this.$modal.hide(this.editQuoteModal);
    this.validate();
  }
  editQuoteModalLeftBtnAction() {
    this.$modal.hide(this.editQuoteModal);
  }

  // message modal
  successModalName: string = "successModal";
  successModalTitle: string = "Success";
  successModalMessage: string = "Successfully Saved";

  async getQuote(quoteId: number | string) {
    let url = "write_new/get_tms_quote_line.php";

    let request = {
      input_search_quote_id: null,
      input_search_date_from: "",
      input_search_date_to: "",
      billto_id: this.myAccountData.billing.locationId,
      quote_id: quoteId,
      input_search_shipper_state: "",
      input_search_shipper_zip: null,
      input_search_consignee_state: "",
      input_search_consignee_zip: null,
      input_search_status: 0,
      input_search_limit: 1,
      quote: 0,
      pageName: "dashboardQuote"
    };

    let result = await tmsService.post(url, request);

    let mapper = new QuoteMapper(result.data);
    mapper.fillResult(this.quoteData);
  }

  async savedQuote(resolve?: any, reject?: any) {
    let url = "write_new/write_update_quote_status.php";
    let json3 = {
      quote_id: this.quoteData.quoteId,
      UserID: localStorage.UserID,
      UserToken: localStorage.UserToken
    };

     tmsService
      .post(url, qs.stringify(json3))
      .then(res => {
        if (resolve) {
          Object.assign(res, json3);
            resolve(res);
        }
        console.log(res);
      })
      .catch(error => {
        if (reject) {
            reject(error);
        }
        console.log(error);
      });
  }

  onQuoteResult(data: any) {
    this.calculating = false;

    let json = JSON.parse(data);

    console.log(json);

    if (json.quote_id > 0 && parseInt(json.quote_amount) > 0) {
      this.quoteData.hasQuote = true;
      this.quoteData.quoteId = json.quote_id;

      let analyzer = new QuoteResultAnalyzer(json);

      analyzer.analyze();
      analyzer.mapEstimate(this.quoteData.estimate);

      setTimeout(() => {
        VueScrollTo.scrollTo("#estimatedQuoteBox", 1000);
      }, 100);
      // denying a quote in TMS, reactivate it again if user click save
      if (!this.keepQuote) {
        this.deleteQuote();
      }
    } else {
      this.$modal.show(this.palletOverValueModal);
    }
  }

  socketSubmit() {
    // proceed only when accessorial data is available
    if (this.accessorialData.length > 0) {
      this.calculating = true;
      this.quoteData.billto_id = this.myAccountData.billing.locationId;
      this.quoteData.shipper_id = this.myAccountData.shipping.locationId;

      let requestData = new QuoteRequestBuilder(
        this.quoteData,
        this.accessorialData
      ).getRequestData();

      console.log(requestData);

      let request = {
        user_action: "rate_request",
        user_data: requestData
      };

      rateSocket.emit("data_channel", request);
    } else {
      this.$modal.show(this.errorModal);
    }
  }
}
