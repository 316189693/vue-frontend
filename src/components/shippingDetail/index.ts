import Vue from "vue";
import {
  Component,
  Prop,
  Provide,
  Watch,
  Inject
} from "vue-property-decorator";
import template from "./shippingDetail.vue";
import { Validator } from "vee-validate";

@Component({
  mixins: [template],
  components: {}
})
export default class ShippingDetail extends Vue {
  // Data
  palletDimensionsOptions = this.$store.getters.quoteData
    .palletDimensionsOptions;

  calculateUnitPalletSpace = this.$store.getters.quoteData
    .calculateUnitPalletSpace;

  getPalletSpace = this.$store.getters.quoteData.getPalletSpace;

  palletSpaceCalculationSettings = this.$store.getters.quoteData
    .palletSpaceCalculationSettings;

  shipmentDescription_CharacterLimit: number = 50;

  isStackable: boolean = true;

  tooltipMessages: any = {
    width: `Pallet width must be under 96".`,
    length: `Pallet length must be under 96".`,
    height: `Pallet height must be under 108". Don't know the height of your pallets? Since most pallets are on average 48\" in height, we have set this as the default height. Feel free to change it if you know the height of your pallets.`,
    quantity: "Total pallet positions must be under 15.",
    totalWeight:
      "Average weight of each pallet position per line must be under 1,800 lbs.",
    stackable:
      "Can we stack your pallets on top of each other during pickup and/or delivery? We will automatically calculate the number of spaces required."
    // hazardousMaterial: "Does your shipment contain commodities that are hazardous as defined in the code of Federal Regulation, Title 49, by the US Department of Transportation? If so, you will be charged an additional fee and one of our representatives will contact you to get more information about the contents of the shipment."
  };
  palletClass: Array<string> = [
    "50",
    "55",
    "60",
    "65",
    "70",
    "77",
    "85",
    "92",
    "100",
    "110",
    "125",
    "150",
    "175",
    "200",
    "250",
    "300",
    "400",
    "500"
  ];
  // Data

  // Properties
  @Prop() index: number;

  @Prop() totalNumber: number;

  @Prop() pallet: any;

  @Prop({ default: false })
  lock: boolean;

  @Prop({ default: false })
  requireDescription: boolean;

  @Prop({ default: false })
  validationStarted: boolean;
  // Properties

  // inject the validator from parent, parent and child will now share the same validator instance
  @Inject() $validator: Validator;

  // computed properties
  get editable() {
    let type = this.pallet.palletType;

    for (let i = 0; i < this.palletDimensionsOptions.length; i++) {
      if (this.palletDimensionsOptions[i].type == type) {
        return this.palletDimensionsOptions[i].editable;
      }
    }
  }

  get overWeight() {
    let palletSpace = parseInt(this.pallet.palletSpace);
    let weight = parseFloat(this.pallet.totalWeight);

    if (palletSpace > 0) {
      let result = weight / palletSpace > 1800;
      this.pallet.overWeight = result;
      return result;
    } else {
      return false;
    }
  }

  // life cycle methods
  created() {}

  mounted() {}
  // life cycle methods

  @Watch("pallet.palletType")
  onPalletTypeChanged(val: string, oldVal: string, event: any) {
    let dimension = this.$store.getters.palletDimension(val);
    Object.assign(this.pallet, dimension);
    this.$validator.errors.remove("width" + this.index);
    this.$validator.errors.remove("length" + this.index);
  }

  @Watch("pallet.height")
  onHeightChanged(val: string, oldVal: string) {
    let maxHeight = this.palletSpaceCalculationSettings.maxHeight;

    if (maxHeight / this.pallet.height < 2) {
      this.pallet.stackable = false;
      this.isStackable = false;
    } else if (maxHeight / this.pallet.height >= 2) {
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
    if (
      this.pallet.width > 0 &&
      this.pallet.length > 0 &&
      this.pallet.height > 0 &&
      this.pallet.quantity > 0
    ) {
      let maxHeight = this.palletSpaceCalculationSettings.maxHeight;

      let unitPalletSpace = this.getPalletSpace(
        this.pallet.width,
        this.pallet.length,
        this.pallet.quantity
      );
      let heightDivisor = Math.floor(maxHeight / this.pallet.height);
      let stackable =
        this.pallet.stackable && this.pallet.quantity > 1 ? heightDivisor : 1;

      let palletSpace = Math.ceil(unitPalletSpace / stackable);

      if (palletSpace > 0) {
        this.pallet.palletSpace = palletSpace;
      } else {
        this.pallet.palletSpace = 0;
      }
    } else {
      this.pallet.palletSpace = 0;
    }
  }

  deleteLine(index: number) {
    // clear validation error bag
    this.$validator.errors.clear();
    this.$store.dispatch("deleteLine", index);
  }

  addLineValidate(num: any) {
    if (!num) {
      return 'Required';
    } else {
      let check = (num + '').search(/[^a-zA-Z]+$/);
      if (check != 0) {
        return 'Invalid Format';
      }
      console.log(check);
    }

    return "";
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
