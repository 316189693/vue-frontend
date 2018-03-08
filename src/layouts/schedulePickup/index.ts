import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import * as Logger from "js-logger";


import template from "./schedulePickup.vue";
import SchedulePickupHeader from "../../components/schedulePickupHeader";
import MainButtonSet from "../../components/mainButtonSet";
import DefaultModal from "../../components/modal";
import { Validator } from "vee-validate";

const Datepicker = require("vuejs-datepicker");



@Component({
    mixins: [template],
    components: {
        SchedulePickupHeader,
        MainButtonSet,
        DefaultModal,
        Datepicker
    },

})
export default class SchedulePickup extends Vue {

    // vue life cycle method
    beforeCreate() {

        // check the stage if it's allowed to access this page directly
        let stage = this.$store.getters.quoteProcessStage;
        if (stage.currentStage < stage.stageEnum.schedulePage) {
            window.location.href = "#/getquote";
        }
        else {
            this.$store.dispatch("changeQuotePageStage", "schdulePage");
        }

    }

    mounted() {


    }



    // Data
    scheduleData = this.$store.getters.scheduleData;

    instruction_MaxCharacters: number = 150;

    instruction_CaractersCount: number = 0;

    dateFormat: string = "MM/dd/yyyy";

    validationStarted: boolean = false;
    // Data

    // computed properties
    get locationTypeOptions() {
        return this.quotePageData.locationTypeOptions;
    }

    get quotePageData() {
        return this.$store.getters.quoteData;
    }

    get remainingWords() {
        return this.instruction_MaxCharacters - this.instruction_CaractersCount;
    }

    get validPickupDateTime(){
        let earlyDate = new Date(this.scheduleData.pickup.earliestPickupDate).toLocaleDateString("en-US");
        let lateDate = new Date(this.scheduleData.pickup.latestPickupDate).toLocaleDateString("en-US");;

        let earlyTime = this.scheduleData.pickup.earliestPickupTime;
        let lateTime = this.scheduleData.pickup.latestPickupTime;

        let firstDate = new Date(`${earlyDate} ${earlyTime}`);
        let secondDate = new Date(`${lateDate} ${lateTime}`);

        let currentDate = new Date();

        let result = firstDate <= secondDate && firstDate >= currentDate && secondDate >= currentDate;

        return result;
    }
    // computed properties

    // watch
    @Watch("scheduleData.pickup.instructions")
    onInstructionChanged(val: string, oldVal: string, event: any) {
        let count = val.length;
        if (count > this.instruction_MaxCharacters) {
            this.scheduleData.pickup.instructions = val.substring(0, this.instruction_MaxCharacters);
        }
        this.instruction_CaractersCount = count;
    }


    //methods
    async validate() {

        let result = await this.$validator.validateAll();

        this.validationStarted = true;

        if (result && this.validPickupDateTime) {
            this.$store.dispatch("changeQuotePageStage", "scheduleShipmentPage");
            window.location.href = "#/schedulepickup/shipment";
        }
        else {
           
        }

    }


    getTimeOptions() {

        let interval = 30; //in minute
        let M = 60; //60 mintue in a hour

        let startingHour = 0;
        let endingHour = 24;

        let times = [];

        let totalMinute = endingHour * M;
        let startingMinute = startingHour * M;

        for (let i = startingMinute; i < totalMinute; i += interval) {
            let currentMinute = i
            let hour = Math.floor(currentMinute / M)
            let remainder = currentMinute % M;


            let options = {
                hour: "2-digit", minute: "2-digit"
            };

            let date = new Date(0, 0, 0, hour, remainder, 0);

            let formatted = date.toLocaleTimeString("en-us", options);

            times.push(formatted);     
        }

        return times;
    }



    // Modal 
    modalName: string = "cancelScheduleModal";
    modalTitle: string = "Cancel Schedule Pickup";
    modalMessage: string = `Are you sure you want to cancel scheduling this pickup? Canceled pickups will be reverted back to a "Saved Quote"`;

    showModal() {
        this.$modal.show(this.modalName);
    }
    closeModal() {
        this.$modal.hide(this.modalName);
    }

    confirmModal() {
        alert("abc confirm");
    }
    // Modal




}