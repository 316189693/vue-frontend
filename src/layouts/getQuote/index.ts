import Vue from "vue";
import { Component, Prop, Provide, Watch, Inject } from "vue-property-decorator";
import * as Logger from "js-logger";
import tmsService from "../../services/axios/tmsService";
import clientService from "../../services/axios/axiosService";
import qs from "qs";
import VueScrollTo from 'vue-scrollto';
import rateSocket from "../../services/socketIO/rateChannel";



// Components
import template from "./getquote.vue";
import ShippingDetail from "../../components/shippingDetail";
import EstimatedQuote from "../../components/estimatedQuote";
import DefaultModal from "../../components/modal";
import MainButtonSet from "../../components/mainButtonSet";
import googleAutoComplete from "../../services/googleAPI/autoComplete";
import bus from "../../bus";
import { Validator } from "vee-validate";
import Datepicker from 'vuejs-datepicker';


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

    title: string = `Get A Quote`;

    tooltipMessages: any = {
        liftGate: "liftGate",
        limitedAccess: "limitedAccess",
        palletJack: "palletJack",
    };
    // Data



    @Inject()
    $validator: Validator;


    get palletSpaces() {
        let sum = 0;
        this.quoteData.pallets.forEach((item: any) => {
            sum += item.palletSpace;
        });
        this.quoteData.palletSpaces = sum;
        return sum;
    }


    // component life cycle method
    beforeCreate() {
        this.$store.dispatch("changeQuotePageStage", "quoteStartPage");
    }

    created() {
        let quoteNumber = this.$route.query.quoteNumber;

        if (parseInt(quoteNumber) > 0) {
            this.title = `Quote # ${quoteNumber}`;
            this.$store.dispatch("search", quoteNumber);
            this.hasQuote = true;
        }
    }

    mounted() {
        this.pickupZipAutoComplete();
        this.deliveryZipAutoComplete();
    }


    // methods
    addLine() {
        this.$store.dispatch("addLine");
    }

    allowEdit() {
        this.hasQuote = false;
    }

    async validate() {

        let result = await this.$validator.validateAll();

        if (result) {

            this.calculating = true;
            setTimeout(() => {
                this.calculating = false;
                this.hasQuote = true;
                this.submit();

                setTimeout(() => {
                    VueScrollTo.scrollTo("#estimatedQuoteBox", 1000);
                }, 100);
            }, 1500);

        }
        else {

        }

    }

    async submit() {


        let params = new URLSearchParams();
        params.append("billto_id", "169567");
        params.append("client_id", "169567");
        params.append("client_name", "FRANK_COMPANY");

        let json = {
            billto_id: 169567,
            client_id: 169567,
            client_name: "FRANK_COMPANY",
            client_street: "806 EAST NEW YORK STREET",
            client_city: "LONG BEACH",
            client_state: "CA",
            client_zip: 90813,
            client_contact: null,
            client_phone: null,
            input_trailer: 0,
            consignee_id: 169567,
            consignee_name: "FRANK_COMPANY",
            consignee_street: "806 EAST NEW YORK STREET",
            consignee_city: "LONG BEACH",
            consignee_state: "CA",
            consignee_zip: 90813,
            consignee_contact: null,
            consignee_phone: null,
            input_quote_note: null,
            input_quote_note_internal: null,
            tms_lane_id: 0,
            order_id: 1,
            active: 1,
            input_pickup_date: "2018-03-14",
            input_quote_id: 0,
            input_debug: 0,
            limit_check: 1,
            create_quote: 1,
            quote_from: "QUOTE_ENGINE",
            exp_date: "2018-03-19",
            manifest_lines: `[{"tms_manifest_id":"0","del":"0","pallet":"2","spaces":"22","carton":"2","weight":"2","volume":"2","linear":"2","code":"RES","content":"RESIDENTIAL","class":"0","declared_value":"2"}]`,
            via_quote_page: 1,
            UserID: 8437,
            UserToken: "F3WQubo0eU",

        };

        let json2 = {
            billto_id: null,
            client_id: null,
            client_name: null,
            client_street: null,
            client_city: null,
            client_state: null,
            client_zip: 90813,
            client_contact: null,
            client_phone: null,
            input_trailer: 0,
            consignee_id: 169567,
            consignee_name: "FRANK_COMPANY",
            consignee_street: "806 EAST NEW YORK STREET",
            consignee_city: "LONG BEACH",
            consignee_state: "CA",
            consignee_zip: 90813,
            consignee_contact: null,
            consignee_phone: null,
            input_quote_note: null,
            input_quote_note_internal: null,
            tms_lane_id: 0,
            order_id: 1,
            active: 1,
            input_pickup_date: "2018-03-14",
            input_quote_id: 0,
            input_debug: 0,
            limit_check: 1,
            create_quote: 1,
            quote_from: "QUOTE_ENGINE",
            exp_date: "2018-03-19",
            manifest_lines: [
                { "tms_manifest_id": "0", "del": "0", "pallet": "2", "spaces": "22", "carton": "2", "weight": "2", "volume": "2", "linear": "2", "code": "RES", "content": "RESIDENTIAL", "class": "0", "declared_value": "2" },
                { "tms_manifest_id": "0", "del": "0", "pallet": "", "spaces": "", "carton": "", "weight": "", "volume": "", "linear": "", "code": "DL", "content": "LIFT-GATE DELIVERY", "class": "0", "declared_value": "" },
                { "tms_manifest_id": "0", "del": "0", "pallet": "", "spaces": "", "carton": "", "weight": "", "volume": "", "linear": "", "code": "PL", "content": "LIFT-GATE PICKUP", "class": "0", "declared_value": "" },
                { "tms_manifest_id": "0", "del": "0", "pallet": "5", "spaces": "5", "carton": "5", "weight": "5", "volume": "2", "linear": "2", "code": "APT", "content": "APPOINTMENT REQUIRED", "class": "0", "declared_value": "5" }
            ],
            via_quote_page: 1,
            UserID: 9316,
            UserToken: "F3WQubo0eU",

        };

        let json3 = {
            input_search_quote_id: null,
            input_search_date_from: "2018-03-12",
            input_search_date_to: "2018-03-13",
            billto_id: 0,
            input_search_shipper_state: "CA",
            input_search_shipper_zip: null,
            input_search_consignee_state: "CA",
            input_search_consignee_zip: null,
            input_search_status: 0,
            input_search_limit: 50,
            quote: 1,
            UserID: 8437,
            UserToken: "dzmGqD08J1",
            pageName: "dashboardQuote",
        };

        let dataStringJson = {
            UserID: "9316",
            UserToken: "bzE4xbu4sx",
            input_batch: 0,
            input_billing_party: "1",
            input_billto_id: "169567",
            input_consignee_city: "LONG BEACH",
            input_consignee_contact: "",
            input_consignee_id: "169567",
            input_consignee_name: "FRANK_COMPANY",
            input_consignee_phone: "",
            input_consignee_state: "CA",
            input_consignee_street: "806 EAST NEW YORK STREET",
            input_consignee_warehouse: null,
            input_consignee_zip: "90813",
            input_debug: 0,
            input_dray_manifest_id: 0,
            input_drayage_port: "0",
            input_equipment_type: "0",
            input_internal_notes: "",
            input_mastertariff_id: "0",
            input_notes: "",
            input_quote_expiration_date: "2018-03-20",
            input_quote_id: "0",
            input_savequote: 1,
            input_shipby: 0,
            input_shipment_date: "2018-03-13",
            input_shipment_id: "0",
            input_shipper_city: "LONG BEACH",
            input_shipper_contact: "",
            input_shipper_id: "169567",
            input_shipper_name: "FRANK_COMPANY",
            input_shipper_phone: "",
            input_shipper_state: "CA",
            input_shipper_street: "806 EAST NEW YORK STREET",
            input_shipper_warehouse: null,
            input_shipper_zip: "90813",
            input_single: 1,
            input_trip_id: "0",
            input_value: ""
        };


        // let url1 = "write/get_tms_quote_line_test.php"
        // tmsService.post(url1, qs.stringify(json3)).then((res) => {
        //     console.log(res);
        // }).catch(error => {
        //     console.log(error)
        // });;
        // let url = "write_new/calc_quote.php";
        // tmsService.post(url, qs.stringify(dataStringJson)).then((res) => {
        //     console.log(res);
        // }).catch(error => {
        //     console.log(error)
        // });;

        const self = this;

        let url = "write/write_tms_quote_line_v0_test.php";
        tmsService.post(url, qs.stringify(json)).then((res) => {
            console.log(res);

            let palletSpaceCharge = 0;
            for (const item of res.data) {
                palletSpaceCharge += parseInt(item.tms_quote_lines_quote_amount);
            }

            let estimateQuote = self.quoteData.estimate;

            estimateQuote.palletSpaceCharge = palletSpaceCharge;
            estimateQuote.total = estimateQuote.palletSpaceCharge + estimateQuote.fuelCharge + estimateQuote.complianceCharge;
        }).catch(error => {
            console.log(error);
        });


        // clientService.post(url, qs.stringify(dataStringJson)).then((res) => {
        //     console.log(res);
        // }).catch(error => {
        //     console.log(error)
        // });;



        // rateSocket.emit('data_channel', {
        //     user_action: 'rate_request',
        //     user_data: dataStringJson
        // });
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
