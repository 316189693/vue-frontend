import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import * as Logger from "js-logger";


import template from "./schedulePickup.vue";
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
export default class SchedulePickup extends Vue {

    // vue life cycle method
    beforeCreate() {

        let processStage = this.$store.getters.quoteProcessStage;
        if (processStage < 2) {
            window.location.href = "#/getquote";
        }
        else {
            this.$store.dispatch("schedulePage_RestoreStage");
        }

    }

    // Data
    @Provide()
    scheduleData = this.$store.getters.scheduleData;

    @Provide()
    instruction_MaxCharacters: number = 150;

    @Provide()
    instruction_CaractersCount: number = 0;
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

        if (result) {
            this.$store.dispatch("allow_ScheduleShipmentPage");
            window.location.href = "#/schedulepickup/shipment";
        }
        else {

        }

    }



    // Modal 
    @Provide()
    modalName: string = "cancelScheduleModal";

    @Provide()
    modalTitle: string = "Cancel Schedule Pickup";

    @Provide()
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