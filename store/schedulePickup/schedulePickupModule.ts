import schedule from "./state";

// state object
const state = {
    schedule

};


// mutations are operations that actually mutates the state.
const mutations = {
   

};

// use actions to commit mutations
const actions = {
   
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
}

export default schedulePickupModule;