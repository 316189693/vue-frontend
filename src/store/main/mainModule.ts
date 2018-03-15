import main from "./state";


// state object
const state = {
    main
};


// mutations are operations that actually mutates the state.
const mutations = {
    changeHideForLogin(state: any, path: string) {
        state.main.hide_for_login = (path !== "/");
    },
    updateMessageModel(state: any, messageModel: any) {
        state.main.messageModel.isShowMessageModel = messageModel.isShowMessageModel;
        state.main.messageModel.messageModelTitle = messageModel.messageModelTitle || state.main.messageModel.messageModelTitle;
        state.main.messageModel.messageModelMessage = messageModel.messageModelMessage || state.main.messageModel.messageModelMessage;
        state.main.messageModel.width = messageModel.width ||  state.main.messageModel.width;
        state.main.messageModel.height = messageModel.height ||  state.main.messageModel.height;
        state.main.messageModel.yPosition = messageModel.yPosition ||  state.main.messageModel.yPosition;
        state.main.messageModel.maxWidth = messageModel.maxWidth ||  state.main.messageModel.maxWidth;
        state.main.messageModel.maxHeight = messageModel.maxHeight || state.main.messageModel.maxHeight;
        state.main.messageModel.titleColor = messageModel.titleColor ||  state.main.messageModel.titleColor;
        state.main.messageModel.waitMillsSecondsToClose = messageModel.waitMillsSecondsToClose || state.main.messageModel.waitMillsSecondsToClose;
    }

};

// use actions to commit mutations
const actions = {
    changeHideForLogin(store: any, path: string) {
        store.commit("changeHideForLogin", path);
    },
    updateMessageModel(store: any, messageModel: any) {
        store.commit("updateMessageModel", messageModel);
    }
};

const getters = {

    main(state: any) {
        return state.main;
    },
    hideForLogin: function(): boolean {return state.main.hide_for_login; },
    messageModel(state: any) {
        return state.main.messageModel;
    },
};


const schedulePickupModule = {
    state,
    mutations,
    actions,
    getters
};

export default schedulePickupModule;