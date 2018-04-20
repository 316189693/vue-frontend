import Vue from "vue";

import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import template from "./changePassword.vue";


@Component({
  mixins: [template],
  components: {

  },

})
export default class ChangePassword extends Vue {

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

  @Prop()
  rightBtnAction: Function;

  @Prop()
  leftBtnAction: Function;

  @Prop({ default: "auto" })
  height: string | number;

  @Prop({ default: "80%" })
  width: string | number;

  @Prop({ default: 700 })
  maxWidth: string | number;

  @Prop({ default: "auto" })
  maxHeight: string | number;

  @Prop({ default: 0.3 })
  yPosition: string | number;

  @Prop({ default: 0.5 })
  xPosition: string | number;

  @Prop()
  rightBtnStyle: any;

  @Prop()
  leftBtnStyle: any;

  @Prop({ default: false })
  clickToClose: boolean;

  @Prop({default: false})
  noButtons: boolean;

  closeModal() {
    this.$modal.hide(this.modalName);
  }

}
