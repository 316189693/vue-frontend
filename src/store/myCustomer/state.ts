import Customer from "../../pojo/Customer";
import PaginationObj from "../../pojo/PaginationObj";

const customers = new Array<Customer>();

const pagination = new PaginationObj();

const myCustomer = {
  customer_no_found_text: "Could not find this customer",
  search_btn_text: "Search",
  clear_results_btn_text: "Clear Results",
  show_clear_results_btn: false,
  show_total_info: true,
  searchStr: "",
  searchStr_bak: "",
  show_customers_no_found_text: false,
  has_customers: false,
  customers: customers,
  pagination: pagination
};

export default myCustomer;
