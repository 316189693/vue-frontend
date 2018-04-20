<template>
    <div id="estimatedQuoteBox" class="grid-100 tablet-grid-100 container">
        <div class="grid-50 tablet-grid-50 message-box">
            <p class="step-header">YOUR ESTIMATED QUOTE #{{quoteData.quoteId}}:</p>

            <div class="grid-100 tablet-grid-100 container message-container">
                <div v-if="parseFloat(quoteData.estimate.palletSpaceCharge) > 0">
                    <p>{{quoteData.palletSpaces}} Pallet Position{{quoteData.palletSpaces > 1 ? "s" : ""}}
                        <span>{{quoteData.estimate.palletSpaceCharge | dollar}}</span>
                    </p>
                    <p class="text-disclosure">{{quoteData.estimate.palletSpaceChargeText}}</p>
                </div>

                <div v-if="parseFloat(quoteData.estimate.fuelCharge) > 0">
                    <p>Fuel Surcharge
                        <span>{{quoteData.estimate.fuelCharge | dollar}}</span>
                    </p>
                    <p class="text-disclosure">{{quoteData.estimate.fuelChargeText}}</p>
                </div>

                <div v-if="parseFloat(quoteData.estimate.complianceCharge) > 0">
                    <p>California Compliance Charge
                        <span>{{quoteData.estimate.complianceCharge | dollar}}</span>
                    </p>
                    <p>

                    </p>
                </div>

                <div v-if="conventionCenterSum > 0">
                    <p>Convention Center
                        <span>{{conventionCenterSum | dollar}}</span>
                    </p>
                    <p class="text-disclosure" v-if="parseFloat(quoteData.estimate.pickup.conventionCenter) > 0">at pickup {{quoteData.estimate.pickup.conventionCenter | dollar}}</p>
                    <p class="text-disclosure" v-if="parseFloat(quoteData.estimate.delivery.conventionCenter) > 0">at delivery {{quoteData.estimate.delivery.conventionCenter | dollar}}</p>
                </div>

                <div v-if="constructionSiteSum > 0">
                    <p>Construction Site
                        <span>{{constructionSiteSum | dollar}}</span>
                    </p>
                    <p class="text-disclosure" v-if="parseFloat(quoteData.estimate.pickup.constructionSite) > 0">at pickup {{quoteData.estimate.pickup.constructionSite | dollar}}</p>
                    <p class="text-disclosure" v-if="parseFloat(quoteData.estimate.delivery.constructionSite) > 0">at delivery {{quoteData.estimate.delivery.constructionSite | dollar}}</p>
                </div>

                <div v-if="liftGateSum > 0">
                    <p>Lift Gate
                        <span>{{liftGateSum | dollar}}</span>
                    </p>
                    <p class="text-disclosure" v-if="parseFloat(quoteData.estimate.pickup.liftGate) > 0">at pickup {{quoteData.estimate.pickup.liftGate | dollar}}</p>
                    <p class="text-disclosure" v-if="parseFloat(quoteData.estimate.delivery.liftGate) > 0">at delivery {{quoteData.estimate.delivery.liftGate | dollar}}</p>
                </div>

                <div v-if="limitedAccessSum > 0">
                    <p>Limited Access
                        <span>{{limitedAccessSum | dollar}}</span>
                    </p>
                    <p class="text-disclosure" v-if="parseFloat(quoteData.estimate.pickup.limitedAccess) > 0">at pickup {{quoteData.estimate.pickup.limitedAccess | dollar}}</p>
                    <p class="text-disclosure" v-if="parseFloat(quoteData.estimate.delivery.limitedAccess) > 0">at delivery {{quoteData.estimate.delivery.limitedAccess | dollar}}</p>
                </div>
                
                <div v-if="palletJackSum > 0">
                    <p>Pallet Jack
                        <span>{{palletJackSum | dollar}}</span>
                    </p>
                    <p class="text-disclosure" v-if="parseFloat(quoteData.estimate.pickup.palletJack) > 0">at pickup {{quoteData.estimate.pickup.palletJack | dollar}}</p>
                    <p class="text-disclosure" v-if="parseFloat(quoteData.estimate.delivery.palletJack) > 0">at delivery {{quoteData.estimate.delivery.palletJack | dollar}}</p>
                </div>

                <div v-if="residentialSum > 0">
                    <p>Residential
                        <span>{{residentialSum | dollar}}</span>
                    </p>
                    <p class="text-disclosure" v-if="parseFloat(quoteData.estimate.pickup.residential) > 0">at pickup {{quoteData.estimate.pickup.residential | dollar}}</p>
                    <p class="text-disclosure" v-if="parseFloat(quoteData.estimate.delivery.residential) > 0">at delivery {{quoteData.estimate.delivery.residential | dollar}}</p>
                </div>

                <p>Total
                    <span class="input-label">{{quoteData.estimate.total | dollar}}</span>
                </p>
            </div>

            <p class="textfield-text">Note: This is just an estimate. Actual price may vary depending on charges incurred at pickup or delivery.</p>

            <p class="textfield-text-medium">All quotes are valid for 30 days subject to the Department of Energy Diesel FCS PADD 5 weekly adjustment.</p>

            <p class="textfield-text-medium">All shipments are subject to California Compliance Fee - {{quoteData.estimate.complianceCharge | dollar}}.</p>

            <div class="grid-100 tablet-grid-100 container flex-justify-content" v-if="isShowButtons">
                <div class="grid-33 tablet-grid-33">
                    <button class="button-standard-medium" @click="editQuote">Edit Quote</button>
                </div>

                <div class="grid-33 tablet-grid-33" v-show="!(isEditMode || isScheduleMode)">
                    <button class="button-standard-medium" @click="saveQuote">Save Quote</button>
                </div>

                <div class="grid-33 tablet-grid-33">
                    <button class="button-yellow-medium" @click="schedulePickup">Schedule Pickup</button>
                </div>
            </div>
        </div>
    </div>
</template>
