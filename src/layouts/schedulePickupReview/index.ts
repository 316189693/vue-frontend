import Vue from "vue";
import { Component, Prop, Provide, Watch, Inject } from "vue-property-decorator";
import * as Logger from "js-logger";
import tmsService from "../../services/axios/tmsService";
import clientService from "../../services/axios/axiosService";
import qs from "qs";
import VueScrollTo from 'vue-scrollto';
import rateSocket from "../../services/socketIO/rateChannel";
import moment from "moment";


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
    @Provide()
    modalConfirmText: string = "Place Order";
    warehouse_id: number;

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

    created() {
        this.$store.dispatch("getMyAccountData");
    }

    mounted() {

    }
    // end of life cycle methods

    // Data
    accountData = this.$store.getters.myAccountData;
    quoteData = this.$store.getters.quoteData;
    scheduleData = this.$store.getters.scheduleData;
    isProcessing = false;
    orderPageLink: any = "";
    orderId: number = 0;
    // Data



    // computed properties
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

    get pickupDateRange() {
        let date1 = moment(this.scheduleData.pickup.earliestPickupDate).format("MM/DD/YYYY");
        let date2 = moment(this.scheduleData.pickup.latestPickupDate).format("MM/DD/YYYY");
        return `${date1} to ${date2}`;
    }

    get pickupTimeRange() {
        let time1_12hour = this.scheduleData.pickup.earliestPickupTime;
        let time1_24hour = moment(`2018-1-1 ${time1_12hour}`).format("HH:mm");

        let time2_12hour = this.scheduleData.pickup.latestPickupTime;
        let time2_24hour = moment(`2018-1-1 ${time2_12hour}`).format("HH:mm");

        // return `${time1_24hour} (${time1_12hour}) to ${time2_24hour} (${time2_12hour})`;
        return `${time1_12hour} to ${time2_12hour}`;
    }
    // end of computed properties

    // methods
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

    createTmsLink(link: any) {
        let host = window.location.hostname;
        let domain;

        if (host == "localhost" || host == "clientdev..com") {
            domain = "https://dev..com";
        }
        else if (host == "clientstage..com" || host == "shipstage.unisco.com") {
            domain = "https://staging..com";
        }
        else if (host == "client..com" || host == "ship.unisco.com") {
            domain = "https://tms..com";
        }
        return domain + link;
    }

    async accept() {

        this.isProcessing = true;

        let sp = this.scheduleData.pickup;
        let qp = this.quoteData.pickup;

        let pickupJson = {
            companyName: `${sp.company.trim()} - LTL`,
            address1: sp.address1.trim(),
            address2: sp.address2 && sp.address2.trim(),
            city: qp.city,
            state: qp.state,
            zip: qp.zipCode,
            email: sp.email && sp.email.trim(),
            phone: sp.phone,
            fax: sp.fax,
            address_book: sp.address_book,
            location_type: qp.locationType
        };

        let sd = this.scheduleData.delivery;
        let qd = this.quoteData.delivery;

        let deliveryJson = {
            companyName: `${sd.company.trim()} - LTL`,
            address1: sd.address1.trim(),
            address2: sd.address2 && sd.address2.trim(),
            city: qd.city,
            state: qd.state,
            zip: qd.zipCode,
            email: sd.email && sd.email.trim(),
            phone: sd.phone,
            fax: sd.fax,
            address_book: sd.address_book,
            location_type: qd.locationType
        };

        let pickupLocationPromise: any =  {};
        let deliveryLocationPromise: any  = {};

        if (sp.locationId == 0) {
            pickupLocationPromise = this.getLocationPromise(pickupJson);
        }
        if (sd.locationId == 0) {
            deliveryLocationPromise = this.getLocationPromise(deliveryJson);
        }

        try {
            let response = await Promise.all([pickupLocationPromise, deliveryLocationPromise]);

            let pickupLocationId = (sp.locationId == 0) ? response[0].data.location_id : sp.locationId;
            let deliveryLocationId = (sd.locationId == 0) ? response[1].data.location_id : sd.locationId;

            if (parseInt(pickupLocationId) > 0 && parseInt(deliveryLocationId) > 0) {
                this.postAcceptQuote(pickupLocationId, deliveryLocationId);
            }
            else {
                throw new Error("Create Locations Failed");
            }

        } catch (error) {
            console.log(error.message);
            alert(error.message);
            this.isProcessing = false;
        }

    }

    private async postAcceptQuote(pickupLocationId: number, deliveryLocationId: number) {
        let url = "write_new/write_tms_quote_accept.php";

        if (localStorage.getItem("company_id") == "26") {
            this.warehouse_id = 56011;
        } else {
           this.warehouse_id = 2809;
        }

        let json = {
            quote_id: this.quoteData.quoteId,
            ref_number: this.quoteData.orderReference,
            pickupLocationId: pickupLocationId,
            deliveryLocationId: deliveryLocationId,
            appointment_date_min: moment(this.scheduleData.pickup.earliestPickupDate).format("YYYY-MM-DD"),
            appointment_date_max: moment(this.scheduleData.pickup.latestPickupDate).format("YYYY-MM-DD"),
            appointment_time: moment(`2018-1-1 ${this.scheduleData.pickup.earliestPickupTime}`).format("HH:mm:ss"),
            appointment_time_to: moment(`2018-1-1 ${this.scheduleData.pickup.latestPickupTime}`).format("HH:mm:ss"),
            ltlClientPortal: 1,
            UserID: localStorage.UserID,
            UserToken: localStorage.UserToken,
            pageName: "ltlShedulePickupReview",
            ltlClientPortalPU: 1,
            warehouse_id1: this.warehouse_id,
        };

        try {
            let result = await tmsService.post(url, json);
            let order_id = parseInt(result.data.order_id);
            let pickup_id = parseInt(result.data.pickup_id);

            if (order_id > 0) {
                this.orderId = order_id;
                this.$modal.show(this.modalName);
                let link = "#/orderReview?pu=" + pickup_id + "&order=" + order_id + "&isShowButtons=false";
                this.orderPageLink = link;
                this.isProcessing = false;
                this.$store.dispatch("changeQuotePageStage", "quoteStartPage");
            }
            else {
                throw new Error("Failed to Create Order");
            }

        } catch (error) {
            this.isProcessing = false;
            alert(error.message);
        }

    }

    private async getLocationPromise(json: any) {
        let locationUrl = "write_new/write_location_admin.php";

        let request = this.getLocationRequestJson(json);

        return tmsService.post(locationUrl, request);
    }

    getAnotherQuote() {
        this.$store.dispatch("resetQuote");
        window.location.href = "#/getquote";
    }

    backToHome() {
        this.$store.dispatch("resetQuote");
        window.location.href = "#/home";
    }




    // Modal
    modalName: string = "modal";
    // get modalMessage() {
    //     return `Your order #${this.orderId} for Quote #${this.quoteData.quoteId} has been placed!`;
    // }
    rightBtnStyle: any = {
        "background-color": "#15223d !important"
    };

    showModal() {
        this.$modal.show(this.modalName);
    }

    closeModal() {
        this.$modal.hide(this.modalName);
    }
    // end of modal

    // cancelScheduleModal
    cancelScheduleModalName: string = "cancelSchedule";
    cancelScheduleRightBtnAction() {
        window.location.href = "#/home";
    }
    cancelScheduleLeftBtnAction() {
        this.$modal.hide(this.cancelScheduleModalName);
    }
    cancel() {
        this.$modal.show(this.cancelScheduleModalName);
    }
    // end of cancelScheduleModal




    private getLocationRequestJson(input: any) {

        let data = {
            rec_id: 0,
            input_location_type_id: input.location_type,
            input_location_address_book : input.address_book,
            input_name: input.companyName,
            input_fax: input.fax,
            input_invoice_id: 0,
            input_czar_rate: 0,
            input_status: 1,
            input_phone: input.phone,
            input_email: input.email,
            input_timezone: "PST",
            input_street: input.address1,
            input_street2: input.address2,
            input_city: input.city,
            input_state: input.state,
            input_zip: input.zip,
            input_country: "US",
            input_lat: null,
            input_lng: null,
            input_server: 0,
            input_warehouse_id: 0,
            input_invoice_type: "Standard",

            input_credit_score_grade: 0,
            input_netterm: 0,
            input_payment_type: "cash",

            input_print_invoice_bol: 0,
            input_invoice_pod: 0,
            input_insurance_addl: 0,
            input_carrier_complete: 0,
            input_gps_contract: 0,
            input_watch: 0,
            input_intracompany: 0,
            input_production_line: 0,
            input_invoice_inoutgate: 0,
            input_group: 42,
            input_invoice_mail: 0,
            input_email_update: -1,
            input_cust_quote: 0,
            input_customer_pickup: 0,
            input_location_notify: 0,
            input_revenue_id: 0,
            input_invoice_scale: 0,
            input_invoice_combine: 0,
            input_invoice_complete_move: 0,
            input_drop_and_hook: 0,
            input_link_terminal_id: 0,
            input_invoice_receipt: 0,
            input_dr_double_sided: 0,
            input_req_ref: 0,
            input_req_po: 0,
            input_req_do: 0,
            input_req_rate_conf: 0,
            input_cust_ref: 0,
            input_collage: 0,
            input_req_photo: 0,
            input_req_pc_count: 0,
            input_bobtail_override: 0,
            input_notify_email: 0,
            input_notify_phone: 0,
            input_notify_text: 0,
            input_notify_fax: 0,
            input_customer_group: 0,
            input_aging_format_difference: 30,
            input_statement_ref: 0,
            input_vendor: 0,
            input_accessorial_approval: 0,
            input_pu_notification: 0,
            input_dl_notification: 0,
            options_array: [25],
            location_shipper: 1,
            location_xml: 0,
            location_invoiceheader: 0,
            location_residential: 0,
            location_inside: 0,
            location_pickup_liftgate: 0,
            location_delivery_liftgate: 0,
            location_appointment: 0,
            location_sameday: 0,
            location_email_pod: 0,
            location_bobtail_override: 0,
            location_lh_carrier: 0,
            location_advanced_carrier: 0,
            location_beyond_carrier: 0,
            location_dray_carrier: 0,
            location_billto: 0,
            location_cfs: 0,
            location_warehouse: 0,
            location_xdock: 0,
            location_port: 0,
            location_chassisdepot: 0,
            location_parking: 0,
            location_steamship: 0,
            location_inventory: 0,
            location_vendor: 0,
            location_production_line: 0,
            pageName: "LTL",
        };

        return data;
    }


}
