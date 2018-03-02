import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import * as Logger from "js-logger";


import template from "./demo.vue";


@Component({
    mixins: [template],
    components: {
    }

})
export default class Demo extends Vue {
}
