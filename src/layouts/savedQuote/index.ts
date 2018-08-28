import Vue from "vue";
import { Component, Prop, Provide } from "vue-property-decorator";
import tmsService from "../../services/axios/tmsService";
import qs from "qs";

// Components
import template from "./savedQuote.vue";
import DefaultModal from "../../components/modal";
import MessageModal from "../../components/messageModel";

@Component({
  mixins: [template],
  components: {
    DefaultModal,
    MessageModal
  }
})
export default class SavedQuote extends Vue {
  // Data
  savedQuoteData: any = null;
  activeRadio: number = -1;
  quoteSelected: boolean = false;
  pendingDeleteQuote: any = {
    key: 0,
    quoteId: ""
  };
  bill_to_id: number = 0;
  // Data

  isLoading = false;

  // life cycle methods
  created() {
    this.getCustomerData();
  }

  mounted() {}
  // end of life cycle methods

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

  // methods
  async getCustomerData() {
    let url = "write_new/get_customer_account.php";
    let json3 = {
      UserID: localStorage.UserID,
      UserToken: localStorage.UserToken
    };

    this.isLoading = true;

    tmsService
      .post(url, qs.stringify(json3))
      .then(res => {
        console.log(res.data.billing.location_id);
        this.bill_to_id = res.data.billing.location_id;
        this.getQuote();
        this.isLoading = false;
      })
      .catch(error => {
        console.log(error);
      });
  }

  async getQuote() {
    let url1 = "write_new/get_tms_quote_line.php";

    let json3 = {
      input_search_quote_id: null,
      input_search_date_from: null,
      input_search_date_to: null,
      billto_id: this.bill_to_id,
      input_search_shipper_state: "CA",
      input_search_shipper_zip: null,
      input_search_consignee_state: "CA",
      input_search_consignee_zip: null,
      input_search_status: 1,
      input_search_limit: 50,
      quote: 1,
      UserID: localStorage.UserID,
      UserToken: localStorage.UserToken
    };

    tmsService
      .post(url1, qs.stringify(json3))
      .then(res => {
        console.log(res);

        // remove the ones have order id
        this.savedQuoteData = res.data.filter((item: any) => {
          return !item.fk_tms_order_id;
        });

        if (this.savedQuoteData.length > 0) {
          if (this.savedQuoteData.length <= 10) {
            this.pagination.hide = true;
          } else {
            this.generatePaginationObject(this.savedQuoteData.length);
          }
        }

      })
      .catch(error => {
        console.log(error);
      });
  }

  setActiveRadio(key: number) {
    let radio = document.getElementById(`radio${key}`) as HTMLInputElement;

    if (radio.checked) {
      this.activeRadio = -1;
      this.quoteSelected = false;

      setTimeout(() => {
        radio.checked = false;
      }, 1);
    } else {
      this.activeRadio = key;
      this.quoteSelected = true;
    }
  }

  goToEdit(key: number) {
    let quoteId = this.savedQuoteData[key].tms_quote_id;
    window.location.href = `#/getquote?isEdit=true&quoteNumber=${quoteId}`;
  }

  goToSchedule() {
    let quoteId = this.savedQuoteData[this.activeRadio].tms_quote_id;
    window.location.href = `#/getquote?schedule=true&quoteNumber=${quoteId}`;
  }

  goToScheduleKey(quoteId: number) {
    window.location.href = `#/getquote?schedule=true&quoteNumber=${quoteId}`;
  }

  async deleteQuote(key: number, quoteId: string) {
    this.pendingDeleteQuote.key = key;
    this.pendingDeleteQuote.quoteId = quoteId;
    this.$modal.show(this.deleteModal);
  }

  // modal
  deleteModal: string = "deleteModal";
  async rightBtnDeleteModal() {
    try {
      let response = await tmsService.post(
        "write_new/write_tms_quote_decline.php",
        { quote_id: this.pendingDeleteQuote.quoteId }
      );
      if (response.data == 1) {
        this.savedQuoteData.splice(this.pendingDeleteQuote.key, 1);
      } else {
        throw new Error("delete failed");
      }
    } catch (error) {
      this.$modal.show(this.errorMessage);
      console.log(error.message);
    } finally {
      this.$modal.hide(this.deleteModal);
    }
  }
  leftBtnDeleteModal() {
    this.$modal.hide(this.deleteModal);
  }
  // modal

  // error Message
  errorMessage: string = "errorMessage";
  // error Message
}
