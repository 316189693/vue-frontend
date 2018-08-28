<template>
<div class="grid-container">
            <div class="grid-100 tablet-grid-100">
                <div class="grid-100 tablet-grid-100 container title">
                    <h1 class="title">Track Shipments</h1>
                </div>

                <div class="grid-100 tablet-grid-100 container tracking-container">
                    <div class="grid-80 tablet-grid-70 mobile-grid-70">
                        <label class="input-label">Reference # or PRO # or PU #</label>
                        <input type="text" placeholder="Search by Reference # or PRO # or PU #"
                                :class="{'input-search': true, 'track-search': true, 'input-client-error': trackData.showNotFound}" v-model="proNumber"
                                @change="changeKeyWord">
                        <!--
                        <span v-if="trackData.showTerms" class="text-disclosure">By clicking "Track" you are agreeing to the
                            <span class="text-bold">Terms & Conditions</span>
                        </span>-->
                         <div class="info-container" id = "track_error_msg" v-if="trackData.multiOrder">
                             <p>
                                  <span class="info-message-title">Can't find your order? </span> <button class="close-modal-x"  @click="closeInfoMessage"></button></h1>
                             </p>

                             <p class="info-messag-body">Your Reference # might have multiple orders associated to it. Please try searching for the order by PRO #.</p>
                         </div>
                        <span v-if="trackData.showNotFound" class="error-message"><p>Could not find a shipment with this Reference #, PRO#, or PU#</p></span>
                    </div>

                    <div class="grid-15 tablet-grid-25" style="margin-top: 15px; margin-bottom: 20px; padding-right: 0px;">
                        <button @click="search" class="button-yellow-medium">Track</button>
                    </div>

                    <div v-if="trackData.showMultiOrder" class="grid-parent grid-100 tablet-grid-100">
                        <div class="grid-80 tablet-grid-100 card-table-container margin-bottom-40">
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
                                    <tr :id="'orderRow'+index" v-for="(order, index) in trackData.orders">
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
                </div>

                <template v-if="trackData.showTrack">

                    <TrackProgressBar :stage="processStage" :originDate="trackData.originDate" :originLocation="trackData.originLocation" :destinationDate="trackData.destinationDate" :destinationLocation="trackData.destinationLocation"></TrackProgressBar>

                    <div class="grid-100 tablet-grid-100 container title">
                        <table class="table-tracking">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(items,date) in trackData.details">
                                    <tr>
                                        <td colspan="3" class="date text-bold">{{date}}</td>
                                    </tr>
                                    <template v-for="detail in items">
                                        <tr>
                                            <td>{{detail.formatedTime}}</td>
                                            <td>{{detail.status}}</td>
                                            <td>{{detail.location}}</td>
                                        </tr>
                                    </template>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </template>
            </div>
        </div>
</template>
<style lang="scss" src="./track.scss" scoped></style>

