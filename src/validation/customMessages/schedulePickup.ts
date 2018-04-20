import Config from "./config.json";

const schedulePickupValidation = {
    pickupCompany: {
        required: Config.default_Required_Message,
    },
    pickupAddress1: {
        required: Config.default_Required_Message,
    },
    pickupEmail: {
        required: Config.default_Required_Message,
        email: Config.default_EmailFormat_Message
    },
    pickupPhone: {
        required: Config.default_Required_Message,
        digits: "10 digits",
        length: "It must have 10 digits"
    },
    pickupFax: {
        digits: "10 digits",
        length: "It must have 10 digits"
    },
    deliveryCompany: {
        required: Config.default_Required_Message,
    },
    deliveryAddress1: {
        required: Config.default_Required_Message,
    },
    deliveryEmail: {
        required: Config.default_Required_Message,
        email: Config.default_EmailFormat_Message
    },
    deliveryPhone: {
        required: Config.default_Required_Message,
        digits: "10 digits",
        length: "It must have 10 digits"
    },
    deliveryFax: {
        digits: "10 digits",
        length: "It must have 10 digits"
    },

    orderReference:{
        alpha_num: 'The order reference field may only contain alpha-numeric characters.'
    }

};

export default schedulePickupValidation;