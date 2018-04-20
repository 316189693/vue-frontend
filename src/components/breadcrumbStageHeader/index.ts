import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import * as Logger from "js-logger";
import template from "./stageHeader.vue";
import commonUtilService from "../../services/commonUtil/commonUtilService";


@Component({
    mixins: [template],
    components: {}
})
export default class BreadcrumbStageHeader extends Vue {


    @Prop({ default: "" })
    headerTitle: string;

    @Prop({default: 1})
    currentStage: number;

   /***
    for example:
   stageOptions = [
        {
            stage: 1,
            stageText: "SIGNUP",
            subtitle: "Signup"
        },
        {
            stage: 2,
            stageText: "ADDITIONAL INFO",
            subtitle: "Additional Information"
        },
        {
            stage: 3,
            stageText: "REVIEW",
            subtitle: "Review"
        }
    ];
    */
    @Prop({
        default: function () {
            return [];
        }
    })
   stageOptions: Array<any>;



   get subtitle() {
        if (!this.stageOptions || !commonUtilService.isArray(this.stageOptions)) {
            return "";
        }
        let stageOption = this.stageOptions.find((value: any) => { return value.stage === this.currentStage; });
        if (!stageOption) {
            return "";
        }
        return stageOption.subtitle;
    }


}