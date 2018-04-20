import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";

import { Validator } from "vee-validate";

// components
import template from "./schedulePickup.vue";
import SchedulePickupHeader from "../../components/schedulePickupHeader";
import MainButtonSet from "../../components/mainButtonSet";
import DefaultModal from "../../components/modal";
import Datepicker from "vuejs-datepicker";
import StageHeader from "../../components/stageHeader";
import VueMask from "di-vue-mask";
import clientService from "../../services/axios/axiosService";

@Component({
  mixins: [template],
  components: {
    SchedulePickupHeader,
    MainButtonSet,
    DefaultModal,
    Datepicker,
    StageHeader
  }
})
export default class SchedulePickup extends Vue {
  // vue life cycle method
  beforeCreate() {
    // check the stage if it's allowed to access this page directly
    let stage = this.$store.getters.quoteProcessStage;
    if (stage.currentStage < stage.stageEnum.schedulePage) {
      window.location.href = "#/getquote";
    } else {
      this.$store.dispatch("changeQuotePageStage", "schedulePage");
    }
  }

  mounted() {}

  // Data
  scheduleData = this.$store.getters.scheduleData;
  quoteData = this.$store.getters.quoteData;

  instruction_MaxCharacters: number = 150;

  instruction_CaractersCount: number = 0;

  dateFormat: string = "MM/dd/yyyy";

  validationStarted: boolean = true;

  showPickupToolMsg: boolean = false;

  pickupValidation: any = {};
  suggestedPickup: any = {};
  suggestedDelivery: any = {};
  suggestedRadioPickup: string = "";
  suggestedRadioDelivery: string = "";
  tooltipMessages = {
    reference:
      "Enter your reference number for this order to help you track this shipment."
  };
  rightBtnStyle: any = {
    "background-color": "#f7b020 !important",
    color: "#15223d !important"
  };
  validPickupAddress: boolean = false;
  validDeliveryAddress: boolean = false;
  // Data

  // computed properties
  get locationTypeOptions() {
    return this.quotePageData.locationTypeOptions;
  }

  get quotePageData() {
    return this.$store.getters.quoteData;
  }

  get remainingWords() {
    return this.instruction_MaxCharacters - this.instruction_CaractersCount;
  }

  get isPastDate() {
    let earlyDate = new Date(
      this.scheduleData.pickup.earliestPickupDate
    ).toLocaleDateString("en-US");
    let firstDate = new Date(`${earlyDate}`);
    let currentDate = new Date();

    let result = firstDate < currentDate;

    return result;
  }

  get validPickupDateTime() {
    let earlyDate = new Date(
      this.scheduleData.pickup.earliestPickupDate
    ).toLocaleDateString("en-US");
    let lateDate = new Date(
      this.scheduleData.pickup.latestPickupDate
    ).toLocaleDateString("en-US");

    let earlyTime = this.scheduleData.pickup.earliestPickupTime;
    let lateTime = this.scheduleData.pickup.latestPickupTime;

    let firstDate = new Date(`${earlyDate} ${earlyTime}`);
    let secondDate = new Date(`${lateDate} ${lateTime}`);

    let currentDate = new Date();

    let result =
      firstDate <= secondDate &&
      firstDate >= currentDate &&
      secondDate >= currentDate;

    return result;
  }
  // computed properties

  // watch
  @Watch("scheduleData.pickup.instructions")
  onInstructionChanged(val: string, oldVal: string, event: any) {
    let count = val.length;
    if (count > this.instruction_MaxCharacters) {
      this.scheduleData.pickup.instructions = val.substring(
        0,
        this.instruction_MaxCharacters
      );
    }
    this.instruction_CaractersCount = count;
  }

  @Watch("scheduleData.pickup.earliestPickupTime")
  onPickupETimeChanged(val: string, oldVal: string, event: any) {
    this.showPickupToolMsg = false;
    this.isShowPickupToolMsg(this.scheduleData.pickup.latestPickupTime);
    if (this.showPickupToolMsg) {
      return;
    }
    this.isShowPickupToolMsg(val);
  }

  @Watch("scheduleData.pickup.latestPickupTime")
  onPickupLTimeChanged(val: string, oldVal: string, event: any) {
    this.showPickupToolMsg = false;
    this.isShowPickupToolMsg(this.scheduleData.pickup.earliestPickupTime);
    if (this.showPickupToolMsg) {
      return;
    }
    this.isShowPickupToolMsg(val);
  }

  isShowPickupToolMsg(val: string) {
    if (val != null) {
      let vals: string[] = val.split(" ");
      if (vals[1] == "PM") {
        let t: string[] = vals[0].split(":");
        let h: number = parseInt(t[0]);
        if (h >= 3 && h < 12) {
          this.showPickupToolMsg = true;
        }
      }
    }
  }

  // methods
  async validate() {
    let pickup_street =
      (this.scheduleData.pickup.address1 == null
        ? ""
        : this.scheduleData.pickup.address1) +
      " " +
      (this.scheduleData.pickup.address2 == null
        ? ""
        : this.scheduleData.pickup.address2);
    let pickup_city = this.quotePageData.pickup.city;
    let pickup_state = this.quotePageData.pickup.state;
    let pickup_zip = this.quotePageData.pickup.zipCode;

    let delivery_street =
      (this.scheduleData.delivery.address1 == null
        ? ""
        : this.scheduleData.delivery.address1) +
      " " +
      (this.scheduleData.delivery.address2 == null
        ? ""
        : this.scheduleData.delivery.address2);
    let delivery_city = this.quotePageData.delivery.city;
    let delivery_state = this.quotePageData.delivery.state;
    let delivery_zip = this.quotePageData.delivery.zipCode;

    let result = await this.$validator.validateAll();

    pickup_street = pickup_street.trim();
    delivery_street = delivery_street.trim();

    this.validationStarted = true;

    let validDateTime =
      !this.isLatestPickupTimeInvalid() &&
      !this.isEarliestPickupTimeInvalid() &&
      !this.isEarliestPickupDateInvalid() &&
      !this.isLatestPickupDateInvalid();

    if (result && this.validPickupDateTime && validDateTime) {
      let dataString =
        "street=" +
        pickup_street +
        "&city=" +
        pickup_city +
        "&state=" +
        pickup_state +
        "&postcode=" +
        pickup_zip +
        "&region=NA";
      this.validateLocation(dataString, "pickup");
      dataString =
        "street=" +
        delivery_street +
        "&city=" +
        delivery_city +
        "&state=" +
        delivery_state +
        "&postcode=" +
        delivery_zip +
        "&region=NA";
      this.validateLocation(dataString, "delivery");
    } else {
    }
  }

  async validateLocation(dataString: string, identity: string) {
    try {
      let response = await clientService.get(
        "https://pcmiler.alk.com/apis/rest/v1.0/Service.svc/locations?" +
          dataString,
        { headers: { authorization: "9A4DC5EC2EFCEA4C8917545360589148" } }
      );
      if (identity == "pickup") {
        if (response.data[0].Address == null) {
          this.validPickupAddress = true;
        } else {
          this.validPickupAddress = false;
          this.suggestedPickup = response.data[0].Address;
        }
      } else {
        if (response.data[0].Address == null) {
          this.validDeliveryAddress = true;
        } else {
          this.validDeliveryAddress = false;
          this.suggestedDelivery = response.data[0].Address;
        }
      }
      if (!this.validPickupAddress && !this.validDeliveryAddress) {
        this.showPickupModal();
      }
    } catch (error) {
    } finally {
    }
  }

  getTimeOptions() {
    let interval = 30; // in minute
    let M = 60; // 60 mintue in a hour

    let startingHour = 0;
    let endingHour = 24;

    let times = [];

    let totalMinute = endingHour * M;
    let startingMinute = startingHour * M;

    for (let i = startingMinute; i < totalMinute; i += interval) {
      let currentMinute = i;
      let hour = Math.floor(currentMinute / M);
      let remainder = currentMinute % M;

      let options = {
        hour: "2-digit",
        minute: "2-digit"
      };

      let date = new Date(0, 0, 0, hour, remainder, 0);

      let formatted = date.toLocaleTimeString("en-us", options);

      times.push(formatted);
    }

    return times;
  }

  // Modal
  modalName: string = "cancelScheduleModal";
  pickupModal: string = "pickupModal";
  deliveryModal: string = "deliveryModal";

  showModal() {
    this.$modal.show(this.modalName);
  }
  closeModal() {
    this.$modal.hide(this.modalName);
  }

  confirmModal() {
    window.location.href = "#/home";
  }

  showPickupModal() {
    this.$modal.show(this.pickupModal);
  }
  closePickupModal() {
    this.$modal.hide(this.pickupModal);
  }

  confirmPickupModal() {
    this.$modal.hide(this.pickupModal);
  }

  showDeliveryModal() {
    this.$modal.show(this.deliveryModal);
  }
  closeDeliveryModal() {
    this.$modal.hide(this.deliveryModal);
    this.$modal.hide(this.pickupModal);
  }

  confirmDeliveryModal() {
    this.$modal.hide(this.deliveryModal);
    this.$modal.hide(this.pickupModal);

    if (this.suggestedRadioPickup == "suggested") {
      this.scheduleData.pickup.address1 = this.suggestedPickup.StreetAddress;
    } else {
      this.scheduleData.pickup.address1 == this.scheduleData.pickup.address1;
    }
    if (this.suggestedRadioDelivery == "suggested") {
      this.scheduleData.delivery.address1 = this.suggestedDelivery.StreetAddress;
    } else {
      this.scheduleData.delivery.address1 ==
        this.scheduleData.delivery.address1;
    }

    this.$store.dispatch("changeQuotePageStage", "scheduleReviewPage");
    window.location.href = "#/schedulepickup/review";
  }
  // Modal

  convertStandardTimeToMilitary(val: any) {
    const [time, modifier] = val.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return (hours < 10 ? "0" + hours : hours) + ":" + minutes;
  }

  formatDate(val: string) {
    let newDate = new Date(val);
    let eDay = newDate.getDate();
    let eMonth = newDate.getMonth() + 1;
    let eYear = newDate.getFullYear();

    return (
      eYear +
      "-" +
      (eMonth < 10 ? "0" + eMonth : eMonth) +
      "-" +
      (eDay < 10 ? "0" + eDay : eDay)
    );
  }

  isDateFromPast(val: string) {
    let currentDate = new Date();
    let dateNow = this.formatDate(currentDate.toDateString());
    let date = this.formatDate(val);
    let isFromPast = false;

    if (date < dateNow) {
      isFromPast = true;
    }

    return isFromPast;
  }

  getCurrentMilitaryTime() {
    let date = new Date();
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let seconds =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    let time = hours + ":" + minutes;
    return time;
  }

  isTimeFromPast(val: string) {
    let earliestPickupMilitaryTime = this.convertStandardTimeToMilitary(val);
    let timeFromPast = false;

    if (earliestPickupMilitaryTime < this.getCurrentMilitaryTime()) {
      timeFromPast = true;
    }

    return timeFromPast;
  }

  datePickedIsDateToday(val: string) {
    let currentDate = new Date();
    let dateNow = this.formatDate(currentDate.toDateString());
    let date = this.formatDate(val);
    let isDateToday = false;

    if (date === dateNow) {
      isDateToday = true;
    }

    return isDateToday;
  }

  isLatestPickupTimeInvalid() {
    let invalidPickupTime = false;
    if (this.datePickedIsDateToday(this.scheduleData.pickup.latestPickupDate)) {
      invalidPickupTime = this.isTimeFromPast(
        this.scheduleData.pickup.latestPickupTime
      );
    }
    return invalidPickupTime;
  }

  isEarliestPickupTimeInvalid() {
    let invalidPickupTime = false;
    if (
      this.datePickedIsDateToday(this.scheduleData.pickup.earliestPickupDate)
    ) {
      invalidPickupTime = this.isTimeFromPast(
        this.scheduleData.pickup.earliestPickupTime
      );
    }
    return invalidPickupTime;
  }

  isEarliestPickupDateInvalid() {
    return this.isDateFromPast(this.scheduleData.pickup.earliestPickupDate);
  }

  isLatestPickupDateInvalid() {
    return this.isDateFromPast(this.scheduleData.pickup.latestPickupDate);
  }
}
