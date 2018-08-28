import Vue from 'vue';
import template from './orderReview.vue';
import { Component, Provide, Watch } from 'vue-property-decorator';
import * as Logger from 'js-logger';
import EstimatedQuote from "../../components/estimatedQuote";
import rateSocket from "../../services/socketIO/rateChannel";
import tmsService from "../../services/axios/tmsService";

// helper classes


@Component({
    mixins: [template],
    components: {
        EstimatedQuote
    }
})
export default class OrderReview extends Vue {
    @Provide()
    formData: any = this.$store.getters.orderReview;

    mounted() {
        if (this.$route.query.order) {
            let request = {order: this.$route.query.order, pu: this.$route.query.pu};
            this.$store.dispatch("updateOrderReview", request);
        }

    }


    hasDocument() {
        return this.formData.documents && this.formData.documents.length > 0;
    }

    get DeliveryCityState() {
        return this.formData.delivery.city + ", " + this.formData.delivery.state + " " + this.formData.delivery.zipCode;
    }

    get PickupCityState() {
        return this.formData.pickup.city + ", " + this.formData.pickup.state + " " + this.formData.pickup.zipCode;
    }

    tryParseJson(json: any) {
        try {
            return JSON.parse(json);
        } catch (error) {
            return null;
        }
    }

    trackShipment() {
        let track = '';

        if (this.formData.proNumber != null) {
            track = this.formData.proNumber;
        }
        else if (this.formData.referenceNumber != '') {
            track = this.formData.referenceNumber;
        }
        else {
            track = this.$route.query.pu;
        }

        this.$router.push({ name: 'TrackShipment', query: { 'track': track}});
    }

}