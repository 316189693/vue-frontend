import moment from "moment";

/**
 * params: time_from:string   "hh:ss:mm" "13:33:30"
 *         time_to:string     "hh:ss:mm" "23:59:50"
 *result: string  "13:33(1:33 PM) to 23:59(11:59 PM)"
 * error: if error, then return "{time_from} to {time_to}"
 */
function createTimeStr(time_from: string, time_to: string) {
  if ((!time_from && !time_to) || (time_from === "0" && time_to === "0")) {
    return "";
  }

  return formatTimeStr(time_from) + " to " + formatTimeStr(time_to);
}

/**
 * params: timeStr: string   "hh:ss:mm" "13:33:30"
 * result: string  "13:33(1:33 PM)"
 */
function formatTimeStr(timeStr: string) {
  if (!timeStr || timeStr === "0") {
    return "";
  }
  let moment_temp = moment("2018-03-20 " + timeStr, "YYYY-MM-DD HH:mm:ss");
  if (moment_temp.isValid()) {
    return moment_temp.format("HH:mm [(]hh:mm A[)]").replace("(12:", "(00:");
  }
  return timeStr;
}

function formatDateStr(dateStr: string) {
  let moment_temp = moment(dateStr, "YYYY-MM-DD");
  if (moment_temp.isValid()) {
    return moment_temp.format("MM/DD/YYYY");
  }
  return dateStr;
}

const dateTimeService: any = {
  createTimeStr,
  formatTimeStr,
  formatDateStr
};
export default dateTimeService;
