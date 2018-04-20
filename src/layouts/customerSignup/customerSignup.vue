<template>
	<div class="grid-container ">
              <div class=" grid-container">
                  <div class="grid-100 tablet-grid-100 container">
                      <BreadcrumbStageHeader v-bind="breadcrumbStageHeader"></BreadcrumbStageHeader>
                  </div>
              </div>

        <!-- BEGINNING OF CUSTOMER SIGN UP -->
        <form data-vv-scope="form-signup">
              <div class="row grid-container" v-show = "currentStage === 1" >

                  <div class="grid-100 tablet-grid-100 container">
                      <div class="grid-100 tablet-grid-100 container step-container">
                          <div class="grid-50 tablet-grid-80 container">
                              <div class="grid-100 tablet-grid-100 container">
                                  <h1 class="step-header">
                                      <span class="label-number active">1</span>Shipping Information
                                  </h1>
                              </div>

                              <div class="grid-80 tablet-grid-100 container">
                                  <label class="input-label">Company</label>
                                  <input type="text" v-on:input = "onShippingSameAsAddressInput" v-model = "formData.signupPart.shipInfo.company" name="company" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-signup.company')}">
                                  <pre v-if="errors.has('form-signup.company')" class="help is-danger">{{ errors.first('form-signup.company') }}</pre>
                              </div>

                              <div class="grid-80 tablet-grid-100 container">
                                  <label class="input-label">Address 1</label>
                                  <input type="text" v-on:input = "onShippingSameAsAddressInput" v-model = "formData.signupPart.shipInfo.address1" name="shipAddress1" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-signup.shipAddress1')}">
                                  <pre v-if="errors.has('form-signup.shipAddress1')" class="help is-danger">{{ errors.first('form-signup.shipAddress1') }}</pre>
                              </div>

                              <div class="grid-80 tablet-grid-100 container">
                                  <label class="input-label optional-label">Address 2</label>
                                  <input type="text" v-on:input = "onShippingSameAsAddressInput" v-model = "formData.signupPart.shipInfo.address2">
                              </div>

                              <div class="grid-80 tablet-grid-100 container">
                                  <div class="grid-50 tablet-grid-50">
                                      <label class="input-label">City</label>
                                      <input type="text" v-on:input = "onShippingSameAsAddressInput"  v-model = "formData.signupPart.shipInfo.city" name="shipCity" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-signup.shipCity')}">
                                      <pre v-if="errors.has('form-signup.shipCity')" class="help is-danger">{{ errors.first('form-signup.shipCity') }}</pre>
                                  </div>

                                  <div class="grid-30 tablet-grid-30">
                                      <label class="input-label">State</label>
                                       <select class="dropdown" v-on:change = "onShippingSameAsAddressInput" v-model = "formData.signupPart.shipInfo.state"  v-validate="'required'"  name="shipState" :class="{'input': true, 'is-danger': errors.has('form-signup.shipState')}" >
                                        <option value="" selected>Select</option>
                                         <template v-for="(item,index) in stateArray">
                                             <option :value="item.state_abbr" >{{item.state_text}}</option>
                                         </template>
                                       </select>
                                      <pre v-if="errors.has('form-signup.shipState') && !errors.has('form-signup.shipCity')" class="help is-danger">{{errors.first('form-signup.shipState')}}</pre>
                                  </div>
                                  <div class="grid-20 tablet-grid-20">
                                      <label class="input-label">Zip Code</label>
                                      <input type="text" v-on:input = "onShippingSameAsAddressInput"  maxlength="5" v-model = "formData.signupPart.shipInfo.zip"  id="input_zip_code_shipping" name="shipZip" v-validate="'required|digits:5'" :class="{'input': true, 'is-danger': errors.has('form-signup.shipZip')}">
                                      <pre v-if="errors.has('form-signup.shipZip') && !errors.has('form-signup.shipCity') && !errors.has('form-signup.shipState')" class="help is-danger">{{ errors.first('form-signup.shipZip') }}</pre>
                                  </div>
                              </div>

                              <div class="grid-80 tablet-grid-100 container">
                                  <div class="grid-50 tablet-grid-50">
                                      <label class="input-label">Phone</label>
                                      <input type="text" v-mask="'000-000-0000'" placeholder="xxx-xxx-xxxx" v-on:input = "onShippingSameAsAddressInput" v-model = "formData.signupPart.shipInfo.phone" name="shipPhone" v-validate="{ required: true, regex: /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4})$/ }" :class="{'input': true, 'is-danger': errors.has('form-signup.shipPhone')}">
                                      <pre v-if="errors.has('form-signup.shipPhone')" class="help is-danger">{{ errors.first('form-signup.shipPhone') }}</pre>
                                  </div>

                                  <div class="grid-50 tablet-grid-50">
                                      <label class="input-label optional-label">Fax</label>
                                      <input type="text" v-mask="'000-000-0000'" placeholder="xxx-xxx-xxxx" v-on:input = "onShippingSameAsAddressInput" v-model = "formData.signupPart.shipInfo.fax" name="shipFax" v-validate="{regex: /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4})$/}" :class="{'input': true, 'is-danger': errors.has('form-signup.shipFax')}">
                                      <pre v-if="errors.has('form-signup.shipFax')" class="help is-danger">{{ errors.first('form-signup.shipFax') }}</pre>
                                  </div>
                              </div>
                              <div>&nbsp;</div>

                               <div class="grid-100 tablet-grid-100 container">
                                  <h1 class="step-header">
                                      <span class="label-number active">3</span>Account Creation
                                  </h1>
                              </div>

                              <div class="grid-80 tablet-grid-100 container">
                                  <div class="grid-50 tablet-grid-50">
                                      <label class="input-label">First Name</label>
                                      <input type="text" v-model = "formData.signupPart.accountCreation.firstName" name="accountFirstName" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-signup.accountFirstName') }">
                                      <pre v-if="errors.has('form-signup.accountFirstName')" class="help is-danger">{{ errors.first('form-signup.accountFirstName') }}</pre>
                                  </div>

                                  <div class="grid-50 tablet-grid-50">
                                      <label class="input-label">Last Name</label>
                                      <input type="text" v-model = "formData.signupPart.accountCreation.lastName" name="accountLastName" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-signup.accountLastName') }">
                                      <pre v-if="errors.has('form-signup.accountLastName')" class="help is-danger">{{ errors.first('form-signup.accountLastName') }}</pre>
                                  </div>
                              </div>

                              <div class="grid-80 tablet-grid-100 container">
                                  <div class="grid-50 tablet-grid-50">
                                      <label class="input-label">Email</label>
                                      <input type="text" v-model = "formData.signupPart.accountCreation.email" name="accountEmail" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('form-signup.accountEmail') }">
                                      <pre v-if="errors.has('form-signup.accountEmail')" class="help is-danger">{{ errors.first('form-signup.accountEmail') }}</pre>
                                  </div>

                                  <div class="grid-50 tablet-grid-50">
                                      <label class="input-label">Username</label>
                                      <input type="text" v-model = "formData.signupPart.accountCreation.userName" name="accountUsername" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-signup.accountUsername') }">
                                      <pre v-if="errors.has('form-signup.accountUsername')" class="help is-danger">{{ errors.first('form-signup.accountUsername') }}</pre>
                                  </div>
                              </div>
                              <div>&nbsp;</div>
                          </div>

                          <div class="grid-50 tablet-grid-80">
                              <div class="grid-100 tablet-grid-100 container">
                                  <h1 class="step-header">
                                      <span class="label-number active">2</span>Billing Information
                                      <input type="checkbox" id="billing_info" value= "true" v-model = "formData.signupPart.sameAsShippingAddress"  :checked="formData.signupPart.sameAsShippingAddress" @change= "sameAsShippingAddressChanged">
                                      <label class="checkbox" for="billing_info">
                                          <span>Same as Shipping Address</span>
                                      </label>
                                  </h1>
                              </div>

                              <div class="grid-80 tablet-grid-100 container">
                                  <label class="input-label">Company/Bill To</label>
                                  <input type="text" v-model = "formData.signupPart.billInfo.company" name="billingcompany" v-validate="'required'" :class="{'input': true, 'is-danger': formData.signupPart.sameAsShippingAddress? errors.has('form-signup.company'): errors.has('form-signup.billingcompany')}">
                                  <pre v-if="formData.signupPart.sameAsShippingAddress? errors.has('form-signup.company'): errors.has('form-signup.billingcompany')" class="help is-danger">{{ formData.signupPart.sameAsShippingAddress? errors.first('form-signup.company'):errors.first('form-signup.billingcompany')  }}</pre>
                              </div>

                              <div class="grid-80 tablet-grid-100 container">
                                  <label class="input-label">Address 1</label>
                                  <input type="text" v-model = "formData.signupPart.billInfo.address1" :disabled="formData.signupPart.sameAsShippingAddress" name="billingAddress1" v-validate="'required'" :class="{'input': true, 'is-danger':formData.signupPart.sameAsShippingAddress? errors.has('form-signup.shipAddress1'):  errors.has('form-signup.billingAddress1')}">
                                  <pre v-if="formData.signupPart.sameAsShippingAddress? errors.has('form-signup.shipAddress1'):  errors.has('form-signup.billingAddress1')" class="help is-danger">{{ formData.signupPart.sameAsShippingAddress? errors.first('form-signup.shipAddress1'):  errors.first('billingAddress1') }}</pre>
                              </div>

                              <div class="grid-80 tablet-grid-100 container">
                                  <label class="input-label optional-label">Address 2</label>
                                  <input type="text" v-model = "formData.signupPart.billInfo.address2" :disabled="formData.signupPart.sameAsShippingAddress">
                              </div>

                              <div class="grid-80 tablet-grid-100 container">
                                  <div class="grid-50 tablet-grid-50">
                                      <label class="input-label">City</label>
                                      <input type="text"  v-model = "formData.signupPart.billInfo.city" name="billingCity" v-validate="'required'" :class="{'input': true, 'is-danger':formData.signupPart.sameAsShippingAddress? errors.has('form-signup.shipCity'): errors.has('form-signup.billingCity') }" :disabled="formData.signupPart.sameAsShippingAddress">
                                      <pre v-if=" formData.signupPart.sameAsShippingAddress? errors.has('form-signup.shipCity'): errors.has('form-signup.billingCity') " class="help is-danger">{{formData.signupPart.sameAsShippingAddress? errors.first('form-signup.shipCity'): errors.first('form-signup.billingCity')}}</pre>
                                  </div>

                                  <div class="grid-30 tablet-grid-30">
                                      <label class="input-label">State</label>
                                       <select class="dropdown"  v-model = "formData.signupPart.billInfo.state"  v-validate="'required'"  name="billingState" :class="{'input': true, 'is-danger':formData.signupPart.sameAsShippingAddress? errors.has('form-signup.shipState'): errors.has('form-signup.billingState')  }" :disabled="formData.signupPart.sameAsShippingAddress">
                                        <option value="" selected>Select</option>
                                         <template v-for="(item,index) in stateArray">
                                             <option :value="item.state_abbr" >{{item.state_text}}</option>
                                         </template>
                                       </select>
                                      <pre v-if="formData.signupPart.sameAsShippingAddress? errors.has('form-signup.shipState') && !errors.has('form-signup.shipCity'): errors.has('form-signup.billingState') && !errors.has('form-signup.billingCity')" class="help is-danger">{{ formData.signupPart.sameAsShippingAddress? errors.first('form-signup.shipState'): errors.first('form-signup.billingState') }}</pre>

                                  </div>

                                  <div class="grid-20 tablet-grid-20">
                                      <label class="input-label">Zip Code</label>
                                      <input type="text" v-model = "formData.signupPart.billInfo.zip"  maxlength="5" id="input_zip_code_billing" name="billingZip"  v-validate="'required|digits:5'" :class="{'input': true, 'is-danger':formData.signupPart.sameAsShippingAddress? errors.has('form-signup.shipZip'): errors.has('form-signup.billingZip') }" :disabled="formData.signupPart.sameAsShippingAddress">
                                      <pre v-if="formData.signupPart.sameAsShippingAddress? errors.has('form-signup.shipZip') && !errors.has('form-signup.shipCity') && !errors.has('form-signup.shipState'): errors.has('form-signup.billingZip') && !errors.has('form-signup.billingCity') && !errors.has('form-signup.billingState')" class="help is-danger">{{ formData.signupPart.sameAsShippingAddress? errors.first('form-signup.shipZip'): errors.first('form-signup.billingZip') }}</pre>

                                  </div>
                              </div>
                              <div class="grid-80 tablet-grid-100 container">
                                  <div class="grid-50 tablet-grid-50">
                                      <label class="input-label">Phone</label>
                                      <input type="text" v-mask="'000-000-0000'" placeholder="xxx-xxx-xxxx" v-model = "formData.signupPart.billInfo.phone" :disabled="formData.signupPart.sameAsShippingAddress" name="billingPhone" v-validate="{ required: true, regex: /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4})$/ }" :class="{'input': true, 'is-danger':formData.signupPart.sameAsShippingAddress? errors.has('form-signup.shipPhone'):  errors.has('form-signup.billingPhone') }">
                                      <pre v-if="formData.signupPart.sameAsShippingAddress? errors.has('form-signup.shipPhone'): errors.has('form-signup.billingPhone')" class="help is-danger">{{formData.signupPart.sameAsShippingAddress? errors.first('form-signup.shipPhone'):  errors.first('form-signup.billingPhone') }}</pre>
                                  </div>


                                  <div class="grid-50 tablet-grid-50">
                                      <label class="input-label optional-label">Fax</label>
                                      <input type="text" v-mask="'000-000-0000'" placeholder="xxx-xxx-xxxx" v-model = "formData.signupPart.billInfo.fax" :disabled="formData.signupPart.sameAsShippingAddress" name="billingFax" v-validate="{regex: /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4})$/}" :class="{'input': true, 'is-danger': formData.signupPart.sameAsShippingAddress? errors.has('form-signup.shipFax'):  errors.has('form-signup.billingFax')}">
                                       <pre v-if="formData.signupPart.sameAsShippingAddress? errors.has('form-signup.shipFax'):  errors.has('form-signup.billingFax')" class="help is-danger">{{ formData.signupPart.sameAsShippingAddress? errors.first('form-signup.shipFax'):  errors.first('form-signup.billingFax') }}</pre>
                                  </div>


                              </div>
                              <div class="grid-80 tablet-grid-100 container">
                                  <div class="grid-60 tablet-grid-60">
                                      <label class="input-label">Requested Credit Limit</label>
                                      <input type="text" v-model = "formData.signupPart.billInfo.creditLimit" name="billindCreditLimit" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-signup.billindCreditLimit') }">
                                       <pre v-if="errors.has('form-signup.billindCreditLimit')" class="help is-danger">{{ errors.first('form-signup.billindCreditLimit') }}</pre>
                                  </div>
                              </div>

                              <div class="grid-80 tablet-grid-100 container">
                                  <div class="info-container">
                                      <p>
                                          <span class="text-bold">Note: </span> Many customers will be granted an immediate $500 credit limit.</p>
                                  </div>
                              </div>


                          </div>
                       </div>
                  </div>


                  <div class="grid-100 tablet-grid-100 container" style="margin-top: 40px;margin-right:53px;">
                       <MainButtonSet :rightBtnText="'Continue'" @leftBtnAction="signupCancel" @rightBtnAction="signupNext"></MainButtonSet>
                  </div>
              </div>
        </form>
              <!-- END OF CUSTOMER SIGN UP -->

              <!-- BEGINNING OF CUSTOMER SIGNUP ADDITIONAL INFO -->
        <form data-vv-scope="form-addinfo">
              <div class="grid-container" v-show = "currentStage === 2" >

                  <div class="grid-100 tablet-grid-100 container">
                      <div class="grid-100 tablet-grid-100 container step-container">
                          <div class="grid-100 tablet-grid-100 container">
                              <h1 class="step-header">
                                  <span class="label-number active">4</span>More About the Company
                              </h1>
                          </div>

                          <div class="grid-100 tablet-grid-100 container">
                              <p class="sub-header">For Sales team only:</p>
                          </div>

                          <div class="grid-100 tablet-grid-100">
                              <p class="text-bold">1. Have you visited the shipping location for this company?</p>
                          </div>

                          <div class="grid-100 tablet-grid-100 container indent-15">
                              <input type="radio" id="visited_yes" v-model = "formData.addInfoPart.isVistedShippingLocation" value="true" name="isVistedShippingLocation" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-addinfo.isVistedShippingLocation') }">
                              <label class="radio" for="visited_yes">
                                  <span >Yes</span>
                              </label>

                              <input type="radio" id="visited_no" v-model = "formData.addInfoPart.isVistedShippingLocation" value="false" name="isVistedShippingLocation"  v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-addinfo.isVistedShippingLocation') }">
                              <label class="radio" for="visited_no">
                                  <span >No</span>
                              </label>
                              <div v-if="errors.has('form-addinfo.isVistedShippingLocation') " class="margin-top-60">
                                  <pre  class="help is-danger">{{ errors.first('form-addinfo.isVistedShippingLocation')}}</pre>
                              </div>

                          </div>

                          <div class="grid-100 tablet-grid-100 container">
                              <p class="sub-header">Ask the customer the following questions to learn more about their needs and how we can serve them.</p>
                          </div>

                          <div class="grid-100 tablet-grid-100 container">
                              <div class="grid-50 tablet-grid-50">
                                  <div class="grid-parent grid-80 tablet-grid-100 container">
                                      <p class="text-bold">2. How do you receive your orders from your customers?</p>
                                  </div>

                                  <div class="grid-80 tablet-grid-100 container">
                                      <input type="text" v-model = "formData.addInfoPart.howToReceiveOrders"  name="howToReceiveOrders" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-addinfo.howToReceiveOrders') }">
                                      <pre v-if="errors.has('form-addinfo.howToReceiveOrders') " class="help is-danger">{{ errors.first('form-addinfo.howToReceiveOrders') }}</pre>
                                  </div>

                                  <div class="grid-parent grid-80 tablet-grid-100 ">
                                      <p class="text-bold margin-top-20">3. Is this your only shipping location?</p>
                                  </div>

                                  <div class="grid-80 tablet-grid-100 container">
                                      <input type="radio" id="only_location_yes" v-model = "formData.addInfoPart.isOnlyShippingLocation" value="true" name="isOnlyShippingLocation" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-addinfo.isOnlyShippingLocation') }">
                                      <label class="radio" for="only_location_yes">
                                          <span>Yes</span>
                                      </label>

                                      <input type="radio" id="only_location_no" v-model = "formData.addInfoPart.isOnlyShippingLocation" value="false" name="isOnlyShippingLocation" v-validate="'required'"  :class="{'input': true, 'is-danger': errors.has('form-addinfo.isOnlyShippingLocation') }">
                                      <label class="radio" for="only_location_no">
                                          <span>No</span>
                                      </label>
                                      <div v-if="errors.has('form-addinfo.isOnlyShippingLocation') " class="margin-top-60">
                                          <pre  class="help is-danger">{{ errors.first('form-addinfo.isOnlyShippingLocation')}}</pre>
                                      </div>
                                  </div>
                                  <div class="grid-80 tablet-grid-100 container">
                                      <label class="input-label">Additional shipping locations</label>
                                      <template v-if="formData.addInfoPart.isOnlyShippingLocation === 'false'">
                                          <input type="text"  v-model = "formData.addInfoPart.additionalShippingAddress" name="additionalShippingAddress" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-addinfo.additionalShippingAddress') }">
                                          <pre v-if="errors.has('form-addinfo.additionalShippingAddress')" class="help is-danger">{{errors.first('form-addinfo.additionalShippingAddress')}}</pre>
                                      </template>
                                      <template v-if="formData.addInfoPart.isOnlyShippingLocation !== 'false'">
                                          <input type="text"  v-model = "formData.addInfoPart.additionalShippingAddress" >
                                      </template>
                                   </div>



                                  <div class="grid-parent grid-80 tablet-grid-100">
                                      <p class="text-bold margin-top-20">4. Do you ship truckload shipments?</p>
                                  </div>

                                  <div class="grid-80 tablet-grid-100 container">
                                      <input type="radio" id="truckload_yes" v-model = "formData.addInfoPart.isShipTruckloadShipment" value="true" name="isShipTruckloadShipment" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-addinfo.isShipTruckloadShipment') }">
                                      <label class="radio" for="truckload_yes">
                                          <span>Yes</span>
                                      </label>

                                      <input type="radio" id="truckload_no" v-model = "formData.addInfoPart.isShipTruckloadShipment" value="false" name="isShipTruckloadShipment" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-addinfo.isShipTruckloadShipment') }">
                                      <label class="radio" for="truckload_no">
                                          <span>No</span>
                                      </label>
                                      <div v-if="errors.has('form-addinfo.isShipTruckloadShipment') " class="margin-top-60">
                                          <pre  class="help is-danger">{{ errors.first('form-addinfo.isShipTruckloadShipment') }}</pre>
                                      </div>
                                  </div>
                                  <div class="grid-80 tablet-grid-100 container">
                                      <label class="input-label">If "Yes", where do you ship?</label>
                                      <template v-if="formData.addInfoPart.isShipTruckloadShipment === 'true'">
                                          <input type="text" v-model = "formData.addInfoPart.whereYouShip" name="whereYouShip" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-addinfo.whereYouShip')  }">
                                          <pre v-show="(errors.has('form-addinfo.whereYouShip') ) " class="help is-danger">{{ errors.first('form-addinfo.whereYouShip') }}</pre>
                                      </template>
                                      <template v-if="formData.addInfoPart.isShipTruckloadShipment !== 'true'">
                                          <input type="text" v-model = "formData.addInfoPart.whereYouShip">
                                      </template>
                                  </div>

                                  <div class="grid-parent grid-80 tablet-grid-100 container">
                                      <p class="text-bold margin-top-20">5. Annual freight spend?</p>
                                  </div>

                                  <div class="grid-50 tablet-grid-100 container">
                                      <select class="dropdown" v-model = "formData.addInfoPart.annualFreightSpend" name="annualFreightSpend" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-addinfo.annualFreightSpend') }">
                                      <option value="" selected>Select</option>
                                      <template v-for="(item,index) in formData.annualFreightSpendOptions">
                                          <option :value="item.key">{{item.text}}</option>
                                      </template>
                                      </select>
                                      <pre v-if="errors.has('form-addinfo.annualFreightSpend') " class="help is-danger">{{ errors.first('form-addinfo.annualFreightSpend') }}</pre>
                                  </div>
                              </div>

                              <div class="grid-50 tablet-grid-50">
                                  <div class="grid-parent grid-80 tablet-grid-100 container">
                                      <p class="text-bold">6. How many LTL shipments do you ship each week?</p>
                                  </div>

                                  <div class="grid-80 tablet-grid-100 container">
                                      <div class="grid-20 tablet-grid-30">
                                          <input type="text" v-model = "formData.addInfoPart.numOfLTLShippmentsEachWeek" name="numOfLTLShippmentsEachWeek" v-validate="{required: true, regex: /^([1-9][0-9]*)+(.[0-9]*)?$/}" :class="{'input': true, 'is-danger': errors.has('form-addinfo.numOfLTLShippmentsEachWeek') }">
                                          <pre v-if="errors.has('form-addinfo.numOfLTLShippmentsEachWeek') " class="help is-danger">{{ errors.first('form-addinfo.numOfLTLShippmentsEachWeek') }}</pre>
                                      </div>
                                  </div>

                                  <div class="grid-parent grid-80 tablet-grid-100">
                                      <p class="text-bold margin-top-20">7. Do you contract with 3PL warehouses?</p>
                                  </div>

                                  <div class="grid-80 tablet-grid-100 container">
                                      <input type="radio" id="3pl_warehouse_yes" v-model = "formData.addInfoPart.isContract3PLWarehouses" value="true" name="isContract3PLWarehouses" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-addinfo.isContract3PLWarehouses') }">
                                      <label class="radio" for="3pl_warehouse_yes">
                                          <span>Yes</span>
                                      </label>

                                      <input type="radio" id="3pl_warehouse_no" v-model = "formData.addInfoPart.isContract3PLWarehouses" value="false" name="isContract3PLWarehouses" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-addinfo.isContract3PLWarehouses') }">
                                      <label class="radio" for="3pl_warehouse_no">
                                          <span>No</span>
                                      </label>
                                      <div v-if="errors.has('form-addinfo.isContract3PLWarehouses') " class="margin-top-60">
                                          <pre  class="help is-danger">{{ errors.first('form-addinfo.isContract3PLWarehouses') }}</pre>
                                      </div>
                                  </div>

                                  <div class="grid-80 tablet-grid-100 container">
                                      <label class="input-label">Additional shipping locations</label>
                                      <template v-if="formData.addInfoPart.isContract3PLWarehouses === 'true'">
                                          <input type="text" v-model = "formData.addInfoPart.additionalShippingLocations" name="additionalShippingLocations" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-addinfo.additionalShippingLocations') }">
                                          <pre v-if="(errors.has('form-addinfo.additionalShippingLocations')) " class="help is-danger">{{ errors.first('form-addinfo.additionalShippingLocations') }}</pre>
                                      </template>
                                      <template v-if="formData.addInfoPart.isContract3PLWarehouses !== 'true'">
                                          <input type="text" v-model = "formData.addInfoPart.additionalShippingLocations" >
                                      </template>
                                  </div>

                                  <div class="grid-parent grid-80 tablet-grid-100">
                                      <p class="text-bold margin-top-20">8. Do you contract with drayage services?</p>
                                  </div>

                                  <div class="grid-80 tablet-grid-100 container">
                                      <input type="radio" id="drayage_yes" v-model = "formData.addInfoPart.isContractDrayageService" value="true" name="isContractDrayageService" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-addinfo.isContractDrayageService') }">
                                      <label class="radio" for="drayage_yes">
                                          <span>Yes</span>
                                      </label>

                                      <input type="radio" id="drayage_no" v-model = "formData.addInfoPart.isContractDrayageService" value="false" name="isContractDrayageService" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-addinfo.isContractDrayageService') }">
                                      <label class="radio" for="drayage_no">
                                          <span>No</span>
                                      </label>
                                      <div v-if="errors.has('form-addinfo.isContractDrayageService') " class="margin-top-60">
                                          <pre  class="help is-danger">{{ errors.first('form-addinfo.isContractDrayageService') }}</pre>
                                      </div>
                                  </div>
                                  <div class="grid-80 tablet-grid-100 container">
                                      <label class="input-label">Additional information</label>
                                      <template v-if="formData.addInfoPart.isContractDrayageService === 'true'">
                                          <input type="text" v-model = "formData.addInfoPart.additionalInformation" name="additionalInformation" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('form-addinfo.additionalInformation') }">
                                          <pre v-if="(errors.has('form-addinfo.additionalInformation') && formData.addInfoPart.isContractDrayageService === 'true') " class="help is-danger">{{ errors.first('form-addinfo.additionalInformation') }}</pre>
                                      </template>
                                      <template v-if="formData.addInfoPart.isContractDrayageService !== 'true'">
                                          <input type="text" v-model = "formData.addInfoPart.additionalInformation" >
                                      </template>
                                  </div>
                              </div>
                                
                          </div>
                         
                      </div>
                      
                  </div>

                  <div class="grid-95 tablet-grid-95 container" style="margin-top: 40px;margin-right:53px;">
                   <div class="grid-20 tablet-grid-20 " style="margin-left: 8px;margin-top:14px;">
                                              <button @click.stop.prevent = "signupBack" class="button-standard-large">BACK</button>
                                         </div>
                      <MainButtonSet :leftBtnText="'Cancel'" :rightBtnText="'Continue'" @leftBtnAction="signupCancel"  @rightBtnAction="addInfoNext"></MainButtonSet>
                  </div>
              </div>
        </form>
 <!-- End OF CUSTOMER SIGNUP ADDITIONAL INFO -->
<!-- BEGIN OF CUSTOMER SIGNUP review-->
              <div class="grid-container" v-show = "currentStage === 3">

                      <div class="grid-100 tablet-grid-100 container">
                          <div class="grid-50 tablet-grid-50">
                              <div class="grid-100 tablet-grid-100">
                                  <h1 class="step-header">
                                      <span class="label-number-summary">1</span>Shipping Information</h1>
                              </div>

                              <div class="grid-100 tablet-grid-100 container">
                                  <table class="table-details">
                                      <tbody>
                                          <tr>
                                              <td>Company</td>
                                              <td>{{formData.signupPart.shipInfo.company}}</td>
                                          </tr>
                                          <tr>
                                              <td>Address</td>
                                              <td>{{formData.signupPart.shipInfo.address1}} <template v-if="formData.signupPart.shipInfo.address2"><br>{{formData.signupPart.shipInfo.address2}}</template><br>{{formData.signupPart.shipInfo.city}}, {{formData.signupPart.shipInfo.state}} {{formData.signupPart.shipInfo.zip}}
                                              </td>
                                          </tr>
                                          <tr>
                                              <td>Phone</td>
                                              <td>{{formData.signupPart.shipInfo.phone}}</td>
                                          </tr>
                                          <tr>
                                              <td>Fax</td>
                                              <td>{{formData.signupPart.shipInfo.fax}}</td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div>

                          <div class="grid-50 tablet-grid-50">
                              <div class="grid-100 tablet-grid-100">
                                  <h1 class="step-header">
                                      <span class="label-number-summary">2</span>Billing Information</h1>
                              </div>

                              <div class="grid-100 tablet-grid-100 container">
                                  <table class="table-details">
                                      <tbody>
                                          <tr>
                                              <td>Company</td>
                                              <td>{{formData.signupPart.billInfo.company}}</td>
                                          </tr>
                                          <tr>
                                              <td>Address</td>
                                              <td>{{formData.signupPart.billInfo.address1}} <template v-if="formData.signupPart.billInfo.address2"><br>{{formData.signupPart.billInfo.address2}}</template><br>{{formData.signupPart.billInfo.city}}, {{formData.signupPart.billInfo.state}} {{formData.signupPart.billInfo.zip}}</td>
                                          </tr>

                                          <tr>
                                              <td>Phone</td>
                                              <td>{{formData.signupPart.billInfo.phone}}</td>
                                          </tr>
                                          <tr>
                                              <td>Fax</td>
                                              <td>{{formData.signupPart.billInfo.fax}}</td>
                                          </tr>
                                          <tr>
                                              <td>Credit Limit</td>
                                              <td>{{formData.signupPart.billInfo.creditLimit}} (requested)</td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                      </div>

                      <div class="grid-100 tablet-grid-100 container margin-bottom-40">
                          <div class="grid-50 tablet-grid-50">
                              <div class="grid-25 tablet-grid-40 margin-left-50">
                                  <button class="button-standard-small edit" :disabled="formData.showLoding" @click="editButtonClick"> Edit</button>
                              </div>
                          </div>

                          <div class="grid-50 tablet-grid-50">
                              <div class="grid-25 tablet-grid-40 margin-left-50">
                                  <button class="button-standard-small edit" :disabled="formData.showLoding" @click="editButtonClick"> Edit</button>
                              </div>
                          </div>
                      </div>

                      <div class="grid-100 tablet-grid-100 container">
                          <div class="grid-50 tablet-grid-50">
                              <div class="grid-100 tablet-grid-100">
                                  <h1 class="step-header">
                                      <span class="label-number-summary">3</span>Account Creation</h1>
                              </div>

                              <div class="grid-100 tablet-grid-100 container">
                                  <table class="table-details">
                                      <tbody>
                                          <tr>
                                              <td>Name</td>
                                              <td>{{formData.signupPart.accountCreation.firstName}} {{formData.signupPart.accountCreation.lastName}}</td>
                                          </tr>
                                          <tr>
                                              <td>Email</td>
                                              <td>{{formData.signupPart.accountCreation.email}}</td>
                                          </tr>
                                          <tr>
                                              <td>Username</td>
                                              <td>{{formData.signupPart.accountCreation.userName}}</td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div>

                          <div class="grid-50 tablet-grid-50">
                              <div class="grid-100 tablet-grid-100">
                                  <h1 class="step-header">
                                      <span class="label-number-summary">4</span>Credit Application</h1>
                              </div>

                              <div class="grid-100 tablet-grid-100">
                                  <p class="sub-header margin-left-50">Please instruct the customer to fill out the credit application form.</p>
                              </div>
                          </div>
                      </div>

                      <div class="grid-100 tablet-grid-100 container margin-left-50 margin-bottom-40">
                          <div class="grid-50 tablet-grid-50">
                              <div class="grid-25 tablet-grid-40">
                                  <button class="button-standard-small edit" @click="editButtonClick" :disabled="formData.showLoding"> Edit</button>
                              </div>
                          </div>
                      </div>


                  <div class="grid-100 tablet-grid-100 container" style="margin-top: 40px;margin-right:53px;">
                    <transition name="fade">
                        <div class="grid-50 tablet-grid-50 toast-message" v-show="formData.showLoding">
                            <p>Hang tight! We are creating this account...</p>
                        </div>
                    </transition>
                     <div  v-show="!formData.showLoding" class="grid-20 tablet-grid-20 " style="margin-left: 8px;margin-top:14px;">
                          <button @click = "signupBack" class="button-standard-large">BACK</button>
                     </div>
                    <MainButtonSet v-show="!formData.showLoding" @leftBtnAction="signupCancel" @rightBtnAction ="reviewCreateAccount" :rightBtnText="'Create Account'"></MainButtonSet>
                  </div>
              </div>
 <!-- END OF CUSTOMER SIGNUP review-->

        <OneButtonModal :modalName="errorModal" :title="errorModalTitle" :showXBtn="showXBtn" :width="errorWidth" @btnAction="closeSignupErrorModal">
            <slot>
                <p>Customer account creation failed. Please send the</p>
                <p>customer account information to
                    <a href="mailto:ship@unisco.com">ship@unisco.com</a>
                </p>
            </slot>
        </OneButtonModal>

     <DefaultModal :modalName="modalName" :title="modalTitle" :width="width" :maxWidth="maxWidth" :height="height" :maxHeight="maxHeight"  :message="modalMessage" :rightBtnText="modalConfirmText" :leftBtnText="modalCancelText" @rightBtnAction="confirmModal" @leftBtnAction="closeModal">
 			<!--test elment-->
 			<!-- <a href="/">you can place customized elements</a> -->
     </DefaultModal>
     </div>
</template>
<style lang = "scss" src = "./customerSignup.scss" scoped></style>