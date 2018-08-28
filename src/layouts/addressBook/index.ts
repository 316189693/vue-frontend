import Vue from "vue";
import { Component, Prop, Provide, Inject } from "vue-property-decorator";
import * as Logger from "js-logger";

import template from "./addressBook.vue";
import { Validator } from "vee-validate";
import googleAutoComplete from "../../services/googleAPI/autoComplete";
import MessageModal from "../../components/messageModel";
import DefaultModal from "../../components/modal";
import OneButtonModal from "../../components/oneButtonModal";
@Component({
  mixins: [template],
  components: {
    MessageModal,
    DefaultModal,
    OneButtonModal
  }
})
export default class AddressBook extends Vue {
  companyName: string = "";
  location_id: number;
  validationStarted: boolean = true;
  btnSearchText: string = "Search";
  searchNotFound: boolean = false;

  // errorModal
  errorModal: string = "errorModal";

  // MessageModal
  successModalName: string = "successModal";
  successModalTitle: string = "Success";
  successModalMessage: string = "";

  // DefaultModal
  deleteCompanyModal: string = "deleteCompanyModal";
  editCompanyModal: string = "editCompanyModal";
  editCompanyModalTitle: string = "";
  editCompanyModaRightBtn: string = "";
  editCompanyRightBtnStyle: any = {
    "background-color": "#15223d !important",
    color: "#fff !important"
  };
  viewCompanyModal: string = "viewCompanyModal";
  editViewleftBtnStyle: any = {
    "display": "none"
  };
  editViewRightBtnStyle: any = {
    "margin-left": "140px"
  };
  addressSuggestionModal: string = "addressSuggestionModal";
  addressRightBtnStyle: any = {
    "background-color": "#f7b020 !important",
    color: "#15223d !important"
  };
  rightBtnaddressSuggestionModal: string = "Next";

  // SuggestedAddress
  suggestedRadioAddress: string = "";
  bypassValidation: boolean = false;

  // items in pagination
  items: Array<Object> = [];
  pagination = {
    min: 1,
    max: 10,
    totalCompanies: 0,
    totalPaginationCount: 0,
    paginationLink: {},
    paginationSet: {},
    currentPaginationIndex: 0,
    paginationStart: 0,
    paginationEnd: 5,
    hide: false
  };

  @Provide() addressBookData: any = this.$store.getters.addressBookData;
  @Provide() locationTypeOptions: any = this.$store.getters.locationTypeOptions;
  @Provide() stateOptions: any = this.$store.getters.stateOptions;

  @Inject() $validator: Validator;

  async created() {
    let response = await this.$store.dispatch("getAddressBookData");
    if (response) {
      this.items = this.addressBookData.addressList;
      if (this.items.length <= 10) {
        this.pagination.hide = true;
      } else {
        this.pagination.hide = false;
      }
      this.generatePaginationObject(this.items.length);
    }
  }

  mounted() { }

  async searchCompany() {
    this.companyName =
      this.btnSearchText == "Clear Results" ? "" : this.companyName;
    let response = await this.$store.dispatch(
      "searchCompany",
      this.companyName
    );
    if (response) {
      this.btnSearchText = this.companyName != "" ? "Clear Results" : "Search";
      this.items = this.addressBookData.addressList;
      if (this.items.length > 0) {
        this.searchNotFound = false;
        if (this.items.length <= 10) {
          this.pagination.hide = true;
        } else {
          this.pagination.hide = false;
        }
        this.generatePaginationObject(this.items.length);
        this.updatePaginationModel(0);

      } else {
        this.btnSearchText == "Search"
          ? (this.searchNotFound = false)
          : (this.searchNotFound = true);
      }
    }
  }

  editCompany(location_id: any) {
    if (location_id == 0) {
      // add
      this.editCompanyModalTitle = "Add New Company";
      this.editCompanyModaRightBtn = "Add Company";
      this.$store.commit("resetCompanyData");
    } else {
      // edit
      this.editCompanyModalTitle = "Edit Company Details";
      this.editCompanyModaRightBtn = "Save Changes";
      this.$store.commit("updateCompanyData", location_id);
      this.$modal.hide(this.viewCompanyModal);
    }
    this.$modal.show(this.editCompanyModal);
    this.$modal.hide(this.viewCompanyModal);
  }

  deleteCompany(location_id: any) {
    this.location_id = location_id;
    this.$store.commit("updateCompanyData", location_id);
    this.$modal.show(this.deleteCompanyModal);
    this.$modal.hide(this.viewCompanyModal);
  }

  viewCompany(location_id: any) {
    this.$store.commit("updateCompanyData", location_id);
    this.$modal.show(this.viewCompanyModal);
  }

  async confirmModal(modal_name: any, is_address_validated: boolean = false) {
    if (modal_name == "del") {
      let response = await Promise.all([
        this.$store.dispatch("deleteCompany", this.location_id)
      ]);
      let success = response[0].data.success;
      if (success > 0) {
        this.$modal.hide(this.deleteCompanyModal);
        this.searchCompany();
      } else {
        // error here
        this.$modal.show(this.errorModal);
      }
    } else if (modal_name == "edit") {
      let action =
        this.addressBookData.companyData.locationId == 0 ? "add" : "edit";
      let validate = await this.$validator.validateAll();
      if (!validate && this.suggestedRadioAddress == "inputted") {
        // bypass validation when select inputted address
        validate = true;
      }
      if (validate) {
        // if adding new company lets check for address auto suggestion
        if (action == "add") {
          if (!is_address_validated) {
            if (await this.$store.dispatch("validateLocationALK")) {
              this.$modal.hide(this.editCompanyModal);
              this.showAddressSuggestionModal();
            }
          } else {
            // store update to form
            this.$store.commit(
              "updateNewCompanyData",
              this.suggestedRadioAddress
            );
            // adding  new company
            this.successModalMessage =
              "Company has been saved to your Address Book.";
            this.saveCompany();
          }
        } else {
          // edit existing company
          this.successModalMessage = "Company has been updated.";
          this.saveCompany();
        }
      }
    }
  }

  async saveCompany() {

    this.$modal.hide(this.editCompanyModal);
    this.$modal.hide(this.addressSuggestionModal);

    let response = await Promise.all([this.$store.dispatch("updateCompany")]);
    let location_id = response[0].data.location_id;
    if (location_id > 0) {
      this.$modal.show(this.successModalName);
      this.searchCompany();
      this.suggestedRadioAddress = "";
    } else {
      // error here
      this.$modal.show(this.errorModal);
      this.suggestedRadioAddress = "";
    }
  }

  closeModal(modal_name: any) {
    if (modal_name == "del") {
      this.$modal.hide(this.deleteCompanyModal);
    } else if (modal_name == "edit") {
      this.$modal.hide(this.editCompanyModal);
    } else {
      this.$modal.hide(modal_name);
    }
    this.suggestedRadioAddress = "";
  }

  closeErrorModal() {
    this.$modal.hide(this.errorModal);
  }

  showAddressSuggestionModal() {
    this.suggestedRadioAddress = "inputted";
    if (!this.addressBookData.suggestedAddress.Address) {
      this.rightBtnaddressSuggestionModal = "Submit";
    } else {
      this.rightBtnaddressSuggestionModal = "Next";
    }
    this.$modal.show(this.addressSuggestionModal);
  }

  // pagination start here

  updatePaginationModel(paginationIndex: any) {
    this.pagination.currentPaginationIndex = paginationIndex;
    this.pagination.min = this.pagination.paginationSet[paginationIndex].min;
    this.pagination.max = this.pagination.paginationSet[paginationIndex].max;
    this.updatePaginationLink(paginationIndex);

    console.log(
      "total pagination count: " + this.pagination.totalPaginationCount
    );
    console.log(
      "current pagination: " + this.pagination.currentPaginationIndex
    );
  }

  incrementPagination() {
    if (
      this.pagination.currentPaginationIndex + 1 <=
      this.pagination.totalPaginationCount
    ) {
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

      for (let i: number = start; i <= end - 1; i++) {
        link.push({
          value: i,
          index: i - 1
        });
        if (i == this.pagination.totalPaginationCount) {
          break;
        }
      }
    } else {
      for (let i: number = 1; i <= this.pagination.totalPaginationCount; i++) {
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

    for (let i: number = 1; i <= group; i++) {
      console.log('i: ' + i);
      console.log('min: ' + min + ", max: " + max);
      if (i == group) {
        if (end > 0) {
          max = (min + end) - 1;
        }

        this.pagination.totalCompanies = max;

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

  // pagination end here
}
