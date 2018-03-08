import Vue from "vue";
import { Component, Prop, Provide } from "vue-property-decorator";
import * as Logger from "js-logger";

import template from "./home.vue";

@Component({
  mixins: [template],
  components: {
  }
})
export default class Home extends Vue {
	items: any = {};

	async search() {
        let res = await this.$store.getters.getOrders(localStorage.getItem('UserID'));
        if (res == -1 || res == 0) {
            this.items = {};
        } else {
            this.items = res;
        }


    }

  redirectQuote(){
    window.location.href = "#/getquote";
  }

  openBOL(order:number){
    window.open("/tms_pdf_bol.php?order_id=" + order);
  }

  openShipping(order:number){
    window.open("/tms_pdf_shipping_label.php?order_id=" + order);
  }

  openPOD(url:string){
    window.open(url);
  }


  mounted(){
  	this.search();
  }
    
}
