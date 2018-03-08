const schedule = {
    pickup:{
        company: null,
        address1: null,
        address2: null,
        email: null,
        phone: null,
        fax: null,
        timeFrom: null,
        timeTo: null,
        instructions: null,
        earliestPickupDate: new Date(),
        latestPickupDate: new Date(),
        earliestPickupTime: "12:00 AM",
        latestPickupTime: "12:00 AM"
    },
    delivery: {
        company: null,
        address1: null,
        address2: null,
        email: null,
        phone: null,
        fax: null,
    },


};

export default schedule;