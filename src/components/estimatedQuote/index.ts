import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import * as Logger from "js-logger";
import template from "./estimatedQuote.vue";


@Component({
    mixins: [template],
    components: {},

})
export default class EstimatedQuote extends Vue {

    estimateQuote = this.$store.getters.quoteData.estimate;

    goToSchedulePickup() {
        this.$store.dispatch("changeQuotePageStage", "schedulePage");
        window.location.href = "#/schedulepickup";
    }

    editQuote() {
        this.$emit('goEdit', "hi");
    }
}