import Config from "../getQuote/config.json";
import quoteState from "../getQuote/state";
const pickup = {
  shipper: "",
  locationType: -1,
  locationTypeText: "",
  zipCode: "",
  state: "",
  city: "",
  street: "",
  street2: "",
  date: "",
  liftGate: false,
  limitedAccess: false,
  palletJack: false,
  pickupDate: "",
  pickupFrom: "",
  pickupTo: "",
  pickupStr: ""
};

const delivery = {
  consignee: "",
  locationType: -1,
  locationTypeText: "",
  zipCode: "",
  state: "",
  city: "",
  street: "",
  street2: "",
  liftGate: false,
  limitedAccess: false,
  palletJack: false
};

const pallets: Array<any> = [];

const carry = {
  totalPallets: 0,
  totalWeight: 0,
  palletSpaces: 0,
  pallets: pallets
};

const createEmptyOrderReview = function() {
  return orderReviewContent;
};

function getLocationTypeText(locationType: Number) {
  if (locationType <= -1) {
    return "";
  }
  let locationTypeOptions = Config.locationTypeOptions;
  let locationTypeObj = locationTypeOptions.find((value: any) => {
    return value.key === locationType;
  });
  return !locationTypeObj ? "" : locationTypeObj.value;
}

function getPalletsSpaces(pallets: any) {
  if (!pallets || !isArray(pallets) || pallets.length === 0) {
    return 0;
  }
  let palletSpaces = 0;
  pallets.forEach((pallet: any) => {
    let palletSpace = quoteState().getPalletSpace(
      pallet.width,
      pallet.length,
      pallet.quantity
    );
    if (palletSpace != Infinity) {
      palletSpaces += palletSpace;
    }
  });
  return palletSpaces;
}

function isArray(o: any) {
  return Object.prototype.toString.call(o) === "[object Array]";
}

const orderReviewContent = {
  proNumber: "",
  referenceNumber: "",
  quoteId: "",
  pickup,
  delivery,
  carry,
  documents: []
};

const orderReview = {
  orderReview: orderReviewContent,
  createEmptyOrderReview,
  getLocationTypeText,
  getPalletsSpaces,
  getPalletTypeDimension: quoteState().getPalletTypeDimension
};

export default orderReview;
