<template>
    <div class="grid-container">
        <div class="row grid-container">
            <div class="grid-100 tablet-grid-100">
                <SchedulePickupHeader></SchedulePickupHeader>
            </div>

            <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                <div class="grid-100 tablet-grid-50 mobile-grid-100 container step-container">
                    <div class="grid-100 tablet-grid-100 container">
                        <h1 class="step-header">
                            <span class="label-number active">4</span>Who should we send the invoice to?</h1>
                    </div>

                    <div class="grid-50 tablet-grid-50 mobile-grid-100">
                        <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                            <div class="grid-100 tablet-grid-100">
                                <label class="input-label">Company</label>
                                <input type="text" value="Freshzim" disabled="">
                            </div>
                        </div>

                        <div class="grid-100 tablet-grid-100 container mobile-grid-100">
                            <div class="grid-100 tablet-grid-90 mobile-grid-100">
                                <label class="input-label">Address 1</label>
                                <input type="text" value="1218 Brannon Street" disabled="">
                            </div>
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <div class="grid-60 tablet-grid-60 mobile-grid-70">
                                <label class="input-label">City</label>
                                <input type="text" value="Los Angeles" disabled="">
                            </div>

                            <div class="grid-20 tablet-grid-20 mobile-grid-30">
                                <label class="input-label">State</label>
                                <input type="text" value="CA" disabled="">
                            </div>

                            <div class="grid-20 tablet-grid-20 mobile-grid-30">
                                <label class="input-label">Zip Code</label>
                                <input type="text" value="90014" disabled="">
                            </div>
                        </div>

                        <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                            <div class="grid-100 tablet-grid-90">
                                <label class="input-label">Email</label>
                                <input type="text" value="connie@abccompany.com" disabled="">
                            </div>
                        </div>

                        <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                            <div class="grid-60 tablet-grid-60">
                                <label class="input-label">Phone</label>
                                <input type="text" value="213-529-0000" disabled="">
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

                <div class="grid-100 tablet-grid-100 container">
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
                                            <input type="checkbox" id="test1" :checked="quoteData.pickup.liftGate" disabled>
                                            <label class="checkbox" for="test1">
                                                <span>Lift Gate Required</span>
                                            </label>
                                            <br>
                                            <input type="checkbox" id="test2" :checked="quoteData.pickup.palletJack" disabled>
                                            <label class="checkbox" for="test2">
                                                <span>Pallet Jack Required</span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ready for Pickup</td>
                                        <td>02/06/2018<br> 12:00 (12:00 PM) to 17:00 (5:00 PM)
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
                                            <input type="checkbox" id="test3" :checked="quoteData.delivery.liftGate" disabled>
                                            <label class="checkbox" for="test3">
                                                <span>Lift Gate Required</span>
                                            </label>
                                            <br>
                                            <input type="checkbox" id="test4" :checked="quoteData.delivery.palletJack" disabled>
                                            <label class="checkbox" for="test4">
                                                <span>Pallet Jack Required</span>
                                            </label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="grid-100 tablet-grid-100 container margin-bottom-40">
                    <div class="grid-50 tablet-grid-50">
                        <div class="grid-25 tablet-grid-40">
                            <button class="button-standard-small edit" @click="redirectToSchedulePickup"> Edit</button>
                        </div>
                    </div>

                    <div class="grid-50 tablet-grid-50">
                        <div class="grid-25 tablet-grid-40">
                            <button class="button-standard-small edit" @click="redirectToSchedulePickup"> Edit</button>
                        </div>
                    </div>
                </div>

                <div class="grid-100 tablet-grid-100 container">
                    <div class="grid-50 tablet-grid-50">
                        <div class="grid-100 tablet-grid-100">
                            <h1 class="step-header">
                                <span class="label-number-summary">3</span>What are we carrying?</h1>
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <table class="table-details">
                                <tbody>
                                    <template v-for="(item,index) in quoteData.pallets">
                                        <tr :key="index">
                                            <td>Description</td>
                                            <td>{{item.description}}</td>
                                            <td>
                                                <div class="manifest-line-count">{{index + 1}}</div>
                                            </td>
                                        </tr>
                                        <tr :key="index">
                                            <td>Pallets</td>
                                            <td>{{item.quantity}} {{getpalletDimensionsOptions(item.palletType)}}</td>
                                            <td>
                                                <input type="checkbox" id="test5" :checked="item.stackable" disabled>
                                                <label class="checkbox" for="test5">
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
                                        <td>Pallet Spaces</td>
                                        <td>{{quoteData.palletSpaces}}</td>
                                    </tr>
                                </tbody>
                            </table>
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
                                            Freshzim<br> Connie King<br> 1218 Brannon Street<br> Los Angeles, CA 90014
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="grid-25 tablet-grid-40">
                            <button class="button-standard-small edit" disabled="">Edit</button>
                        </div>
                    </div>

                </div>

                <div class="grid-100 tablet-grid-100 container margin-bottom-40">
                    <div class="grid-50 tablet-grid-50">
                        <div class="grid-25 tablet-grid-40">
                            <button class="button-standard-small edit" disabled=""> Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <MainButtonSet :rightBtnAction="showModal" :leftBtnAction="cancel"></MainButtonSet>

        <DefaultModal :modalName="modalName" :title="modalTitle" :message="modalMessage" :rightBtnText="modalConfirmText" :rightBtnAction="closeModal" :leftBtnText="modalCancelText"></DefaultModal>
    </div>

</template>