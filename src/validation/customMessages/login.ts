import Config from "./config.json";

const loginValidation = {
    userName: {
        required: Config.default_Required_Message 
    },
    passWord: {
        required: Config.default_Required_Message ,
        incorrect:"Email or password incorrect"
    },
    pro: {
        nofound:"Could not find order"
    },
}


export default loginValidation;