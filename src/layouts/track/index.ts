import Vue from "vue";
import { Component, Prop, Provide } from "vue-property-decorator";
import * as Logger from "js-logger";

import template from "./track.vue";

import TrackProgressBar from "../../components/trackProgressBar";

import * as $ from "jquery";

@Component({
    mixins: [template],
    components: {
        TrackProgressBar
    }
})
export default class Track extends Vue {
    proNumber: string = "";
    @Provide()
    trackData: any = this.$store.getters.trackData;

    created() {
        this.trackData.showTrack = false;
        // this.trackData.showTerms = true;
        this.trackData.showNotFound = false;
        this.trackData.multiOrder = false;
        this.trackData.showMultiOrder = false;
        this.trackData.status = "";
        this.trackData.originDate = "";
        this.trackData.originLocation = "";
        this.trackData.destinationDate = "";
        this.trackData.destinationLocation = "";
        this.trackData.details = {};
        this.trackData.orders = [];
    }

    mounted() {
        if (typeof this.$route.query.track != 'undefined') {
            this.$store.dispatch("searchTrack", this.$route.query.track);
        }
    }

    // computed properties
    get isOrignComplete() {
        return this.trackData.status == 1 || this.trackData.status == 2 || this.trackData.status == 3;
    }

    get isInTransit() {
        return this.trackData.status == 2 || this.trackData.status == 3;
    }

    get isDeliveryComplete() {
        return this.trackData.status == 3;
    }

    get processStage() {
        if (typeof this.trackData.status == "number") {
            return this.trackData.status;
        }
        else if (typeof this.trackData.status == "string") {
            return parseInt(this.trackData.status);
        }
        else {
            return 0;
        }
    }

    search() {
        this.$store.dispatch("searchTrack", this.proNumber);
        $("input:radio:checked").prop("checked", false);
        $(".selected-row").removeClass("selected-row");
    }

    showOrder(index: number) {
        let order = this.trackData.orders[index];
        this.trackData.status = order.status;
        this.trackData.originDate = order.originDate;
        this.trackData.originLocation = order.originLocation;
        this.trackData.destinationDate = order.destinationDate;
        this.trackData.destinationLocation = order.destinationLocation;
        this.trackData.details = order.details;
        this.trackData.showTrack = true;
        $(".selected-row").removeClass("selected-row");
        $("#orderRow" + index).addClass("selected-row");

    }

    closeInfoMessage() {
        this.trackData.multiOrder = false;
    }

    changeKeyWord() {
        this.trackData.showNotFound = false;
        // this.trackData.showTerms = true;
    }

}
