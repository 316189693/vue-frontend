import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import * as Logger from "js-logger";
import template from "./estimatedQuote.vue";


@Component({
    mixins: [template],
    components: {},
  
})
export default class EstimatedQuote extends Vue {


    goToSchedulePickup(){
        window.location.href="#/schedulepickup";
    }
}