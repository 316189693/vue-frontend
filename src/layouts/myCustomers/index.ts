import Vue from "vue";
import { Component, Provide } from "vue-property-decorator";
import template from "./myCustomers.vue";
import Pagination from "../../components/pagination";

@Component({
    mixins: [template],
    components: { Pagination},
})
export default class MyCustomers extends Vue {
    @Provide()
    formData: any = this.$store.getters.myCustomerData;


    doSearch(): void {
        if (this.formData.show_clear_results_btn) {
            this.$store.dispatch("resetMyCustomerData");
            this.doSearchByPageNumAndSerchTerms(1, '');
        } else {
            this.doSearchByPageNumAndSerchTerms(1, this.formData.searchStr);
            this.$store.dispatch("clearErrorInfoAndSetSearchTermBak");
        }
    }

    mounted() {
        this.doSearch();
    }

    doSearchByPageNum(pageNum: number) {
        this.doSearchByPageNumAndSerchTerms(pageNum, this.formData.searchStr_bak);
    }

    doSearchByPageNumAndSerchTerms(pageNum: number, searchTerm: string) {
        let request = {pageNum: pageNum, pageSize: this.formData.pagination.pageSize, search_str: searchTerm};
        this.$store.dispatch("getMyCustomerData", request);
    }

    inputSearchTermChanged() {
        if (this.formData.searchStr != this.formData.searchStr_bak) {
            this.$store.dispatch("inputSearchTermChanged");
        }
    }
}
