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
    },

    setQuote(state: any, data: any) {
        state.quote.pickup = data.pickup;
        state.quote.delivery = data.delivery;
        state.quote.pallets = data.pallets;
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
    },

    search(store: any, quoteNumber: string) {


        let data = {
            pickup: {
                locationType: 1,
                zipCode: 91745,
                state: "CA",
                city: "City of Industry",
                liftGate: true,
                limitedAccess: true,
                palletJack: true,
            },
            delivery: {
                locationType: 2,
                zipCode: 91303,
                state: "CA",
                city: "Los Angeles",
                liftGate: true,
                limitedAccess: false,
                palletJack: false,
            }
            ,
            pallets: [{
                palletType: 1,
                width: 40,
                length: 48,
                height: 48,
                quantity: 20,
                totalWeight: 20,
                palletClass: 20,
                stackable: false,
                palletSpace: 5,
                isHazardous: false,
                description: undefined
            }]
        };





        store.commit("setQuote", data);
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
};

export default getQuoteModule;