<template>
<div class="grid-container">
            <div class="grid-100 tablet-grid-100">
                <div class="grid-100 tablet-grid-100 container title">
                    <h1 class="title">Track Shipments</h1>
                </div>

                <div class="grid-100 tablet-grid-100 container tracking-container">
                    <div class="grid-80 tablet-grid-80">
                        <label class="input-label">PRO #</label>
                        <input type="text" placeholder="Search by PRO #" 
                                :class="{'input-search': true, 'track-search': true, 'input-search-error': showNotFound}" v-model="proNumber"
                                @change="changeKeyWord">
                        <span v-if="showTerms" class="text-disclosure">By clicking "Track" you are agreeing to the
                            <span class="text-bold">Terms & Conditions</span>
                        </span>
                        <span v-if="showNotFound" class="search-error-text">Could not find shipment with this PRO #</span>
                    </div>

                    <div class="grid-15 tablet-grid-20" style="margin-top: 15px;">
                        <button @click="search" class="button-yellow-medium">Track</button>
                    </div>
                </div>

                <template v-if="showTrack">
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
                                <span class="details">{{trackData.destinationLocation}}</span>
                                <span class="details"></span>
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
                                        <td colspan="3" class="date">{{date}}</td>
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

