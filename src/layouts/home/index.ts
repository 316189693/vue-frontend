import Vue from "vue";
import { Component, Prop, Provide } from "vue-property-decorator";
import tmsService from "../../services/axios/tmsService";
import clientService from "../../services/axios/axiosService";
import JsonExcel from 'vue-json-excel';

import template from "./home.vue";


@Component({
  mixins: [template],
  components: {
    'downloadExcel': JsonExcel
  }
})
export default class Home extends Vue {

  // life cycle methods
  mounted() {

    let userID = localStorage.getItem("UserID");
    let userGroupName = localStorage.getItem("UserGroupName");

    if (userID && userGroupName) {
      this.getCustomerOrders(userID);
      this.group_name = userGroupName;
    }
  }
  // end of life cycle methods


  // Data
  items: Array<Object> = [];
  group_name: string = '';
  json_fields: Object = {
    'PU #': 'pu',
    'PRO #': 'pro',
    'REFERENCE #': 'ref_no',
    'Pickup Date': 'pickup',
    'Origin': 'pickup_address',
    'Delivery Date': 'delivery',
    'Destination': 'delivery_address',
    'Pallets': 'pts',
    'Weight': 'lbs',
  };

  isLoading = false;

  orderReview(order: any, event: any) {
    if (!event || !event.target || event.target.className === 'actions') {
      return;
    }
    this.$router.push({ name: 'orderReview', query: { 'pu': order.pu, 'order': order.order, 'isShowButtons': 'false'}});
  }

  async getCustomerOrders(userID: string) {


    try {
      this.isLoading = true;
      let response = await clientService.post("write_new/get_tms_orders_customer.php");
      this.items = response.data;
    } catch (error) {

    }
    finally {
      this.isLoading = false;
    }

  }

  redirectCustomerSignup() {
    window.location.href = "#/customerSignup";
  }

  redirectQuote() {
    window.location.href = "#/getQuote";
  }

  openBOL(order: number) {
    window.open("/tms_pdf_bol.php?order_id=" + order);
  }

  openShipping(order: number) {
    window.open("/tms_pdf_shipping_label.php?order_id=" + order);
  }

  openPOD(url: string) {
    window.open(url);
  }



}
