import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import * as Logger from "js-logger";
import template from "./schedulePickupHeader.vue";


@Component({
  mixins: [template],
  components: {}
})
export default class SchedulePickupHeader extends Vue {

  currentStage: number = this.$store.getters.quoteProcessStage.currentStage;

  stageOptions: any = this.$store.getters.quoteProcessStage.stageEnum;

  getSubMessage() {
    let message;
    switch (this.currentStage) {
      case this.stageOptions.schedulePage:
        message = "Location Information";
        break;
      case this.stageOptions.scheduleShipmentPage:
        message = "Shipment Information";
        break;
      case this.stageOptions.scheduleReviewPage:
        message = "Review";
        break;
    }
    return message;
  }

}