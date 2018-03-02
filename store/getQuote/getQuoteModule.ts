import quote from "./state";



// state object
const state = {

    quote,

};


// mutations are operations that actually mutates the state.
const mutations = {
    addLine(state: any) {
        let pallet = state.quote.getPallet();
        state.quote.pallets.push(pallet);
    },

    deleteLine(state: any, index: number) {
        state.quote.pallets.splice(index, 1);
    },

    quotePage_RestoreStage(state: any) {
        state.quote.processStage = 1;
    },

    allowSchedulePage(state: any) {
        state.quote.processStage = 2;
    },
    schedulePage_RestoreStage(state: any) {
        state.quote.processStage = 2;
    },
    allow_ScheduleShipmentPage(state: any) {
        state.quote.processStage = 3;
    }


};

// use actions to commit mutations
const actions = {
    addLine(store: any) {
        store.commit("addLine");
    },

    deleteLine(store: any, index: number) {
        store.commit("deleteLine", index);
    },

    quotePage_RestoreStage(store: any) {
        store.commit("quotePage_RestoreStage");
    },

    allowSchedulePage(store: any) {
        store.commit("allowSchedulePage");
    },
    schedulePage_RestoreStage(store: any) {
        store.commit("schedulePage_RestoreStage");
    },
    allow_ScheduleShipmentPage(store: any) {
        store.commit("allow_ScheduleShipmentPage");
    }

};

const getters = {
    quoteData(state: any) {
        return state.quote;
    },

    palletDimension(state: any) {
        return state.quote.getPalletTypeDimension;
    },

    quoteProcessStage(state: any) {
        return state.quote.processStage;
    }

};


const getQuoteModule = {
    state,
    mutations,
    actions,
    getters
}

export default getQuoteModule;