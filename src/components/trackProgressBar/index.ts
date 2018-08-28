import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import template from "./trackProgressBar.vue";


@Component({
    mixins: [template],
    components: {}
})
export default class TrackProgressBar extends Vue {

    @Prop({ default: "Wed, Aug 17" })
    originDate: string;

    @Prop({ default: "Los Angeles, CA" })
    originLocation: string;

    @Prop({ default: "Wed, Aug 17" })
    destinationDate: string;

    @Prop({ default: "Los Angeles, CA" })
    destinationLocation: string;

    @Prop({ default: 1 })
    stage: number;
}