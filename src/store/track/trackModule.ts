import track from "./state";

// state object
const state = {
    track

};


// mutations are operations that actually mutates the state.
const mutations = {


};

// use actions to commit mutations
const actions = {

};

const getters = {

    getStage(state: any) {
        return state.track.getStage;
    },

    searchTrack(state: any) {
        return state.track.searchByProNumber;
    }

};


const trackModule = {
    state,
    mutations,
    actions,
    getters
};

export default trackModule;