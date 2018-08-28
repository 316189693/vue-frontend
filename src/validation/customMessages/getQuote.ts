import Config from "./config.json";

const quoteValidation = {

    pickupDate: {
        required: "Your date is empty" // messages can be strings as well.
    },
    pickupZipCode: {
        required: Config.default_Required_Message,
        digits: "Invalid format. Must be 5 digits."
    },
    pickupCity: {
        alpha_spaces: "Invalid format"
    },
    pickupState: {
        required: Config.default_Required_Message,
        alpha_spaces: "Invalid format"
    },
    deliveringZipCode: {
        required: Config.default_Required_Message,
        digits: "Invalid format. Must be 5 digits."
    },
    deliveryCity: {
        alpha_spaces: "Invalid format"
    },
    deliveryState: {
        required: Config.default_Required_Message,
        alpha_spaces: "Invalid format"
        // digits: "Invalid format. Must be 5 digits."
    },
    width: {
        required: "This is required test."
    }

};

export default quoteValidation;
