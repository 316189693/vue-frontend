import Vue from "vue";
import template from "./blank.vue";
import { Component, Provide, Watch } from "vue-property-decorator";
@Component({
    mixins: [ template]
})
export default class Blank extends Vue {

    mounted() {
        let messageModel = {};
        messageModel["isShowMessageModel"] = true;
        messageModel["messageModelTitle"] = "Error";
        messageModel["showCloseBtn"] = true;
        messageModel["backToHome"] = true;
        messageModel["height"] = 250;
        messageModel["waitMillsSecondsToClose"] = 0;
        messageModel["messageModelMessage"] = "Sorry, you don't have access to this page.";
        this.$store.dispatch("updateMessageModel", messageModel);
    }
}