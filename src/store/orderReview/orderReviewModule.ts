import orderReview from "./state";
import axiosService from "../../services/axios/axiosService";
import qs from "qs";
import dateTimeService from "../../services/dateTime/dateTimeService";
import QuoteResultAnalyzer from "../../layouts/getQuote/quoteResultAnalyzer";
import commonUtilService from "../../services/commonUtil/commonUtilService";
const state = {
    orderReview
};
const mutations = {
      updateOrderReviewDocumentsSection(state: any, documents: any) {
          state.orderReview.orderReview.documents = [...documents];
      },
      updateOrderReviewExceptDocumentsSection(state: any, orderReview: any) {
          state.orderReview.orderReview.pickup = orderReview.pickup;
          state.orderReview.orderReview.delivery = orderReview.delivery;
          state.orderReview.orderReview.carry = orderReview.carry;
          state.orderReview.quoteId = orderReview.quoteId;
      },
      resetOrderReview(state: any) {
          state.orderReview.orderReview = state.orderReview.createEmptyOrderReview();
      },
};

async function getShippingLabelPic(formData: any) {
    return await axiosService.post("write/write_tms_pdf_shipping_label.php", qs.stringify({order_id: formData.order, user_id: localStorage.getItem("UserID")})).catch(err => {
         console.log("get order review shipping label picture error:");
         console.log(err);
     });
}

async function getDocumentFilesExceptShippingLabel(formData: any) {
    return await axiosService.post("write/get_order_detail_document.php", qs.stringify({order_group_id: formData.pu, order_id: formData.order})).catch(err => {
         console.log("get order review documents error:");
         console.log(err);
     });
}


async function updateOrderReviewExceptDocuments(store: any, formData: any) {
     return await axiosService.post("write/get_order_detail.php", qs.stringify({order_group_id: formData.pu, order_id: formData.order})).then(function(rst) {
         if (rst && rst["status"] === 200) {
             store.commit("resetQuote");
             store.commit("resetEstimate");
             store.commit('updateOrderReviewExceptDocumentsSection', createOrderReview(rst["data"]));
             updateEstimate(store, rst["data"] );
         } else {
             console.log(rst);
             throw new Error('get order detail error!');
         }
     }).catch(err => {
         console.log("get order review error:");
         console.log(err);
         let messageModel = {};
         messageModel["isShowMessageModel"] = true;
         messageModel["messageModelTitle"] = "Fail";
         messageModel["messageModelMessage"] = "get Order details error!";
         messageModel["titleColor"] = "red";
         store.dispatch("updateMessageModel", messageModel);
     });
}


async function updateDocumentsSection(store: any, request: any) {
    try {
        let [shippingLabel, documentFiles] = await Promise.all([getShippingLabelPic(request), getDocumentFilesExceptShippingLabel(request)]);
        let shippingLabelFile = {};
        if (shippingLabel && shippingLabel.status === 200 && shippingLabel["data"] &&  shippingLabel["data"].length > 0) {
            shippingLabelFile["file_category_name"] = "Shipping Label";
            Object.assign(shippingLabelFile, ...shippingLabel["data"]);
        }
        let documentFilesTemp: Array <any> = [];
        if (documentFiles && documentFiles.status === 200 &&  documentFiles["data"] &&  documentFiles["data"].length > 0) {
            documentFiles["data"].forEach((element: any) => {
                let ele = {"file_category_name": element["file_category_name"], "file_thumbnail_url": element["file_thumbnail_url"], "file_original_url": element["file_original_url"]};
                documentFilesTemp.push(ele);
            });
        }
        store.commit('updateOrderReviewDocumentsSection', [...documentFilesTemp, shippingLabelFile]);
    } catch (exception) {
        console.log("update order review documents section error:");
        console.log(exception);
        let messageModel = {};
        messageModel["isShowMessageModel"] = true;
        messageModel["messageModelTitle"] = "Fail";
        messageModel["messageModelMessage"] = "get Order documents error!";
        messageModel["titleColor"] = "red";
        store.dispatch("updateMessageModel", messageModel);
        let documentFilesError: Array <any> = [];
        store.commit('updateOrderReviewDocumentsSection', documentFilesError);
    }
}

function updateEstimate(store: any , orderReviewContent: any) {
    let quoteData = store.getters.quoteData;
    let quote_lines = orderReviewContent["quote_lines"];

    if (quote_lines && commonUtilService.isArray(quote_lines)) {
        let quote_amount = 0;
        let palletSpaces = 0;
        // calculate total and pallet spaces
        quote_lines.forEach((vaule: any) => {
            quote_amount += parseFloat(vaule.rate_amount_total);
            if (vaule.rate_type == "CHARGE-BASE") { // base charge
                palletSpaces = vaule.tms_quote_lines_qty;
            }
        });

        let estimate = {
            quote_amount: quote_amount.toFixed(2),
            quote_lines: [
                {lines: quote_lines}
            ]
       };
       let analyzer = new QuoteResultAnalyzer(estimate);
       analyzer.analyze();
       analyzer.mapEstimate(quoteData.estimate);
       quoteData.estimate['quoteId'] = orderReviewContent['quote_id'];
       quoteData.estimate['palletSpaces'] = palletSpaces;
       store.dispatch("updateEstimate", quoteData.estimate);
    }
}
function createOrderReview(orderReviewContent: any) {
         let orderViewTemp = orderReview.createEmptyOrderReview();

         orderViewTemp.referenceNumber = "";

         orderViewTemp.pickup.locationType = 1;

         orderViewTemp.pickup.liftGate = false;
         orderViewTemp.pickup.limitedAccess = false;
         orderViewTemp.pickup.palletJack = false;

         if (orderReviewContent && orderReviewContent["orderInfo"]) {
             orderViewTemp.pickup.pickupDate = dateTimeService.formatDateStr(orderReviewContent.orderInfo.pickup);
             orderViewTemp.proNumber = orderReviewContent.orderInfo.pro;
             orderViewTemp.pickup.shipper = orderReviewContent.orderInfo.shipper;
             orderViewTemp.pickup.zipCode = orderReviewContent.orderInfo.tms_order_pickup_zip;
             orderViewTemp.pickup.city = orderReviewContent.orderInfo.tms_order_pickup_city;
             orderViewTemp.pickup.state = orderReviewContent.orderInfo.tms_order_pickup_state;
             orderViewTemp.pickup.street = orderReviewContent.orderInfo.tms_order_pickup_street;
             orderViewTemp.pickup.street2 = orderReviewContent.orderInfo.shipper_street2;
             orderViewTemp.delivery.consignee = orderReviewContent.orderInfo.consignee;
             orderViewTemp.delivery.zipCode = orderReviewContent.orderInfo.tms_order_delivery_zip;
             orderViewTemp.delivery.city = orderReviewContent.orderInfo.tms_order_delivery_city;
             orderViewTemp.delivery.state = orderReviewContent.orderInfo.tms_order_delivery_state;
             orderViewTemp.delivery.street = orderReviewContent.orderInfo.tms_order_delivery_street;
             orderViewTemp.delivery.street2 = orderReviewContent.orderInfo.develivery_street2;
             orderViewTemp.carry.totalWeight = orderReviewContent.orderInfo.lbs;
             orderViewTemp.carry.totalPallets = orderReviewContent.orderInfo.pts;
             orderViewTemp.pickup.pickupStr = dateTimeService.createTimeStr(orderReviewContent.orderInfo.pick_up_time_from, orderReviewContent.orderInfo.pick_up_time_to);
         }

         orderViewTemp.delivery.locationType = 1;

         orderViewTemp.delivery.liftGate = false;
         orderViewTemp.delivery.limitedAccess = false;
         orderViewTemp.delivery.palletJack = false;
         orderViewTemp.quoteId = orderReviewContent.quote_id;
         let pallets: Array<any> = [];
         if (orderReviewContent["pallets"] && orderReviewContent["pallets"].length > 0) {
             orderReviewContent["pallets"].forEach((pallet: any) => {
                 let palletType = 1;

                 let pallet_temp = {
                     palletType: palletType,
                     width: pallet.width,
                     length: pallet.length,
                     height: pallet.height,
                     quantity: pallet.tms_manifest_pallet,
                     totalWeight: pallet.tms_manifest_weight,
                     palletClass: (pallet.tms_manifest_class === "0" ? "FAK" : pallet.tms_manifest_class),
                     stackable: false,
                     palletSpace: pallet.tms_manifest_spaces,
                     isHazardous: false,
                     description: pallet.tms_manifest_desc,
                     tms_manifest_id: pallet.tms_manifest_id,
                  };
                  let manifest = null;
                 try {
                     manifest = JSON.parse(pallet.tms_manifest_desc);
                 } catch (error) {

                 }

               if (manifest) {
                   pallet_temp.palletType = manifest.palletType;
                   pallet_temp.width = manifest.width;
                   pallet_temp.length = manifest.length;
                   pallet_temp.height = manifest.height;
                   pallet_temp.description = manifest.description;
                   pallet_temp.stackable = manifest.isStackable;
               }
                 if (pallet.tms_manifest_cust_ref) {
                     orderViewTemp.referenceNumber = pallet.tms_manifest_cust_ref;
                 }
                 let code = pallet.shipment_code;
                 if (code == "PL") {
                     orderViewTemp.pickup.liftGate = true;
                 }
                 else if (code == "LIMIT") {
                     orderViewTemp.pickup.limitedAccess = true;
                 }
                 else if (code == "PJP") {
                     orderViewTemp.pickup.palletJack = true;
                 }
                 else if (code == "DL") {
                     orderViewTemp.delivery.liftGate = true;
                 }
                 else if (code == "LIMITD") {
                     orderViewTemp.delivery.limitedAccess = true;
                 }
                 else if (code == "PJD") {
                     orderViewTemp.delivery.palletJack = true;
                 }
                 else if (code == "CON") {
                     orderViewTemp.pickup.locationType = 2; // need to fix, and make dynamic later
                 }
                 else if (code == "COND") {
                     orderViewTemp.delivery.locationType = 2; // need to fix, and make dynamic later
                 }
                 else if (code == "SHOW") {
                     orderViewTemp.pickup.locationType = 3; // need to fix, and make dynamic later
                 }
                 else if (code == "SHOWD") {
                     orderViewTemp.delivery.locationType = 3; // need to fix, and make dynamic later
                 }
                 else if (code == "RES") {
                     orderViewTemp.pickup.locationType = 5; // need to fix, and make dynamic later
                 }
                 else if (code == "RESD") {
                     orderViewTemp.delivery.locationType = 5; // need to fix, and make dynamic later
                 }

                  pallets.push(pallet_temp);
             } );
         }
         orderViewTemp.pickup.locationTypeText = orderReview.getLocationTypeText(orderViewTemp.pickup.locationType);
         orderViewTemp.delivery.locationTypeText = orderReview.getLocationTypeText(orderViewTemp.delivery.locationType);
         orderViewTemp.carry.pallets = [...pallets];

         orderViewTemp.carry.palletSpaces = orderReview.getPalletsSpaces(orderViewTemp.carry.pallets);
         return orderViewTemp;
}

const actions = {
    async  updateOrderReview(store: any, formData: any) {
          store.commit('resetOrderReview');
          if (formData && formData.pu && formData.order > 0) {
              Promise.all([updateOrderReviewExceptDocuments(store, formData), updateDocumentsSection(store, formData)]);
          }
      }
};

const getters = {
    orderReview() {
        return state.orderReview.orderReview;
    }
};

const orderReviewModule = {
    state,
    mutations,
    actions,
    getters
};

export default orderReviewModule;