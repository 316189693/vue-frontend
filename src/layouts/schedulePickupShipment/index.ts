import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import * as Logger from "js-logger";


import template from "./schedulePickupShipment.vue";
import SchedulePickupHeader from "../../components/schedulePickupHeader";
import ShippingDetail from "../../components/shippingDetail";
import MainButtonSet from "../../components/mainButtonSet";




@Component({
    mixins: [template],
    components: {
        SchedulePickupHeader,
        ShippingDetail,
        MainButtonSet
    },

})
export default class SchedulePickupShipment extends Vue {

    // vue life cycle method
    beforeCreate() {

        // check the stage if it's allowed to access this page directly
        let stage = this.$store.getters.quoteProcessStage;
        if (stage.currentStage < stage.stageEnum.scheduleShipmentPage) {
            window.location.href = "#/schedulePickup";
        }
        else {
            this.$store.dispatch("changeQuotePageStage", "scheduleShipmentPage");
        }
    }

    quoteData = this.$store.getters.quoteData;

    tooltipMessages = {
        reference: "Enter your reference number for this order to help you track this shipment."
    };


    get allTotalWeight() {

        let sum = 0;
        this.quoteData.pallets.forEach((item: any) => {
            sum += parseInt(item.totalWeight);
        });
        return sum;
    }

    get totalPallets() {
        let total = 0;
        this.quoteData.pallets.forEach((item: any) => {
            total += parseInt(item.quantity);
        });
        return total;
    }


    confirm() {
        this.$store.dispatch("changeQuotePageStage", "scheduleReviewPage");
        window.location.href = "#/schedulepickup/review";
    }

    cancel() {
        alert("cancel");
    }


}
