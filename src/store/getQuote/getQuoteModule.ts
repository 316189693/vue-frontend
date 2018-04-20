import getQuoteObj from "./state";
import tmsService from "../../services/axios/tmsService";
import qs from "qs";


// state object
const state = {

    quote: getQuoteObj(),

};


// mutations are operations that actually mutates the state.
const mutations = {

    // have to clear one by one. if clear using getQuoteObj. it will mess up the pointer to the state on other pages
    resetQuote(state: any) {
        let q = state.quote;
        q.quoteId = "";
        q.orderReference = null;
        q.pallets = [];
        q.pickup.locationType = 1;
        q.pickup.zipCode = null;
        q.pickup.state = "";
        q.pickup.city = "";
        q.pickup.liftGate = false;
        q.pickup.limitedAccess = false;
        q.pickup.palletJack = false;
        q.delivery.locationType = 1;
        q.delivery.zipCode = null;
        q.delivery.state = "";
        q.delivery.city = "";
        q.delivery.liftGate = false;
        q.delivery.limitedAccess = false;
        q.delivery.palletJack = false;
        q.estimate.palletSpaceCharge = 0;
        // ........
    },
    updateEstimate(state: any, estimate: any) {
        state.quote.estimate = {...estimate};
        state.quote.quoteId = estimate.quoteId;
        state.quote.palletSpaces = estimate.palletSpaces;
    },
    resetEstimate(state: any) {
        let e = state.quote.estimate;
        e.palletSpaceCharge = 0;
        e.fuelCharge = 0;
        e.complianceCharge = 0;
        e.total = 0;
        e.pickup.liftGate = 0;
        e.pickup.limitedAccess = 0;
        e.pickup.palletJack = 0;
        e.pickup.constructionSite = 0;
        e.pickup.conventionCenter = 0;
        e.pickup.residential = 0;
        e.delivery.liftGate = 0;
        e.delivery.limitedAccess = 0;
        e.delivery.palletJack = 0;
        e.delivery.constructionSite = 0;
        e.delivery.conventionCenter = 0;
        e.delivery.residential = 0;
    },

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
    },

    // updateLocationData(state: any, data: any) {
    //     let info = data[0];
    //     state.quote.pickup.locationType = info["fk_location_type"];
    //     state.quote.pickup.zipCode = info["location_zip"];
    //     state.quote.pickup.state = info["location_state"];
    //     state.quote.pickup.city = info["location_city"];
    // }

};

// use actions to commit mutations
const actions = {
    resetQuote(store: any) {
        store.commit("resetQuote");
    },
    updateEstimate(store: any, estimate: any) {
       store.commit("updateEstimate", estimate);
    },
    resetEstimate(store: any) {
        store.commit("resetEstimate");
    },
    addLine(store: any) {
        store.commit("addLine");
    },

    deleteLine(store: any, index: number) {
        store.commit("deleteLine", index);
    },

    changeQuotePageStage(store: any, page: string) {
        store.commit("changeStage", page);
    },



    // search(store: any, quoteNumber: string) {


    //     let data = {
    //         pickup: {
    //             locationType: 1,
    //             zipCode: 91745,
    //             state: "CA",
    //             city: "City of Industry",
    //             liftGate: true,
    //             limitedAccess: true,
    //             palletJack: true,
    //         },
    //         delivery: {
    //             locationType: 2,
    //             zipCode: 91303,
    //             state: "CA",
    //             city: "Los Angeles",
    //             liftGate: true,
    //             limitedAccess: false,
    //             palletJack: false,
    //         }
    //         ,
    //         pallets: [{
    //             palletType: 1,
    //             width: 40,
    //             length: 48,
    //             height: 48,
    //             quantity: 20,
    //             totalWeight: 20,
    //             palletClass: 20,
    //             stackable: false,
    //             palletSpace: 5,
    //             isHazardous: false,
    //             description: undefined
    //         }]
    //     };

    //     store.commit("setQuote", data);
    // },

    // getLocationData(store: any) {
    //   tmsService.post("write_new/get_account_user_location.php", qs.stringify({ user_id: localStorage.getItem("UserID") })).then(function (response) {
    //       store.commit("updateLocationData", response.data);
    //   }).catch(function (error) {
    //       console.log(error);
    //   });
    // }

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
