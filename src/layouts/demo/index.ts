import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import * as Logger from "js-logger";
import StageHeader from "../../components/stageHeader";


import template from "./demo.vue";
import MainButtonSet from "../../components/mainButtonSet";

@Component({
    mixins: [template],
    components: {
        StageHeader,
        MainButtonSet
    }

})
export default class Demo extends Vue {
}
