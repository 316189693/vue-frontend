import main from "./state";


// state object
const state = {
    main
};


// mutations are operations that actually mutates the state.
const mutations = {
    changeTab(state: any, tabNumber: number) {
        state.main.activeTab = tabNumber;
    },
    changeHideForLogin(state: any, path:string) {
        state.main.hide_for_login = (path !== "/");
    }
};

// use actions to commit mutations
const actions = {
    changeTab(store: any, tabNumber: number) {
        store.commit("changeTab", tabNumber);
    },
    changeHideForLogin(store: any, path:string){
        store.commit("changeHideForLogin",path);
    }
};

const getters = {

    main(state: any) {
        return state.main;
    },
    hideForLogin:function():boolean{return state.main.hide_for_login;}
};


const schedulePickupModule = {
    state,
    mutations,
    actions,
    getters
}

export default schedulePickupModule;