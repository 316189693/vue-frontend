import Vue from "vue";
import VModal from "vue-js-modal";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import * as Logger from "js-logger";
import template from "./messageModel.vue";


Vue.use(VModal);


@Component({
  mixins: [template],
  components: {

  },

})
export default class messageModel extends Vue {

  @Prop()
  modalName: string;

  @Prop()
  title: string;

  @Prop()
  message: string;

  @Prop({ default: "50%" })
  height: string | number;

  @Prop({ default: "80%" })
  width: string | number;

  @Prop({ default: 700 })
  maxWidth: string | number;

  @Prop({ default: 300 })
  maxHeight: string | number;

  @Prop({ default: 0.3 })
  yPosition: string | number;

  @Provide()
  preventClose = true;

}