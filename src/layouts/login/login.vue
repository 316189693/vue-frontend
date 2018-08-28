<template>
<div id="top_container">
    <div class="grid-container margin-top" >
         	 <div class="grid-100 tablet-grid-100" >
              	 <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                            <div class="grid-45 tablet-grid-45">
                                <label class="first-title" >Login to UNIS Ship</label>
                            </div>
                        </div>

						 <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                            <div class="grid-50 tablet-grid-50">
                                <label class="input-label" for="email_input">Email or Username</label>
		                        <input class="input-class" type="text" id="email_input" @keyup.enter.stop.prevent = "signIn" v-on:input="inputChangeEvent"  name="userName" v-model='formData.userName' v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('userName')|formData.loginFail }" >
		                        <pre v-if="errors.has('userName')" class="help is-danger">{{ errors.first('userName') }}</pre>
		                        <pre v-if="formData.loginFail" class="help is-danger">{{formData.loginFailMsg}}</pre>
                            </div>
                        </div>

						<div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                            <div class="grid-50 tablet-grid-50">
                                <label class="input-label" for="password_input">Password</label>
		                        <input class="input-class input"  @keyup.enter.stop.prevent = "signIn" type="password" id="password_input" v-on:input="inputChangeEvent" name="passWord" v-model='formData.passWord' v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('passWord')|formData.loginFail }" >
		                        <pre v-if="errors.has('passWord')" class="help is-danger">{{ errors.first('passWord') }}</pre>
		                        <pre v-if="formData.loginFail" class="help is-danger">{{formData.loginFailMsg}}</pre>
                            </div>
                        </div>
                        <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
							<div class="grid-50 tablet-grid-50">
						            <ul class="checkbox-list">
                                        <li >
											<input type="checkbox" id="remeber_me" @click="remeberMe" v-model="formData.remeberMe">
				                            <label class="checkbox" for="remeber_me">
						                        <span>Remember me</span>
				                            </label>
                                        </li>
                                        <li style="float:left">
											 <a @click.stop.prevent="showModal" class="checkbox a-forgot-password ">Forgot Password</a>
                                        </li>
                                    </ul>
									<div class="grid-15 tablet-grid-20" style="margin-top: 10px;float:right;padding:0px;">
								        <div>
						                    <button class="button-yellow-medium btn-login" @click.stop.prevent="signIn">LOGIN</button>
								        </div>
                                   </div>
							</div>

						</div>

    <transition name="fade">
		<div class="grid-100 tablet-grid-100 mobile-grid-100 container"  v-show="formData.showLoding">
            <div class="grid-40 tablet-grid-40 container ">
                <div class="grid-70 tablet-grid-70 toast-message">
                   <p>Logging you in...hang tight!</p>
                </div>
            </div>
		</div>
    </transition>
         </div>


		 <div class="grid-100 tablet-grid-100 margin-top-30" >
				<div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                    <div class="grid-45 tablet-grid-45">
                        <label class="first-title" >Track a Shipment</label>
                    </div>
                </div>
                <div class="grid-100 tablet-grid-100 container ">
                    <div class="grid-50 tablet-grid-50">
                  <label class ="input-label" for="pro_input">PRO # or PU #</label>
                  <input v-model="formData.proNumber" @keyup.enter.stop.prevent = "trackShipment" v-on:input="clearTrackErrorMsg"  class="input-class" type="text" id="pro_input" :class="{'input': true, 'is-danger': formData.trackFail }" placeholder="Search by PRO # or PU #" />

                        <span v-if="formData.trackFail" class="help is-danger">{{formData.trackResultMsg}}

                        </span>

                    </div>
                </div>

				 <div class="grid-100 tablet-grid-100 container ">
                    <div class="grid-50 tablet-grid-50">
                  <div class="grid-100 tablet-grid-100" style="padding:0px;">
							     <div >
						    <button class="button-yellow-medium btn-login" @click.stop.prevent="trackShipment">TRACK</button>
							     </div>
                        </div>
                    </div>
                </div>

        <div v-if="formData.showMultiOrder" class="grid-100 tablet-grid-100 container margin-left">
            <div class="grid-80 tablet-grid-100 card-table-container">
                <div class="grid-parent grid-100 tablet-grid-100 container multi-pu-header">
                    <p>This PU# has multiple orders associated with it. </p>
                    <p>Please select the order you wish to track:</p>
                </div>

                <table class="table-client">
                    <thead>
                        <tr>
                            <th></th>
                            <th>PRO #</th>
                            <th>Reference #</th>
                            <th>Delivery Date</th>
                            <th>Pallets</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :id="'orderRow'+index" v-for="(order, index) in formData.orders">
                            <td>
                                <input type="radio" :id="'radio'+index" name="radio">
                                <label :for="'radio'+index" title="" class="radio" @click="showOrder(index)"></label>
                            </td>
                            <td>{{order.pro}}</td>
                            <td>{{order.ref}}</td>
                            <td>{{order.deliveryDate}}</td>
                            <td>{{order.pallet}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

            <div class="grid-100 tablet-grid-100 container margin-left" >
               <transition name="fade" :duration="{ enter: 500, leave: 800 }">
                    <div class="tracking-process grid-100 tablet-grid-100 container title " v-if="formData.hasTrackTableRows">
                        <ul class="tracking-status-text">
                            <li>
                                <p :class="{ complete: formData.originChose }">Origin</p>
                            </li>

                            <li>
                                <p :class="{ complete: formData.transitChose }">In Transit</p>
                            </li>

                            <li>
                                <p :class="{ complete: formData.destinationChose }">Destination</p>
                            </li>
                        </ul>

                        <ul class="tracking-status-icon">
                            <li id="status-pick-up" data-status="pick-up">
                                <span :class="{circle: true, complete: formData.originChose}"></span>
                            </li>

                            <li id="status-transit" data-status="transit">
                                <span :class="{line: true, complete: formData.transitChose}"></span>
                                <span :class="{circle: true, complete: formData.transitChose}"></span>
                            </li>

                            <li id="status-delivered" data-status="delivered">
                                <span :class="{line: true, complete: formData.destinationChose}"></span>
                                <span :class="{circle: true, complete: formData.destinationChose}"></span>
                            </li>
                        </ul>

                        <ul class="tracking-status-text">
                            <li>
                                <span class="details">{{formData.originDate}}</span>
                                <span class="details">{{formData.originLocation}}</span>
                            </li>

                            <li>
								 <span class="details">{{formData.transitDate}}</span>
                                <span class="details">{{formData.transitLocation}}</span>
							</li>

                            <li>
                                <span class="details">{{formData.destinationDate}}</span>
                                <span class="details">{{formData.destinationLocation}}</span>
                            </li>
                        </ul>
                    </div>
               </transition>
			    <transition name="fade" :duration="{ enter: 500, leave: 800 }">
                    <div class="grid-95 tablet-grid-95 container title " v-if="formData.hasTrackTableRows">
                        <table class="table-tracking">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Location</th>
                                </tr>
                            </thead>
                            <tbody  >

							  <template v-for="(items,date) in formData.trackTable">
                                    <tr class="date-info-row">
                                        <td colspan="3" class="date">{{date}}</td>
                                    </tr>

                                    <template v-for="detail in items">
                                        <tr>
                                            <td class="time-info-column">{{detail.outputTime}}</td>
                                            <td class="status-info-column">{{detail.status}}</td>
                                            <td class="location-info-column">{{detail.location}}</td>
                                        </tr>
                                    </template>

                                </template>

				        </tbody>
                        </table>
                    </div>
               </transition>
            </div>
            </div>
   </div>


   <DefaultModal :modalName="modalName" :title="modalTitle" :width="width" :maxWidth="maxWidth" :height="height" :maxHeight="maxHeight"  :message="modalMessage" :rightBtnText="modalConfirmText" :leftBtnText="modalCancelText" @rightBtnAction="confirmModal" @leftBtnAction="closeModal">
			<!--test elment-->
			<!-- <a href="/">you can place customized elements</a> -->
			<slot>
				 <label class ="input-label" for="forgot_email_input">EMAIL</label>
		         <input class="input-forgot-mail input-class" type="text" id="forgot_email_input" v-model='formData.forgotEmail' v-on:input="inputForgotPassword" :class="{'input': true, 'is-danger': (formData.sendForgotEmailstaus === -1) }" >
				 <pre v-if="formData.sendForgotEmailstaus === -1" class="help is-danger">{{formData.sendForgotEmailMsg}}</pre>
			</slot>
    </DefaultModal>

    <DefaultModal :modalName="resetPassword" :title="resetPasswordTitle" :message="resetPasswordMessage" :height="passwordHeight" :leftBtnStyle="resetPasswordStyle" :rightBtnText="resetPasswordTitle" @rightBtnAction="confirmReset" :rightBtnStyle="rightBtnStyle">
            <!--test elment-->
            <!-- <a href="/">you can place customized elements</a> -->
            <slot>
                <div class="grid-parent grid-100 tablet-grid-100 container">
                  <div class="grid-50 tablet-grid-50">
                      <label class="input-label">New Password</label>
                      <input type="password" v-model = "newPassword" name="newPassword" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('newPassword') }">
                      <pre v-if="errors.has('newPassword')" class="help is-danger">{{ errors.first('newPassword') }}</pre>
                  </div>

                  <div class="grid-50 tablet-grid-50">
                      <label class="input-label">Re-type New Password</label>
                      <input type="password" v-model = "retypePassword" name="retypePassword" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('retypePassword') || validatePassword }" @change="checkPassword">
                      <pre v-if="errors.has('retypePassword')" class="help is-danger">{{ errors.first('retypePassword') }}</pre>
                      <pre v-if="validatePassword" class="help is-danger">Password is not match</pre>
                  </div>
              </div>
          </slot>
    </DefaultModal>

</div>

</template>
<style lang="scss" src="./login.scss" scoped></style>