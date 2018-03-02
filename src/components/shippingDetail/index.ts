import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import * as Logger from "js-logger";
import template from "./ShippingDetail.vue";


@Component({
  mixins: [template],
  components: {}
})
export default class ShippingDetail extends Vue {

  @Provide()
  palletDimensionsOptions = this.$store.getters.quoteData.palletDimensionsOptions;

  @Provide()
  shipmentDescription_CharacterLimit:number = 50;

  @Prop()
  index: number;

  @Prop()
  totalNumber: number;

  @Prop()
  pallet: any;

  @Prop({ default: false })
  lock: boolean;

  @Prop({ default: false })
  requireDescription: boolean;


  get editable() {
    let type = this.pallet.palletType;

    for (let i = 0; i < this.palletDimensionsOptions.length; i++) {
      if (this.palletDimensionsOptions[i].type == type) {
        return this.palletDimensionsOptions[i].editable;
      }
    }

  }


  @Watch("pallet.palletType")
  onPalletTypeChanged(val: string, oldVal: string, event: any) {
    let dimension = this.$store.getters.palletDimension(val);

    this.pallet.width = dimension.width;
    this.pallet.length = dimension.length;



  }


  deleteLine(index: number) {
    this.$store.dispatch("deleteLine", index);
  }

}