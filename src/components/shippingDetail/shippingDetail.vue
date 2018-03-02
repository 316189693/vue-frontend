<template>

    <div class="grid-100 tablet-grid-100 container manifest-line-container">
        <span class="manifest-line-count">1</span>

        <div class="grid-100 tablet-grid-100 container schedule-pickup-hidden" v-if="requireDescription">
            <div class="grid-25 tablet-grid-25">
                <label class="input-label">Shipment Description
                    <span class="character-limit">({{shipmentDescription_CharacterLimit}} character limit)</span>
                </label>
                <input type="text" value="Enter Description" :maxlength="shipmentDescription_CharacterLimit">
            </div>

            <input type="checkbox" v-bind:id="'hazard_material' + index" v-model="pallet.isHazardous">
            <label class="checkbox" v-bind:for="'hazard_material' + index" style="margin-top: 30px;">
                <span>Hazardous Material</span>
            </label>

        </div>

        <div class="grid-20 tablet-grid-25">
            <label class="input-label">Pallet Dimensions</label>
            <select class="dropdown" v-model="pallet.palletType" :disabled="lock">
                <option v-for="(item,key) in palletDimensionsOptions" :value="item.type" v-bind:key="key">{{item.title}}</option>
            </select>
        </div>

        <div class="grid-10 tablet-grid-15">
            <label class="input-label">Width</label>
            <input type="text" placeholder="0" v-model="pallet.width" v-bind:disabled="!editable || lock">
        </div>

        <div class="grid-10 tablet-grid-15">
            <label class="input-label">Length</label>
            <input type="text" placeholder="0" v-model="pallet.length" v-bind:disabled="!editable || lock">
        </div>

        <div class="grid-10 tablet-grid-15">
            <label class="input-label">Height</label>
            <input type="text" placeholder="0" v-model="pallet.height" v-bind:disabled="lock">
        </div>

        <div class="grid-10 tablet-grid-15">
            <label class="input-label">Quantity</label>
            <input type="text" placeholder="0" v-model="pallet.quantity" v-bind:disabled="lock">
        </div>

        <div class="grid-10 tablet-grid-10">
            <label class="input-label">Total Weight</label>
            <input type="text" placeholder="0" v-model="pallet.totalWeight" v-bind:disabled="lock">
        </div>

        <div class="grid-15 tablet-grid-15">
            <label class="input-label optional-label">Class *
                <span class="tooltip-light"></span>
            </label>
            <!-- <span class="tooltip-light"> 
						<div class="tooltip-bubble">
							<p>Can we stack your pallets? Charges are made based on <span>pallet space</span>. One pallet space is 48&ldquo;x40&ldquo; and the entire height of the truck.</p>
						</div>
					</span> -->
            <select class="dropdown" v-model="pallet.palletClass" :disabled="lock">
                <option value="0">Select</option>
                <option value="1">Option 1</option>
            </select>
        </div>

        <input type="checkbox" v-bind:id="'stackable_checkbox' + index" :disabled="lock" v-model="pallet.stackable">
        <label class="checkbox" v-bind:class="{'is-locked' : lock}" v-bind:for="'stackable_checkbox' + index" style="margin-top: 30px;">
            <span>Stackable?</span>
        </label>

        <button class="grid-5 btn-delete-line" v-if="totalNumber > 1 && !lock" v-on:click="deleteLine(index)">&#x2716;</button>
    </div>

</template>
<style lang="scss" src="./shippingDetail.scss" scoped></style>



