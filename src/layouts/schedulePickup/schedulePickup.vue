<template>

    <div class="grid-100 tablet-grid-100 grid-container">

        <div class="grid-100 tablet-grid-100">

            <SchedulePickupHeader></SchedulePickupHeader>

            <div class="grid-100 tablet-grid-100 container">
                <div class="grid-50 tablet-grid-50 container">
                    <div class="grid-100 tablet-grid-100 container">
                        <h1 class="step-header">
                            <span class="label-number active">1</span>Where are we picking up?</h1>
                    </div>

                    <div class="grid-50 tablet-grid-70 container">
                        <label class="input-label">Location Type</label>
                        <select class="dropdown" v-model="quotePageData.pickup.locationType" disabled>
                            <option v-for="(item,key) in quotePageData.locationTypeOptions" :key="key" :value="item.key">{{item.value}}</option>
                        </select>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <label class="input-label">Company</label>
                        <input type="text" v-model="scheduleData.pickup.company" name="pickupCompany" v-validate.disable="'required'" :class="{'input': true, 'is-danger': errors.has('pickupCompany') }">
                        <span v-if="errors.has('pickupCompany')" class="help is-danger">{{ errors.first('pickupCompany') }}</span>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <label class="input-label">Address 1</label>
                        <input type="text" v-model="scheduleData.pickup.address1" name="pickupAddress1" v-validate.disable="'required'" :class="{'input': true, 'is-danger': errors.has('pickupAddress1') }">
                        <span v-if="errors.has('pickupAddress1')" class="help is-danger">{{ errors.first('pickupAddress1') }}</span>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <label class="input-label">Address 2 </label>
                        <input type="text" v-model="scheduleData.pickup.address2">
                    </div>

                    <div class="grid-100 tablet-grid-100 container">
                        <div class="grid-40 tablet-grid-40">
                            <label class="input-label">City</label>
                            <input type="text" v-model="quotePageData.pickup.city" disabled>
                        </div>

                        <div class="grid-20 tablet-grid-40">
                            <label class="input-label">State</label>
                            <input type="text" v-model="quotePageData.pickup.state" disabled>
                        </div>

                        <div class="grid-20 tablet-grid-40">
                            <label class="input-label">Zip Code</label>
                            <input type="text" value="0" v-model="quotePageData.pickup.zipCode" disabled>
                        </div>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <label class="input-label">Email</label>
                        <input type="text" v-model="scheduleData.pickup.email" name="pickupEmail" v-validate.disable="'required|email'" :class="{'input': true, 'is-danger': errors.has('pickupEmail')}">
                        <span v-if="errors.has('pickupEmail')" class="help is-danger">{{ errors.first('pickupEmail') }}</span>
                    </div>

                    <div class="grid-100 tablet-grid-100 container">
                        <div class="grid-40 tablet-grid-50">
                            <label class="input-label">Phone</label>
                            <input type="text" v-model="scheduleData.pickup.phone" name="pickupPhone" v-validate.disable="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('pickupPhone')}">
                            <span v-if="errors.has('pickupPhone')" class="help is-danger">{{ errors.first('pickupPhone') }}</span>
                        </div>

                        <div class="grid-40 tablet-grid-50">
                            <label class="input-label optional-label">Fax</label>
                            <input type="text" v-model="scheduleData.pickup.fax">
                        </div>
                    </div>

                    <div class="grid-100 tablet-grid-100 container">
                        <h1 class="section-header">Pickup Window Date & Hours</h1>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <div class="grid-40 container">
                            <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                                <div class="grid-100 tablet-grid-90">
                                    <label class="input-label">Earliest Pickup Date</label>
                                    <Datepicker :input-class="{'input-date':true,'input': true, 'is-danger': errors.has('earliestPickupDate') || !validPickupDateTime && validationStarted}" placeholder="select" v-bind:format="dateFormat" name="earliestPickupDate" v-model="scheduleData.pickup.earliestPickupDate" v-validate.disable="{required:true}"></Datepicker>
                                </div>
                            </div>

                            <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                                <div class="grid-100 tablet-grid-90">
                                    <label class="input-label">Earliest Pickup Time</label>
                                    <select class="input-time" v-model="scheduleData.pickup.earliestPickupTime" :class="{'input-date':true,'input': true, 'is-danger': !validPickupDateTime && validationStarted}">
                                        <option v-for="(item, key) in getTimeOptions()" :key="key">{{item}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="grid-10 tablet-grid-10" style="margin-top: 15px;">
                            <label>&nbsp;</label>
                            <label>to</label>
                        </div>

                        <div class="grid-40 container">
                            <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                                <div class="grid-100 tablet-grid-90">
                                    <label class="input-label">Latest Pickup Date</label>
                                    <Datepicker :input-class="{'input-date':true,'input': true, 'is-danger': errors.has('latestPickupDate') || !validPickupDateTime && validationStarted}" placeholder="select" v-bind:format="dateFormat" name="latestPickupDate" v-model="scheduleData.pickup.latestPickupDate" v-validate.disable="{required:true}"></Datepicker>
                                </div>
                            </div>

                            <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                                <div class="grid-100 tablet-grid-90">
                                    <label class="input-label">Latest Pickup Time</label>
                                    <select class="input-time" v-model="scheduleData.pickup.latestPickupTime" :class="{'input-date':true,'input': true, 'is-danger': !validPickupDateTime && validationStarted}">
                                        <option v-for="(item, key) in getTimeOptions()" :key="key">{{item}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <label class="input-label">Special Instructions
                            <span class="character-limit">({{instruction_MaxCharacters}} character limit)</span>
                        </label>
                        <textarea v-model="scheduleData.pickup.instructions" :maxlength="instruction_MaxCharacters"></textarea>
                        <span class="character-limit">{{remainingWords}} characters remaining</span>
                    </div>
                </div>

                <div class="grid-50 tablet-grid-50 container" style="position: relative;">
                    <div class="grid-100 tablet-grid-100 container">
                        <h1 class="step-header">
                            <span class="label-number">2</span>Where are we delivering?</h1>
                    </div>

                    <div class="grid-50 tablet-grid-70 container">
                        <label class="input-label">Location Type</label>
                        <select class="dropdown" v-model="quotePageData.delivery.locationType" disabled>
                            <option v-for="(item,key) in quotePageData.locationTypeOptions" :key="key" :value="item.key">{{item.value}}</option>
                        </select>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <label class="input-label">Company</label>
                        <input type="text" name="deliveryCompany" v-model="scheduleData.delivery.company" v-validate.disable="'required'" :class="{'input': true, 'is-danger': errors.has('deliveryCompany') }">
                        <span v-if="errors.has('deliveryCompany')" class="help is-danger">{{ errors.first('deliveryCompany') }}</span>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <label class="input-label">Address 1</label>
                        <input type="text" name="deliveryAddress1" v-model="scheduleData.delivery.address1" v-validate.disable="'required'" :class="{'input': true, 'is-danger': errors.has('deliveryAddress1') }">
                        <span v-if="errors.has('deliveryAddress1')" class="help is-danger">{{ errors.first('deliveryAddress1') }}</span>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <label class="input-label">Address 2 </label>
                        <input type="text" v-model="scheduleData.delivery.address2">
                    </div>

                    <div class="grid-100 tablet-grid-100 container">
                        <div class="grid-40 tablet-grid-40">
                            <label class="input-label">City</label>
                            <input type="text" v-model="quotePageData.delivery.city" disabled>
                        </div>

                        <div class="grid-20 tablet-grid-40">
                            <label class="input-label">State</label>
                            <input type="text" v-model="quotePageData.delivery.state" disabled>
                        </div>

                        <div class="grid-20 tablet-grid-40">
                            <label class="input-label">Zip Code</label>
                            <input type="text" value="0" v-model="quotePageData.delivery.zipCode" disabled>
                        </div>
                    </div>

                    <div class="grid-80 tablet-grid-100 container">
                        <label class="input-label">Email</label>
                        <input type="text" name="deliveryEmail" v-model="scheduleData.delivery.email" v-validate.disable="'required|email'" :class="{'input': true, 'is-danger': errors.has('deliveryEmail') }">
                        <span v-if="errors.has('deliveryEmail')" class="help is-danger">{{ errors.first('deliveryEmail') }}</span>
                    </div>

                    <div class="grid-100 tablet-grid-100 container">
                        <div class="grid-40 tablet-grid-50">
                            <label class="input-label">Phone</label>
                            <input type="text" name="deliveryPhone" v-model="scheduleData.delivery.phone" v-validate.disable="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('deliveryPhone') }">
                            <span v-if="errors.has('deliveryPhone')" class="help is-danger">{{ errors.first('deliveryPhone') }}</span>
                        </div>

                        <div class="grid-40 tablet-grid-50">
                            <label class="input-label optional-label">Fax</label>
                            <input type="text" v-model="scheduleData.delivery.fax">
                        </div>
                    </div>

                    <div class="grid-80 tablet-grid-100 container info-container notification-container">
                        <p>Shipments that are picked up after
                            <span class="text-bold"> 15:00 (3:00 PM)</span> may be processed the following day.</p>
                        <p>This may or may not cause a delay in delivery.</p>
                    </div>
                </div>
            </div>
        </div>

        <MainButtonSet :rightBtnAction="validate" :leftBtnAction="showModal"></MainButtonSet>
        <DefaultModal :modalName="modalName" :title="modalTitle" :message="modalMessage" @rightBtnAction="confirmModal" @leftBtnAction="closeModal"></DefaultModal>
    </div>

</template>
