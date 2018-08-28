/***
 * this menu_link will impacts validate user access to page, if set here will use parents as link to verify, else will use
 * itself; if no met menu which set up in TMS will redirect to login page.
 * @type {{#/schedulePickup/Shipment: {parent: string}; #/schedulePickup/Review: {parent: string}; #/demo: {parent: string}; #/orderReview: {parent: string}; #/myAccount/edit: {parent: string}}}
 */
export const menu_link_obj: any = {
    "#/schedulePickup": {
        "parent": "#/getquote"
    },
    "#/schedulePickup/Shipment": {
        "parent": "#/getquote"
    },
    "#/schedulePickup/Review": {
         "parent": "#/getquote"
    },
    "#/demo": {
        "parent": ""
    },
    "#/demo2": {
        "parent": ""
    },
    "#/orderReview": {
        "parent": ""
    },
    "#/myAccount/edit": {
        "parent": "#/myAccount"
    },
    "#/home": {
        "parent": ""
    },
    "#/myCustomers": {
        "parent": "#/myCustomers"
    },
    "#/getquote": {
        "parent": "#/getquote"
    },
    "#/savedQuote": {
        "parent": "#/savedQuote"
    },
    "#/customerSignup": {
        "parent": "#/customerSignup"
    },
    "#/Track": {
        "parent": "#/Track"
    },
    "#/myAccount": {
        "parent": "#/myAccount"
    },
    "#/addressBook": {
        "parent": "#/addressBook"
    },
    "#/blank": {
        "parent": ""
    }
};