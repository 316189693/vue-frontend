const palletDimensionsOptions = [
    {
        type: 1,
        title: "Pallets: Standard (48\" x 40\")",
        width: 48,
        length: 40,
        editable: false
    },
    {
        type: 2,
        title: "Pallets: 60 x 48",
        width: 60,
        length: 48,
        editable: false
    },
    {
        type: 3,
        title: "Pallets: (enter dimensions)",
        width: 0,
        length: 0,
        editable: true
    }
];

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
        height: 4,
        quantity: 5,
        totalWeight: 3,
        palletClass: 1,
        stackable: false,
        isHazardous: false,
        description: null
    };

    return pallet;
}

const locationTypeOptions = [
    {
        key: 1,
        value: "Business"
    },
    {
        key: 2,
        value: "Construction Site"
    },
    {
        key: 3,
        value: "Convention Center"
    },
    {
        key: 4,
        value: "Freight Carrier Terminal"
    },
    {
        key: 5,
        value: "Home/Residential"
    },
    {
        key: 6,
        value: "Military Base"
    },
    {
        key: 7,
        value: "Self Storage/Mini Storage"
    },
    {
        key: 8,
        value: "Religious Institution"
    },
];





const quote = {
    pickup: {
        locationType: 0,
        zipCode: null,
        state: "CA",
        city: "Los Angeles",
        date: "",
        liftGate: false,
        limitedAccess: false,
        palletJack: false,
    },
    delivery: {
        locationType: 0,
        zipCode: null,
        state: "CA",
        city: "Los Angeles",
        liftGate: false,
        limitedAccess: false,
        palletJack: false,
    },
    locationTypeOptions,
    palletDimensionsOptions,
    pallets: [getPallet()],
    getPalletTypeDimension,
    getPallet,
    processStage: 1,

};


export default quote;