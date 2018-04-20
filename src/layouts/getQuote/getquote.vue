<template>
	<div class="grid-container get-quote-container">
		<div class="grid-100 tablet-grid-100">
			<div class="grid-100 tablet-grid-100 container">
				<h1 class="title">{{pageTitle}}</h1>
			</div>

			<div class="grid-100 tablet-grid-100 container">
				<div class="grid-50 tablet-grid-50 container step-container">
					<div class="grid-100 tablet-grid-100 container">
						<h1 class="step-header" style="width:370px;">
							<span class="label-number active">1</span>Where are we picking up?
							<span class="tooltip-light" style="margin-top:6px;" v-tooltip.bottom="tooltipMessages.wherePickup"></span>
						</h1>
					</div>

					<div class="grid-50 tablet-grid-50">
						<div class="grid-100 tablet-grid-100 container">
							<div class="grid-100 tablet-grid-100">
								<label class="input-label">Location Type</label>
								<select class="dropdown" v-model="quoteData.pickup.locationType" :disabled="quoteData.hasQuote || calculating">
									<!-- <option value="0">Select</option> -->
									<option v-for="(item,key) in quoteData.locationTypeOptions" :value="item.key" v-bind:key="key">{{item.value}}</option>
								</select>
							</div>
						</div>

						<div class="grid-100 tablet-grid-100 container">
							<div class="grid-100 tablet-grid-100">
								<label class="input-label">Zip Code</label>
								<input type="text" placeholder="90000" maxlength="5" id="input_zip_code_pickup" name="pickupZipCode" v-model="quoteData.pickup.zipCode" v-validate="'required|digits:5'" :class="{'input': true, 'is-danger': errors.has('pickupZipCode') && validationStarted}" :disabled="quoteData.hasQuote || calculating">
								<span v-if="errors.has('pickupZipCode') && validationStarted" class="help is-danger">{{ errors.first('pickupZipCode') }}</span>
							</div>
						</div>

						<div class="grid-100 tablet-grid-100 container">
							<div class="grid-70 tablet-grid-70 mobile-grid-70">
								<label class="input-label">City</label>
								<input type="text" value="Autopop City" v-model="quoteData.pickup.city" name="pickupCity" v-validate="'required|alpha_spaces'" :class="{'input': true, 'is-danger': errors.has('pickupZipCode') && validationStarted}" :disabled="quoteData.hasQuote || calculating">
								<span v-if="errors.has('pickupCity') && validationStarted" class="help is-danger">{{ errors.first('pickupCity') }}</span>
							</div>

							<div class="grid-30 tablet-grid-30 mobile-grid-30">
								<label class="input-label">State</label>
								<input type="text" v-model="quoteData.pickup.state" name="pickupState" v-validate="'required|alpha_spaces'" :class="{'input': true, 'is-danger': errors.has('pickupState') && validationStarted}" :disabled="quoteData.hasQuote || calculating">
								<span v-if="errors.has('pickupState') && validationStarted" class="help is-danger">{{ errors.first('pickupState') }}</span>
							</div>
						</div>

					</div>

					<div class="grid-50 tablet-grid-50">
						<div class="grid-100 tablet-grid-100 container step-container">
							<h1 class="section-header optional-label">Additional Information</h1>
						</div>

						<div class="grid-100 tablet-grid-100 container">
							<ul class="checkbox-list">
								<li>
									<input type="checkbox" id="checkbox_liftgate_pickup" v-model="quoteData.pickup.liftGate" :disabled="quoteData.hasQuote || calculating">
									<label class="checkbox" for="checkbox_liftgate_pickup">
										<span>Lift Gate Required</span>
									</label>
									<div class="tooltip-light" v-tooltip.bottom="tooltipMessages.liftGate"></div>
								</li>
								<li>
									<input type="checkbox" class="checkbox" id="checkbox_limited_pickup" v-model="quoteData.pickup.limitedAccess" :disabled="quoteData.hasQuote || calculating">
									<label class="checkbox" for="checkbox_limited_pickup">
										<span>Limited Access</span>
									</label>
									<div class="tooltip-light" v-tooltip.bottom="tooltipMessages.limitedAccess"></div>
								</li>
								<li>
									<input type="checkbox" class="checkbox" id="checkbox_jack_pickup" v-model="quoteData.pickup.palletJack" :disabled="quoteData.hasQuote || calculating">
									<label class="checkbox" for="checkbox_jack_pickup">
										<span>Pallet Jack Required</span>
									</label>
									<div class="tooltip-light" v-tooltip.bottom="tooltipMessages.palletJack"></div>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="grid-50 tablet-grid-50 container">
					<div class="grid-100 tablet-grid-100 container step-container">
						<h1 class="step-header">
							<span class="label-number active">2</span>Where are we delivering?</h1>
					</div>

					<div class="grid-50 tablet-grid-50">
						<div class="grid-100 tablet-grid-100 container">
							<div class="grid-100 tablet-grid-100">
								<label class="input-label">Location Type</label>
								<select class="dropdown" v-model="quoteData.delivery.locationType" :disabled="quoteData.hasQuote || calculating">
									<!-- <option value="0">Select</option> -->
									<option v-for="(item,key) in quoteData.locationTypeOptions" :value="item.key" v-bind:key="key">{{item.value}}</option>
								</select>
							</div>
						</div>

						<div class="grid-100 tablet-grid-100 container">
							<div class="grid-100 tablet-grid-100">
								<label class="input-label">Zip Code</label>
								<input type="text" id="input_zip_code_delivery" placeholder="90000" maxlength="5" name="deliveringZipCode" v-model="quoteData.delivery.zipCode" v-validate="'required|digits:5'" :class="{'input': true, 'is-danger': errors.has('deliveringZipCode') && validationStarted } " :disabled="quoteData.hasQuote || calculating">
								<span v-if="errors.has('deliveringZipCode') && validationStarted" class="help is-danger">{{ errors.first('deliveringZipCode') }}</span>
							</div>
						</div>

						<div class="grid-100 tablet-grid-100 container">
							<div class="grid-70 tablet-grid-70 mobile-grid-70">
								<label class="input-label">City</label>
								<input type="text" value="Autopop City" v-model="quoteData.delivery.city" name="deliveryCity" v-validate="'required|alpha_spaces'" :class="{'input': true, 'is-danger': errors.has('deliveryCity') && validationStarted}" :disabled="quoteData.hasQuote || calculating">
								<span v-if="errors.has('deliveryCity') && validationStarted" class="help is-danger">{{ errors.first('deliveryCity') }}</span>
							</div>

							<div class="grid-30 tablet-grid-30 mobile-grid-30">
								<label class="input-label">State</label>
								<input type="text" v-model="quoteData.delivery.state" name="deliveryState" v-validate="'required|alpha_spaces'" :class="{'input': true, 'is-danger': errors.has('deliveryState') && validationStarted}" :disabled="quoteData.hasQuote || calculating">
								<span v-if="errors.has('deliveryState') && validationStarted" class="help is-danger">{{ errors.first('deliveryState') }}</span>
							</div>
						</div>

					</div>

					<div class="grid-50 tablet-grid-50">
						<div class="grid-100 tablet-grid-100 container">
							<h1 class="section-header optional-label">Additional Information</h1>
						</div>

						<div class="grid-100 tablet-grid-100 container">
							<ul class="checkbox-list">
								<li>
									<input type="checkbox" id="checkbox_liftgate_delivery" v-model="quoteData.delivery.liftGate" :disabled="quoteData.hasQuote || calculating">
									<label class="checkbox" for="checkbox_liftgate_delivery">
										<span>Lift Gate Required</span>
									</label>
									<div class="tooltip-light" v-tooltip.bottom="tooltipMessages.liftGate"></div>
								</li>
								<li>
									<input type="checkbox" class="checkbox" id="checkbox_limited_delivery" v-model="quoteData.delivery.limitedAccess" :disabled="quoteData.hasQuote || calculating">
									<label class="checkbox" for="checkbox_limited_delivery">
										<span>Limited Access</span>
									</label>
									<div class="tooltip-light" v-tooltip.bottom="tooltipMessages.limitedAccess"></div>
								</li>
								<li>
									<input type="checkbox" class="checkbox" id="checkbox_jack_delivery" v-model="quoteData.delivery.palletJack" :disabled="quoteData.hasQuote || calculating">
									<label class="checkbox" for="checkbox_jack_delivery">
										<span>Pallet Jack Required</span>
									</label>
									<div class="tooltip-light" v-tooltip.bottom="tooltipMessages.palletJack"></div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div class="grid-100 tablet-grid-100 container">
				<div class="grid-100 tablet-grid-100 container">
					<h1 class="step-header">
						<span class="label-number active">3</span>What are we shipping?
						<input type="checkbox" id="hazard_material" v-model="quoteData.hasHazardous" :disabled="quoteData.hasQuote || calculating">
						<label class="checkbox" for="hazard_material">
							<span>My shipment(s) contain Hazardous Material
								<span class="tooltip-light tooltip-label" style="margin-left: 10px !important;" v-tooltip.bottom="tooltipMessages.hazardousMaterial"></span>
							</span>
						</label>
					</h1>
				</div>

				<transition-group name="shipping-detail-list">
					<ShippingDetail :validationStarted="validationStarted" :lock="quoteData.hasQuote || calculating" :requireDescription="true" :index="key" :pallet="item" :totalNumber="quoteData.pallets.length" v-for="(item,key) in quoteData.pallets" :key="item.key"></ShippingDetail>
				</transition-group>

				<div class="grid-100 tablet-grid-100 container">
					<div class="grid-30 tablet-grid-50 pallets-count-container" :class="{'input': true, 'is-danger': exceedPalletSpaces }">
						<p>This shipment will take up
							<span class="pallet-space-count">{{palletSpaces}}</span> pallet position{{palletSpaces > 1 ? "s" : ""}}.</p>
					</div>
				</div>

				<div class="grid-100 tablet-grid-100 container" v-if="!(quoteData.hasQuote || calculating)">
					<div class="grid-15 tablet-grid-20" style="margin-left: 3%;">
						<button type="button" class="button-standard-small add" v-on:click="addLine" :disabled="calculating">Add Line</button>
					</div>
				</div>
			</div>
		</div>

		<div class="grid-100 tablet-grid-100 container footer">
			<div class="grid-100 tablet-grid-100 container">
				<p>* Class will be determined based on what you enter for 'Total Weight' and shipment dimensions. A Freight Class will be automatically calculated if 'Class' is left blank. </p>
			</div>
			<transition name="fade">
				<MainButtonSet v-if="!(quoteData.hasQuote || calculating)" :rightBtnText="rightBtnText" @rightBtnAction="submit" @leftBtnAction="cancel"></MainButtonSet>
			</transition>
		</div>

		<transition name="list">
			<div class="grid-100 tablet-grid-100 container" v-show="calculating">
				<div class="grid-20 tablet-grid-50 toast-message">
					<p>Hang tight! We are calculating the cost...</p>
				</div>
			</div>
		</transition>

		<!-- accessory components -->
		<EstimatedQuote v-if="quoteData.hasQuote" @goEdit="goEdit" @saveQuote="saveQuote" @schedulePickup="schedulePickup"></EstimatedQuote>

		<OneButtonModal :modalName="noDataModal" :title="noDataModalTitle" :message="noDataModalMessage" @btnAction="closeNoDataModal">
		</OneButtonModal>

		<OneButtonModal :modalName="errorModal" :title="errorModalTitle" @btnAction="closeErrorModal">
			<slot>
				<p>Sorry, we could not retrieve a quote based on the information you</p>
				<p>entered. Please check that what you entered is correct. If the issue persists,</p>
				<p>please email us with your order details at
					<a href="mailto:ship@unisco.com">ship@unisco.com</a>
				</p>
			</slot>
		</OneButtonModal>

		<DefaultModal :modalName="cancelQuoteModal" :title="'Cancel Quote'" :rightBtnText="'Yes, Cancel Quote'" :leftBtnText="'Nevermind'" @rightBtnAction="cancelQuoteRightBtnAction" @leftBtnAction="cancelQuoteLeftBtnAction">
			<slot>
				<p>Are you sure you want to cancel this quote?</p>
				<p>Canceled quotes cannot be restored.</p>
			</slot>
		</DefaultModal>

		<DefaultModal :modalName="cancelSavedQuoteModal" :title="'Cancel Saved Quote'" :rightBtnText="'Yes, Cancel Quote'" :leftBtnText="'Nevermind'" @rightBtnAction="cancelSavedQuoteRightBtnAction" @leftBtnAction="cancelSavedQuoteLeftBtnAction">
			<slot>
				<p>Are you sure you want to cancel this saved quote?</p>
				<p>Canceling a saved quote will discard any changes you made.</p>
			</slot>
		</DefaultModal>

		<DefaultModal :modalName="editQuoteModal" :title="'Warning'" :rightBtnText="'Yes, Edit Quote'" :leftBtnText="'Nevermind'" @rightBtnAction="editQuoteModalRightBtnAction" @leftBtnAction="editQuoteModalLeftBtnAction" :rightBtnStyle="editQuoteModalRightBtnStyle">
			<slot>
				<p>Editing a saved quote will overwrite the original information.</p>
				<p>Are you sure you want to edit this quote?</p>
			</slot>
		</DefaultModal>

		<DefaultModal :modalName="palletOverValueModal" :title="'Warning'" :rightBtnText="'Finished'" :leftBtnText="'Nevermind'" @rightBtnAction="palletOverValueModalRightBtnAction" :rightBtnStyle="editQuoteModalRightBtnStyle" :leftBtnStyle="palletOverValueModalRightBtnStyle">
			<slot>
				<p>Due to one of the following scenarios, we are not able to retrieve a quote at this time:</p>
				<p style="margin-left: 7.9em;">Overweight shipment</p>
				<p style="margin-left: 7.9em;">Oversized pallets</p>
				<p style="margin-left: 7.9em;">Hazardous Material</p>
				<p style="margin-left: 7.9em;">Outside shipping zone</p>
				<span>Please email us at <u>ship@unisco.com</u> with your order details to get </span>
				<p>a quote.</p>
			</slot>
		</DefaultModal>

		<MessageModal :modalName="successModalName" :title="successModalTitle" :message="successModalMessage"></MessageModal>

	</div>
</template>


