import Vue from "vue";
import { Component, Prop, Provide, Watch, Inject } from "vue-property-decorator";
import * as Logger from "js-logger";


// Components
import template from "./getquote.vue";
import ShippingDetail from "../../components/shippingDetail";
import EstimatedQuote from "../../components/estimatedQuote";
import DefaultModal from "../../components/modal";
import MainButtonSet from "../../components/mainButtonSet";
import googleAutoComplete from "../../services/googleAPI/autoComplete";
import bus from "../../bus";
import { Validator } from "vee-validate";

const VueScrollTo = require('vue-scrollto');



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
    quoteData = this.$store.getters.quoteData;

    hasQuote: boolean = false;

    calculating: boolean = false;

   

    pickupZipValue_OnFocus: string;

    pickupZipValue_OnBlur: string;
    // Data

    @Inject()
    $validator:Validator;


    get palletSpaces(){
        let sum = 0;
        this.quoteData.pallets.forEach((item:any) => {
            sum += item.palletSpace;
        });
        this.quoteData.palletSpaces = sum;
        return sum;
    }
    

    // component life cycle method
    beforeCreate() {
        this.$store.dispatch("changeTab", 2);
        this.$store.dispatch("changeQuotePageStage","quoteStartPage");

    }

    mounted() {

        this.pickupZipAutoComplete();
        this.deliveryZipAutoComplete();

    }


    // methods
    addLine() {
        this.$store.dispatch("addLine");
    }

    async validate() {

       
        let result = await this.$validator.validateAll();

        if (result) {

            this.calculating = true;
            setTimeout(() => {
                this.calculating = false;
                this.hasQuote = true;
                this.quoteData.amount = 1000;  
                
                setTimeout(()=>{
                    VueScrollTo.scrollTo("#estimatedQuoteBox",1000);
                },100);
            }, 1500);

            this.$store.dispatch("changeQuotePageStage","schedulePage");

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
    modalName: string = "cancelQuoteModal";
    modalMessage: string = `Are you sure you want to cancel scheduling this pickup? Canceled pickups will be reverted back to a "Saved Quote"`;
    modalTitle: string = "Cancel Quote";
    modalConfirmText: string = "Yes, Cancel Quote";
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
