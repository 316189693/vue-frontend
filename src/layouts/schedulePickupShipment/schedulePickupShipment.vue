<template>
    <div class="grid-100 tablet-grid-100 container grid-container">

        <SchedulePickupHeader></SchedulePickupHeader>

        <div class="grid-100 tablet-grid-100 container">
            <h1 class="step-header">
                <span class="label-number active">3</span>What are we carrying?</h1>
        </div>

        <ShippingDetail :requireDescription="true" :lock="true" :index="key" :pallet="item" :totalNumber="quoteData.pallets.length" v-for="(item,key) in quoteData.pallets" :key="key"></ShippingDetail>

        <MainButtonSet :confirmAction="confirm" :cancelAction="cancel"></MainButtonSet>
        
    </div>

</template>
