<template>
<div id="top_container">
   <div class="second-container" id="login_section">
     <p class="p-text">Login to Client Portal</p>
	 <div class="input-container">
	    <label class ="label-for-input" for="email_input">EMAIL</label>
		<input class="input-class" type="text" id="email_input" @keyup.enter.stop.prevent = "signIn" v-on:change="inputChangeEvent"  name="userName" v-model='formData.userName' v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('userName')|formData.loginFail }" >
		<pre v-if="errors.has('userName')" class="help is-danger">{{ errors.first('userName') }}</pre>
		<pre v-if="formData.loginFail" class="help is-danger">{{formData.loginFailMsg}}</pre>
	 </div>
	  <div class="input-container">
        <label class ="label-for-input" for="password_input">PASSWORD</label>
		<input class="input-class"  @keyup.enter.stop.prevent = "signIn" type="password" id="password_input" v-on:change="inputChangeEvent" name="passWord" v-model='formData.passWord' v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('passWord')|formData.loginFail }" >
		<pre v-if="errors.has('passWord')" class="help is-danger">{{ errors.first('passWord') }}</pre>
		<pre v-if="formData.loginFail" class="help is-danger">{{formData.loginFailMsg}}</pre>
	 </div>
	 <div class="btn-container">
	     <div class="remeber-container">
             <div class="remeber-container-sub">
				  <input type="checkbox" id="remeber_me" @click="remeberMe" v-model="formData.remeberMe">
				  <label class="checkbox" for="remeber_me">
						<span>Remember me</span>
				  </label>
									
             </div>
	        <div id="a_forgot_password_section" > <a @click.stop.prevent="showModal" class="a-forgot-password">Forgot Password</a></div>
	    </div>
	     <div class="float-right"><button class="btn-login" @click.stop.prevent="signIn" >LOGIN</button></div>
	 </div>
   </div>
   <transition name="fade">
   <div v-show="formData.showLoding" class="msg-loging-in"><pre class="label-msg-loging-in">Logging you in...hang tight!</pre></div>
   </transition>
   <div class="second-container" id="track_section">
      <p class="p-text">Track a Shipment</p>
			
	  <div class="input-container">
	    <label class ="label-for-input" for="pro_input">PRO#</label>
        <input v-model="formData.proNumber" @keyup.enter.stop.prevent = "trackShipment" class="input-class" type="text" id="pro_input" :class="{'input': true, 'is-danger': formData.trackFail }">
	  </div>
	   <pre v-show="formData.trackFail" class="help is-danger">{{formData.trackResultMsg}}</pre>
	  <div class="btn-container">
	    <div class="float-right" id ="track_btn_section"><button class="btn-login" @click.stop.prevent="trackShipment">TRACK</button></div>
	  </div>
	  
	  <transition name="fade">
	  <div id="track_detail_section" v-if="formData.hasTrackTableRows">
           <ul id='tracking_status_text'>
			   <li>
				    <p id="origin-status-text">Origin</p>
			    </li>
			    <li>									
				    <p id="in-transit-status-text">In Transit</p>
				</li>
			    <li>
					<p id="destination-status-text">Destination</p>									
				</li>
			</ul>
            <div id ="tracking_status_icon_section">
                 <ul id="tracking_status_icon">
                     <li id="status-pick-up" data-status="pick-up">
						 <span class="Oval"  :class="{'Oval-chose':formData.originChose,'Oval-gray':!formData.originChose}"></span>									
					 </li>		
					 <li id="status-transit" data-status="transit">
						 <span class="line"  :class="{'line-chose':formData.transitChose,'line-gray':!formData.transitChose}"></span>
						 <span class="Oval" :class="{'Oval-chose':formData.transitChose,'Oval-gray':!formData.transitChose}"></span>
					 </li>
					 <li id="status-delivered" data-status="delivered">
						 <span class="line" :class="{'line-chose':formData.destinationChose,'line-gray':!formData.destinationChose}"></span>
						 <span class="Oval" :class="{'Oval-chose':formData.destinationChose,'Oval-gray':!formData.destinationChose}"></span>								
					 </li>
				</ul>
            </div>

			<ul id= "destination_text" class="tracking-status-text ul-login-page">
				<li>									
				    <span class="date order-pickup-date" id="origin_date">{{formData.originDate}}</span>	
					<span class="date order-pickup-location" id="origin_location">{{formData.originLocation}}</span>																		
				</li>
				<li>
					<span class="date order-pickup-date" id="transit_date">{{formData.transitDate}}</span>	
					<span class="date order-pickup-location" id="transit_location">{{formData.transitLocation}}</span>		
				</li>
				<li>
					<span class="date order-delivery-date" id="destination_date">{{formData.destinationDate}}</span>		
					<span class="date order-pickup-location" id="destination_location">{{formData.destinationLocation}}</span>				
				</li>
			</ul>	           
       
		   <div id="details_table_section" >
		        <table id="table_location_date_info" cellspacing="0">
		               <thead>
			                <tr>
				                <td class="table-title-font">DATE</td>
				                <td class="table-title-font">STATUS</td>
				                <td class="table-title-font">LOCATION</td>
				           </tr>
			            </thead>
				        <tbody v-if="formData.hasTrackTableRows" v-html="formData.trackTable">
				        </tbody>
		        </table>
		   </div>
	    </div>
      </transition>
     </div>

   <transition name="fade">
       <messageModel :modalName="messageModel.messageName" :title="messageModel.messageModelTitle" :message="messageModel.messageModelMessage">
		
       </messageModel>
   </transition>
      <transition name="fade">
   <DefaultModal :modalName="modalName" :title="modalTitle" :maxWidth="maxWidth" :maxHeight="maxHeight"  :message="modalMessage" :confirmText="modalConfirmText" :cancelText="modalCancelText" :confirmAction="confirmModal" :cancelAction="closeModal">
			<!--test elment-->
			<!-- <a href="/">you can place customized elements</a> -->
			<slot>
				 <label class ="label-for-input" for="forgot_email_input">EMAIL</label>
		         <input class="input-class" type="text" id="forgot_email_input" v-model='formData.forgotEmail' :class="{'input': true, 'is-danger': (formData.sendForgotEmailstaus === -1) }" >  
				 <pre v-if="formData.sendForgotEmailstaus === -1" class="help is-danger">{{formData.sendForgotEmailMsg}}</pre>   
			</slot>
    </DefaultModal>
	   </transition>
	
</div>
</template>
<style lang="scss" src="./login.scss" scoped></style>
<style lang="scss">
     
.date-info-row{
    width: 100%;
    height: 40px;
    background-color: rgba(21, 34, 61, 0.9);
    font-family: AvenirNext;
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.4px;
    text-align: left;
    color: #ffffff;
}
.date-info-row td{
		vertical-align: middle;  
		 width: 100%;
}
#table_location_date_info{
	width:100%;
}

#table_location_date_info tr td:first-child{
    padding-left:40px;
}

#details_table_section{
    margin-top:30px;
    clear:both;
    float:left;
    margin-left:9%;
    width: 90%;
 }

 .location-info-column{
    width:40%;
    height:40px;
    font-family: AvenirNext;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.4px;
    text-align: left;
	color: #15223d;
}

.table-title-font{
    height:40px;
    font-family: AvenirNext-Medium;
    font-size: 13px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.4px;
    text-align: left;
    color: #15223d;
}

.time-info-column{
    width:30%;
    height:40px;
    font-family: AvenirNext;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.4px;
    text-align: left;
    color: #15223d;      
}

.status-info-column{
    width:30%;
    height:40px;
    font-family: AvenirNext;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.4px;
    text-align: left;
    color: #15223d;
}


</style>