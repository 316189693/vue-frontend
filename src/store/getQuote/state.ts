import Config from "../getQuote/config.json";


const palletDimensionsOptions = Config.palletDimensionsOptions;
const locationTypeOptions = Config.locationTypeOptions;
const palletSpaceCalculationSettings = Config.palletSpaceCalculation;


function getPalletTypeDimension(type: number) {
    let dimension = {
        width: 0,
        length: 0
    }

    for (let i = 0; i < palletDimensionsOptions.length; i++) {
        if (palletDimensionsOptions[i].type == type) {
            dimension.width = palletDimensionsOptions[i].width;
            dimension.length = palletDimensionsOptions[i].length;
            break;
        }

    }

    return dimension;
}

function getPallet() {

    let type = 1;
    let dimension = getPalletTypeDimension(type);

    let pallet = {
        palletType: type,
        width: dimension.width,
        length: dimension.length,
        height: 48,
        quantity: 0,
        totalWeight: 0,
        palletClass: 0,
        stackable: false,
        palletSpace: 0,
        isHazardous: false,
        description: undefined
    };

    return pallet;
}


function calculateUnitPalletSpace(x: number, y: number) {
    let X = palletSpaceCalculationSettings.standardWidth;
    let Y = palletSpaceCalculationSettings.standardLength;

    let A = palletSpaceCalculationSettings.widthInterval;
    let B = palletSpaceCalculationSettings.lengthInterval;

    let a = Math.ceil(x / X);
    let b = Math.ceil(y / Y);


    let widthTooLong = false;
    let lengthTooLong = false;

    if (a > A) {
        widthTooLong = true;
    }
    if (b > B) {
        lengthTooLong = true;
    }

    if (widthTooLong || lengthTooLong) {
        return -1;
    }
    else {
        return a * b;
    }

}


enum stageEnum {
    quoteStartPage = 1,
    schedulePage = 2,
    scheduleShipmentPage = 3,
    scheduleReviewPage = 4
}


const quote = {
    pickup: {
        locationType: 1,
        zipCode: undefined,
        state: "",
        city: "",
        date: "",
        liftGate: false,
        limitedAccess: false,
        palletJack: false,
    },
    delivery: {
        locationType: 1,
        zipCode: undefined,
        state: "",
        city: "",
        liftGate: false,
        limitedAccess: false,
        palletJack: false,
    },
    stage: {
        stageEnum: stageEnum,
        currentStage: stageEnum.quoteStartPage,
    },
    locationTypeOptions,
    palletDimensionsOptions,
    pallets: [getPallet()],
    palletSpaces: 0,
    getPalletTypeDimension,
    getPallet,
    calculateUnitPalletSpace,
    palletSpaceCalculationSettings


};


export default quote;