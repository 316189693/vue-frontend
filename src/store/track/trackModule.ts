import track from "./state";
import axiosService from "../../services/axios/axiosService";
import qs from "qs";

// state object
const state = {
    track
};


// mutations are operations that actually mutates the state.
const mutations = {
    updateTrackData(state: any, res: any) {
        if (res == -1 || res == 0) {
            state.track.trackData.multiOrder = false;
            state.track.trackData.showMultiOrder = false;
            state.track.trackData.showTrack = false;
            // state.track.trackData.showTerms = false;
            state.track.trackData.showNotFound = true;
            state.track.trackData.status = "";
            state.track.trackData.originDate = "";
            state.track.trackData.originLocation = "";
            state.track.trackData.destinationDate = "";
            state.track.trackData.destinationLocation = "";
            state.track.trackData.details = {};
        } else {
            state.track.trackData.showTrack = true;
            // state.track.trackData.showTerms = true;
            state.track.trackData.showNotFound = false;
            state.track.trackData.multiOrder = false;
            state.track.trackData.showMultiOrder = false;
            state.track.trackData.status = "";
            state.track.trackData.originDate = "";
            state.track.trackData.originLocation = "";
            state.track.trackData.destinationDate = "";
            state.track.trackData.destinationLocation = "";
            state.track.trackData.details = {};
            let orders = res.orders;
            if (orders) {
              if (orders.length == 1) {
                let order = orders[0];
                let trackData = getOrderData(order);
                state.track.trackData.pro = trackData.pro;
                state.track.trackData.deliveryDate = trackData.deliveryDate;
                state.track.trackData.ref = trackData.ref;
                state.track.trackData.pallet = trackData.pallet;
                state.track.trackData.status = trackData.status;
                state.track.trackData.originDate = trackData.originDate;
                state.track.trackData.originLocation = trackData.originLocation;
                state.track.trackData.destinationDate = trackData.destinationDate;
                state.track.trackData.destinationLocation = trackData.destinationLocation;
                state.track.trackData.details = trackData.details;
              } else if (orders.length > 1) {
                let ordersData = [];
                for (let i = 0; i < orders.length; i++) {
                  let order = orders[i];
                  let trackData = getOrderData(order);
                  ordersData[i] = trackData;
                }
                state.track.trackData.orders = ordersData;
                // state.track.trackData.multiOrder = true;
                state.track.trackData.showMultiOrder = true;
                state.track.trackData.showTrack = false;
              }
            } else {
              let trackData = getOrderData(res);
              state.track.trackData.multiOrder = trackData.multiOrder;
              state.track.trackData.pro = trackData.pro;
              state.track.trackData.deliveryDate = trackData.deliveryDate;
              state.track.trackData.ref = trackData.ref;
              state.track.trackData.pallet = trackData.pallet;
              state.track.trackData.status = trackData.status;
              state.track.trackData.originDate = trackData.originDate;
              state.track.trackData.originLocation = trackData.originLocation;
              state.track.trackData.destinationDate = trackData.destinationDate;
              state.track.trackData.destinationLocation = trackData.destinationLocation;
              state.track.trackData.details = trackData.details;
            }
        }
    }
};

function getOrderData(order: any) {
  let trackData = order;
  let originDate = formateDate(order.p_date);
  let originLocation = formateLocation(order.pickup_city, order.pickup_state);
  let destinationDate = order.d_date ? formateDate(order.d_date) : "";
  let destinationLocation = formateLocation(order.delivery_city, order.delivery_state);
  trackData.originDate = originDate;
  trackData.originLocation = originLocation;
  trackData.destinationDate = destinationDate;
  trackData.destinationLocation = destinationLocation;
  if (order["count"] && order["count"] > 1) {
    trackData.multiOrder = true;
  } else {
    trackData.multiOrder = false;
  }
  trackData.pro = order.pro;
  trackData.deliveryDate = order.d_date2;
  if (order.manifest_ref) {
    trackData.ref = order.manifest_ref;
  }
  if (order.manifest_pallet) {
    trackData.pallet = order.manifest_pallet;
  }

  let histories = order.history;
  let details = {};

  for (let index = 0; index < histories.length; index++) {
    let h = histories[index];
    let date: Date = new Date(h.c_date);
    let stage = h.tms_order_log_stage;
    let formatedDate = formateHistoryDate(h.c_date);
    let formatedTime = formateHistoryTime(h.c_date);
    let location = "";
    let logText = h.tms_order_log_text || "";
    if (logText == "order check-in") {
      switch (stage) {
        case "0":
          logText = "Picked Up";
          location = originLocation;
          break;
        case "2":
        case "3":
        case "4":
          logText = "Delivered";
          location = destinationLocation;
          break;
      }
    } else if ((logText == "order updated") || (logText == "Delivery Apt - Order Appt. Update")) {
      logText = "Picked Up";
    }

    let statusCode = h.tms_order_log_status_code || "";
    let seperator = logText && statusCode ? " - " : "";
    let detail = {
      formatedTime: formatedTime,
      status: statusCode + seperator + logText,
      location: location
    };

    if (details[formatedDate]) {
      details[formatedDate].push(detail);
    } else {
      details[formatedDate] = [detail];
    }
  }
  trackData.details = details;

  return trackData;
}

function capitalize(str: string) {
    return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : "";
}

function formateLocation(city: string, state: string) {
    return (city && state) ? capitalize(city) + ", " + state : "";
}

function formateTrackTableTime(timeStr: string) {
    if (!timeStr) return "";
    let timeFormat = {
        hour: "2-digit",
        minute: "2-digit"
    };
    return new Date(timeStr).toLocaleTimeString("en-US", timeFormat);
}

function formateTrackTableDate(dateStr: string) {
    if (!dateStr) return "";
    let dateFormat = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    return new Date(dateStr).toLocaleDateString("en-US", dateFormat);
}

function formateDate(dateStr: string) {
    if (!dateStr) return "";
    let dateFormat = {
        weekday: "short",
        month: "short",
        day: "numeric",
    };
    return new Date(dateStr).toLocaleDateString("en-US", dateFormat);
}

function formateHistoryTime(timeStr: string) {
    if (!timeStr) return "";
    let timeFormat = {
        hour: "2-digit",
        minute: "2-digit"
    };
    return new Date(timeStr).toLocaleTimeString("en-US", timeFormat);
}

function formateHistoryDate(dateStr: string) {
    if (!dateStr) return "";
    let dateFormat = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };
    return new Date(dateStr).toLocaleDateString("en-US", dateFormat);
}

// use actions to commit mutations
const actions = {
    searchTrack(store: any, proNumber: number) {
        axiosService.post("write/get_history_v2.php", qs.stringify({ pro: proNumber, search_ref: true })).then(function (response) {
            store.commit("updateTrackData", response.data);
        }).catch(function (error) {
            console.log(error);
        });
    }
};

const getters = {

    searchTrack(state: any) {
        return state.track.searchByProNumber;
    },

    trackData(state: any) {
        return state.track.trackData;
    }

};


const trackModule = {
    state,
    mutations,
    actions,
    getters
};

export default trackModule;
