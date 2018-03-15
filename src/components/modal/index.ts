import Vue from "vue";

import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import template from "./modal.vue";


@Component({
  mixins: [template],
  components: {

  },

})
export default class DefaultModal extends Vue {

  @Prop()
  modalName: string;

  @Prop({ default: "Title" })
  title: string;

  @Prop({ default: "Message" })
  message: string;

  @Prop({ default: "Yes" })
  rightBtnText: string;

  @Prop({ default: "No" })
  leftBtnText: string;


  rightBtnAction() {
    this.$emit("rightBtnAction");
  }

  leftBtnAction() {
    this.$emit("leftBtnAction");
  }

  @Prop({ default: "auto" })
  height: string | number;

  @Prop({ default: "80%" })
  width: string | number;

  @Prop({ default: 700 })
  maxWidth: number;

  @Prop({ default: 500 })
  maxHeight: number;

  @Prop({ default: 0.3 })
  yPosition: number;

  @Prop({ default: 0.5 })
  xPosition: number;

  @Prop()
  rightBtnStyle: any;

  @Prop()
  leftBtnStyle: any;

  @Prop({ default: false })
  clickToClose: boolean;

  @Prop({ default: false })
  noButtons: boolean;



}