import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import * as Logger from "js-logger";


// Components
import template from "./getquote.vue";
import ShippingDetail from "../../components/shippingDetail";
import EstimatedQuote from "../../components/estimatedQuote";
import DefaultModal from "../../components/modal";
import MainButtonSet from "../../components/mainButtonSet";
import * as $ from "jquery";
import googleAutoComplete from "../../services/googleAPI/autoComplete";




const Datepicker = require("vuejs-datepicker");



@Component({
    mixins: [template],
    components: {
        ShippingDetail,
        Datepicker,
        EstimatedQuote,
        DefaultModal,
        MainButtonSet
    },

})
export default class GetQuote extends Vue {

    // Data
    @Provide()
    quoteData = this.$store.getters.quoteData;

    @Provide()
    hasQuote: boolean = false;

    @Provide()
    calculating: boolean = false;


    @Provide()
    dateFormat: string = "MM/dd/yyyy";

    @Provide()
    pickupZipValue_OnFocus: string;

    @Provide()
    pickupZipValue_OnBlur: string;
    // Data
    

    // component life cycle method
    beforeCreate() {
        this.$store.dispatch("changeTab", 2);
        this.$store.dispatch("quotePage_RestoreStage");
    }

    mounted() {

        this.pickupZipAutoComplete();
        this.deliveryZipAutoComplete();

    }



    // methods
    addLine() {
        let newPallet = {
            width: 10,
            length: 10,
            height: 10
        };
        this.$store.dispatch("addLine");
        // this.$store.commit('addLine');

        $.ajax({
            url: "http://maps.googleapis.com/maps/api/geocode/json?address=91776", success: function (result) {
                console.log(result);
            }
        });



    }

    async validate() {
        let result = await this.$validator.validateAll();

        if (result) {

            this.calculating = true;
            setTimeout(() => {
                this.calculating = false;
                this.hasQuote = true;
                this.quoteData.amount = 1000;
            }, 1500);

            this.$store.dispatch("allowSchedulePage");

        }
        else {

        }

    }



    async pickupZipAutoComplete() {
        let pickupZipAutoComplete = new googleAutoComplete("input_zip_code_pickup");
        pickupZipAutoComplete.setShortStateName();

        while (true) {
            let result: any = await pickupZipAutoComplete.searchResult();

            this.quoteData.pickup.zipCode = result.postal_code;
            this.quoteData.pickup.city = result.city;
            this.quoteData.pickup.state = result.state;
        }

    }

    async deliveryZipAutoComplete() {
        let pickupZipAutoComplete = new googleAutoComplete("input_zip_code_delivery");
        pickupZipAutoComplete.setShortStateName();

        while (true) {
            let result: any = await pickupZipAutoComplete.searchResult();

            this.quoteData.delivery.zipCode = result.postal_code;
            this.quoteData.delivery.city = result.city;
            this.quoteData.delivery.state = result.state;
        }

    }



    // Modal
    @Provide()
    modalName: string = "cancelQuoteModal";

    @Provide()
    modalMessage: string = `Are you sure you want to cancel scheduling this pickup? Canceled pickups will be reverted back to a "Saved Quote"`;

    @Provide()
    modalTitle: string = "Cancel Quote";

    @Provide()
    modalConfirmText: string = "Yes, Cancel Quote";

    @Provide()
    modalCancelText: string = "Nevermind";

    showModal() {
        this.$modal.show(this.modalName);
    }

    closeModal() {
        this.$modal.hide(this.modalName);
    }

    confirmModal() {
        alert("confirm");
    }
    // Modal


}
