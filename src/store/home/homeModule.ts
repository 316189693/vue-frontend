import home from "./state";
import axiosService from "../../services/axios/axiosService";

// state object
const state = {
    home

};


// mutations are operations that actually mutates the state.
const mutations = {

};

// use actions to commit mutations
const actions = {
    async getCustomerOrders(store: any, userID: string) {
        let request = {
            userID
        };

        try {
            let response = await axiosService.post("write/get_tms_orders_customer.php", request);

            store.commit("setCustomerOrders", response.data);
        } catch (error) {
            console.log(error);
        }

    }
};

const getters = {

    getOrders(state: any) {
        return state.home.getOrdersCustomer;
    }

};


const homeModule = {
    state,
    mutations,
    actions,
    getters
};

export default homeModule;