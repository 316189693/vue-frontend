import Config from "./config.json";

const addressBookValidation = {
    bookCompany: {
        required: Config.default_Required_Message
    },
    bookAddress1: {
        required: Config.default_Required_Message
    },
    newbookAddress1: {
        required: Config.default_Required_Message
    },
    bookPhone: {
        required: Config.default_Required_Message,
        digits: "10 digits",
        length: "It must have 10 digits"
    },
    bookZip: {
        digits: "5 digits",
        length: "It must have 5 digits"
    },
    newbookZip: {
        required: "This is Required.",
        digits: "5 digits"
    },
    bookCity: {
        alpha_spaces: "Invalid format"
    },
    newbookCity: {
        alpha_spaces: "Invalid format"
    },
    bookFax: {
        digits: "10 digits",
        length: "It must have 10 digits"
    },
};

export default addressBookValidation;
