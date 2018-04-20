import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import * as Logger from "js-logger";
import template from "./estimatedQuote.vue";
import { isUndefined } from "util";


@Component({
    mixins: [template],
    components: {},

})
export default class EstimatedQuote extends Vue {


    quoteData = this.$store.getters.quoteData;

    isEditMode: boolean = false;
    isScheduleMode: boolean = false;
    isShowButtons: boolean = true;
    // get total() {
    //     return parseFloat(this.estimateQuote.palletSpaceCharge) + parseFloat(this.estimateQuote.fuelCharge) + parseFloat(this.estimateQuote.complianceCharge);
    // }


    // computed properties
    get conventionCenterSum() {
        return (parseFloat(this.quoteData.estimate.pickup.conventionCenter) || 0) + (parseFloat(this.quoteData.estimate.delivery.conventionCenter) || 0);
    }
    get constructionSiteSum() {
        return (parseFloat(this.quoteData.estimate.pickup.constructionSite) || 0) + (parseFloat(this.quoteData.estimate.delivery.constructionSite) || 0);
    }
    get liftGateSum() {
        return (parseFloat(this.quoteData.estimate.pickup.liftGate) || 0) + (parseFloat(this.quoteData.estimate.delivery.liftGate) || 0);
    }
    get limitedAccessSum() {
        return (parseFloat(this.quoteData.estimate.pickup.limitedAccess) || 0) + (parseFloat(this.quoteData.estimate.delivery.limitedAccess) || 0);
    }
    get palletJackSum() {
        return (parseFloat(this.quoteData.estimate.pickup.palletJack) || 0) + (parseFloat(this.quoteData.estimate.delivery.palletJack) || 0);
    }
    get residentialSum() {
        return (parseFloat(this.quoteData.estimate.pickup.residential) || 0) + (parseFloat(this.quoteData.estimate.delivery.residential) || 0);
    }
    // end of computed properties

    created() {
        let query = this.$route.query;

        this.isEditMode = query.isEdit ? true : false;
        this.isScheduleMode = query.schedule ? true : false;
        if (!isUndefined(query.isShowButtons)) {
            this.isShowButtons = query.isShowButtons === 'false' ? false : true;
        }
    }

    schedulePickup() {
        this.$emit('schedulePickup');
    }

    saveQuote() {
        this.$emit('saveQuote');
    }

    editQuote() {
        this.$emit('goEdit');
    }
}