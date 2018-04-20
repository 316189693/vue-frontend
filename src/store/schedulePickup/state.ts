import moment from "moment";

const time = moment(new Date()).add(1, "hour").format("h:00 A");

function getScheduleObj() {
    const schedule = {
        pickup: {
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
            latestPickupTime: time
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

    return schedule;
}




export default getScheduleObj;