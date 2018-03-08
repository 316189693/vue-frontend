<template>
    <div id="estimatedQuoteBox" class="grid-100 tablet-grid-100 container">
        <div class="grid-50 tablet-grid-50 message-box">
            <p class="step-header">YOUR ESTIMATED QUOTE #0001:</p>

            <div class="grid-100 tablet-grid-100 container message-container">
                <p>5 pallet spaces</p>
                <p class="text-disclosure">6 pallets @ 5 pallets spaces @ $65 per pallet, discount for Pallet 3-5
                    <span>$200</span>
                </p>

                <p>Fuel Surcharge</p>
                <p class="text-disclosure">5% based on DOE PADD5 Price of $3.58/gallon
                    <span>$10</span>
                </p>

                <p>California Compliance Charge
                    <span>$4.95</span>
                </p>

                <p>Total
                    <span class="input-label">$214.95</span>
                </p>
            </div>

            <p class="textfield-text">Note: This is just an estimate. Actual price may vary depending on charges incurred at pickup or delivery.</p>

            <p class="textfield-text-medium">All quotes are valid for 30 days subject to the Department of Energy Diesel FCS PADD 5 weekly adjustment.</p>

            <p class="textfield-text-medium">All shipments are subject to California Compliance Fee - $7.90.</p>

            <div class="grid-100 tablet-grid-100 container">
                <div class="grid-33 tablet-grid-33">
                    <button class="button-standard-medium">Edit Quote</button>
                </div>

                <div class="grid-33 tablet-grid-33">
                    <button class="button-standard-medium">Save Quote</button>
                </div>

                <div class="grid-33 tablet-grid-33">
                    <button class="button-yellow-medium" v-on:click="goToSchedulePickup">Schedule Pickup</button>
                </div>
            </div>
        </div>
    </div>
</template>
