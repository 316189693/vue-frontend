import Config from "./config.json";

const myAccountValidation = {
  shippingZip: {
    required: "This is Required.",
    digits: "5 digits"
  },
  billZip: {
    required: "This is Required.",
    digits: "5 digits"
  },
  accountEmail: {
    email: Config.default_Email_Message
  },
  shippingPhone: {
    regex: "Invalid phone number"
  },
  shippingFax: {
    regex: "Invalid fax number"
  },
  oldPassword: {
    min: "At least 5 characters"
  },
  newPassword1: {
    min: "At least 5 characters"
  },
  newPassword2: {
    min: "At least 5 characters",
    confirmed: "2 password do not match"
  }
};


export default myAccountValidation;
