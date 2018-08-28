<template>
    <div class="grid-container">
        <div class="row grid-container">
            <div class="grid-100 tablet-grid-100">
                <SchedulePickupHeader></SchedulePickupHeader>
            </div>

            <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                <div class="grid-100 tablet-grid-100 mobile-grid-100 container step-container">
                    <div class="grid-100 tablet-grid-100 container">
                        <h1 class="step-header">
                            <span class="label-number active">4</span>Who should we send the invoice to?</h1>
                    </div>

                    <div class="grid-50 tablet-grid-50 mobile-grid-100">
                        <div class="grid-80 tablet-grid-100 mobile-grid-100 container">
                            <div class="grid-100 tablet-grid-100">
                                <label class="input-label">Company</label>
                                <input type="text" v-model="accountData.billing.locationName" disabled="">
                            </div>
                        </div>

                        <div class="grid-80 tablet-grid-100 container mobile-grid-100">
                            <div class="grid-100 tablet-grid-90 mobile-grid-100">
                                <label class="input-label">Address 1</label>
                                <input type="text" v-model="accountData.billing.address1" disabled="">
                            </div>
                        </div>

                        <div class="grid-80 tablet-grid-100 container">
                            <div class="grid-60 tablet-grid-60 mobile-grid-70">
                                <label class="input-label">City</label>
                                <input type="text" v-model="accountData.billing.city" disabled="">
                            </div>

                            <div class="grid-20 tablet-grid-20 mobile-grid-30">
                                <label class="input-label">State</label>
                                <input type="text" v-model="accountData.billing.state" disabled="">
                            </div>

                            <div class="grid-20 tablet-grid-20 mobile-grid-30">
                                <label class="input-label">Zip Code</label>
                                <input type="text" v-model="accountData.billing.zip" disabled="">
                            </div>
                        </div>

                        <div class="grid-80 tablet-grid-100 mobile-grid-100 container">
                            <div class="grid-100 tablet-grid-90">
                                <label class="input-label">Email</label>
                                <input type="text" v-model="accountData.user.email" disabled="">
                            </div>
                        </div>

                        <div class="grid-80 tablet-grid-100 mobile-grid-100 container">
                            <div class="grid-60 tablet-grid-60">
                                <label class="input-label">Phone</label>
                                <input type="text" v-model="accountData.shipping.phone" disabled="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid-container">
            <div class="grid-100 tablet-grid-100">
                <div class="grid-100 tablet-grid-100 container title">
                    <h1 class="title">Confirm Shipment Details</h1>
                </div>

                <div class="grid-parent grid-100 tablet-grid-100 container">
                    <div class="grid-50 tablet-grid-50">
                        <div class="grid-100 tablet-grid-100">
                            <h1 class="step-header">
                                <span class="label-number-summary">1</span>Where are we picking up?</h1>
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <table class="table-details">
                                <tbody>
                                    <tr>
                                        <td>Type</td>
                                        <td>{{pickupLocationType}}</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>{{scheduleData.pickup.company}}<br>{{pickupAddress}}<br>{{pickupCityState}}
                                        </td>
                                        <td>
                                            <div v-if="quoteData.pickup.liftGate">
                                                <input type="checkbox" id="test1" :checked="quoteData.pickup.liftGate" disabled>
                                                <label class="checkbox" for="test1">
                                                    <span>Lift Gate Required</span>
                                                </label>
                                            </div>
                                            <br>
                                            <div v-if="quoteData.pickup.limitedAccess">
                                                <input type="checkbox" id="test1" :checked="quoteData.pickup.limitedAccess" disabled>
                                                <label class="checkbox" for="test1">
                                                    <span>Limited Access</span>
                                                </label>
                                            </div>
                                            <br>
                                            <div v-if="quoteData.pickup.palletJack">
                                                <input type="checkbox" id="test2" :checked="quoteData.pickup.palletJack" disabled>
                                                <label class="checkbox" for="test2">
                                                    <span>Pallet Jack Required</span>
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ready for Pickup</td>
                                        <td>{{pickupDateRange}}<br> {{pickupTimeRange}}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="grid-50 tablet-grid-50">
                        <div class="grid-100 tablet-grid-100">
                            <h1 class="step-header">
                                <span class="label-number-summary">2</span>Where are we delivering?</h1>
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <table class="table-details">
                                <tbody>
                                    <tr>
                                        <td>Type</td>
                                        <td>{{deliveryLocationType}}</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>{{scheduleData.delivery.company}}<br>{{deliveryAddress}}<br>{{deliveryCityState}}
                                        </td>
                                        <td>
                                            <div v-if="quoteData.delivery.liftGate">
                                                <input type="checkbox" id="test3" :checked="quoteData.delivery.liftGate" disabled>
                                                <label class="checkbox" for="test3">
                                                    <span>Lift Gate Required</span>
                                                </label>
                                            </div>
                                            <br>
                                            <div v-if="quoteData.delivery.limitedAccess">
                                                <input type="checkbox" id="test1" :checked="quoteData.delivery.limitedAccess" disabled>
                                                <label class="checkbox" for="test1">
                                                    <span>Limited Access</span>
                                                </label>
                                            </div>
                                            <br>
                                            <div v-if="quoteData.delivery.palletJack">
                                                <input type="checkbox" id="test4" :checked="quoteData.delivery.palletJack" disabled>
                                                <label class="checkbox" for="test4">
                                                    <span>Pallet Jack Required</span>
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="grid-100 tablet-grid-100 container margin-bottom-40">
                    <div class="grid-50 tablet-grid-50">
                        <div class="grid-25 tablet-grid-40" style="margin-left: 40px;">
                            <button class="button-standard-small edit" @click="redirectToSchedulePickup" :disabled="isProcessing"> Edit</button>
                        </div>
                    </div>

                    <div class="grid-50 tablet-grid-50">
                        <div class="grid-25 tablet-grid-40" style="margin-left: 50px;">
                            <button class="button-standard-small edit" @click="redirectToSchedulePickup" :disabled="isProcessing"> Edit</button>
                        </div>
                    </div>
                </div>

                <div class="grid-100 tablet-grid-100 container">
                    <div class="grid-50 tablet-grid-50">
                        <div class="grid-100 tablet-grid-100">
                            <h1 class="step-header">
                                <span class="label-number-summary">3</span>Add Your Reference Number</h1>
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <br/>
                            <table class="table-details">
                                <tbody>
                                    <tr>
                                        <td>Order Reference #</td>
                                        <td>
                                            {{quoteData.orderReference}}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <br/>
                        </div>

                        <div class="grid-25 tablet-grid-40" style="margin-left: 50px; padding-top:13px">
                            <button class="button-standard-small edit" @click="redirectToSchedulePickup" :disabled="isProcessing">Edit</button>
                        </div>
                    </div>

                    <div class="grid-50 tablet-grid-50">
                        <div class="grid-100 tablet-grid-100">
                            <h1 class="step-header">
                                <span class="label-number-summary">4</span>Who should we send the invoice to?</h1>
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <table class="table-details">
                                <tbody>
                                    <tr>
                                        <td>Address</td>
                                        <td>
                                            {{accountData.billing.locationName}}<br> <br>{{accountData.billing.address1}}<br> {{accountData.billing.city}}, {{accountData.billing.state}} {{accountData.billing.zip}}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="grid-100 tablet-grid-100 container">
                    <div class="grid-50 tablet-grid-50">
                        <div class="grid-100 tablet-grid-100">
                            <h1 class="step-header">
                                <span class="label-number-summary">5</span>What are we carrying?</h1>
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <table class="table-details">
                                <tbody>
                                    <template v-for="(item,index) in quoteData.pallets">
                                        <tr :key="index + 'first'">
                                            <td>Description</td>
                                            <td>{{item.description}}</td>
                                            <td>
                                                <div class="manifest-line-count">{{index + 1}}</div>
                                            </td>
                                        </tr>
                                        <tr :key="index + 'seconed'">
                                            <td>Pallets</td>
                                            <td>{{item.quantity}} {{getpalletDimensionsOptions(item.palletType)}}</td>
                                            <td v-if="item.stackable">
                                                <input type="checkbox" :checked="item.stackable" disabled>
                                                <label class="checkbox">
                                                    <span>Stackable?</span>
                                                </label>
                                            </td>
                                        </tr>
                                    </template>
                                    <tr>
                                        <td colspan="3">
                                            <span class="line"></span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Total Pallets</td>
                                        <td>{{totalPallets}}</td>
                                    </tr>
                                    <tr>
                                        <td>Class</td>
                                        <td>55</td>
                                    </tr>
                                    <tr>
                                        <td>Total Weight</td>
                                        <td>{{allTotalWeight}} lbs</td>
                                    </tr>
                                    <tr>
                                        <td>Pallet Position{{quoteData.palletSpaces > 1 ? "s" : ""}}</td>
                                        <td>{{quoteData.palletSpaces}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                <MainButtonSet @rightBtnAction="accept" @leftBtnAction="cancel"  :rightBtnText="modalConfirmText" v-show="!isProcessing"></MainButtonSet>

                <transition name="list">
                    <div class="grid-100 tablet-grid-100 container" v-show="isProcessing">
                        <div class="grid-20 tablet-grid-50 toast-message">
                            <p>Hang tight! We are creating your order...</p>
                        </div>
                    </div>
                </transition>

                <div>&nbsp;</div>
            </div>
        </div>




        <DefaultModal :modalName="modalName" :title="'Order Confirmation'" :closeButton="false" :rightBtnText="'Finished'" :leftBtnText="'Get Another Quote'" :rightBtnStyle="rightBtnStyle" @rightBtnAction="backToHome" @leftBtnAction="getAnotherQuote">
            <p>Your order
                <u>
                    <strong><a v-bind:href="this.orderPageLink" target="_blank">#{{this.orderId}}</a></strong>
                </u> has been placed!</p><br/>
        </DefaultModal>
        <DefaultModal :modalName="cancelScheduleModalName" :title="'Cancel Pickup'" :rightBtnText="'Yes, Cancel Pickup'" :leftBtnText="'Nevermind'" @rightBtnAction="cancelScheduleRightBtnAction" @leftBtnAction="cancelScheduleLeftBtnAction">
            <p>Are you sure you want to cancel this pickup?</p>
            <p>Canceled pickups will be reverted back to a 'Saved Quote'.</p>
        </DefaultModal>
    </div>

</template>