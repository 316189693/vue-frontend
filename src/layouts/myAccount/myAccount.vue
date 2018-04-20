<template>
<div class="grid-container">
    <div class="grid-100 tablet-grid-100">
                <div class="grid-100 tablet-grid-80 container title">
                    <h1 class="title">My Account</h1>
                </div>

                <div class="grid-100 tablet-grid-100 container margin-left-minus-10 margin-bottom-40">
                    <div class="grid-50 tablet-grid-100 margin-bottom-40">
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
                                <button v-if="showEdit" class="button-standard-small edit" @click="edit(1)">Edit</button>
                            </div>
                            <div class="grid-35 tablet-grid-60">&nbsp;</div>
                        </div>
                    </div>

                    <div class="grid-parent grid-50 tablet-grid-100">
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
                                <button v-if="showEdit" class="button-standard-small edit" @click="edit(2)">Edit</button>
                            </div>
                            <div class="grid-35 tablet-grid-60">&nbsp;</div>
                        </div>
                    </div>
                </div>

                <div class="grid-100 tablet-grid-100 container margin-left-minus-10">
                    <div class="grid-50 tablet-grid-80">
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
                                <button v-if="showEdit" class="button-standard-small edit" @click="edit(3)">Edit</button>
                            </div>

                            <div class="grid-35 tablet-grid-40">
                                <button v-if="showEdit" class="button-standard-small" @click="showModal">Change Password</button>
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
<style lang="scss" src="./myAccount.scss" scoped></style>

