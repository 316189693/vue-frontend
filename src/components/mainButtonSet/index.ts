import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import * as Logger from "js-logger";
import template from "./mainButtonSet.vue";


@Component({
    mixins: [template],
    components: {},
  
})
export default class MainButtonSet extends Vue {

    @Prop({default:"Continue"})
    confirmText:string;

    @Prop({default:"Cancel"})
    cancelText:string;


    @Prop()
    confirmAction:Function;

    @Prop()
    cancelAction:Function;

 
}