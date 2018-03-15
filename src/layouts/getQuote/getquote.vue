<template>
	<div class="grid-container get-quote-container">
		<div class="grid-100 tablet-grid-100">
			<div class="grid-100 tablet-grid-100 container">
				<h1 class="title">{{title}}</h1>
			</div>

			<div class="grid-100 tablet-grid-100 container">
				<div class="grid-50 tablet-grid-50 container step-container">
					<div class="grid-100 tablet-grid-100 container">
						<h1 class="step-header">
							<span class="label-number active">1</span>Where are we picking up?</h1>
					</div>

					<div class="grid-50 tablet-grid-50">
						<div class="grid-100 tablet-grid-100 container">
							<div class="grid-80 tablet-grid-100">
								<label class="input-label">Location Type</label>
								<select class="dropdown" v-model="quoteData.pickup.locationType" :disabled="hasQuote">
									<!-- <option value="0">Select</option> -->
									<option v-for="(item,key) in quoteData.locationTypeOptions" :value="item.key" v-bind:key="key">{{item.value}}</option>
								</select>
							</div>
						</div>

						<div class="grid-100 tablet-grid-100 container">
							<div class="grid-70 tablet-grid-90">
								<label class="input-label">Zip Code</label>
								<input type="text" placeholder="90000" maxlength="5" id="input_zip_code_pickup" name="pickupZipCode" v-model="quoteData.pickup.zipCode" v-validate.disable="'required|digits:5'" :class="{'input': true, 'is-danger': errors.has('pickupZipCode') }" :disabled="hasQuote">
								<!-- <i v-show="errors.has('name')" class="fa fa-warning"></i> -->
								<span v-if="errors.has('pickupZipCode')" class="help is-danger">{{ errors.first('pickupZipCode') }}</span>
							</div>
						</div>

						<div class="grid-100 tablet-grid-100 container">
							<div class="grid-70 tablet-grid-80 mobile-grid-70">
								<label class="input-label">City</label>
								<input type="text" value="Autopop City" v-model="quoteData.pickup.city" name="pickupCity" v-validate.disable="'required'" :class="{'input': true, 'is-danger': errors.has('pickupZipCode') }" :disabled="hasQuote">
							</div>

							<div class="grid-30 tablet-grid-20 mobile-grid-30">
								<label class="input-label">State</label>
								<input type="text" v-model="quoteData.pickup.state" name="pickupState" v-validate.disable="'required'" :class="{'input': true, 'is-danger': errors.has('pickupState') }" :disabled="hasQuote">
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
									<input type="checkbox" id="checkbox_liftgate_pickup" v-model="quoteData.pickup.liftGate" :disabled="hasQuote">
									<label class="checkbox" for="checkbox_liftgate_pickup">
										<span>Lift Gate Required</span>
									</label>
									<div class="tooltip-light" v-tooltip.bottom="tooltipMessages.liftGate"></div>
								</li>
								<li>
									<input type="checkbox" class="checkbox" id="checkbox_limited_pickup" v-model="quoteData.pickup.limitedAccess" :disabled="hasQuote">
									<label class="checkbox" for="checkbox_limited_pickup">
										<span>Limited Access</span>
									</label>
									<div class="tooltip-light" v-tooltip.bottom="tooltipMessages.limitedAccess"></div>
								</li>
								<li>
									<input type="checkbox" class="checkbox" id="checkbox_jack_pickup" v-model="quoteData.pickup.palletJack" :disabled="hasQuote">
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
							<div class="grid-80 tablet-grid-100">
								<label class="input-label">Location Type</label>
								<select class="dropdown" v-model="quoteData.delivery.locationType" :disabled="hasQuote">
									<!-- <option value="0">Select</option> -->
									<option v-for="(item,key) in quoteData.locationTypeOptions" :value="item.key" v-bind:key="key">{{item.value}}</option>
								</select>
							</div>
						</div>

						<div class="grid-100 tablet-grid-100 container">
							<div class="grid-70 tablet-grid-90">
								<label class="input-label">Zip Code</label>
								<input type="text" id="input_zip_code_delivery" placeholder="90000" maxlength="5" name="deliveringZipCode" v-model="quoteData.delivery.zipCode" v-validate.disable="'required|digits:5'" :class="{'input': true, 'is-danger': errors.has('deliveringZipCode') } " :disabled="hasQuote">
								<span v-if="errors.has('deliveringZipCode')" class="help is-danger">{{ errors.first('deliveringZipCode') }}</span>
							</div>
						</div>

						<div class="grid-100 tablet-grid-100 container">
							<div class="grid-70 tablet-grid-80 mobile-grid-70">
								<label class="input-label">City</label>
								<input type="text" value="Autopop City" v-model="quoteData.delivery.city" name="deliveryCity" v-validate.disable="'required'" :class="{'input': true, 'is-danger': errors.has('deliveryCity') }" :disabled="hasQuote">
							</div>

							<div class="grid-30 tablet-grid-20 mobile-grid-30">
								<label class="input-label">State</label>
								<input type="text" v-model="quoteData.delivery.state" name="deliveryState" v-validate.disable="'required'" :class="{'input': true, 'is-danger': errors.has('deliveryState') }" :disabled="hasQuote">
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
									<input type="checkbox" id="checkbox_liftgate_delivery" v-model="quoteData.delivery.liftGate" :disabled="hasQuote">
									<label class="checkbox" for="checkbox_liftgate_delivery">
										<span>Lift Gate Required</span>
									</label>
									<div class="tooltip-light" v-tooltip.bottom="tooltipMessages.liftGate"></div>
								</li>
								<li>
									<input type="checkbox" class="checkbox" id="checkbox_limited_delivery" v-model="quoteData.delivery.limitedAccess" :disabled="hasQuote">
									<label class="checkbox" for="checkbox_limited_delivery">
										<span>Limited Access</span>
									</label>
									<div class="tooltip-light" v-tooltip.bottom="tooltipMessages.limitedAccess"></div>
								</li>
								<li>
									<input type="checkbox" class="checkbox" id="checkbox_jack_delivery" v-model="quoteData.delivery.palletJack" :disabled="hasQuote">
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
						<span class="label-number active">3</span>What are you shipping?</h1>
				</div>

				<ShippingDetail :lock="hasQuote" :index="key" :pallet="item" :totalNumber="quoteData.pallets.length" v-for="(item,key) in quoteData.pallets" :key="key"></ShippingDetail>

				<div class="grid-100 tablet-grid-100 container">
					<div class="grid-30 tablet-grid-50 pallets-count-container">
						<p>This shipment will take up
							<span class="pallet-space-count">{{palletSpaces}}</span> pallet spaces.</p>
					</div>
				</div>

				<div class="grid-100 tablet-grid-100 container" v-if="!hasQuote">
					<div class="grid-15 tablet-grid-20" style="margin-left: 3.5%;">
						<button type="button" class="button-standard-small add" v-on:click="addLine">Add Line</button>
					</div>
				</div>
			</div>
		</div>

		<div class="grid-100 tablet-grid-100 container footer">
			<div class="grid-100 tablet-grid-100 container">
				<p>* Class will be determined based on what you enter 'Total Weight' and shipment dimensions. A Freight Class will be automatically calculated if 'Class' is left blank. </p>
			</div>
			<MainButtonSet v-if="!hasQuote" :rightBtnText="'Get Quote'" :rightBtnAction="validate" :leftBtnAction="showModal"></MainButtonSet>
		</div>

		<div class="grid-100 tablet-grid-100 container" v-show="calculating">
			<div class="grid-20 tablet-grid-50 toast-message">
				<p>Hang tight! We are calculating the cost...</p>
			</div>
		</div>

		<!-- accessory components -->
		<EstimatedQuote v-if="hasQuote" @goEdit="allowEdit"></EstimatedQuote>
		<DefaultModal :modalName="modalName" :title="modalTitle" :message="modalMessage" :rightBtnText="modalConfirmText" :leftBtnText="modalCancelText" @rightBtnAction="confirmModal" @leftBtnAction="closeModal">
			<!--test elment-->
			<!-- <a href="/">you can place customized elements</a> -->
		</DefaultModal>
	</div>
</template>


