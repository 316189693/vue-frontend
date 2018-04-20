import Config from "../getQuote/config.json";


const palletDimensionsOptions = Config.palletDimensionsOptions;
const locationTypeOptions = Config.locationTypeOptions;
const palletSpaceCalculationSettings = Config.palletSpaceCalculation;
let loopCounter = 0;


function getPalletTypeDimension(type: number) {
    let dimension = {
        width: 0,
        length: 0
    };

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
        key: loopCounter,
        palletType: type,
        width: dimension.width,
        length: dimension.length,
        height: 48,
        quantity: null,
        totalWeight: null,
        palletClass: 0,
        stackable: false,
        palletSpace: 0,
        isHazardous: false,
        description: null,
        overWeight: false
    };

    loopCounter++;

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

    // if (a > A) {
    //     widthTooLong = true;
    // }
    // if (b > B) {
    //     lengthTooLong = true;
    // }

    if (widthTooLong || lengthTooLong) {
        return -1;
    }
    else {
        return a * b;
    }

}

function getPalletSpace(width: number, length: number, quantity: number) {
    let com = getOrientationCombination(quantity);



    let finalResult = Infinity;

    for (let i = 0; i < com.length; i++) {

        let _x = com[i].x * width;
        let _y = com[i].y * length;

        let result1 = calculateUnitPalletSpace(_x, _y);
        finalResult = result1 > 0 && result1 < finalResult ? result1 : finalResult;

        let result2 = calculateUnitPalletSpace(_y, _x);
        finalResult = result2 > 0 && result2 < finalResult ? result2 : finalResult;

        let __x = com[i].x * length;
        let __y = com[i].y * width;

        let result3 = calculateUnitPalletSpace(__x, __y);
        finalResult = result3 > 0 && result3 < finalResult ? result3 : finalResult;

        let result4 = calculateUnitPalletSpace(__y, __x);
        finalResult = result4 > 0 && result4 < finalResult ? result4 : finalResult;


    }

    return finalResult;

}

function getOrientationCombination(quantity: number) {
    let result = [];

    for (let i = 1; i <= Math.ceil(quantity / i); i++) {
        result.push({ x: i, y: Math.ceil(quantity / i) });
    }

    return result;
}


enum stageEnum {
    quoteStartPage = 1,
    schedulePage = 2,
    scheduleShipmentPage = 3,
    scheduleReviewPage = 4
}

function getQuoteObj() {
    const quote = {
        quoteId: null,
        billto_id: 0,
        shipper_id: 0,
        pickup: {
            locationType: 1,
            zipCode: null,
            state: "",
            city: "",
            liftGate: false,
            limitedAccess: false,
            palletJack: false,
        },
        delivery: {
            locationType: 1,
            zipCode: null,
            state: "",
            city: "",
            liftGate: false,
            limitedAccess: false,
            palletJack: false,
        },
        estimate: {
            palletSpaceCharge: 0,
            fuelCharge: 0,
            complianceCharge: 0,
            total: 0,
            pickup: {
                liftGate: 0,
                limitedAccess: 0,
                palletJack: 0,
                constructionSite: 0,
                conventionCenter: 0,
                residential: 0,
            },
            delivery: {
                liftGate: 0,
                limitedAccess: 0,
                palletJack: 0,
                constructionSite: 0,
                conventionCenter: 0,
                residential: 0,
            }
        },
        stage: {
            stageEnum: stageEnum,
            currentStage: stageEnum.quoteStartPage,
        },
        hasHazardous: false,
        hasQuote: false,
        orderReference: null,
        locationTypeOptions,
        palletDimensionsOptions,
        pallets: [getPallet()],
        palletSpaces: 0,
        getPalletTypeDimension,
        getPallet,
        calculateUnitPalletSpace,
        getPalletSpace,
        palletSpaceCalculationSettings

    };

    return quote;
}



export default getQuoteObj;