import Config from "./config.json";

const quoteValidation = {
    pickupDate: {
        required: "Your date is empty" // messages can be strings as well.
    },
    pickupZipCode: {
        required: Config.default_Required_Message,
        digits: "5 digits"
    },
    deliveringZipCode: {
        required: Config.default_Required_Message,
        digits: "5 digits"
    },
};


export default quoteValidation;