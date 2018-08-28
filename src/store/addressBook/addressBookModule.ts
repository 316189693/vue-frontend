import addressBook from "./state";
import axiosService from "../../services/axios/axiosService";
import tmsService from "../../services/axios/tmsService";
import qs from "qs";
import { isUndefined } from "util";

const state = {
  addressBook
};

// mutations are operations that actually mutates the state.
const mutations = {
  resetCompanyData(state: any) {
    cleanObj(state.addressBook.addressBookData.companyData);
    cleanObj(state.addressBook.addressBookData.newInputtedAddress);
    state.addressBook.addressBookData.suggestedAddress.Address = {};
    state.addressBook.addressBookData.suggestedAddress.Coords = {};
    state.addressBook.addressBookData.suggestedAddress.Errors = {};
    state.addressBook.addressBookData.companyData.locationId = 0;
    state.addressBook.addressBookData.companyData.state = "CA";
    state.addressBook.addressBookData.companyData.location_type = "1";
    state.addressBook.addressBookData.newInputtedAddress.state = "CA";
  },
  updateaddressBookData(state: any, res: any) {
    let addressList = res["address_book"];
    if (addressList == 0) {
      state.addressBook.addressBookData.showNotFound = true;
      state.addressBook.addressBookData.addressList = {};
    } else {
      state.addressBook.addressBookData.showNotFound = false;
      state.addressBook.addressBookData.addressList = res["address_book"];
    }
  },
  updateCompanyData(state: any, location_id: any) {
    if (location_id > 0) {
      let companyList = state.addressBook.addressBookData.addressList;
      for (let i in companyList) {
        let row = companyList[i];
        if (row["location_id"] == location_id) {
          state.addressBook.addressBookData.companyData.locationId =
            row["location_id"];
          state.addressBook.addressBookData.companyData.locationName =
            row["location_name"];
          state.addressBook.addressBookData.companyData.address1 =
            row["location_street"];
          state.addressBook.addressBookData.companyData.address2 =
            row["location_street2"];
          state.addressBook.addressBookData.companyData.city =
            row["location_city"];
          state.addressBook.addressBookData.companyData.state =
            row["location_state"];
          state.addressBook.addressBookData.companyData.zip =
            row["location_zip"];
          state.addressBook.addressBookData.companyData.phone =
            row["location_phone"];
          state.addressBook.addressBookData.companyData.fax =
            row["location_fax"];
          state.addressBook.addressBookData.companyData.email =
            row["location_email"];
          state.addressBook.addressBookData.companyData.location_type =
            row["fk_location_type_id"];
          state.addressBook.addressBookData.companyData.location_type_name =
            row["location_type_name"];
        }
      }
    }
  },
  updateNewCompanyData(state: any, suggestedRadioAddress: any) {
    if (suggestedRadioAddress == "suggested") {
      state.addressBook.addressBookData.companyData.address1 =
        state.addressBook.addressBookData.suggestedAddress.Address.StreetAddress;
      state.addressBook.addressBookData.companyData.city =
        state.addressBook.addressBookData.suggestedAddress.Address.City;
      state.addressBook.addressBookData.companyData.state =
        state.addressBook.addressBookData.suggestedAddress.Address.State;
      state.addressBook.addressBookData.companyData.zip =
        state.addressBook.addressBookData.suggestedAddress.Address.Zip;
    } else if (suggestedRadioAddress == "inputted") {
      state.addressBook.addressBookData.companyData.address1 ==
        state.addressBook.addressBookData.companyData.address1;
      state.addressBook.addressBookData.companyData.city ==
        state.addressBook.addressBookData.companyData.city;
      state.addressBook.addressBookData.companyData.state ==
        state.addressBook.addressBookData.companyData.state;
      state.addressBook.addressBookData.companyData.zip ==
        state.addressBook.addressBookData.companyData.zip;
    } else if (suggestedRadioAddress == "new_inputted") {
      state.addressBook.addressBookData.companyData.address1 =
        state.addressBook.addressBookData.newInputtedAddress.address1;
      state.addressBook.addressBookData.companyData.address2 =
        state.addressBook.addressBookData.newInputtedAddress.address2;
      state.addressBook.addressBookData.companyData.city =
        state.addressBook.addressBookData.newInputtedAddress.city;
      state.addressBook.addressBookData.companyData.state =
        state.addressBook.addressBookData.newInputtedAddress.state;
      state.addressBook.addressBookData.companyData.zip =
        state.addressBook.addressBookData.newInputtedAddress.zip;
    }
  },
  updateSuggestedAddress(state: any, res: any) {
    let suggestedResult = res[0];
    state.addressBook.addressBookData.suggestedAddress.Address =
      suggestedResult.Address;
    state.addressBook.addressBookData.suggestedAddress.Coords =
      suggestedResult.Coords;
    state.addressBook.addressBookData.suggestedAddress.Errors =
      suggestedResult.Errors;
  }
};

// use actions to commit mutations
const actions = {
  getAddressBookData(store: any) {
    return new Promise((resolve, reject) => {
      tmsService
        .post("write_new/get_customer_address_book.php")
        .then(function(response) {
          store.commit("updateaddressBookData", response.data);
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  searchCompany(store: any, companyName: any) {
    return new Promise((resolve, reject) => {
      tmsService
        .post(
          "write_new/get_customer_address_book.php",
          qs.stringify({ companyName: companyName })
        )
        .then(function(response) {
          store.commit("updateaddressBookData", response.data);
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  validateLocationALK(store: any) {
    let data = formData(store);
    let dataString =
      "street=" +
      data["input_street"] +
      "&city=" +
      data["input_city"] +
      "&state=" +
      data["input_state"] +
      "&postcode=" +
      data["input_zip"] +
      "&region=NA";
    return new Promise((resolve, reject) => {
      tmsService
        .get(
          "https://pcmiler.alk.com/apis/rest/v1.0/Service.svc/locations?" +
          dataString,
          { headers: { authorization: "9A4DC5EC2EFCEA4C8917545360589148" } }
        )
        .then(function(response) {
          store.commit("updateSuggestedAddress", response.data);
          resolve(response.data);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  async updateCompany(store: any) {
    let response = await tmsService.post(
      "write_new/write_location_admin.php",
      qs.stringify(formData(store))
    );
    return response;
  },
  async deleteCompany(store: any, location_id: any) {
    let response = await tmsService.post(
      "write_new/delete_customer_address_book.php",
      qs.stringify({ location_id: location_id })
    );
    return response;
  }
};

function cleanObj(obj: any) {
  for (let key of Object.keys(obj)) {
    obj[key] = "";
  }
}

function formData(store: any) {
  let input = store.getters.addressBookData.companyData;
  let data = {
    input_client_id: input.locationId,
    input_location_address_book: 1,
    input_location_type_id: input.location_type,
    rec_id: 0,
    input_name: input.locationName,
    input_fax: input.fax,
    input_invoice_id: 0,
    input_czar_rate: 0,
    input_status: 1,
    input_phone: input.phone,
    input_email: input.email,
    input_timezone: "PST",
    input_street: input.address1,
    input_street2: input.address2,
    input_city: input.city,
    input_state: input.state,
    input_zip: input.zip,
    input_country: "US",
    input_lat: null,
    input_lng: null,
    input_server: 0,
    input_warehouse_id: 0,
    input_invoice_type: "Standard",
    input_credit_score_grade: 0,
    input_netterm: 0,
    input_payment_type: "cash",
    input_print_invoice_bol: 0,
    input_invoice_pod: 0,
    input_insurance_addl: 0,
    input_carrier_complete: 0,
    input_gps_contract: 0,
    input_watch: 0,
    input_intracompany: 0,
    input_production_line: 0,
    input_invoice_inoutgate: 0,
    input_invoice_mail: 0,
    input_email_update: -1,
    input_cust_quote: 0,
    input_customer_pickup: 0,
    input_location_notify: 0,
    input_revenue_id: 0,
    input_invoice_scale: 0,
    input_invoice_combine: 0,
    input_invoice_complete_move: 0,
    input_drop_and_hook: 0,
    input_link_terminal_id: 0,
    input_invoice_receipt: 0,
    input_dr_double_sided: 0,
    input_req_ref: 0,
    input_req_po: 0,
    input_req_do: 0,
    input_req_rate_conf: 0,
    input_cust_ref: 0,
    input_collage: 0,
    input_req_photo: 0,
    input_req_pc_count: 0,
    input_bobtail_override: 0,
    input_notify_email: 0,
    input_notify_phone: 0,
    input_notify_text: 0,
    input_notify_fax: 0,
    input_customer_group: 0,
    input_aging_format_difference: 30,
    input_statement_ref: 0,
    input_vendor: 0,
    input_accessorial_approval: 0,
    input_pu_notification: 0,
    input_dl_notification: 0,
    options_array: "[25]",
    location_shipper: 1,
    location_xml: 0,
    location_invoiceheader: 0,
    location_residential: 0,
    location_inside: 0,
    location_pickup_liftgate: 0,
    location_delivery_liftgate: 0,
    location_appointment: 0,
    location_sameday: 0,
    location_email_pod: 0,
    location_bobtail_override: 0,
    location_lh_carrier: 0,
    location_advanced_carrier: 0,
    location_beyond_carrier: 0,
    location_dray_carrier: 0,
    location_billto: 0,
    location_cfs: 0,
    location_warehouse: 0,
    location_xdock: 0,
    location_port: 0,
    location_chassisdepot: 0,
    location_parking: 0,
    location_steamship: 0,
    location_inventory: 0,
    location_vendor: 0,
    location_production_line: 0,
    pageName: "LTL"
  };

  return data;
}

const getters = {
  addressBookData(state: any) {
    return state.addressBook.addressBookData;
  }
};

const addressBookModule = {
  state,
  mutations,
  actions,
  getters
};

export default addressBookModule;
