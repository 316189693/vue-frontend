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


    changeStage(state: any, page: string) {
        let stage = state.quote.stage;
        let pageOptions = state.quote.stage.stageEnum;

        switch (page) {
            case "quoteStartPage":
                stage.currentStage = pageOptions.quoteStartPage;
                break;
            case "schedulePage":
                stage.currentStage = pageOptions.schedulePage;
                break;
            case "scheduleShipmentPage":
                stage.currentStage = pageOptions.scheduleShipmentPage;
                break;
            case "scheduleReviewPage":
                stage.currentStage = pageOptions.scheduleReviewPage;
                break;
        }
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

    changeQuotePageStage(store: any, page: string) {
        store.commit("changeStage", page);
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
        return state.quote.stage;
    }

};


const getQuoteModule = {
    state,
    mutations,
    actions,
    getters
}

export default getQuoteModule;