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

  @Prop({ default: "20%" })
  height: string | number;

  @Prop({ default: "22%" })
  width: string | number;

  @Prop({ default: 400 })
  maxWidth: string | number;

  @Prop({ default: 400 })
  maxHeight: string | number;

  @Prop({ default: 0.35 })
  yPosition: string | number;

  @Provide()
  preventClose = true;

  @Prop({default:2000})
  waitMillsSecondsToClose:number;


  async closeModelAfterSecond(){
    await this.waitSeconds(this.waitMillsSecondsToClose);
    this.$modal.hide(this.modalName);
  }
  
  closeModel(){
    this.$modal.hide(this.modalName);
  }

  waitSeconds(time:number){
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    })
  }
}