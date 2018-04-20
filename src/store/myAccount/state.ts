const myAccountData = {
  shipping: {
    locationId: 0,
    locationName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    fax: "",
    inEdit: false
  },
  billing: {
    locationId: 0,
    locationName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    fax: "",
    paymentType: "",
    creditLimit: "",
    netTermDays: "",
    inEdit: false
  },
  user: {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    inEdit: false
  },
  password: {
    success: false,
    updateResult: "",
    oldPassword: "",
    newPassword1: "",
    newPassword2: ""
  }
};

// const myAccountData = {
//   accountInfo: {
//     contactId: 0,
//     company: "",
//     locationType: "",
//     locationTypeName: "",
//     name: "",
//     addressLocationId: 0,
//     address1: "",
//     address2: "",
//     city: "",
//     state: "",
//     zip: "",
//     email: "",
//     phone: "",
//     fax: ""
//   },
//   billingInfo: {
//     locationId: 0,
//     paymentType: "",
//     address1: "",
//     address2: "",
//     city: "",
//     state: "",
//     zip: ""
//   },
//   password: {
//     success: false,
//     updateResult: "",
//     oldPassword: "",
//     newPassword1: "",
//     newPassword2: ""
//   }

// };

const locationTypeOptions = [
  {
    "key": 1,
    "value": "Business"
  },
  {
    "key": 2,
    "value": "Construction Site"
  },
  {
    "key": 3,
    "value": "Convention Center"
  },
  {
    "key": 4,
    "value": "Freight Carrier Terminal"
  },
  {
    "key": 5,
    "value": "Home/Residential"
  },
  {
    "key": 6,
    "value": "Military Base"
  },
  {
    "key": 7,
    "value": "Self Storage/Mini Storage"
  },
  {
    "key": 8,
    "value": "Religious Institution"
  }
];

const getLocationTypeName = (key: number) => {
  let name: string = "";
  if (key) {
    locationTypeOptions.forEach(t => {
      if (t.key == key) {
        name = t.value;
      }
    });
  }
  return name;
};

const stateOptions = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
  "AB",
  "BC",
  "MB",
  "NB",
  "NL",
  "NS",
  "ON",
  "PE",
  "QC",
  "SK",
  "NT",
  "NU",
  "YT"
];

enum paymentTypeEnum {
  netTerm = "Net Term Days",
  cc = "Credit Card",
  other = "COD"
}

const getPaymentType = (type: string) => {
  if (type == "net_payment_terms") {
    return paymentTypeEnum.netTerm;
  } else if (type == "cc") {
    return paymentTypeEnum.cc;
  }
  return paymentTypeEnum.other;
};

const myAccount = {
  myAccountData,
  locationTypeOptions,
  getLocationTypeName,
  stateOptions,
  getPaymentType
};

export default myAccount;
