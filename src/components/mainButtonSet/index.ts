import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import * as Logger from "js-logger";
import template from "./mainButtonSet.vue";


@Component({
    mixins: [template],
    components: {}
})
export default class MainButtonSet extends Vue {

    @Prop({default: "Continue"})
    rightBtnText: string;

    @Prop({default: "Cancel"})
    leftBtnText: string;


    @Prop()
    rightBtnAction: Function;

    @Prop()
    leftBtnAction: Function;


}