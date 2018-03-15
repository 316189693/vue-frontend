import Vue from "vue";
import { Component, Prop, Provide } from "vue-property-decorator";
import * as Logger from "js-logger";

import template from "./track.vue";

@Component({
    mixins: [template]
})
export default class Track extends Vue {
    proNumber: number;
    @Provide()
    trackData: any = this.$store.getters.trackData;

    created() {
        this.trackData.showTrack = false;
        this.trackData.showTerms = true;
        this.trackData.showNotFound = false;
        this.trackData.status = "";
        this.trackData.originDate = "";
        this.trackData.originLocation = "";
        this.trackData.destinationDate = "";
        this.trackData.destinationLocation = "";
        this.trackData.details = {};
    }

    mounted() {

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

    search() {
        this.$store.dispatch("searchTrack", this.proNumber);
    }

    changeKeyWord() {
        this.trackData.showNotFound = false;
        this.trackData.showTerms = true;
    }

}
