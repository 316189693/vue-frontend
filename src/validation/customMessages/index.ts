import Config from "./config.json";
import quoteValidation from "./getQuote";
import schedulePickupValidation from "./schedulePickup";
import loginValidation from "./login";
import myAccountValidation from "./myAccount";
import customerSignupValidation from "./customerSignup";
import addressBookValidation from "./addressBook";

const dictionary = {
    en: {
        messages: {
            // overwrite the default message for required valiation
            required: () => Config.default_Required_Message,
        },
        // custom messages for specific field
        custom: {
            ...quoteValidation,
            ...schedulePickupValidation,
            ...loginValidation,
            ...myAccountValidation,
            ...customerSignupValidation,
            ...addressBookValidation,
        }
    }
};



export default dictionary;
