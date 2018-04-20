<template>
<div class="grid-container">
    <div class="grid-100 tablet-grid-100">
                <div class="grid-100 tablet-grid-80 container title">
                    <h1 class="title">My Account</h1>
                </div>

                <div class="grid-100 tablet-grid-80 container margin-bottom-40">
                    <div class="grid-50 tablet-grid-80 margin-left-minus-10 margin-bottom-40" v-if="myAccountData.shipping.inEdit">
                        <div class="grid-100 tablet-grid-100 container">
                            <h1 class="section-header">Shipping Information</h1>
                        </div>

                        <div class="grid-parent grid-100 tablet-grid-100">
                            <div class="grid-80 tablet-grid-100 container">
                                <label class="input-label">Company</label>
                                <input type="text" name="shippingCompany" v-model="myAccountData.shipping.locationName" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('shippingCompany') }">
                                <span v-if="errors.has('shippingCompany')" class="help is-danger">{{ errors.first('shippingCompany') }}</span>
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <label class="input-label">Address 1</label>
                                <input type="text" name="shippingAddress1" v-model="myAccountData.shipping.address1" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('shippingAddress1') }">
                                <span v-if="errors.has('shippingAddress1')" class="help is-danger">{{ errors.first('shippingAddress1') }}</span>
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <label class="input-label optional-label">Address 2</label>
                                <input type="text" v-model="myAccountData.shipping.address2">
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <div class="grid-50 tablet-grid-40">
                                    <label class="input-label">City</label>
                                    <input type="text" name="shippingCity" v-model="myAccountData.shipping.city" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('shippingCity') }">
                                    <span v-if="errors.has('shippingCity')" class="help is-danger">{{ errors.first('shippingCity') }}</span>
                                </div>

                                <div class="grid-25 tablet-grid-30">
                                    <label class="input-label">State</label>
                                    <select class="dropdown" v-model="myAccountData.shipping.state">
                                        <option v-for="state in stateOptions">{{state}}</option>
                                    </select>
                                </div>

                                <div class="grid-25 tablet-grid-30">
                                    <label class="input-label">Zip Code</label>
                                    <input type="text" name="shippingZip" maxlength="5" v-model="myAccountData.shipping.zip" v-validate="'required|digits:5'" :class="{'input': true, 'is-danger': errors.has('shippingZip') }">
                                    <span v-if="errors.has('shippingZip')" class="help is-danger">{{ errors.first('shippingZip') }}</span>
                                </div>
                            </div>

                            <div class="grid-80 tablet-grid-100 container margin-bottom-40">
                                <div class="grid-50 tablet-grid-50">
                                    <label class="input-label">Phone</label>
                                    <input type="text" name="shippingPhone" v-model="myAccountData.shipping.phone" v-validate="{ required: true, regex: /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4})$/ }" :class="{'input': true, 'is-danger': errors.has('shippingPhone') }">
                                    <span v-if="errors.has('shippingPhone')" class="help is-danger">{{ errors.first('shippingPhone') }}</span>
                                </div>

                                <div class="grid-50 tablet-grid-50">
                                    <label class="input-label optional-label">Fax</label>
                                    <input type="text" name="shippingFax" v-model="myAccountData.shipping.fax" v-validate="{regex: /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4})$/}" :class="{'input': true, 'is-danger': errors.has('shippingFax') }">
                                    <span v-if="errors.has('shippingFax')" class="help is-danger">{{ errors.first('shippingFax') }}</span>
                                </div>
                            </div>

                            <div class="grid-100 tablet-grid-100 container">
                                <div class="grid-30 tablet-grid-40">
                                    <button class="button-blue-small" @click="save(1)">Save Updates</button>
                                </div>

                                <div class="grid-40 tablet-grid-60">&nbsp;</div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-50 tablet-grid-100 margin-bottom-40" v-else>
                        <div class="grid-100 tablet-grid-80">
                            <h1 class="section-header">Shipping Information</h1>
                        </div>

                        <div class="grid-100 tablet-grid-80 container">
                            <table class="table-details margin-left-minus-10">
                                <tbody>
                                    <tr>
                                        <td>Company</td>
                                        <td>{{myAccountData.shipping.locationName}}</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>
                                          {{myAccountData.shipping.address1}} {{myAccountData.shipping.address2}}<br>
                                          {{myAccountData.shipping.city}}<span v-if="myAccountData.shipping.city">,</span> {{myAccountData.shipping.state}} {{myAccountData.shipping.zip}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Phone</td>
                                        <td>{{myAccountData.shipping.phone}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="grid-100 tablet-grid-80 container" v-if="myAccountData.user.userGroupName !='SALES'">
                            <div class="grid-25 tablet-grid-25">
                                <button class="button-standard-small edit" @click="edit(1)">Edit</button>
                            </div>
                            <div class="grid-35 tablet-grid-60">&nbsp;</div>
                        </div>
                    </div>

                    <div class="grid-parent grid-50 tablet-grid-80 margin-left-minus-10" v-if="myAccountData.billing.inEdit">
                        <div class="grid-100 tablet-grid-100 container">
                            <h1 class="section-header">Billing Information</h1>
                        </div>

                        <div class="grid-parent grid-100 tablet-grid-100">
                            <div class="grid-80 tablet-grid-100 container">
                                <label class="input-label">Company/Bill To</label>
                                <input type="text" name="billingCompany" v-model="myAccountData.billing.locationName" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('billingCompany') }">
                                <span v-if="errors.has('billingCompany')" class="help is-danger">{{ errors.first('billingCompany') }}</span>
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <label class="input-label">Address 1</label>
                                <input type="text" name="billingAddress1" v-model="myAccountData.billing.address1" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('billingAddress1') }">
                                <span v-if="errors.has('billingAddress1')" class="help is-danger">{{ errors.first('billingAddress1') }}</span>
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <label class="input-label optional-label">Address 2</label>
                                <input type="text" v-model="myAccountData.billing.address2">
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <div class="grid-50 tablet-grid-40">
                                    <label class="input-label">City</label>
                                    <input type="text" name="billingCity" v-model="myAccountData.billing.city" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('billingCity') }">
                                    <span v-if="errors.has('billingCity')" class="help is-danger">{{ errors.first('billingCity') }}</span>
                                </div>

                                <div class="grid-25 tablet-grid-30">
                                    <label class="input-label">State</label>
                                    <select class="dropdown" v-model="myAccountData.billing.state">
                                        <option v-for="state in stateOptions">{{state}}</option>
                                    </select>
                                </div>

                                <div class="grid-25 tablet-grid-30">
                                    <label class="input-label">Zip Code</label>
                                    <input type="text" name="billZip" maxlength="5" v-model="myAccountData.billing.zip"  v-validate="'required|digits:5'" :class="{'input': true, 'is-danger': errors.has('billZip') }">
                                    <span v-if="errors.has('billZip')" class="help is-danger">{{ errors.first('billZip') }}</span>
                                </div>
                            </div>

                            <div class="grid-80 tablet-grid-100 container margin-bottom-40">
                                <div class="grid-50 tablet-grid-50">
                                    <label class="input-label">Payment Type</label>
                                    <select class="dropdown" disabled>
                                        <option>{{myAccountData.billing.paymentType}}</option>
                                    </select>
                                </div>

                                <div class="grid-50 tablet-grid-50">
                                    <label class="input-label optional-label">Credit Limit</label>
                                    <input type="text" v-model="myAccountData.billing.creditLimit" disabled>
                                </div>
                            </div>

                            <div class="grid-100 tablet-grid-100 container">
                                <div class="grid-30 tablet-grid-40">
                                    <button class="button-blue-small" @click="save(2)">Save Updates</button>
                                </div>

                                <div class="grid-40 tablet-grid-60">&nbsp;</div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-parent grid-50 tablet-grid-100" v-else>
                        <div class="grid-100 tablet-grid-80">
                            <h1 class="section-header">Billing Information</h1>
                        </div>

                        <div class="grid-100 tablet-grid-80 container">
                            <table class="table-details margin-left-minus-10">
                                <tbody>
                                    <tr>
                                        <td>Company/Bill To</td>
                                        <td>{{myAccountData.billing.locationName}}</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>
                                          {{myAccountData.billing.address1}} {{myAccountData.billing.address2}}<br>
                                          {{myAccountData.billing.city}}<span v-if="myAccountData.billing.city">,</span> {{myAccountData.billing.state}} {{myAccountData.billing.zip}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Payment Type</td>
                                        <td>{{myAccountData.billing.paymentType}}</td>
                                    </tr>
                                    <tr>
                                        <td>Credit Limit</td>
                                        <td>{{myAccountData.billing.creditLimit}}</td>
                                    </tr>
                                    <tr>
                                        <td>Net Term Days</td>
                                        <td>{{myAccountData.billing.netTermDays}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="grid-100 tablet-grid-80 container" v-if="myAccountData.user.userGroupName !='SALES'">
                            <div class="grid-25 tablet-grid-25">
                                <button class="button-standard-small edit" @click="edit(2)">Edit</button>
                            </div>
                            <div class="grid-35 tablet-grid-60">&nbsp;</div>
                        </div>
                    </div>
                </div>

                <div class="grid-100 tablet-grid-80 container">
                    <div class="grid-50 tablet-grid-80 margin-left-minus-10" v-if="myAccountData.user.inEdit">
                        <div class="grid-100 tablet-grid-100 container">
                            <h1 class="section-header">Account Information</h1>
                        </div>

                        <div class="grid-parent grid-100 tablet-grid-100">
                            <div class="grid-80 tablet-grid-100 container">
                                <div class="grid-50 tablet-grid-50">
                                    <label class="input-label">First Name</label>
                                    <input type="text" name="userFirstName" v-model="myAccountData.user.firstName" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('userFirstName') }">
                                    <span v-if="errors.has('userFirstName')" class="help is-danger">{{ errors.first('userFirstName') }}</span>
                                </div>

                                <div class="grid-50 tablet-grid-50">
                                    <label class="input-label">Last Name</label>
                                    <input type="text" name="userLastName" v-model="myAccountData.user.lastName" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('userLastName') }">
                                    <span v-if="errors.has('userLastName')" class="help is-danger">{{ errors.first('userLastName') }}</span>
                                </div>
                            </div>

                            <div class="grid-80 tablet-grid-100 container margin-bottom-40">
                                <div class="grid-50 tablet-grid-50">
                                    <label class="input-label">Email</label>
                                    <input type="text" v-model="myAccountData.user.email"  disabled>
                                </div>

                                <div class="grid-50 tablet-grid-50">
                                    <label class="input-label">Username</label>
                                    <input type="text" v-model="myAccountData.user.userName" disabled>
                                </div>
                            </div>

                            <div class="grid-100 tablet-grid-100 container">
                                <div class="grid-30 tablet-grid-50">
                                    <button class="button-blue-small" @click="save(3)">Save Updates</button>
                                </div>

                                <div class="grid-35 tablet-grid-50">
                                    <button class="button-standard-small" @click="showModal">Change Password</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-50 tablet-grid-80" v-else>
                        <div class="grid-100 tablet-grid-100">
                            <h1 class="section-header">Account Information</h1>
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <table class="table-details margin-left-minus-10">
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>{{myAccountData.user.firstName}} {{myAccountData.user.lastName}}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{{myAccountData.user.email}}</td>
                                    </tr>
                                    <tr>
                                        <td>Username</td>
                                        <td>{{myAccountData.user.userName}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <div class="grid-25 tablet-grid-30">
                                <button class="button-standard-small edit" @click="edit(3)">Edit</button>
                            </div>

                            <div class="grid-35 tablet-grid-40">
                                <button class="button-standard-small" @click="showModal">Change Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    <ChangePassword :modalName="modalName" :title="modalTitle" :message="modalMessage" :width="640" :maxWidth="700" :height="435" :maxHeight="500" :rightBtnText="modalConfirmText" :leftBtnText="modalCancelText" :rightBtnAction="confirmModal" :leftBtnAction="closeModal">
      <slot>
        <div class="grid-120" style="height:245px;">
          <span class="grid-70">
              <label class="input-label">Old Password</label>
              <input type="password" name="oldPassword" v-model="myAccountData.password.oldPassword" v-validate="'required|min:5'" :class="{'input': true, 'is-danger': errors.has('oldPassword') }" />
              <span v-if="errors.has('oldPassword')" class="help is-danger">{{ errors.first('oldPassword') }}</span>
              <span v-if="oldPasswordError" class="help is-danger">Wrong old password</span>
          </span>
          <span class="grid-70">
              <label class="input-label">New Password</label>
              <input type="password" name="newPassword1" v-model="myAccountData.password.newPassword1" v-validate="'required|min:5|confirmed:newPassword1'" :class="{'input': true, 'is-danger': errors.has('newPassword1') }" />
              <span v-if="errors.has('newPassword1')" class="help is-danger">{{ errors.first('newPassword1') }}</span>
          </span>
          <span class="grid-70 last-password">
              <label class="input-label">Retype new password</label>
              <input type="password" name="newPassword2" v-model="myAccountData.password.newPassword2" v-validate="'required|min:5|confirmed:newPassword1'" :class="{'input': true, 'is-danger': errors.has('newPassword2') }" />
              <span v-if="errors.has('newPassword2')" class="help is-danger">{{ errors.first('newPassword2') }}</span>
          </span>
        </div>
      </slot>
    </ChangePassword>
    <MessageModal :modalName="successModalName" :title="successModalTitle" :message="successModalMessage"></MessageModal>
</div>
</template>
<style lang="scss" src="./myAccountEdit.scss" scoped></style>
