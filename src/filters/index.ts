import Vue from "vue";
import moment from "moment";


export default function init() {

    Vue.filter('date_MDY_Slash', (value: string) => {
        if (!value) return '';
        return moment(String(value)).format('MM/DD/YYYY');
    });

    Vue.filter('date_MDY_Hyphen', (value: string) => {
        if (!value) return '';
        return moment(String(value)).format('MM-DD-YYYY');
    });

    Vue.filter('date_MDYT_Slash', (value: string) => {
        if (!value) return '';
        return moment(String(value)).format('MM/DD/YYYY HH:MM:SS');
    });

    Vue.filter('capitalizeEach', (value: string) => {
        if (!value) return '';
        return value.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    });

    Vue.filter('capitalizeFileName', (value: string) => {
        if (!value) return '';
        if (value.toLowerCase() == 'pod' || value.toLowerCase() == 'bol' || value.toLowerCase() == 'pbol' || value.toLowerCase() == 'ppod') {
           return value.toUpperCase();
        }

        return value.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    });

    Vue.filter('capitalize', (value: string) => {
        if (!value) return '';
        return value.charAt(0).toUpperCase() + value.slice(1).toLocaleLowerCase();
    });

    Vue.filter('lowercase', (value: string) => {
        if (!value) return '';
        return value.toLocaleLowerCase();
    });

    Vue.filter('uppercase', (value: string) => {
        if (!value) return '';
        return value.toUpperCase();
    });

    Vue.filter('dollar', (value: string | number) => {
        let num = 0;
        let type = typeof value;
        if (type != "string" && type != "number") {
            return "";
        }
        if (typeof value == "string") {
            num = parseFloat(value);
            if (isNaN(num)) {
                return "";
            }
        }
        else if (typeof value == "number") {
            num = value;
        }
        let money = num.toFixed(2);
        return `$${money}`;
    });

    Vue.filter('weight', (value: string | number) => {
        let num = 0;
        let type = typeof value;
        if (type != "string" && type != "number") {
            return "";
        }
        if (typeof value == "string") {
            num = parseFloat(value);
            if (isNaN(num)) {
                return "";
            }
        }
        else if (typeof value == "number") {
            num = value;
        }
        let weight = num.toFixed(2);
        return weight + ' lbs';
    });

}

