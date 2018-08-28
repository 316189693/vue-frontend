import Vue from "vue";
import { Component, Prop, Provide, Watch } from "vue-property-decorator";
import template from "./pagination.vue";
import PaginationObj from "../../pojo/PaginationObj";

@Component({
    mixins: [template]
})
export default class Pagination extends Vue {
    @Prop()
    pagination: PaginationObj;

    goToPage(pageNum: number) {
        this.$emit("goToPage", pageNum);
    }

    prePage() {
        this.goToPage(this.pagination.prePage() || 0);
    }

    nextPage() {
        this.goToPage(this.pagination.nextPage() || 0);
    }
}