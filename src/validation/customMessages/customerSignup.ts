import Config from "./config.json";

const customerSignupValidation = {
    company: {
        required: Config.default_Required_Message
    },
    shipAddress1: {
        required: Config.default_Required_Message
    },
    shipCity: {
        required: Config.default_Required_Message
    },
    shipState: {
        required: Config.default_Required_Message
    },
    shipZip: {
        required: Config.default_Required_Message,
        digits: "5 digits"
    },
    shipPhone: {
        required: Config.default_Required_Message,
        regex: "Invalid phone number"
    },
    shipFax: {
        regex: "Invalid fax number"
    },
    billingcompany: {
        required: Config.default_Required_Message,
    },
    billingAddress1: {
        required: Config.default_Required_Message
    },
    billingCity: {
        required: Config.default_Required_Message
    },
    billingState: {
        required: Config.default_Required_Message
    },
    billingZip: {
        required: Config.default_Required_Message,
        digits: "5 digits"
    },
    billingPhone: {
        required: Config.default_Required_Message,
        regex: "Invalid phone number"
    },
    billingFax: {
        regex: "Invalid fax number"
    },
    billindCreditLimit: {
        required: Config.default_Required_Message
    },
    accountFirstName: {
        required: Config.default_Required_Message
    },
    accountLastName: {
        required: Config.default_Required_Message
    },
    accountEmail: {
        required: Config.default_Required_Message,
        email: "Invalid email!"
    },
    accountUsername: {
        required: Config.default_Required_Message
    },
    isVistedShippingLocation: {
        required: Config.default_Required_Message
    },
    howToReceiveOrders: {
        required: Config.default_Required_Message
    },
    isOnlyShippingLocation: {
        required: Config.default_Required_Message
    },
    additionalShippingAddress: {
        required: Config.default_Required_Message
    },
    isShipTruckloadShipment: {
        required: Config.default_Required_Message
    },
    whereYouShip: {
        required: Config.default_Required_Message
    },
    annualFreightSpend: {
        required: Config.default_Required_Message
    },
    numOfLTLShippmentsEachWeek: {
        required: Config.default_Required_Message,
        regex: "invalid number"
    },
    isContract3PLWarehouses: {
        required: Config.default_Required_Message
    },
    additionalShippingLocations: {
        required: Config.default_Required_Message
    },
    isContractDrayageService: {
        required: Config.default_Required_Message
    },
    additionalInformation: {
        required: Config.default_Required_Message
    },
};

export default customerSignupValidation;