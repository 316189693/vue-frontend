
const customerSignupStageOptions = [
    {
        stage: 1,
        stageText: "SIGNUP",
        subtitle: "Signup"
    },
    {
        stage: 2,
        stageText: "ADDITIONAL INFO",
        subtitle: "Additional Information"
    },
    {
        stage: 3,
        stageText: "REVIEW",
        subtitle: "Review"
    }
];

const signupPart = {
    shipInfo: {
        company: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        fax: "",
    },
    billInfo: {
        company: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        fax: "",
        creditLimit: "500"
    },
    billInfoTemp: {
        company: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        fax: "",
        creditLimit: "500"
    },
    sameAsShippingAddress: false,
    accountCreation: {
        firstName: "",
        lastName: "",
        email: "",
        userName: ""
    }
};

const annualFreightSpendOptions: Array<any> = [
    {key: 1, text: "Under $10,000"},
    {key: 2, text: "$10,001-$50,000"},
    {key: 3, text: "$50,000 - $200,000"},
    {key: 4, text: "$200,000 - $500,000"},
    {key: 5, text: "$500,000 - $1,000,000"},
    {key: 6, text: "$1,000,000 - $5,000,000"},
    {key: 7, text: "$5,000,000+"},
];


const addInfoPart = {
    isVistedShippingLocation: "",
    howToReceiveOrders: "",
    isOnlyShippingLocation: "",
    additionalShippingAddress: "",
    isShipTruckloadShipment: "",
    whereYouShip: "",
    annualFreightSpend: "",
    numOfLTLShippmentsEachWeek: "",
    isContract3PLWarehouses: "",
    additionalShippingLocations: "",
    isContractDrayageService: "",
    additionalInformation: "",
};


const customerSignupHeader = {
    headerTitle: "CUSTOMER SIGNUP",
    currentStage: 1,
    stageOptions: customerSignupStageOptions
};

const customerSignup = {
    customerSignupHeader,
    customerSignupBody: {
        signupPart,
        addInfoPart,
        annualFreightSpendOptions,
        showLoding: false,
    },
    createAccountError: 0
};

export default customerSignup;