<template>
    <div class="grid-100 tablet-grid-100 container grid-container">

        <SchedulePickupHeader></SchedulePickupHeader>

        <div class="grid-100 tablet-grid-100 container">
            <h1 class="step-header">
                <span class="label-number active">3</span>What are we carrying?</h1>
        </div>

        <div class="grid-100 tablet-grid-100 container">
            <div class="grid-40 tablet-grid-60 info-container">
                <div class="grid-50 tablet-grid-50">
                    <p>Total Pallets:
                        <span class="text-bold">{{totalPallets}}</span>
                    </p>
                    <p>Pallet Spaces:
                        <span class="text-bold">{{quoteData.palletSpaces}}</span>
                    </p>
                    <p>Total Weight:
                        <span class="text-bold">{{allTotalWeight}} lbs</span>
                    </p>
                </div>

                <div class="grid-50 tablet-grid-50">
                    <label class="input-label optional-label">Order Reference #
                        <span class="tooltip-light"></span>
                    </label>
                    <input type="text"></div>
            </div>
        </div>

        <ShippingDetail :requireDescription="true" :lock="true" :index="key" :pallet="item" :totalNumber="quoteData.pallets.length" v-for="(item,key) in quoteData.pallets" :key="key"></ShippingDetail>

        <MainButtonSet :rightBtnAction="confirm" :leftBtnAction="cancel"></MainButtonSet>

    </div>

</template>
