import Vue from 'vue';
import template from './orderReview.vue';
import {Component,Provide} from 'vue-property-decorator';
import * as Logger from 'js-logger';

@Component({
   mixins:[template]
})
export default class OrderReview extends Vue {
    @Provide()
    formData:any = this.$store.getters.orderDetails;

    created(){
        console.log(this.$route.params.order);
         this.$store.dispatch("updateOrderReview",this.$route.params.order); 
    }
    
   hasDocument(){
       return this.formData.documents && this.formData.documents.length > 0
   }

}