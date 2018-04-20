import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import * as Logger from "js-logger";
import template from "./stageHeader.vue";


@Component({
    mixins: [template],
    components: {}
})
export default class StageHeader extends Vue {


    @Prop({ default: "title" })
    headerTitle: string;

    @Prop({ default: "sub" })
    headerSubtitle: string;

    @Prop({
        default: function () {
            return ["Page 1", "Page2", "Page3"];
        }
    })
    pages: Array<string>;

    @Prop({default: 1})
    stage: number;

    // currentStage: number = this.$store.getters.quoteProcessStage.currentStage;

    // stageOptions: any = this.$store.getters.quoteProcessStage.stageEnum;

    // getSubMessage() {
    //     let message;
    //     switch (this.currentStage) {
    //         case this.stageOptions.schedulePage:
    //             message = "Location Information";
    //             break;
    //         case this.stageOptions.scheduleShipmentPage:
    //             message = "Shipment Information";
    //             break;
    //         case this.stageOptions.scheduleReviewPage:
    //             message = "Review";
    //             break;
    //     }
    //     return message;
    // }

}