<template>
<div class="grid-container">
            <div class="grid-100 tablet-grid-100">
                <div class="grid-100 tablet-grid-100 container title">
                    <h1 class="title">Track Shipments</h1>
                </div>

                <div class="grid-100 tablet-grid-100 container tracking-container">
                    <div class="grid-80 tablet-grid-80">
                        <label class="input-label">REFERENCE # OR PRO #</label>
                        <input type="text" placeholder="Search by REFERENCE # OR PRO #"
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
                        <span v-if="trackData.showNotFound" class="error-message"><p>Could not find shipment with this PRO # or Reference #</p></span>
                    </div>

                    <div class="grid-15 tablet-grid-20" style="margin-top: 15px;">
                        <button @click="search" class="button-yellow-medium">Track</button>
                    </div>
                </div>

                <template v-if="trackData.showTrack">
                    <div class="tracking-process">
                        <ul class="tracking-status-text">
                            <li>
                                <p :class="{ complete: isOrignComplete }">Origin</p>
                            </li>

                            <li>
                                <p :class="{ complete: isInTransit }">In Transit</p>
                            </li>

                            <li>
                                <p :class="{ complete: isDeliveryComplete }">Destination</p>
                            </li>
                        </ul>

                        <ul class="tracking-status-icon">
                            <li id="status-pick-up" data-status="pick-up">
                                <span :class="{circle: true, complete: isOrignComplete}"></span>
                            </li>

                            <li id="status-transit" data-status="transit">
                                <span :class="{line: true, complete: isInTransit}"></span>
                                <span :class="{circle: true, complete: isInTransit}"></span>
                            </li>

                            <li id="status-delivered" data-status="delivered">
                                <span :class="{line: true, complete: isDeliveryComplete}"></span>
                                <span :class="{circle: true, complete: isDeliveryComplete}"></span>
                            </li>
                        </ul>

                        <ul class="tracking-status-text">
                            <li>
                                <span class="details">{{trackData.originDate}}</span>
                                <span class="details">{{trackData.originLocation}}</span>
                            </li>

                            <li></li>

                            <li>
                                <span class="details">{{trackData.destinationDate}}</span>
                                <span class="details">{{trackData.destinationLocation}}</span>
                            </li>
                        </ul>
                    </div>

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

