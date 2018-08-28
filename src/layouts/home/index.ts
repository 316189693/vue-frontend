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
  // stage
  stageObj = {
      "-4": "Tendered",
      "-3": "Load Building",
      "-2": "Quote",
      "-1": "Cancelled",
      "0": "Pickup",
      "1": "Linehaul",
      "2": "Pickup Complete",
      "3": "Linehaul Complete",
      "4": "Out-For-Delivery",
      "5": "Delivery Complete"
  };


  getStageText(stage: number) {
    let stageText = this.stageObj[stage];
    if (!stageText) {
      return "";
    }
    return stageText;
  }

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
    'Status': 'stageText',
    'Pickup Date': 'pickup',
    'Origin': 'pickup_address',
    'Delivery Date': 'delivery',
    'Destination': 'delivery_address',
    'Pallets': 'pts',
    'Weight': 'lbs',
  };

  pagination = {
    min: 1,
    max: 10,
    totalOrders: 0,
    totalPaginationCount: 0,
    paginationLink: {},
    paginationSet: {},
    currentPaginationIndex: 0,
    paginationStart: 0,
    paginationEnd: 5,
    hide: false
  };

  updatePaginationModel(paginationIndex: any) {
    this.pagination.currentPaginationIndex = paginationIndex;
    this.pagination.min = this.pagination.paginationSet[paginationIndex].min;
    this.pagination.max = this.pagination.paginationSet[paginationIndex].max;

    console.log('min: ' + this.pagination.min + ", max: " + this.pagination.max);

    this.updatePaginationLink(paginationIndex);

    console.log("total pagination count: " + this.pagination.totalPaginationCount);
    console.log("current pagination: " + this.pagination.currentPaginationIndex);
  }

  incrementPagination() {
    if (this.pagination.currentPaginationIndex + 1 <= this.pagination.totalPaginationCount)  {
      this.pagination.currentPaginationIndex++;
      this.updatePaginationModel(this.pagination.currentPaginationIndex);
    }
  }

  decrementPagination() {
    if (this.pagination.currentPaginationIndex - 1 >= 0) {
      this.pagination.currentPaginationIndex--;
      this.updatePaginationModel(this.pagination.currentPaginationIndex);
    }
  }

  updatePaginationLink(paginationIndex: any) {
    let limiter: number = 4;
    let offset: number = 2;
    let link: object[] = [];

    paginationIndex += 1;

    if (paginationIndex >= limiter) {
      let start: number = (paginationIndex) - offset;
      let end: number = (paginationIndex) + offset;

      this.pagination.paginationStart = start;
      this.pagination.paginationEnd = end;

      for (let i: number = start ; i <= end - 1 ; i++) {
        link.push({
          value: i,
          index: i - 1
        });
        if (i == this.pagination.totalPaginationCount) {
          break;
        }
      }
    } else {
      for (let i: number = 1 ; i <= this.pagination.totalPaginationCount ; i++) {
        if (i <= limiter) {
          link.push({
            value: i,
            index: i - 1
          });
        } else {
          break;
        }
      }
    }

    console.log(link);
    this.pagination.paginationLink = link;
  }

  generatePaginationObject(totalRows: number) {
    // Each pagination has 10 rows each.
    let group: number = Math.floor(totalRows / 10);
    // Fetch any mod remainder from total rows.
    let end: number = (totalRows % 10);
    let min: number = 1;
    let max: number = 10;
    let pagiObject: object[] = [];

    console.log('total rows: ' + totalRows);
    console.log('group: ' + group);
    console.log('end: ' + end);

    // If total rows has a mod remainder, add an extra pagination value to accomodate extra rows.
    if (end > 0) {
      group += 1;
    }

    this.pagination.totalPaginationCount = group;

    for (let i: number = 1 ; i <= group ; i++) {
      console.log('i: ' + i);
      console.log('min: ' + min + ", max: " + max);
      if (i == group) {
        if (end > 0) {
          max = (min + end) - 1;
        }
        this.pagination.totalOrders = max;
        console.log('-> ' + i);
        console.log('min: ' + min + ", max: " + max);
      }

      pagiObject.push({
        min: min,
        max: max
      });

      min += 10;
      max += 10;
    }

    console.log(pagiObject);

    this.pagination.paginationSet = pagiObject;
    this.updatePaginationLink(0);
  }

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
      this.initResponseData(response.data);
      this.items = response.data;

      if (this.items.length <= 10) {
        this.pagination.hide = true;
      } else {
        this.generatePaginationObject(this.items.length);
      }

    } catch (error) {

    }
    finally {
      this.isLoading = false;
    }

  }

  initResponseData(items: any) {
    if (!items || items.length <= 0) {
       return items;
    }
    return items.map((item: any) => {item['stageText'] = this.getStageText(item['tms_order_stage']); });
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
