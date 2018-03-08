import { Validator } from "vee-validate";


export default function init() {


    // Validator.extend('verify_coupon', { //filter name
    //     getMessage: (field: any) => `The ${field} is not a valid coupon.`, // customized message
    //     validate: (value: any) => new Promise((resolve) => {
    //         // API call or database access.
    //         const validCoupons = ['SUMMER2016', 'WINTER2016', 'FALL2016'];

    //         setTimeout(() => {
    //             resolve({
    //                 valid: value && validCoupons.indexOf(value.toUpperCase()) !== -1
    //             });
    //         }, 500);
    //     })
    // });



    // // test rule
    // Validator.extend('alwaysFalse', {
    //     getMessage: (field: any) => `${field} always false`,
    //     validate: (value: any) => { return { valid: false } }
    // });

}
