<template>
    <div class="grid-100 tablet-grid-100 container">
        <div class="grid-50 tablet-grid-50 message-box">
            <p class="step-header">YOUR ESTIMATED QUOTE #0001: $1,295.00</p>
            <p class="textfield-text">Note: This is just an estimate. Actual price may vary depending on charges incurred at pickup or delivery.</p>

            <div class="grid-100 tablet-grid-100 container">
                <div class="grid-50 tablet-grid-50">
                    <button class="button-standard-large">Save Quote</button>
                </div>

                <div class="grid-50 tablet-grid-50">
                    <button class="button-yellow-large" v-on:click="goToSchedulePickup">Schedule Pickup</button>
                </div>
            </div>
        </div>
    </div>
</template>
