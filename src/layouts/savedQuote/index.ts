import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import tmsService from "../../services/axios/tmsService";
import qs from "qs";

// Components
import template from "./savedQuote.vue";


@Component({
    mixins: [template],
    components: {
    }
})
export default class SavedQuote extends Vue {


    mounted() {

    }

    getQuote() {
        let url1 = "write/get_tms_quote_line_test.php";


        let json3 = {
            input_search_quote_id: null,
            input_search_date_from: "2018-03-12",
            input_search_date_to: "2018-03-13",
            billto_id: 0,
            input_search_shipper_state: "CA",
            input_search_shipper_zip: null,
            input_search_consignee_state: "CA",
            input_search_consignee_zip: null,
            input_search_status: 0,
            input_search_limit: 50,
            quote: 1,
            UserID: 8437,
            UserToken: "dzmGqD08J1",
            pageName: "dashboardQuote",
        };

        tmsService.post(url1, qs.stringify(json3)).then((res) => {
            console.log(res);
        }).catch(error => {
            console.log(error);
        });
    }

    goTo() {
        window.location.href = "#/getquote?quoteNumber=12";
    }
}