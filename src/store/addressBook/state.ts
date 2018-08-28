const addressBookData = {
    showNotFound: true,
    addressList: {},
    companyData: {
        company: "",
        address1: "",
        address2: "",
        city: "CA",
        state: "",
        zip: "",
        phone: "",
        fax: "",
        email: "",
        location_type: "1",
        location_type_name: ""
    },
    newInputtedAddress: {
        address1: "",
        address2: "",
        city: "",
        state: "CA",
        zip: ""
    },
    suggestedAddress: {
        Address: {},
        Coords: {},
        Errors: {}
    }
};

const addressBook = {
    addressBookData
};

export default addressBook;