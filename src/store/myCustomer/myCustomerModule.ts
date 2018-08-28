import myCustomer from "./state";
import tmsService from "../../services/axios/tmsService";
import qs from "qs";
import Customer from "../../pojo/Customer";
import PaginationObj from "../../pojo/PaginationObj";

// state object
const state = {
    myCustomer
};

// mutations are operations that actually mutates the state.
const mutations = {
    updateMyCustomerDataForSearchTermChanged() {
        state.myCustomer.show_clear_results_btn = false;
    },
    resetMycustomers(state: any) {
        state.myCustomer.searchStr = "";
        state.myCustomer.searchStr_bak = "";
        state.myCustomer.show_clear_results_btn = false;
    },
    clearErrorInfoAndSetSearchTermBak(state: any) {
        state.myCustomer.show_customers_no_found_text = false;
        state.myCustomer.searchStr_bak = state.myCustomer.searchStr;
    },
  updateMyCustomerData(state: any, res: any) {
     if (res === -1) {
          state.myCustomer.show_customers_no_found_text = true;
          state.myCustomer.has_customers = false;
          state.myCustomer.customers = new Array<Customer>();
          state.myCustomer.pagination = new PaginationObj();
      } else {
          state.myCustomer.show_customers_no_found_text = false;
          state.myCustomer.has_customers = true;
          state.myCustomer.customers = transferToCustomers(res['customers']);
          state.myCustomer.customers_bak = state.myCustomer.customers;
          let paginationObj: PaginationObj = new PaginationObj(res['pageSize'], res['currentPage'], res['total_size'], "customers");
          state.myCustomer.pagination = paginationObj;
          if (state.myCustomer.show_clear_results_btn) {
              state.myCustomer.show_clear_results_btn = false;
          }
          if (state.myCustomer.searchStr) {
              state.myCustomer.show_clear_results_btn = true;
              state.myCustomer.show_total_info = false;
          } else {
              state.myCustomer.show_total_info = true;
          }
          state.myCustomer.pagination.totalSizeBak = res['customers_count_without_search'];
      }
  }
};

function transferToCustomers(customers: any) {
    let transfer_customers = new Array<Customer>();
    if (customers && customers.length > 0) {
        for (let i = 0; i < customers.length; i++) {
            let item = customers[i];
            let customer = new Customer();
            customer.location_name = item['location_name'];
            customer.user_firstname = item['user_firstname'];
            customer.user_lastname = item['user_lastname'];
            customer.user_created_date = item['user_created_date'];
            customer.user_email = item['user_email'];
            customer.location_phone = item['location_phone'];
            customer.location_street = item['location_street'];
            customer.location_street2 = item['location_street2'];
            customer.location_city = item['location_city'];
            customer.location_state = item['location_state'];
            customer.location_zip = item['location_zip'];
            transfer_customers.push(customer);
        }
    }
    return transfer_customers;
}

// use actions to commit mutations
const actions = {
  getMyCustomerData(store: any, formData: any) {
      tmsService
        .post("write_new/get_created_customers.php",  qs.stringify({ pageNum: formData.pageNum, pageSize: formData.pageSize, search_str: formData.search_str }))
        .then(function(response) {
           store.commit("updateMyCustomerData", response.data);
        }).catch(function (error) {
          console.log(error);
          let messageModel = {};
          messageModel["isShowMessageModel"] = true;
          messageModel["messageModelTitle"] = "error";
          messageModel["messageModelMessage"] = "Search my customers error!";
          store.dispatch("updateMessageModel", messageModel);
      });
  },
  resetMyCustomerData(store: any) {
      store.commit("resetMycustomers");
  },
  clearErrorInfoAndSetSearchTermBak(store: any) {
      store.commit("clearErrorInfoAndSetSearchTermBak");
  },
  inputSearchTermChanged(store: any) {
      store.commit("updateMyCustomerDataForSearchTermChanged");
  }
};

const getters = {
  myCustomerData(state: any) {
    return state.myCustomer;
  }
};

const myCustomerModule = {
  state,
  mutations,
  actions,
  getters
};

export default myCustomerModule;
