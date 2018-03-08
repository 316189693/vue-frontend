import Vue from "vue";
import { Component, Prop, Provide } from "vue-property-decorator";
import * as Logger from "js-logger";

import template from "./track.vue";

@Component({
    mixins: [template],
})
export default class Track extends Vue {
    @Provide()
    proNumber: number;
    showTerms: boolean = true;
    showNotFound: boolean = false;
    showTrack: boolean = false;
    @Provide()
    trackData: any = {};

    created() {
        this.$store.dispatch("changeTab", 3);
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

    async search() {
        this.showTrack = false;
        let res = await this.$store.getters.searchTrack(this.proNumber);
        if (res == -1 || res == 0) {
            this.showTerms = false;
            this.showNotFound = true;
            this.trackData = {};
        } else {
            this.showTrack = true;
            this.showTerms = true;
            this.showNotFound = false;
            this.trackData = res;
            let originDate = this.formateDate(res.p_date);
            let originLocation = this.formateLocation(res.pickup_city, res.pickup_state);
            let destinationDate = res.d_date ? "Estimated: " + this.formateDate(res.d_date) : "";
            let destinationLocation = this.formateLocation(res.delivery_city, res.delivery_state);
            this.trackData.originDate = originDate;
            this.trackData.originLocation = originLocation;
            this.trackData.destinationDate = destinationDate;
            this.trackData.destinationLocation = destinationLocation;
            let histories = res.history;
            let details = {};

            for (let index = 0; index < histories.length; index++) {
                let h = histories[index];
                let date: Date = new Date(h.c_date);
                let stage = h.tms_order_log_stage;
                let formatedDate = this.formateHistoryDate(h.c_date);
                let formatedTime = this.formateHistoryTime(h.c_date);
                let location = "";
                let logText = h.tms_order_log_text || "";
                if (logText == "order check-in") {
                    switch (stage) {
                        case "0":
                            logText = "Picked Up";
                            location = originLocation;
                            break;
                        case "2":
                        case "3":
                        case "4":
                            logText = "Delivered";
                            location = destinationLocation;
                            break;
                    }
                } else if ((logText == "order updated") || (logText == "Delivery Apt - Order Appt. Update")) {
                    logText = "Picked Up";
                }

                let statusCode = h.tms_order_log_status_code || "";
                let seperator = logText && statusCode ? " - " : "";
                let detail = {
                    formatedTime: formatedTime,
                    status: statusCode + seperator + logText,
                    location: location
                };

                if (details[formatedDate]) {
                    details[formatedDate].push(detail);
                } else {
                    details[formatedDate] = [detail];
                }
            }
            this.trackData.details = details;
        }


    }

    changeKeyWord() {
        this.showNotFound = false;
        this.showTerms = true;
    }

    capitalize(str: string) {
        return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : "";
    }

    formateLocation(city: string, state: string) {
        return (city && state) ? this.capitalize(city) + ", " + state : "";
    }

    formateTrackTableTime(timeStr: string) {
        if (!timeStr) return "";
        let timeFormat = {
            hour: "2-digit",
            minute: "2-digit"
        };
        return new Date(timeStr).toLocaleTimeString("en-US", timeFormat);
    }

    formateTrackTableDate(dateStr: string) {
        if (!dateStr) return "";
        let dateFormat = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        };
        return new Date(dateStr).toLocaleDateString("en-US", dateFormat);
    }

    formateDate(dateStr: string) {
        if (!dateStr) return "";
        let dateFormat = {
            weekday: "short",
            month: "short",
            day: "numeric",
        };
        return new Date(dateStr).toLocaleDateString("en-US", dateFormat);
    }

    formateHistoryTime(timeStr: string) {
        if (!timeStr) return "";
        let timeFormat = {
            hour: "2-digit",
            minute: "2-digit"
        };
        return new Date(timeStr).toLocaleTimeString("en-US", timeFormat);
    }

    formateHistoryDate(dateStr: string) {
        if (!dateStr) return "";
        let dateFormat = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        };
        return new Date(dateStr).toLocaleDateString("en-US", dateFormat);
    }

}
