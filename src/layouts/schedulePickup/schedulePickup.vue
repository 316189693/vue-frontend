<template>

    <div class="grid-100 tablet-grid-100 grid-container">
        <div class="grid-100 tablet-grid-80">

            <!-- <StageHeader :headerTitle="'Schedule Pickup'" :headerSubtitle="''" :stage="0" :pages="['Location','Shipment','Review']"></StageHeader> -->

            <SchedulePickupHeader></SchedulePickupHeader>

            <div class="grid-100 tablet-grid-100 container">
                <div class="grid-50 tablet-grid-100 container">
                    <div class="grid-100 tablet-grid-100 container margin-left-10">
                        <h1 class="step-header">
                            <span class="label-number active">1</span>Where are we picking up?</h1>
                    </div>

                    <div class="grid-100 tablet-grid-100 container">
                        <div class="grid-55 tablet-grid-50 container">
                            <button class="button-standard-small" v-bind:disabled="disableSelectAddressBookPickUp" @click="selectAddressBookModal('pickup')" >Select from address book</button>
                        </div>
                    </div>

                    <div class="grid-50 tablet-grid-50 container" style="padding-right:0px;">
                        <label class="input-label">Location Type</label>
                        <select class="dropdown" v-model="quotePageData.pickup.locationType" disabled>
                            <option v-for="(item,key) in quotePageData.locationTypeOptions" :key="key" :value="item.key">{{item.value}}</option>
                        </select>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <label class="input-label">Company</label>
                        <input type="text" v-model="scheduleData.pickup.company" name="pickupCompany" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('pickupCompany') && validationStarted}" v-bind:disabled="disableAddressPickUp" @change="changeKeyWord('pickup')">
                        <span v-if="errors.has('pickupCompany') && validationStarted" class="help is-danger">{{ errors.first('pickupCompany') }}</span>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <label class="input-label">Address 1</label>
                        <input type="text" v-model="scheduleData.pickup.address1" name="pickupAddress1" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('pickupAddress1') || validPickupAddress }" v-bind:disabled="disableAddressPickUp" @change="changeKeyWord('pickup')">
                        <span v-if="errors.has('pickupAddress1')" class="help is-danger">{{ errors.first('pickupAddress1') }}</span>
                        <span v-if="validPickupAddress" class="help is-danger">Invalid Address</span>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <label class="input-label optional-label">Address 2 </label>
                        <input type="text" v-model="scheduleData.pickup.address2" v-bind:disabled="disableAddressPickUp">
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <div class="grid-60 tablet-grid-50">
                            <label class="input-label">City</label>
                            <input type="text" v-model="quotePageData.pickup.city" disabled>
                        </div>

                        <div class="grid-20 tablet-grid-25">
                            <label class="input-label">State</label>
                            <input type="text" v-model="quotePageData.pickup.state" disabled>
                        </div>

                        <div class="grid-20 tablet-grid-25">
                            <label class="input-label">Zip Code</label>
                            <input type="text" value="0" v-model="quotePageData.pickup.zipCode" disabled>
                        </div>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <label class="input-label optional-label">Email</label>
                        <input type="text" v-model="scheduleData.pickup.email" name="pickupEmail" v-validate="'email'" :class="{'input': true, 'is-danger': errors.has('pickupEmail')}">
                        <span v-if="errors.has('pickupEmail')" class="help is-danger">{{ errors.first('pickupEmail') }}</span>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <div class="grid-50 tablet-grid-50">
                            <label class="input-label">Phone</label>
                            <input type="text" v-mask="'000-000-0000'" maxlength="12" v-model="scheduleData.pickup.phone" name="pickupPhone" v-validate="'required|length:12'" :class="{'input': true, 'is-danger': errors.has('pickupPhone') && validationStarted}" v-bind:disabled="disableAddressPickUp" @change="changeKeyWord('pickup')"/>
                            <span v-if="errors.has('pickupPhone') && validationStarted" class="help is-danger">{{ errors.first('pickupPhone') }}</span>
                        </div>

                        <div class="grid-50 tablet-grid-50">
                            <label class="input-label optional-label">Fax</label>
                            <input type="text" v-mask="'000-000-0000'" maxlength="12" v-model="scheduleData.pickup.fax" name="pickupFax" v-validate="'length:12'" :class="{'input': true, 'is-danger': errors.has('pickupFax') && validationStarted}" v-bind:disabled="disableAddressPickUp"/>
                            <span v-if="errors.has('pickupFax') && validationStarted" class="help is-danger">{{ errors.first('pickupFax') }}</span>
                        </div>
                    </div>

                    <div class="grid-55 tablet-grid-50 container margin-bottom-40">
                         <button class="button-standard-small" @click="saveToAddressBook('pickup')" v-bind:disabled="disableSaveAddressBookPickUp">Save to address book</button>
                    </div>


                    <div class="grid-80 tablet-grid-100">
                        <h1 class="section-header" style="padding-bottom: 10px;">Pickup Window Date & Hours</h1>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <div class="grid-45 tablet-grid-45">
                            <label class="input-label">Earliest Pickup Date</label>
                            <Datepicker :input-class="{'input-date':true,'input': true, 'is-danger': (errors.has('earliestPickupDate') || !validPickupDateTime  || isEarliestPickupDateInvalid()) && validationStarted}" placeholder="select" v-bind:format="dateFormat" name="earliestPickupDate" v-model="scheduleData.pickup.earliestPickupDate" v-validate.disable="{required:true}"></Datepicker>
                            <span v-if="isEarliestPickupDateInvalid() && validationStarted" class="datepicker is-past-date">Date cannot be in the past.</span>
                        </div>

                        <div class="grid-10 tablet-grid-10 to-box">
                            <label>&nbsp;</label>
                            <label>to</label>
                        </div>

                        <div class="grid-45 tablet-grid-45">
                            <label class="input-label">Latest Pickup Date</label>
                            <Datepicker :input-class="{'input-date':true,'input': true, 'is-danger': (errors.has('latestPickupDate') || !validPickupDateTime || isLatestPickupDateInvalid()) && validationStarted}" placeholder="select" v-bind:format="dateFormat" name="latestPickupDate" v-model="scheduleData.pickup.latestPickupDate" v-validate.disable="{required:true}"></Datepicker>
                            <span v-if="isLatestPickupDateInvalid() && validationStarted" class="datepicker is-past-date">Date cannot be in the past.</span>
                        </div>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <div class="grid-45 tablet-grid-45">
                            <label class="input-label">Earliest Pickup Time</label>
                            <select class="input-time" v-model="scheduleData.pickup.earliestPickupTime" :class="{'input-date':true,'input': true, 'is-danger': (!validPickupDateTime  || isEarliestPickupTimeInvalid()) && validationStarted}">
                                <option v-for="(item, key) in getTimeOptions()" :key="key">{{item}}</option>
                            </select>
                            <span v-if="isEarliestPickupTimeInvalid() && validationStarted" class="timepicker is-past-time">Time cannot be in the past.</span>
                        </div>

                        <div class="grid-10 tablet-grid-10 to-box">
                            <label>&nbsp;</label>
                            <label>to</label>
                        </div>

                        <div class="grid-45 tablet-grid-45 container">
                            <label class="input-label">Latest Pickup Time</label>
                            <select class="input-time" v-model="scheduleData.pickup.latestPickupTime" :class="{'input-date':true,'input': true, 'is-danger': (!validPickupDateTime  || isLatestPickupTimeInvalid()) && validationStarted}">
                                <option v-for="(item, key) in getTimeOptions()" :key="key">{{item}}</option>
                            </select>
                            <span v-if="isLatestPickupTimeInvalid() && validationStarted" class="timepicker is-past-time">Time cannot be in the past.</span>
                        </div>
                    </div>

                    <!-- <div v-if="showPickupToolMsg" class="grid-80 tablet-grid-100 container info-container notification-container" style="width:30%;">
                        <button class="close-modal-x" @click="showPickupToolMsg = false"></button>
                        <p>Shipments that are entered after
                            <span class="text-bold">11:00 AM</span> or picked up after
                            <span class="text-bold"> 3:00 PM</span> may be processed the following day.</p>
                        <p>This may or may not cause a delay in delivery.</p>
                    </div> -->

                    <div class="grid-80 tablet-grid-100 container">
                        <label class="input-label optional-label">Special Instructions
                            <span class="character-limit">({{instruction_MaxCharacters}} character limit)</span>
                        </label>
                        <textarea v-model="scheduleData.pickup.instructions" :maxlength="instruction_MaxCharacters"></textarea>
                        <span class="character-limit" style="margin-top: -20px">{{remainingWords}} characters remaining</span>
                    </div>

                    <div>
                        <label>&nbsp;</label>
                    </div>
                </div>

                <div class="grid-parent grid-50 tablet-grid-100 container" style="position: relative;">
                    <div class="grid-100 tablet-grid-100 container margin-left-10">
                        <h1 class="step-header">
                            <span class="label-number active">2</span>Where are we delivering?</h1>
                    </div>

                    <div class="grid-100 tablet-grid-100 container">
                        <div class="grid-55 tablet-grid-50 container">
                            <button class="button-standard-small" v-bind:disabled="disableSelectAddressBookDelivery" @click="selectAddressBookModal('delivery')">Select from address book</button>
                        </div>
                    </div>

                    <div class="grid-50 tablet-grid-50 container" style="padding-right:0px;">
                        <label class="input-label">Location Type</label>
                        <select class="dropdown" v-model="quotePageData.delivery.locationType" disabled>
                            <option v-for="(item,key) in quotePageData.locationTypeOptions" :key="key" :value="item.key">{{item.value}}</option>
                        </select>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <label class="input-label">Company</label>
                        <input type="text" name="deliveryCompany" v-model="scheduleData.delivery.company" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('deliveryCompany') && validationStarted}" v-bind:disabled="disableAddressDelivery" @change="changeKeyWord('delivery')">
                        <span v-if="errors.has('deliveryCompany') && validationStarted" class="help is-danger">{{ errors.first('deliveryCompany') }}</span>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <label class="input-label">Address 1</label>
                        <input type="text" name="deliveryAddress1" v-model="scheduleData.delivery.address1" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('deliveryAddress1') || validDeliveryAddress}" v-bind:disabled="disableAddressDelivery" @change="changeKeyWord('delivery')">
                        <span v-if="errors.has('deliveryAddress1')" class="help is-danger">{{ errors.first('deliveryAddress1') }}</span>
                        <span v-if="validDeliveryAddress" class="help is-danger">Invalid Address</span>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <label class="input-label optional-label">Address 2 </label>
                        <input type="text" v-model="scheduleData.delivery.address2" v-bind:disabled="disableAddressDelivery">
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <div class="grid-60 tablet-grid-60">
                            <label class="input-label">City</label>
                            <input type="text" v-model="quotePageData.delivery.city" disabled>
                        </div>

                        <div class="grid-20 tablet-grid-20">
                            <label class="input-label">State</label>
                            <input type="text" v-model="quotePageData.delivery.state" disabled>
                        </div>

                        <div class="grid-20 tablet-grid-20">
                            <label class="input-label">Zip Code</label>
                            <input type="text" value="0" v-model="quotePageData.delivery.zipCode" disabled>
                        </div>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <label class="input-label optional-label">Email</label>
                        <input type="text" name="deliveryEmail" v-model="scheduleData.delivery.email" v-validate="'email'" :class="{'input': true, 'is-danger': errors.has('deliveryEmail')}">
                        <span v-if="errors.has('deliveryEmail')" class="help is-danger">{{ errors.first('deliveryEmail') }}</span>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <div class="grid-50 tablet-grid-50">
                            <label class="input-label">Phone</label>
                            <input type="text" v-mask="'000-000-0000'" name="deliveryPhone" maxlength="12" v-model="scheduleData.delivery.phone" v-validate="'required|length:12'" :class="{'input': true, 'is-danger': errors.has('deliveryPhone') && validationStarted}" v-bind:disabled="disableAddressDelivery" @change="changeKeyWord('delivery')">
                            <span v-if="errors.has('deliveryPhone') && validationStarted" class="help is-danger">{{ errors.first('deliveryPhone') }}</span>
                        </div>

                        <div class="grid-50 tablet-grid-50">
                            <label class="input-label optional-label">Fax</label>
                            <input type="text" v-mask="'000-000-0000'" maxlength="12" v-model="scheduleData.delivery.fax" name="deliveryFax" v-validate="'length:12'" :class="{'input': true, 'is-danger': errors.has('deliveryFax') && validationStarted}" v-bind:disabled="disableAddressDelivery">
                            <span v-if="errors.has('deliveryFax') && validationStarted" class="help is-danger">{{ errors.first('deliveryFax') }}</span>
                        </div>
                    </div>

                    <div class="grid-55 tablet-grid-50 container margin-bottom-40">
                         <button class="button-standard-small" @click="saveToAddressBook('delivery')" v-bind:disabled="disableSaveAddressBookDelivery">Save to address book</button>
                    </div>

                    <div v-if="showPickupToolMsg" class="grid-80 tablet-grid-100 container info-container notification-container" style="width:85%;">
                        <button class="close-modal-x" @click="showPickupToolMsg = false"></button>
                        <p>Shipments that are entered after
                            <span class="text-bold">11:00 AM</span> or picked up after
                            <span class="text-bold"> 3:00 PM</span> may be processed the following day.</p>
                        <p>This may or may not cause a delay in delivery.</p>
                    </div>

                    <div class="grid-100 tablet-grid-100 container">
                        <h1 class="step-header">
                            <span class="label-number active">3</span>Add Your Reference Number
                        </h1>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <p>Add a reference number from your CRM so you can track this shipment more easily.</p>
                    </div>

                    <div class="grid-50 tablet-grid-60 add-margin-40">
                        <label class="input-label optional-label">Order Reference #
                            <span class="tooltip-light" v-tooltip.bottom="tooltipMessages.reference"></span>
                        </label>
                        <input type="text" v-model="quoteData.orderReference" name="orderReference" v-validate="'alpha_num'" :class="{'input': true, 'is-danger': errors.has('orderReference')}">
                        <span v-if="errors.has('orderReference')" class="help is-danger">{{ errors.first('orderReference') }}</span>
                    </div>
                </div>
            </div>
        </div>

        <MainButtonSet @rightBtnAction="validate" @leftBtnAction="showModal"></MainButtonSet>
        <DefaultModal :modalName="modalName" :title="'Cancel Schedule Pickup'" :rightBtnText="'Yes, Cancel Pickup'" :leftBtnText="'Nevermind'" @rightBtnAction="confirmModal" @leftBtnAction="closeModal">
            <p>Are you sure you want to cancel this pickup?</p>
            <p>Canceled pickups will be reverted back to a 'Saved Quote'.</p>
        </DefaultModal>

        <DefaultModal :modalName="pickupModal" :title="'Pickup Address Suggestion'" :rightBtnText="pickupModalrightBtnText" :leftBtnText="'Cancel'" @rightBtnAction="showDeliveryModal" @leftBtnAction="closePickupModal" :rightBtnStyle="rightBtnStyle">
            <div class="grid-parent grid-100 tablet-grid-100 container">
                <div class="grid-50 tablet-grid-50">
                    <input type="radio" id="inputedPickupAddress" name="pickupRadio" v-model="suggestedRadioPickup" v-bind:value="'inputted'">
                    <label class="radio" for="inputedPickupAddress">
                        <span class="section-header-modal">Inputted Address</span>
                    </label>
                    <div class="modal-suggestion-details">
                        <br>
                        <br>
                        <span>{{scheduleData.pickup.address1}} {{scheduleData.pickup.address2}}</span>
                        <br>
                        <span>{{quotePageData.pickup.city}}, {{quotePageData.pickup.state}} {{quotePageData.pickup.zipCode}}</span>
                    </div>
                </div>
                <div class="grid-50 tablet-grid-50">
                    <input type="radio" id="suggestedPickupAddress" name="pickupRadio" v-model="suggestedRadioPickup" v-bind:value="'suggested'">
                    <label class="radio" for="suggestedPickupAddress">
                        <span class="section-header-modal">Suggested Address</span>
                    </label>
                    <div class="modal-suggestion-details">
                        <br>
                        <br>
                        <span>{{suggestedPickup.StreetAddress}}</span>
                        <br>
                        <span>{{suggestedPickup.City}}, {{suggestedPickup.State}} {{suggestedPickup.Zip}}</span>
                    </div>
                </div>
            </div>
        </DefaultModal>

        <DefaultModal :modalName="deliveryModal" :title="'Shipping Address Suggestion'" :rightBtnText="'Submit'" :leftBtnText="'Cancel'" @rightBtnAction="confirmDeliveryModal" @leftBtnAction="closeDeliveryModal" :rightBtnStyle="rightBtnStyle">
            <div class="grid-parent grid-100 tablet-grid-100 container">
                <div class="grid-50 tablet-grid-50">
                    <input type="radio" id="inputedDeliveryAddress" name="deliveryRadio" v-model="suggestedRadioDelivery" v-bind:value="'inputted'">
                    <label class="radio" for="inputedDeliveryAddress">
                        <span class="section-header-modal">Inputted Address</span>
                    </label>
                    <div class="modal-suggestion-details">
                        <br>
                        <br>
                        <span>{{scheduleData.delivery.address1}} {{scheduleData.delivery.address2}}</span>
                        <br>
                        <span>{{quotePageData.delivery.city}}, {{quotePageData.delivery.state}} {{quotePageData.delivery.zipCode}}</span>
                    </div>
                </div>
                <div class="grid-50 tablet-grid-50">
                    <input type="radio" id="suggestedDeliveryAddress" name="deliveryRadio" v-model="suggestedRadioDelivery" v-bind:value="'suggested'">
                    <label class="radio" for="suggestedDeliveryAddress">
                        <span class="section-header-modal">Suggested Address</span>
                    </label>
                    <div class="modal-suggestion-details">
                        <br>
                        <br>
                        <span>{{suggestedDelivery.StreetAddress}}</span>
                        <br>
                        <span>{{suggestedDelivery.City}}, {{suggestedDelivery.State}} {{suggestedDelivery.Zip}}</span>
                    </div>
                </div>
            </div>
        </DefaultModal> 

        <DefaultModal :modalName="addressBookModal" :title="'Select From Address Book'" :rightBtnText="'Select Company'" :leftBtnText="'Cancel'" @rightBtnAction="selectCompany" @leftBtnAction="closeAddressBookModal" :rightBtnStyle="addressBookrightBtnStyle">
                 <div class="grid-100 tablet-grid-100 container">
                    <p>The following companies match the zipcode and location type provided on the "Get a Quote" Page. Please select the company you wish to use.</p>
                 </div>
                 <div class="grid-100 tablet-grid-100 container" v-for="(item,key) in this.addressList" :key="item['location_id']">
                    <input type="radio" v-bind:id="item['location_id']" name="addressRadio" v-model="selectaddressRadio" v-bind:value="item['location_id']">
                    <label class="radio" v-bind:for="item['location_id']">
                        <span style="color: #15223d; font-size:16px; font-weight:600 !important;">{{ item['location_name'] }}</span>
                    </label>
                    <div style="text-align: left;margin-left:30px; margin-top: 33px;">
                        <span style="color: #15223d; font-size:16px;">{{ item['location_street'] }}</span>
                        <br>
                        <span style="color: #15223d; font-size:16px;">{{ item['location_city'] }}, {{ item['location_state'] }} {{ item['location_zip']}}</span>
                    </div>
                </div> 
        </DefaultModal>

    </div>
</template>
<style lang="scss" src="./schedulePickup.scss" scoped></style>