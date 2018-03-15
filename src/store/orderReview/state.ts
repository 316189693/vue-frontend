import quoteState from '../getQuote/state';

const pickup = {
        locationType: 1,
        zipCode: "",
        state: "",
        city: "",
        date: "",
        liftGate: false,
        limitedAccess: false,
        palletJack: false,
        pickupDate:"",
        pickupFrom:"",
        pickupTo:"",
        pickupStr:""
}

const delivery = {
        locationType: 1,
        zipCode: "",
        state: "",
        city: "",
        liftGate: false,
        limitedAccess: false,
        palletJack: false,
}

const carry = {
        totalPallets: 0,
        totalWeight: 0,
        palletSpaces: 0,
        pallets: []
}

const documents = '';


const orderModule = {
          pickup,
          delivery,
          carry,
          documents
}

export default orderModule;