<template>
<div class="grid-container tablet-grid-80">

        <div class="grid-100 tablet-grid-80 container title">
                <h1 class="title">Address Book</h1>

            <div class="grid-100 tablet-grid-100 container flex-justify-content no-padding">
                <div class="grid-60 tablet-grid-65">
                    <label class="input-label">Search</label>
                        <input type="text" placeholder="Search by company name"
                                :class="{'input-search': true, 'track-search': true, 'input-client-error': searchNotFound }" v-model="companyName">
                        <span v-if="searchNotFound" class="error-message"><p style="margin-bottom:-32px; !important;">Could not find company.</p></span>
                </div>

                <div class="grid-15 tablet-grid-35" style="margin-top: 15px;">
                    <button @click="searchCompany" class="button-yellow-medium">{{btnSearchText}}</button>
                </div>
            </div>
        </div>

		<div class="grid-100 tablet-grid-80 container" style="margin-top:30px;">
			<div class="grid-20 tablet-grid-40">
				<button type="button" class="button-standard-small add"  @click="editCompany(0)">Add New Company</button>
			</div>
		</div>

        <div class="grid-100 tablet-grid-80 container" v-if="!addressBookData.showNotFound">
            <div class="grid-100 tablet-grid-100">
                <table class="table-client table-card">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Shipping Address</th>	
                            <th></th>
                        </tr>
                    </thead>

                    <tbody name="list" is="transition-group">
                    	<template v-if="items.length > 0">
                            <tr v-for="(item, index) in items.slice(pagination.min - 1, pagination.max)"  :key="index" class="tr-pointer">
                                <span class="card-header">
                                <td @click="viewCompany(item.location_id)">{{ item.location_name }}</td>
                                </span>
                                <td column-title="Shipping Address" @click="viewCompany(item.location_id)">{{ item.location_street }} {{ item.location_city }} {{ item.location_state }} {{ item.location_zip }}</td>
                                <td>
                               <!-- <button class="edit-row" @click="editCompany(item.location_id)" title="edit"></button> -->
                                    <button class="delete-row" @click="deleteCompany(item.location_id)" title="delete"></button>
                                </td>
                                <v-popover offset="0" class="actions-td">
                                    <button class="card-actions"></button>
                                     <template slot="popover">
                                   <!-- <p @click="editCompany(item.location_id)" title="edit">Edit</p> -->
                                        <p @click="deleteCompany(item.location_id)" title="delete" v-close-popover.all>Delete</p>
                                    </template>
                                </v-popover> 
                            </tr>
                         </template>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="grid-100 tablet-grid-80 container" v-if="items.length > 0">
            <div class="grid-100 tablet-grid-100" style="margin-top: 15px;">
                <div class="div_pagination_left">
                Showing <span>{{ pagination.min }} - {{ pagination.max }}</span> of <span>{{ pagination.totalCompanies }}</span>  
                <span v-if="pagination.totalCompanies == 1">company</span><span v-else >companies</span>
                </div>
                <div class="div_pagination_right" v-if="!pagination.hide">
                    <div style="width:auto;">
                        <button v-if="pagination.currentPaginationIndex != 0" v-on:click="decrementPagination()" style="width:auto; background-color:transparent; box-shadow: none; text-transform:capitalize;"><img src="./right-arrow.svg" style="height:12px;">&nbsp;Back</button>
                        <ul style="display:inline-block;">
                            <li v-if="value.index == pagination.currentPaginationIndex" style="display: inline; padding:3px;" v-for="(value, index) in pagination.paginationLink" v-on:click="updatePaginationModel(value.index)">
                                <button style="width:auto; border-radius:0px; border-bottom:3px solid #f7b020; background-color:transparent; box-shadow: none;">{{ value.value }}</button>
                            </li>
                            <li v-else style="display: inline; padding:3px;" v-on:click="updatePaginationModel(value.index)">
                                <button style="width:auto; background-color:transparent; box-shadow: none;">{{ value.value }}</button>
                            </li>
                        </ul>
                        <button v-on:click="incrementPagination()" style="width:auto; background-color:transparent; box-shadow: none; text-transform:capitalize;">Next&nbsp;<img src="./left-arrow.svg" style="height:12px;"></button>
                    </div> 
                </div>
            </div>
        </div>

        <DefaultModal :modalName="viewCompanyModal" :title="addressBookData.companyData.locationName" :rightBtnText="'Delete Company'" :leftBtnText="'Edit'" @rightBtnAction="deleteCompany(addressBookData.companyData.locationId)" :leftBtnStyle="editViewleftBtnStyle" :rightBtnStyle="editViewRightBtnStyle">
            <div class="grid-100 tablet-grid-100 container no-padding">
                <table class="table-details margin-left-minus-10">
                    <tbody>
                        <tr>
                            <td>Location Type</td>
                            <td>{{addressBookData.companyData.location_type_name}}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>
                              <p>{{addressBookData.companyData.address1}} {{addressBookData.companyData.address2}}</p>
                              <p>{{addressBookData.companyData.city}}<span v-if="addressBookData.companyData.city">,</span> {{addressBookData.companyData.state}} {{addressBookData.companyData.zip}}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td><p>{{addressBookData.companyData.phone}}</p></td>
                        </tr>                        
                        <tr v-if="addressBookData.companyData.fax">
                            <td>Fax</td>
                            <td><p>{{addressBookData.companyData.fax}}</p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </DefaultModal>

        <DefaultModal :modalName="deleteCompanyModal" :title="'Delete Contact'" :rightBtnText="'Yes, Delete'" :leftBtnText="'Nevermind'" @rightBtnAction="confirmModal('del')" @leftBtnAction="closeModal('del')">
            <p class="modal-label-default">Are you sure you want to delete the contact '{{ addressBookData.companyData.locationName }}'?</p>
            <p class="modal-label-default">Deleted contacts cannot be restored.</p>
        </DefaultModal>

        <DefaultModal :modalName="editCompanyModal" :title="editCompanyModalTitle" :rightBtnText="editCompanyModaRightBtn" :leftBtnText="'Cancel'" @rightBtnAction="confirmModal('edit')" @leftBtnAction="closeModal('edit')" :rightBtnStyle="editCompanyRightBtnStyle">
			<div class="grid-100 tablet-grid-100 no-padding">
		        <div class="grid-50 tablet-grid-100 container no-padding">
		            <label class="input-label">Location Type</label>
		            <select class="dropdown" v-model="addressBookData.companyData.location_type">
		                <option v-for="(item,key) in locationTypeOptions" :key="key" :value="item.key">{{item.value}}</option>
		            </select>
		        </div>
		        <div class="grid-100 tablet-grid-100 container no-padding">
		            <label class="input-label">Company</label>
		            <input type="text" v-model="addressBookData.companyData.locationName" name="bookCompany" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('bookCompany') && validationStarted}">
		            <span v-if="errors.has('bookCompany') && validationStarted" class="help is-danger">{{ errors.first('bookCompany') }}</span>
		        </div>

		        <div class="grid-100 tablet-grid-100 container no-padding">
		            <label class="input-label">Address 1</label>
		            <input type="text" v-validate="'required'" name="bookAddress1" :class="{'input': true, 'is-danger': errors.has('bookAddress1') && validationStarted}" v-model="addressBookData.companyData.address1">
		       		<span v-if="errors.has('bookAddress1') && validationStarted" class="help is-danger">{{ errors.first('bookAddress1') }}</span>
		        </div>

		        <div class="grid-100 tablet-grid-100 container no-padding">
		            <label class="input-label optional-label">Address 2</label>
		            <input type="text" v-model="addressBookData.companyData.address2">
		        </div>	        

		        <div class="grid-100 tablet-grid-100 container no-padding">
		            <div class="grid-50 tablet-grid-50">
		                <label class="input-label">City</label>
		                <input type="text"  v-validate="'required'" name="bookCity" :class="{'input': true, 'is-danger': errors.has('bookCity') && validationStarted}"  v-model="addressBookData.companyData.city">
		                <span v-if="errors.has('bookCity') && validationStarted" class="help is-danger">{{ errors.first('bookCity') }}</span>
		            </div>

		            <div class="grid-25 tablet-grid-25">
		                <label class="input-label">State</label>
		                <select class="dropdown" v-model="addressBookData.companyData.state">
		                     <option v-for="state in stateOptions">{{state}}</option>
		                </select>
		            </div>

		            <div class="grid-25 tablet-grid-25">
		                <label class="input-label">Zip Code</label>
		                <input type="text" name="bookZip" maxlength="5" v-model="addressBookData.companyData.zip" v-validate="'required|digits:5'" :class="{'input': true, 'is-danger': errors.has('bookZip')}">
		                 <span v-if="errors.has('bookZip') && validationStarted" class="help is-danger">{{ errors.first('bookZip') }}</span>
		            </div>
		        </div>

		  	    <div class="grid-100 tablet-grid-100 container no-padding">
		            <label class="input-label optional-label">Email</label>
		            <input type="text" v-model="addressBookData.companyData.email">
		        </div>      

		        <div class="grid-100 tablet-grid-100 container no-padding">
		            <div class="grid-50 tablet-grid-50">
		                <label class="input-label">Phone</label>
	                  	<input type="text" v-mask="'000-000-0000'" placeholder="xxx-xxx-xxxx" v-model="addressBookData.companyData.phone" name="bookPhone" v-validate="'required|length:12'" :class="{'input': true, 'is-danger': errors.has('bookPhone')}">
	                  	<span v-if="errors.has('bookPhone')" class="help is-danger">{{ errors.first('bookPhone') }}</span>
		            </div>

		            <div class="grid-50 tablet-grid-50">
		                <label class="input-label optional-label">Fax</label>
		                <input type="text" v-mask="'000-000-0000'" placeholder="xxx-xxx-xxxx" v-model="addressBookData.companyData.fax" name="bookFax" v-validate="'length:12'" :class="{'input': true, 'is-danger': errors.has('bookFax')}">
		                <span v-if="errors.has('bookFax')" class="help is-danger">{{ errors.first('bookFax') }}</span>
		            </div>
		        </div> 
			</div>
        </DefaultModal>

        <DefaultModal :modalName="addressSuggestionModal" :title="'Address Suggestion'" :rightBtnText="rightBtnaddressSuggestionModal" :leftBtnText="'Cancel'" @rightBtnAction="confirmModal('edit',true)" @leftBtnAction="closeModal('addressSuggestionModal')" :rightBtnStyle="addressRightBtnStyle">
            <div class="grid-100 tablet-grid-100 container no-padding">
                <div class="grid-50 tablet-grid-50 no-padding">
                    <input type="radio" id="inputedAddress" name="pickupRadio" v-model="suggestedRadioAddress" v-bind:value="'inputted'">
                    <label class="radio" for="inputedAddress">
                        <span style="color: #656565; font-size:18px; font-weight:600 !important;">Inputted Address</span>
                    </label>
                    <div style="width: 164px;
                                text-align: left;
                                margin-left:30px;">
                        <br>
                        <br>
                        <span>{{addressBookData.companyData.address1}} {{addressBookData.companyData.address2}}</span>
                        <br>
                        <span>{{addressBookData.companyData.city}}, {{addressBookData.companyData.state}} {{addressBookData.companyData.zip}}</span>
                    </div>
                </div>
                <div class="grid-50 tablet-grid-50 no-padding" v-if="addressBookData.suggestedAddress.Address">
                    <input type="radio" id="suggestedPickupAddress" name="pickupRadio" v-model="suggestedRadioAddress" v-bind:value="'suggested'">
                    <label class="radio" for="suggestedPickupAddress">
                        <span style="color: #656565; font-size:18px; font-weight:600 !important;">Suggested Address</span>
                    </label>
                    <div style="width: 164px;
                                text-align: left;
                                margin-left:30px;">
                        <br>
                        <br>
                        <span>{{addressBookData.suggestedAddress.Address.StreetAddress}}</span>
                        <br>
                        <span>{{addressBookData.suggestedAddress.Address.City}}, {{addressBookData.suggestedAddress.Address.State}} {{addressBookData.suggestedAddress.Address.Zip}}</span>
                    </div>
                </div>
            </div>
            <span style="margin-left:30px;margin-bottom-30px;" v-if="!addressBookData.suggestedAddress.Address" class="help is-danger">This address does not appear to exist.</span>
            
            <div class="grid-100 tablet-grid-100 container no-padding" v-if="!addressBookData.suggestedAddress.Address">
                <div class="grid-100 tablet-grid-100">
                    <input type="radio" id="inputedAddressdNewAddress" name="pickupRadio" v-model="suggestedRadioAddress" v-bind:value="'new_inputted'">
                    <label class="radio" for="inputedAddressdNewAddress">
                        <span style="color: #656565; font-size:18px; font-weight:600 !important;">Input New Address</span>
                    </label>
                    <div>
        			<div class="grid-100 tablet-grid-100 no-padding" style="margin-left: 19px;">
				        <div class="grid-80 tablet-grid-90 container" style="margin-top:15px;">
				            <label class="input-label">Address 1</label>
				            <input type="text" v-validate="'required'" name="newbookAddress1" :class="{'input': true, 'is-danger': errors.has('newbookAddress1') && validationStarted}" v-model="addressBookData.newInputtedAddress.address1">
				       		<span v-if="errors.has('newbookAddress1') && validationStarted" class="help is-danger">{{ errors.first('newbookAddress1') }}</span>
				        </div>

				        <div class="grid-80 tablet-grid-90 container">
				            <label class="input-label optional-label">Address 2</label>
				            <input type="text" v-model="addressBookData.newInputtedAddress.address2">
				        </div>	        

				        <div class="grid-80 tablet-grid-90 container">
				            <div class="grid-50 tablet-grid-50">
				                <label class="input-label">City</label>
				                <input type="text"  v-validate="'required'" name="newbookCity" :class="{'input': true, 'is-danger': errors.has('newbookCity') && validationStarted}"  v-model="addressBookData.newInputtedAddress.city">
				                <span v-if="errors.has('newbookCity') && validationStarted" class="help is-danger">{{ errors.first('newbookCity') }}</span>
				            </div>

				            <div class="grid-25 tablet-grid-25">
				                <label class="input-label">State</label>
				                <select class="dropdown" v-model="addressBookData.newInputtedAddress.state">
				                     <option v-for="state in stateOptions">{{state}}</option>
				                </select>
				            </div>

				            <div class="grid-25 tablet-grid-25">
				                <label class="input-label">Zip Code</label>
				                <input type="text" name="newbookZip" maxlength="5" v-model="addressBookData.newInputtedAddress.zip" v-validate="'required|digits:5'" :class="{'input': true, 'is-danger': errors.has('newbookZip')}">
				                 <span v-if="errors.has('newbookZip') && validationStarted" class="help is-danger">{{ errors.first('newbookZip') }}</span>
				            </div>
				        </div>
					</div>
                    </div>
                </div>
            </div>
        </DefaultModal>

        <MessageModal :modalName="successModalName" :title="successModalTitle" :message="successModalMessage"></MessageModal>

        <OneButtonModal :modalName="errorModal" :title="'Error'" @btnAction="closeErrorModal">
			<slot>
				<p>Sorry, we were unable to update this</p>
				<p>company. Please try again later.</p>
			</slot>
		</OneButtonModal>


 </div>
</template>
<style lang="scss" src="./addressBook.scss" scoped></style>	