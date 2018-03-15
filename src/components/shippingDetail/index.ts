import Vue from "vue";
import { Component, Prop, Provide, Watch, Inject } from "vue-property-decorator";
import * as Logger from "js-logger";
import template from "./shippingDetail.vue";
import bus from "../../bus";
import { Validator } from "vee-validate";


@Component({
  mixins: [template],
  components: {},
})
export default class ShippingDetail extends Vue {

  // Data
  palletDimensionsOptions = this.$store.getters.quoteData.palletDimensionsOptions;

  calculateUnitPalletSpace = this.$store.getters.quoteData.calculateUnitPalletSpace;

  getPalletSpace = this.$store.getters.quoteData.getPalletSpace;

  palletSpaceCalculationSettings = this.$store.getters.quoteData.palletSpaceCalculationSettings;

  shipmentDescription_CharacterLimit: number = 50;

  isStackable: boolean = true;

  tooltipMessages: any = {
    height: "height",
    stackable: "stackable"
  };
  // Data


  // Properties
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
  // Properties

  // inject the validator from parent, parent and child will now share the same validator instance
  @Inject()
  $validator: Validator;



  // computed properties
  get editable() {
    let type = this.pallet.palletType;

    for (let i = 0; i < this.palletDimensionsOptions.length; i++) {
      if (this.palletDimensionsOptions[i].type == type) {
        return this.palletDimensionsOptions[i].editable;
      }
    }

  }

  // life cycle methods
  created() {

  }

  mounted() {

  }
  // life cycle methods



  @Watch("pallet.palletType")
  onPalletTypeChanged(val: string, oldVal: string, event: any) {
    let dimension = this.$store.getters.palletDimension(val);

    this.pallet.width = dimension.width;
    this.pallet.length = dimension.length;
  }


  @Watch("pallet.height")
  onHeightChanged(val: string, oldVal: string) {
    let maxHeight = this.palletSpaceCalculationSettings.maxHeight;

    if (maxHeight / this.pallet.height < 2) {
      this.pallet.stackable = false;
      this.isStackable = false;
    }
    else if (maxHeight / this.pallet.height >= 2) {
      this.isStackable = true;
    }
    this.onPalletWidthChanged();
  }


  @Watch("pallet.width")
  @Watch("pallet.length")
  @Watch("pallet.quantity")
  @Watch("pallet.stackable")
  onPalletWidthChanged() {

    // calculate pallet space
    if (this.pallet.width > 0 && this.pallet.length > 0 && this.pallet.height > 0 && this.pallet.quantity > 0) {
      let maxHeight = this.palletSpaceCalculationSettings.maxHeight;

      let unitPalletSpace = this.getPalletSpace(this.pallet.width, this.pallet.length, this.pallet.quantity);
      let heightDivisor = Math.floor(maxHeight / this.pallet.height);
      let stackable = this.pallet.stackable && this.pallet.quantity > 1 ? heightDivisor : 1;

      let palletSpace = Math.ceil(unitPalletSpace / stackable);

      if (palletSpace > 0) {
        this.pallet.palletSpace = palletSpace;
      }
      else {
        this.pallet.palletSpace = 0;
      }
    }
    else {
      this.pallet.palletSpace = 0;
    }
  }


  deleteLine(index: number) {

    // clear validation error bag
    this.$validator.errors.clear();
    this.$store.dispatch("deleteLine", index);
  }

  // getPalletSpace(width: any, length: any, height: any) {

  //   if (width > 0 && length > 0) {
  //     let x = parseInt(width);
  //     let y = parseInt(length);

  //     let result1 = this.calculateUnitPalletSpace(x, y);
  //     let result2 = this.calculateUnitPalletSpace(y, x);

  //     if (result1 == -1 && result2 == -1) {
  //       return -1;
  //     }
  //     else if (result1 == -1 && result2 != -1) {
  //       return result2;
  //     }
  //     else if (result1 != -1 && result2 == -1) {
  //       return result1;
  //     }
  //     else {
  //       return result1 < result2 ? result1 : result2;
  //     }
  //   }
  //   else {
  //     return 0;
  //   }

  // }



}
