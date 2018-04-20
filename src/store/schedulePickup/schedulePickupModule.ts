import getScheduleObj from "./state";
import moment from "moment";
import axiosService from "../../services/axios/axiosService";

// state object
const state = {
    schedule: getScheduleObj()

};


// mutations are operations that actually mutates the state.
const mutations = {

     // have to clear one by one. if clear using getScheduleObj. it will mess up the pointer to the state on other pages
    resetSchedule(state: any) {
        let s = state.schedule;
        s.pickup.company = null;
        s.pickup.address1 = null;
        s.pickup.address2 = null;
        s.pickup.email = null;
        s.pickup.phone = null;
        s.pickup.fax = null;
        s.pickup.timeFrom = null;
        s.pickup.timeTo = null;
        s.pickup.instructions = null;
        s.pickup.earliestPickupDate = new Date();
        s.pickup.latestPickupDate = new Date();
        s.pickup.earliestPickupTime = moment(new Date()).add(1, "hour").format("h:00 A");
        s.pickup.latestPickupTime = moment(new Date()).add(1, "hour").format("h:00 A");
        s.delivery.company = null;
        s.delivery.address1 = null;
        s.delivery.email = null;
        s.delivery.phone = null;
        s.delivery.fax = null;
    },

};

// use actions to commit mutations
const actions = {
    resetSchedule(store: any) {
        store.commit("resetSchedule");
    },

    async checkForLocation(store: any, dataString: string) {
        let request = {
            dataString
        };

        try {
            let response = await axiosService.post("https://pcmiler.alk.com/apis/rest/v1.0/Service.svc/locations?", request);
            console.log(response);
            store.commit("getLocation", response.data);
        } catch (error) {
            console.log(error);
        }

    }
};

const getters = {

    scheduleData(state: any) {
        return state.schedule;
    }

};


const schedulePickupModule = {
    state,
    mutations,
    actions,
    getters
};

export default schedulePickupModule;