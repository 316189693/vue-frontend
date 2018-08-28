import moment from "moment";

const time = moment(new Date()).add(1, "hour").format("h:00 A");

function getScheduleObj() {
    const schedule = {
        pickup: {
            locationId: 0,
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
            earliestPickupTime: time,
            latestPickupTime: time,
            address_book : 0,
        },
        delivery: {
            locationId: 0,
            company: null,
            address1: null,
            address2: null,
            email: null,
            phone: null,
            fax: null,
            address_book : 0,
        },

    };

    return schedule;
}




export default getScheduleObj;