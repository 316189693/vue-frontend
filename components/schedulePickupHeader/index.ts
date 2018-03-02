import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import * as Logger from "js-logger";
import template from "./schedulePickupHeader.vue";


@Component({
  mixins: [template],
  components: {}
})
export default class SchedulePickupHeader extends Vue {
    @Provide()
    processStage:number = this.$store.getters.quoteProcessStage;
    
}