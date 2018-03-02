import Config from "./config.json";
import quoteValidation from "./getQuote";
import schedulePickupValidation from "./schedulePickup";
import loginValidation from "./login";

const customMessage = {
    dictionary: {
        en: {
            custom: {
                ...quoteValidation,
                ...schedulePickupValidation,
                ...loginValidation,
            }
        }
    }
};


export default customMessage;