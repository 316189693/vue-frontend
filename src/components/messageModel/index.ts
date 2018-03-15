import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import template from "./messageModel.vue";



@Component({
  mixins: [template],
  components: {

  },

})
export default class MessageModel extends Vue {

  @Prop()
  modalName: string;

  @Prop()
  title: string;

  @Prop()
  message: string;

  @Prop({ default: "green" })
  titleColor: string;

  @Prop({ default: 150})
  height: string | number;

  @Prop({ default: 400 })
  width: string | number;

  @Prop({ default: 400 })
  maxWidth: string | number;

  @Prop({ default: 400 })
  maxHeight: string | number;

  @Prop({ default: 0.35 })
  yPosition: string | number;

  @Prop({ default: false })
  clickToClose: boolean;

  @Prop({ default: 2000 })
  waitMillsSecondsToClose: number;
  @Prop()
  closeAction: Function;

  async closeModelAfterSecond() {
    await this.waitSeconds(this.waitMillsSecondsToClose);
    this.$modal.hide(this.modalName);
  }

  closeModel() {
    this.$modal.hide(this.modalName);
  }

  waitSeconds(time: number) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, time);
    });
  }
}