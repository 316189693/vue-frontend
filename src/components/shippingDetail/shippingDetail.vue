<template>

    <div class="grid-100 tablet-grid-100 container manifest-line-container">
        <span class="manifest-line-count">{{index + 1}}</span>

        <div class="grid-100 tablet-grid-100 container schedule-pickup-hidden" v-if="requireDescription">
            <div class="grid-25 tablet-grid-25">
                <label class="input-label">Shipment Description
                    <span class="character-limit">({{shipmentDescription_CharacterLimit}} character limit)</span>
                </label>
                <input type="text" placeholder="Enter Description" :maxlength="shipmentDescription_CharacterLimit" v-model="pallet.description">
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
            <input type="text" placeholder="0" v-model="pallet.width" v-bind:disabled="!editable || lock" :name="'width' + index" v-validate.disable="'required|between:1,100'" :class="{'input': true, 'is-danger': errors.has('width' + index) }">
        </div>

        <div class="grid-10 tablet-grid-15">
            <label class="input-label">Length</label>
            <input type="text" placeholder="0" v-model="pallet.length" v-bind:disabled="!editable || lock" :name="'length' + index" v-validate.disable="'required|between:1,100'" :class="{'input': true, 'is-danger': errors.has('length' + index) }">
        </div>

        <div class="grid-10 tablet-grid-15">
            <label class="input-label">Height
                <span class="tooltip-light">
                    <div class="tooltip-bubble">
                        <p>Can we stack your pallets? Charges are made based on
                            <span>pallet space</span>. One pallet space is 48“x40“ and the entire height of the truck.</p>
                    </div>
                </span>
            </label>
            <input type="text" placeholder="0" v-model="pallet.height" v-bind:disabled="lock" :name="'height' + index" v-validate.disable="'required|between:1,104'" :class="{'input': true, 'is-danger': errors.has('height' + index) }">
        </div>

        <div class="grid-10 tablet-grid-15">
            <label class="input-label">Quantity</label>
            <input type="text" placeholder="0" v-model="pallet.quantity" v-bind:disabled="lock" :name="'quantity' + index" v-validate.disable="'required|min_value:1'" :class="{'input': true, 'is-danger': errors.has('quantity' + index) }">
        </div>

        <div class="grid-10 tablet-grid-10">
            <label class="input-label">Total Weight</label>
            <input type="text" placeholder="0" v-model="pallet.totalWeight" v-bind:disabled="lock" :name="'totalWeight' + index" v-validate.disable="'required|min_value:1'" :class="{'input': true, 'is-danger': errors.has('totalWeight' + index) }">
        </div>

        <div class="grid-15 tablet-grid-15">
            <label class="input-label optional-label">Class *
                <span class="tooltip-light">
                    <div class="tooltip-bubble">
                        <p>Can we stack your pallets? Charges are made based on
                            <span>pallet space</span>. One pallet space is 48“x40“ and the entire height of the truck.</p>
                    </div>
                </span>
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

        <input type="checkbox" v-bind:id="'stackable_checkbox' + index" :disabled="lock || !isStackable" v-model="pallet.stackable">
        <label class="checkbox" v-bind:class="{'is-locked' : lock}" v-bind:for="'stackable_checkbox' + index" style="margin-top: 30px;">
            <span>Stackable?</span>
        </label>

        <span class="manifest-tooltip-light">
        </span>

        <button class="delete-manifest-line" v-if="totalNumber > 1 && !lock" v-on:click="deleteLine(index)"></button>

    </div>

</template>
<style lang="scss" src="./shippingDetail.scss" scoped></style>



