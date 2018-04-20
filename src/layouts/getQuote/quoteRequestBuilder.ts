import getQuoteConfig from "../../store/getQuote/config.json";

export default class QuoteRequestBuilder {
  private requestData: Object;

  private accessorialData: any;

  private manifestLines: Array<Object> = [];

  private quoteData: any;

  constructor(_quoteData: any, _acc: any) {
    this.quoteData = _quoteData;
    this.accessorialData = _acc;
  }

  public getRequestData() {
    this.fillManifest();
    this.fillAccesorial();
    let date_now = new Date();
    let date_month = date_now.getMonth() + 1;
    let date_day = date_now.getDate();
    let date_year = date_now.getFullYear();
    let dd: string = "";
    let mm: string = "";

    if (date_day < 10) {
      dd = "0" + date_day;
    }
    else {
      dd = date_day.toString();
    }
    if (date_month < 10) {
      mm = "0" + date_month;
    }
    else {
      mm = date_month.toString();
    }

    let requestData = {
      UserID: localStorage.getItem("UserID"),
      UserToken: localStorage.getItem("UserToken"),
      input_batch: 0,
      input_billing_party: "1",
      input_billto_id: this.quoteData.billto_id,
      input_consignee_city: this.quoteData.delivery.city,
      input_consignee_contact: "",
      input_consignee_id: "",
      input_consignee_name: "",
      input_consignee_phone: "",
      input_consignee_state: this.quoteData.delivery.state,
      input_consignee_street: "",
      input_consignee_warehouse: null,
      input_consignee_zip: this.quoteData.delivery.zipCode,
      input_debug: 0,
      input_dray_manifest_id: 0,
      input_drayage_port: "0",
      input_equipment_type: "0",
      input_internal_notes: "",
      input_mastertariff_id: "0",
      input_notes: "",
      input_quote_expiration_date: "2018-04-02",
      input_quote_id: this.quoteData.quoteId,
      input_savequote: 1,
      input_shipby: 0,
      input_shipment_date: date_year + "-" + mm + "-" + dd,
      input_shipment_id: "0",
      input_shipper_city: this.quoteData.pickup.city,
      input_shipper_contact: "",
      input_shipper_id: this.quoteData.shipper_id,
      input_shipper_name: "",
      input_shipper_phone: "",
      input_shipper_state: this.quoteData.pickup.state,
      input_shipper_street: "",
      input_shipper_warehouse: null,
      input_shipper_zip: this.quoteData.pickup.zipCode,
      input_single: 1,
      input_trip_id: "0",
      input_value: "",
      manifest_lines: this.manifestLines
    };

    return requestData;
  }

  private fillManifest() {
    for (const item of this.quoteData.pallets) {
      let content = {
        description: item.description,
        palletType: item.palletType,
        width: item.width,
        length: item.length,
        height: item.height,
        isStackable: item.stackable
      };

      let line = {
        manifest_carton: item.quantity,
        manifest_class: item.palletClass,
        manifest_code: "",
        manifest_code_id: 0,
        manifest_content: JSON.stringify(content),
        manifest_line_id: 2,
        manifest_linear: "",
        manifest_pallet: item.quantity,
        manifest_space: item.palletSpace,
        manifest_value: "",
        manifest_volume: item.width * item.length * item.height,
        manifest_weight: item.totalWeight
      };

      this.manifestLines.push(line);
    }
  }

  private fillAccesorial() {
    let config = this.getAccessorialConfig();

    // residential
    if (this.quoteData.pickup.locationType == this.locationType("RES") && config["RES"]) {
      this.fillAccessorialLine(config["RES"]);
    }

    // construction site
    if (this.quoteData.pickup.locationType == this.locationType("CON") && config["CON"]) {
      this.fillAccessorialLine(config["CON"]);
    }

    // convention center
    if (this.quoteData.pickup.locationType == this.locationType("SHOW") && config["SHOW"]) {
      this.fillAccessorialLine(config["SHOW"]);
    }

    if (this.quoteData.pickup.liftGate && config["PL"]) {
      this.fillAccessorialLine(config["PL"]);
    }

    if (this.quoteData.pickup.limitedAccess && config["LIMIT"]) {
      this.fillAccessorialLine(config["LIMIT"]);
    }

    if (this.quoteData.pickup.palletJack && config["PJP"]) {
      this.fillAccessorialLine(config["PJP"]);
    }

    // delivery

    if (this.quoteData.delivery.liftGate && config["DL"]) {
      this.fillAccessorialLine(config["DL"]);
    }

    if (this.quoteData.delivery.limitedAccess && config["LIMITD"]) {
      this.fillAccessorialLine(config["LIMITD"]);
    }

    if (this.quoteData.delivery.palletJack && config["PJD"]) {
      this.fillAccessorialLine(config["PJD"]);
    }

    // residential
    if (this.quoteData.delivery.locationType == this.locationType("RES") && config["RESD"]) {
      this.fillAccessorialLine(config["RESD"]);
    }

    // construction site
    if (this.quoteData.delivery.locationType == this.locationType("CON") && config["COND"]) {
      this.fillAccessorialLine(config["COND"]);
    }

    // convention center
    if (this.quoteData.delivery.locationType == this.locationType("SHOW") && config["SHOWD"]) {
      this.fillAccessorialLine(config["SHOWD"]);
    }
  }

  private locationType(code: string) {
    // get the key of the location type
    for (const item of getQuoteConfig.locationTypeOptions) {
      if (code == item.code) {
        return item.key;
      }
    }
  }

  private getAccessorialConfig() {
    // add the accessorial code "tms_acc_name_code" here
    let accArray = [
      "RES",
      "RESD",
      "PL",
      "DL",
      "LIMIT",
      "LIMITD",
      "CON",
      "COND",
      "SHOW",
      "SHOWD",
      "PJP",
      "PJD"
    ];

    let config = {};

    // map out the required accessorial code from the data from TMS
    for (const item of this.accessorialData) {
      for (const acc of accArray) {
        if (item.tms_acc_name_code == acc) {
          config[`${acc}`] = item;
          break;
        }
      }
    }

    return config;
  }

  private fillAccessorialLine(data: any) {
    let line = {
      manifest_carton: "",
      manifest_class: "",
      manifest_code: data.tms_acc_name_code,
      manifest_code_id: data.tms_acc_name_id,
      manifest_content: data.tms_acc_name_name,
      manifest_line_id: "",
      manifest_linear: "",
      manifest_pallet: "",
      manifest_space: "",
      manifest_value: "",
      manifest_volume: "",
      manifest_weight: ""
    };

    this.manifestLines.push(line);
  }
}
