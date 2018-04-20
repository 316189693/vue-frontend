export default class GoogleAutoComplete {

    private elementId: string;

    private componentForm = {
        street_number: "long_name",
        route: "long_name",
        locality: "long_name", // city
        administrative_area_level_1: "long_name", // state
        country: "long_name",
        postal_code: "long_name"
    };

    private options = {
        types: ["(regions)"],
        componentRestrictions: { country: ["us"] }
    };

    private autoComplete: any;

    constructor(el_id: string) {
        this.elementId = el_id;

        let input = document.getElementById(this.elementId) as HTMLInputElement;

        this.autoComplete = new google.maps.places.Autocomplete(input, this.options);

    }

    setAllShortName() {
        this.componentForm = {
            street_number: "short_name",
            route: "short_name",
            locality: "short_name",
            administrative_area_level_1: "short_name",
            country: "short_name",
            postal_code: "short_name"

        };
    }

    setShortConutryName() {
        this.componentForm.country = "short_name";
    }

    setShortStateName() {
        this.componentForm.administrative_area_level_1 = "short_name";
    }

    searchResult() {



        let result = {
            street_number: null,
            route: null,
            locality: null, // city
            administrative_area_level_1: null, // state
            country: null,
            postal_code: null
        };


        let promise = new Promise((resolve, reject) => {

            this.autoComplete.addListener('place_changed', () => {
                let place = this.autoComplete.getPlace();

                // map response from api to result
                for (let i = 0; i < place.address_components.length; i++) {
                    let addressType = place.address_components[i].types[0];
                    if (this.componentForm[addressType]) {
                        result[addressType] = place.address_components[i][this.componentForm[addressType]];
                    }
                }

                let locationData = {
                    street_number: result.street_number,
                    route: result.route,
                    city: result.locality, // city
                    state: result.administrative_area_level_1, // state
                    country: result.country,
                    postal_code: result.postal_code
                };

                resolve(locationData);

            });

        });


        return promise;
    }

}