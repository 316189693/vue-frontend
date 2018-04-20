export default class QuoteRequestBuilder {

    private quoteResult: any;

    constructor(data: any) {
        this.quoteResult = data;
    }


    public fillResult(input: any) {

        let pickup = input.pickup;
        let delivery = input.delivery;
        let estimate = input.estimate;

        pickup.city = this.quoteResult.tms_quote_client_city;
        pickup.zipCode = this.quoteResult.tms_quote_client_zip;
        pickup.state = this.quoteResult.tms_quote_client_state;

        delivery.city = this.quoteResult.tms_quote_consignee_city;
        delivery.zipCode = this.quoteResult.tms_quote_consignee_zip;
        delivery.state = this.quoteResult.tms_quote_consignee_state;

        estimate.total = this.quoteResult.total_amount;

        // input.pallets = [];


        // fill options
        for (let item of this.quoteResult.m_lines) {
            let code = item.shipment_code;

            if (code == null) {
                let manifest = JSON.parse(item.shipment_content);

                let pallet = input.getPallet();

                pallet.totalWeight = item.shipment_weight;
                pallet.quantity = item.shipment_pallet;
                pallet.palletClass = item.shipment_class;
                pallet.palletSpace = item.shipment_space;
                pallet.palletType = manifest.palletType;
                setTimeout(() => {
                    pallet.width = manifest.width;
                    pallet.length = manifest.length;
                }, 200);
                pallet.height = manifest.height;
                pallet.description = manifest.description;

                pallet.stackable = manifest.isStackable;

                input.pallets.push(pallet);
            }
            else if (code == "PL") {
                pickup.liftGate = true;
            }
            else if (code == "LIMIT") {
                pickup.limitedAccess = true;
            }
            else if (code == "PJP") {
                pickup.palletJack = true;
            }
            else if (code == "DL") {
                delivery.liftGate = true;
            }
            else if (code == "LIMITD") {
                delivery.limitedAccess = true;
            }
            else if (code == "PJD") {
                delivery.palletJack = true;
            }
            else if (code == "CON") {
                pickup.locationType = 2; // need to fix, and make dynamic later
            }
            else if (code == "COND") {
                delivery.locationType = 2; // need to fix, and make dynamic later
            }
            else if (code == "SHOW") {
                pickup.locationType = 3; // need to fix, and make dynamic later
            }
            else if (code == "SHOWD") {
                delivery.locationType = 3; // need to fix, and make dynamic later
            }
            else if (code == "RES") {
                pickup.locationType = 5; // need to fix, and make dynamic later
            }
            else if (code == "RESD") {
                delivery.locationType = 5; // need to fix, and make dynamic later
            }
        }


        for (const item of this.quoteResult.lines) {
            let type = item.rate_type;
            let amount = item.rate_amount_total;
            let text = item.rate_external_text;


            if (type == "CHARGE-BASE") {
                estimate.palletSpaceCharge = amount;
                estimate.palletSpaceChargeText = text;
            }
            else if (type == "CHARGE-FSC") {
                estimate.fuelCharge = amount;
                estimate.fuelChargeText = text;
            }
            else if (type == "CHARGE-ACC") {
                switch (item.shipment_code) {
                    case "CAsurcharge":
                        estimate.complianceCharge = amount;
                        break;
                    case "PL":
                        estimate.pickup.liftGate = amount;
                        break;
                    case "DL":
                        estimate.delivery.liftGate = amount;
                        break;
                    case "LIMIT":
                        estimate.pickup.limitedAccess = amount;
                        break;
                    case "LIMITD":
                        estimate.delivery.limitedAccess = amount;
                        break;
                    case "PJP":
                        estimate.pickup.palletJack = amount;
                        break;
                    case "PJD":
                        estimate.delivery.palletJack = amount;
                        break;
                    case "CON":
                        estimate.pickup.constructionSite = amount;
                        break;
                    case "COND":
                        estimate.delivery.constructionSite = amount;
                        break;
                    case "SHOW":
                        estimate.pickup.conventionCenter = amount;
                        break;
                    case "SHOWD":
                        estimate.delivery.conventionCenter = amount;
                        break;
                    case "RES":
                        estimate.pickup.residential = amount;
                        break;
                    case "RESD":
                        estimate.delivery.residential = amount;
                        break;
                }
            }
        }
    }





}