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
        email: Config.default_Email_Message
    },
    pickupPhone: {
        required: Config.default_Required_Message,
        numeric: Config.default_Numeric_Message
    },
    deliveryCompany: {
        required: Config.default_Required_Message,
    },
    deliveryAddress1: {
        required: Config.default_Required_Message,
    },
    deliveryEmail: {
        required: Config.default_Required_Message,
        email: Config.default_Email_Message
    },
    deliveryPhone: {
        required: Config.default_Required_Message,
        numeric: Config.default_Numeric_Message
    },

};

export default schedulePickupValidation;