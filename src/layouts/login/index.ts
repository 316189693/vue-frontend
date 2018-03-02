import Vue from "vue";
import { Component, Model, Provide, Watch} from "vue-property-decorator";
import * as Logger from "js-logger";

import template from "./login.vue";
import axiosService from '../../services/axios/axiosService';
import DefaultModal from "../../components/modal";
import messageModel from "../../components/messageModel";
import * as $ from "jquery";

@Component({
  mixins: [template],
  components: {
    DefaultModal,
    messageModel
},
})
export default class Login extends Vue {


    @Provide()
    loginData: any = this.$store.getters.loginData;   

    
    @Provide()
    formData: object = this.$store.getters.formData;

    trackShipment(){
         this.$store.dispatch('trackShipment', this.formData);
    }

    async signIn(){
        let result = await this.$validator.validateAll();
        if (result) {
            this.$store.dispatch('signIn', this.formData);
        }
        
    }
   


    @Watch("formData.hasTrackTableRows",{deep:true,immediate:true})
    scrollDown(val: any, oldVal: any, event: any){
        if  (val) {
            $('html,body').animate({'scrollTop':'400px'},300);
        }
        
    }


    remeberMe(){
        this.$store.dispatch('changeRemeberMe',this.formData);
    }

    created(){
        this.$store.dispatch('checkLogin');
    }
    
    // watch
    @Watch("formData.sendForgotEmailstaus",{deep:true,immediate:true})
    onForgotPasswordSend(val: any, oldVal: any, event: any) {
        if (val === 1) {
            this.$modal.hide(this.modalName);
        } 
    }

     
    //messageModel
    @Provide()
    messageModel:any= this.$store.getters.messageModel;   

    @Watch("messageModel.isShowMessageModel",{deep:true,immediate:true})
    onMessageModelChange(val: any, oldVal: any, event: any) {
 
        if (val && val !== oldVal) {
            this.showMessageModal();
        } 
    }
   
   async showMessageModal() {
        this.$modal.show(this.messageModel.messageName);
         await  this.waitFiveSecond(1000);
         this.closeMessageModel();
        
    }

    waitFiveSecond(time:number){
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve();
            }, time);
        })
       
    }

    closeMessageModel(){

        this.$modal.hide(this.messageModel.messageName);
        this.messageModel.isShowMessageModel = false;
        this.messageModel.messageModelTitle = '';
        this.messageModel.messageModelMessage = '';
        this.$store.dispatch('updateMessageModel', this.messageModel);
    }
    //messageModel

    // Modal
    @Provide()
    modalName: string = "forgotPassWord";

    @Provide()
    modalMessage: string = `Tell us your email address and we'll email you a link to re-set your password.`;

    @Provide()
    modalTitle: string = "Forgot Password";

    @Provide()
    modalConfirmText: string = "reset password";

    @Provide()
    modalCancelText: string = "Nevermind";
   
    @Provide()
    maxWidth:number = 700;
     
    @Provide()
    maxHeight:number = 340;
  
    showModal() {
        this.$modal.show(this.modalName);
    }

    closeModal() {
        this.$modal.hide(this.modalName);
        this.$store.dispatch('cancelForgotModel');
    }

    confirmModal(){
        this.$store.dispatch('forgotPassword',this.formData);
    }

    // Modal
}

