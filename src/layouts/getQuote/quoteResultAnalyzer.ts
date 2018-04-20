export default class QuoteResultAnalyzer {

    private quoteResult: any;

    private analysis: any = {};

    constructor(_quote: any) {
        this.quoteResult = _quote;
    }


    public analyze() {

        this.analysis.total = this.quoteResult.quote_amount;
        if (!Array.isArray(this.quoteResult.quote_lines)) {
            this.quoteResult.quote_lines = Object.keys(this.quoteResult.quote_lines).map(i => this.quoteResult.quote_lines[i]);
        }
        for (const {items, index} of this.quoteResult.quote_lines.map((items: any, index: any) => ({ items, index }))) {
            for (const item of items.lines) {
                if (item.rate_type == "CHARGE-BASE") { // base charge
                    this.analysis['baseCharge'] = item;
                }
                else if (item.rate_type == "CHARGE-FSC") { // fuel charge
                    this.analysis[`fuelCharge`] = item;
                }
                else if (item.rate_type == "CHARGE-ACC") { // accessorial charge
                    switch (item.tms_acc_name_code) {
                        case "CAsurcharge":
                            this.analysis[`CAsurcharge`] = item;
                            break;
                        case "DL":
                            this.analysis[`DL`] = item;
                            break;
                        case "PL":
                            this.analysis[`PL`] = item;
                            break;
                        case "LIMIT":
                            this.analysis[`LIMIT`] = item;
                            break;
                        case "LIMITD":
                            this.analysis[`LIMITD`] = item;
                            break;
                        case "PJP":
                            this.analysis[`PJP`] = item;
                            break;
                        case "PJD":
                            this.analysis[`PJD`] = item;
                            break;
                        case "CON":
                            this.analysis[`CON`] = item;
                            break;
                        case "COND":
                            this.analysis[`COND`] = item;
                            break;
                        case "RES":
                            this.analysis[`RES`] = item;
                            break;
                        case "RESD":
                            this.analysis[`RESD`] = item;
                        case "SHOW":
                            this.analysis[`SHOW`] = item;
                            break;
                        case "SHOWD":
                            this.analysis[`SHOWD`] = item;
                    }
                }
            }
        }
    }


    public mapEstimate(input: any) {
         // map estimate quote amount with result
        let result = this.analysis;

         input.total = result.total || 0;
         input.palletSpaceCharge = result.baseCharge && result.baseCharge.rate_amount_total;
         input.palletSpaceChargeText = result.baseCharge && result.baseCharge.rate_external_text;
         input.complianceCharge = result.CAsurcharge && result.CAsurcharge.rate_amount_total;
         input.fuelCharge = result.fuelCharge && result.fuelCharge.rate_amount_total;
         input.fuelChargeText = result.fuelCharge && result.fuelCharge.rate_external_text;
         input.pickup.liftGate = result.PL && result.PL.rate_amount_total;
         input.pickup.limitedAccess = result.LIMIT && result.LIMIT.rate_amount_total;
         input.pickup.palletJack = result.PJP && result.PJP.rate_amount_total;
         input.pickup.constructionSite = result.CON && result.CON.rate_amount_total;
         input.pickup.conventionCenter = result.SHOW && result.SHOW.rate_amount_total;
         input.pickup.residential = result.RES && result.RES.rate_amount_total;
         input.delivery.liftGate = result.DL && result.DL.rate_amount_total;
         input.delivery.limitedAccess = result.LIMITD && result.LIMITD.rate_amount_total;
         input.delivery.palletJack = result.PJD && result.PJD.rate_amount_total;
         input.delivery.constructionSite = result.COND && result.COND.rate_amount_total;
         input.delivery.conventionCenter = result.SHOWD && result.SHOWD.rate_amount_total;
         input.delivery.residential = result.RESD && result.RESD.rate_amount_total;
    }


}