import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import * as Logger from "js-logger";


import template from "./schedulePickupReview.vue";
import SchedulePickupHeader from "../../components/schedulePickupHeader";
import MainButtonSet from "../../components/mainButtonSet";
import DefaultModal from "../../components/modal";

@Component({
    mixins: [template],
    components: {
        SchedulePickupHeader,
        MainButtonSet,
        DefaultModal
    },

})
export default class SchedulePickupShipment extends Vue {



    // vue life cycle method
    beforeCreate() {

        // check the stage if it's allowed to access this page directly
        let stage = this.$store.getters.quoteProcessStage;
        if (stage.currentStage < stage.stageEnum.scheduleReviewPage) {
            window.location.href = "#/schedulepickup/shipment";
        }
        else {
            this.$store.dispatch("changeQuotePageStage", "scheduleReviewPage");
        }

    }

    quoteData = this.$store.getters.quoteData;
    scheduleData = this.$store.getters.scheduleData;

    get pickupLocationType() {
        let locationTypeOptions = this.quoteData.locationTypeOptions;
        let locationType = this.quoteData.pickup.locationType;

        for (let i = 0; i < locationTypeOptions.length; i++) {

            if (locationType == locationTypeOptions[i].key) {
                return locationTypeOptions[i].value;
            }
        }
    }

    get deliveryLocationType() {
        let locationTypeOptions = this.quoteData.locationTypeOptions;
        let locationType = this.quoteData.delivery.locationType;

        for (let i = 0; i < locationTypeOptions.length; i++) {

            if (locationType == locationTypeOptions[i].key) {
                return locationTypeOptions[i].value;
            }
        }
    }


    get pickupAddress() {
        let address1 = this.scheduleData.pickup.address1;
        let address2 = this.scheduleData.pickup.address2 || "";


        let address = `${address1} ${address2}`;

        return address;
    }

    get pickupCityState() {
        let city = this.quoteData.pickup.city;
        let state = this.quoteData.pickup.state;
        let zip = this.quoteData.pickup.zipCode;

        let cityState = `${city}, ${state} ${zip}`;

        return cityState;
    }

    get deliveryAddress() {
        let address1 = this.scheduleData.delivery.address1;
        let address2 = this.scheduleData.delivery.address2 || "";


        let fullAddress = `${address1} ${address2}`;

        return fullAddress;
    }

    get deliveryCityState() {
        let city = this.quoteData.delivery.city;
        let state = this.quoteData.delivery.state;
        let zip = this.quoteData.delivery.zipCode;

        let cityState = `${city}, ${state} ${zip}`;

        return cityState;
    }

    get totalPallets() {
        let total = 0;
        this.quoteData.pallets.forEach((item: any) => {
            total += parseInt(item.quantity);
        });
        return total;
    }


    get allTotalWeight() {

        let sum = 0;
        this.quoteData.pallets.forEach((item: any) => {
            sum += parseInt(item.totalWeight);
        });
        return sum;
    }

    getpalletDimensionsOptions(type: number) {
        let options = this.quoteData.palletDimensionsOptions;
        for (let i = 0; i < options.length; i++) {
            if (type == options[i].type) {
                return options[i].title;
            }
        }
    }


    redirectToSchedulePickup() {
        window.location.href = "#/schedulepickup";
    }

    redirectToScheduleShipment() {
        window.location.href = "#/schedulepickup/shipment";
    }







    // Modal
    modalName: string = "modal";
    modalMessage: string = `Your order pickup for Quote #0001 has been placed`;
    modalTitle: string = "Order Confirmation";
    modalConfirmText: string = "Finished";
    modalCancelText: string = "Get Another Quote";

    showModal() {
        this.$modal.show(this.modalName);
    }

    closeModal() {
        this.$modal.hide(this.modalName);
    }

    getAnotherQuote() {
        window.location.href = "#/getquote";
    }

    backToHome() {
        window.location.href = "#/home";
    }



}
