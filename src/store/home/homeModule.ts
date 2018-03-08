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

    getOrders(state: any) {
        return state.track.getOrdersCustomer;
    }

};


const homeModule = {
    state,
    mutations,
    actions,
    getters
};

export default homeModule;