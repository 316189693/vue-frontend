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
        let processStage = this.$store.getters.quoteProcessStage;
        if (processStage < 3) {
            window.location.href = "#/schedulePickup";
        }
    }

    @Provide()
    quoteData = this.$store.getters.quoteData;

 


    confirm() {
        alert("confirm");
    }

    cancel() {
        alert("cancel");
    }


}