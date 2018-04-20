<template>

    <div class="grid-100 tablet-grid-100 container manifest-line-container">
        <!-- <span class="manifest-line-count">{{index + 1}}</span> -->

        <div class="grid-100 tablet-grid-100 container schedule-pickup-hidden margin-top-20" v-if="requireDescription">
            <span class="manifest-line-count">{{index + 1}}</span>
            <div class="grid-20 tablet-grid-20" style="margin-top: -20px;">
                <label class="input-label">Shipment Description
                    <span class="character-limit">(max {{shipmentDescription_CharacterLimit}} char)</span>
                </label>
                <input type="text" placeholder="Enter Description" :maxlength="shipmentDescription_CharacterLimit" v-model="pallet.description" v-bind:disabled="lock">
            </div>
            <!-- <div class="grid-20 tablet-grid-20">
                <input type="checkbox" v-bind:id="'hazard_material' + index" v-model="pallet.isHazardous">
                <label class="checkbox" v-bind:for="'hazard_material' + index" style="margin-top: 30px;">
                    <span>Hazardous Material</span>
                </label>
                <span class="tooltip-light tooltip-label" style="margin-top:28px;" v-tooltip.bottom="tooltipMessages.hazardousMaterial"></span>
            </div> -->
        </div>

        <div class="grid-100 tablet-grid-100 container line-details">
            <div class="grid-20 tablet-grid-20">
                <label class="input-label">Pallet Dimensions</label>
                <select class="dropdown" v-model="pallet.palletType" :disabled="lock">
                    <option v-for="(item,key) in palletDimensionsOptions" :value="item.type" v-bind:key="key">{{item.title}}</option>
                </select>
            </div>

            <div class="grid-10 tablet-grid-10">
                <label class="input-label">Width</label>
                <span class="tooltip-light tooltip-label" v-tooltip.bottom="tooltipMessages.width"></span>
                <input type="text" placeholder="0" v-model="pallet.width" v-bind:disabled="!editable || lock" :name="'width' + index" v-validate="'required|decimal|between:1,96'" :class="{'input': true, 'is-danger': errors.has('width' + index) && validationStarted}" v-on:keyup = "addLineValidate(pallet.width)">
                <span v-if="errors.has('width' + index) && validationStarted" class="help is-danger">{{ addLineValidate(pallet.width) }}</span>

            </div>

            <div class="grid-10 tablet-grid-10">
                <label class="input-label">Length</label>
                <span class="tooltip-light tooltip-label" v-tooltip.bottom="tooltipMessages.length"></span>
                <input type="text" placeholder="0" v-model="pallet.length" v-bind:disabled="!editable || lock" :name="'length' + index" v-validate="'required|decimal|between:1,96'" :class="{'input': true, 'is-danger': errors.has('length' + index) && validationStarted}" v-on:keyup = "addLineValidate(pallet.length)">
                <span v-if="errors.has('length' + index) && validationStarted" class="help is-danger">{{ addLineValidate(pallet.length) }}</span>
            </div>

            <div class="grid-10 tablet-grid-10">
                <label class="input-label">Height</label>
                <span class="tooltip-light tooltip-label" v-tooltip.bottom="tooltipMessages.height"></span>
                <input type="text" placeholder="0" v-model="pallet.height" v-bind:disabled="lock" :name="'height' + index" v-validate="'required|decimal|between:1,108'" :class="{'input': true, 'is-danger': errors.has('height' + index) && validationStarted}" v-on:keyup = "addLineValidate(pallet.height)">
                <span v-if="errors.has('height' + index) && validationStarted" class="help is-danger">{{ addLineValidate(pallet.height) }}</span>

            </div>

            <div class="grid-10 tablet-grid-10">
                <label class="input-label">Quantity</label>
                <span class="tooltip-light tooltip-label" v-tooltip.bottom="tooltipMessages.quantity"></span>
                <input type="text" placeholder="0" v-model="pallet.quantity" v-bind:disabled="lock" :name="'quantity' + index" v-validate="'required|decimal|min_value:1'" :class="{'input': true, 'is-danger': errors.has('quantity' + index) && validationStarted}" v-on:keyup="addLineValidate(pallet.quantity)">
                <span v-if="errors.has('quantity' + index) && validationStarted" class="help is-danger">{{ addLineValidate(pallet.quantity) }}</span>
            </div>

            <div class="grid-10 tablet-grid-10">
                <label class="input-label">Total Weight</label>
                <span class="tooltip-light tooltip-label" v-tooltip.bottom="tooltipMessages.totalWeight"></span>
                <input type="text" placeholder="0" v-model="pallet.totalWeight" v-bind:disabled="lock" :name="'totalWeight' + index" v-validate="'required|decimal|min_value:1'" :class="{'input': true, 'is-danger': ((errors.has('totalWeight' + index) || overWeight) && validationStarted)}" v-on:keyup="addLineValidate(pallet.totalWeight)">
                <span v-if="errors.has('totalWeight' + index) && validationStarted" class="help is-danger">{{ addLineValidate(pallet.totalWeight) }}</span>
            </div>

            <div class="grid-10 tablet-grid-15">
                <label class="input-label optional-label">Class *</label>

                <select class="dropdown" v-model="pallet.palletClass" :disabled="lock">
                    <option value="0">FAK</option>
                    <template v-for="(item,key) in palletClass">
                        <option :key="key">{{item}}</option>
                    </template>
                </select>
            </div>

            <input type="checkbox" v-bind:id="'stackable_checkbox' + index" :disabled="lock || !isStackable" v-model="pallet.stackable">
            <label class="checkbox" v-bind:class="{'is-locked' : lock}" v-bind:for="'stackable_checkbox' + index" style="margin-top: 30px;">
                <span>Stackable?</span>
            </label>

            <span class="manifest-tooltip-light" v-tooltip.bottom="tooltipMessages.stackable"></span>

            <button class="delete-manifest-line" v-if="totalNumber > 1 && !lock" v-on:click="deleteLine(index)"></button>
        </div>
    </div>

</template>
<style lang="scss" src="./shippingDetail.scss" scoped></style>



