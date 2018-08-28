import dateTimeService from "../services/dateTime/dateTimeService";
export default class Customer {
    constructor() { }
    private _location_name: string;
    private _user_firstname: string;
    private _user_lastname: string;
    private _user_username: string;
    private _location_phone: string;
    private _user_email: string;
    private _user_created_date: string;
    private _location_street: string;
    private _location_street2: string;
    private _location_city: string;
    private _location_state: string;
    private _location_zip: string;

    get location_name(): string {
        return this._location_name;
    }

    set location_name(value: string) {
        this._location_name = value;
    }

    get user_firstname(): string {
        return this._user_firstname;
    }

    set user_firstname(value: string) {
        this._user_firstname = value;
    }

    get user_lastname(): string {
        return this._user_lastname;
    }

    set user_lastname(value: string) {
        this._user_lastname = value;
    }

    get user_username(): string {
        return this._user_username;
    }

    set user_username(value: string) {
        this._user_username = value;
    }

    get location_phone(): string {
        return this._location_phone;
    }

    set location_phone(value: string) {
        this._location_phone = value;
    }

    get user_email(): string {
        return this._user_email;
    }

    set user_email(value: string) {
        this._user_email = value;
    }

    get user_created_date(): string {
        return dateTimeService.formatDateStr(this._user_created_date);
    }

    set user_created_date(value: string) {
        this._user_created_date = value;
    }

    get location_street(): string {
        return this._location_street;
    }

    set location_street(value: string) {
        this._location_street = value;
    }

    get location_street2(): string {
        return this._location_street2;
    }

    set location_street2(value: string) {
        this._location_street2 = value;
    }

    get location_city(): string {
        return this._location_city;
    }

    set location_city(value: string) {
        this._location_city = value;
    }

    get location_state(): string {
        return this._location_state;
    }

    set location_state(value: string) {
        this._location_state = value;
    }

    get location_zip(): string {
        return this._location_zip;
    }

    set location_zip(value: string) {
        this._location_zip = value;
    }

    getShippingAddress() {
        let address: string = this.location_street;
        if (this.location_street2) {
            address += " " + this.location_street2;
        }
        address += ", " + this.location_city + ", " + this.location_state + " " + this.location_zip;
        return address;
    }
}