import orderReview from "./state";
import axiosService from '../../services/axios/axiosService';
import qs from "qs";

const state = {
    orderReview
}
const mutations = {
      updateOrderReview(state:any, formData:any) {
          state.orderReview.documents = formData;
      }
}

const actions = {
      updateOrderReview(store:any, formData:any) {
          if (formData && formData.pu && formData.order > 0) {
              axiosService.post("write/get_tms_files.php", qs.stringify({order_group_id:formData.pu,order_id: formData.order})).then(function(res:any) {
                  var data = res.data;
                  if(String(data) === '-9999' || data == 0 || data == null) {
                      alert("you have no access");
                      return ;
                  }
                   store.commit('updateOrderReview', data);
              }).catch((error:any)=>{
                  console.log("get order details error!"+error);
              });
          }
      }
}

const getters = {
    orderDetails(){
        return state.orderReview;
    }
}

const orderReviewModule = {
    state,
    mutations,
    actions,
    getters
}

export default orderReviewModule;