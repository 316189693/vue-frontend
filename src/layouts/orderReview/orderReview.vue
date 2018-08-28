<template>
    <div id="grid-container">
        <div class="grid-100 tablet-grid-100">
            <div class="grid-100 tablet-grid-80 container title">
                <div class="grid-80 tablet-grid-70">
                    <h1 class="title">PRO #: {{formData.proNumber}}</h1>
                    <p class="sub-title sub-header" v-if="formData.referenceNumber">Reference #: {{formData.referenceNumber}}</p>
                </div>
                <div class="grid-20 tablet-grid-30">
                    <h1 class="title">
                        <button class="button-yellow-medium" @click="trackShipment">Track Shipment</button>
                    </h1>
                </div>
            </div>

            <div class="grid-100 tablet-grid-100 container">
                <div class="grid-parent grid-50 tablet-grid-80 container step-container add-margin-bottom">
                    <div class="grid-100 tablet-grid-100">
                        <h1 class="step-header">
                            <span class="label-number-summary">1</span>Where are we picking up?</h1>
                    </div>

                    <div class="grid-100 tablet-grid-100 container">
                        <table class="table-details">
                            <tbody>
                                <tr>
                                    <td>Type</td>
                                    <td>{{formData.pickup.locationTypeText}}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>
                                        <span class="order-review-address-textOverflow" :title="formData.pickup.shipper">{{formData.pickup.shipper}}</span>
                                        <br>
                                        <span class="order-review-address-textOverflow" :title="formData.pickup.street">{{formData.pickup.street}}</span><br>
                                        <span class="order-review-address-textOverflow" v-if="formData.pickup.street2" :title="formData.pickup.street2">{{formData.pickup.street2}}</span><br v-if="formData.pickup.street2">
                                        <span class="order-review-address-textOverflow" :title="PickupCityState"> {{PickupCityState}}</span>
                                    </td>
                                    <td>
                                        <template v-if="formData.pickup.liftGate">
                                            <input type="checkbox" id="test3" checked="" disabled="">
                                            <label class="checkbox" for="test3">
                                                <span>Lift Gate Required</span>
                                            </label>
                                             <div ></div>
                                        </template>
                                        <template v-if="formData.pickup.limitedAccess">
                                            <input type="checkbox" id="test4" checked="" disabled="">
                                            <label class="checkbox" for="test4">
                                                <span>Limited Access</span>
                                            </label>

                                            <div v-if="formData.pickup.limitedAccess && formData.pickup.palletJack"></div>
                                        </template>
                                        <template v-if="formData.pickup.palletJack">
                                            <input type="checkbox" id="test4" checked="" disabled="">
                                            <label class="checkbox" for="test4">
                                                <span>Pallet Jack Required</span>
                                            </label>
                                        </template>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ready for Pickup</td>
                                    <td>{{formData.pickup.pickupDate}}<br> {{formData.pickup.pickupStr}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="grid-parent grid-50 tablet-grid-80 container step-container add-margin-bottom">
                    <div class="grid-100 tablet-grid-100">
                        <h1 class="step-header">
                            <span class="label-number-summary">2</span>Where are we delivering?</h1>
                    </div>

                    <div class="grid-100 tablet-grid-100 container">
                        <table class="table-details">
                            <tbody>
                                <tr>
                                    <td>Type</td>
                                    <td>{{formData.delivery.locationTypeText}}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>
                                        <span class="order-review-address-textOverflow" :title="formData.delivery.consignee">{{formData.delivery.consignee}}</span>
                                        <br>
                                        <span  class="order-review-address-textOverflow" :title="formData.delivery.street">{{formData.delivery.street}}</span><br>
                                         <span class="order-review-address-textOverflow"  v-if="formData.delivery.street2" :title="formData.delivery.street2">{{formData.delivery.street2}}</span><br v-if="formData.delivery.street2">
                                        <span class="order-review-address-textOverflow" :title="DeliveryCityState"> {{DeliveryCityState}}</span>
                                    </td>
                                    <td>
                                        <template v-if="formData.delivery.liftGate">
                                            <input type="checkbox" id="test3" checked="" disabled="">
                                            <label class="checkbox" for="test3">
                                                <span>Lift Gate Required</span>
                                            </label>
                                              <div ></div>
                                        </template>
                                        <template v-if="formData.delivery.limitedAccess">
                                            <input type="checkbox" id="test4" checked="" disabled="">
                                            <label class="checkbox" for="test4">
                                                <span>Limited Access</span>
                                            </label>
                                            <div v-if=" formData.delivery.limitedAccess && formData.delivery.palletJack"></div>

                                        </template>
                                        <template v-if="formData.delivery.palletJack">
                                            <input type="checkbox" id="test4" checked="" disabled="">
                                            <label class="checkbox" for="test4">
                                                <span>Pallet Jack Required</span>
                                            </label>
                                        </template>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="grid-100 tablet-grid-100 container">
                <div class="grid-parent grid-50 tablet-grid-80 container step-container add-margin-bottom">
                    <div class="grid-100 tablet-grid-100">
                        <h1 class="step-header">
                            <span class="label-number-summary">3</span>What are we carrying?</h1>
                    </div>

                    <div class="grid-100 tablet-grid-100 container">
                        <table class="table-details">
                            <tbody>
                                <template v-for="(item,index) in formData.carry.pallets">
                                    <tr>
                                        <td>Description</td>
                                        <td>{{item.description}}
                                        </td>
                                        <td>
                                            <div class="manifest-line-count">{{index+1}}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Pallets</td>
                                        <td>{{item.quantity}} Pallets (Standard: {{item.width}}″ x {{item.length}}″)</td>
                                        <td>
                                            <input type="checkbox" :id="input_stackble_index" checked="" disabled="" v-if="item.stackable">
                                            <label class="checkbox" :for="input_stackble_index" v-if="item.stackable">
                                                <span>Stackable?</span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Class</td>
                                        <td>{{item.palletClass}}</td>
                                        <td></td>
                                    </tr>
                                </template>

                                <tr v-if="formData.carry.pallets">
                                    <td colspan="3">
                                        <span class="line"></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Total Pallets</td>
                                    <td>{{formData.carry.totalPallets}}</td>
                                </tr>
                                <tr>
                                    <td>Total Weight</td>
                                    <td>{{formData.carry.totalWeight}}</td>
                                </tr>
                                <tr>
                                    <td>Pallet Spaces</td>
                                    <td>{{formData.carry.palletSpaces}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="grid-parent grid-50 tablet-grid-80 container step-container add-margin-bottom">
                    <div class="grid-100 tablet-grid-100">
                        <h1 class="step-header">
                            <span class="label-number-summary">4</span>Documents</h1>
                    </div>

                    <div class="grid-100 tablet-grid-100 container" v-if="hasDocument">
                        <ul class="file-list">
                            <template v-for="document in formData.documents">
                                <li>
                                    <div class="file">
                                        <p class="file-category">{{document.file_category_name}}</p>
                                        <template v-if="document.file_category_name == 'Invoice'">
                                            <a :href="document.file_original_url" target="_BLANK" v-if="document.file_thumbnail_url">
                                                <img src="../../assets/images/pdf-icon.png">
                                            </a>
                                        </template>
                                        <template v-else>
                                            <a :href="document.file_original_url" target="_BLANK" v-if="document.file_thumbnail_url">
                                                <img :src="document.file_thumbnail_url">
                                            </a>
                                        </template>
                                    </div>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
     <div style="margin-top:30px;">
                <EstimatedQuote v-if="formData.quoteId"></EstimatedQuote>
     </div>
    </div>

</template>
<style lang="scss" src="./orderReview.scss" scoped></style>