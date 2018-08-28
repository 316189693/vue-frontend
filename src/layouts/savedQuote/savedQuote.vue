<template>

    <div class="grid-container">
        <div class="grid-100 tablet-grid-100">
            <div class="grid-parent grid-100 tablet-grid-100 container">
                <h1 class="title title-tablet">Saved Quotes</h1>
                <p class="hidden-desktop">Select a saved quote to schedule a pickup.</p>
            </div>
        </div>

        <div class="grid-100 tablet-grid-100 container hidden-element">
            <div class="grid-20 tablet-grid-30">
                <button class="button-yellow-medium" @click="goToSchedule" :disabled="activeRadio < 0">Schedule a Pickup</button>
            </div>
        </div>

        <div class="grid-100 tablet-grid-100 container" v-show="isLoading">
            <div class="toast-message-container">
                <div class="toast-message-home">
                    <p>Hang tight! We are loading your saved quotes…</p>
                </div>
            </div>
        </div>

        <div class="grid-100 tablet-grid-80">
            <table class="table-client table-card">
                <thead>
                    <tr>
                        <th></th>
                        <th>Quote ID</th>
                        <th>Created Date</th>
                        <th>Shipper</th>
                        <th>Consignee</th>
                        <th>Quote</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody name="list" is="transition-group">
                    <template v-if="savedQuoteData.length > 0">
                        <tr v-for="(item, key) in savedQuoteData.slice(pagination.min - 1, pagination.max)" :class="{'selected-row': key == activeRadio}" :key="item.tms_quote_id">
                            <td class="hidden-element" >
                                <input type="radio" :id="'radio' + key" name="radio">
                                <label class="radio" :for="'radio' + key" @click="setActiveRadio(key)" :title="key == activeRadio ? 'Click to deselect' : ''">
                                </label>
                            </td>
                            
                            <span class="card-header">
                            <td column-title="Quote ID #"> {{item.tms_quote_id}}</td>
                            </span>
                            <td class="hidden-element" column-title="Created Date">{{item.tms_quote_created_date | date_MDY_Slash}}</td>
                            <td column-title="Shipper">{{item.tms_quote_client_city | capitalizeEach}}</td>
                            <td column-title="Destination">{{item.tms_quote_consignee_city | capitalizeEach}}</td>
                            <td class="hidden-desktop" column-title="Created Date">{{item.tms_quote_created_date | date_MDY_Slash}}</td>
                            <td column-title="Quote">{{item.total_amount | dollar}}</td>
                            <td>
                                <button class="edit-row" @click="goToEdit(key)" v-visible="!quoteSelected" title="edit"></button>
                                <button class="delete-row" @click="deleteQuote(key,item.tms_quote_id)" v-visible="!quoteSelected" title="delete"></button>
                            </td>
                            <v-popover offset="0" class="actions-td">
                                <button class="card-actions"></button>
                                <template slot="popover">
                                    <p class="available" :for="'radio' + key" @click="goToScheduleKey(item.tms_quote_id)" :title="key == activeRadio ? 'Click to deselect' : ''">Schedule for Pickup
                                    </p>
                                    <p class="available" @click="goToEdit(key)" v-visible="!quoteSelected"  title="edit">Edit
                                    </p>
                                    <p class="available" @click="deleteQuote(key,item.tms_quote_id)" v-visible="!quoteSelected" title="delete">Delete
                                    </p>
                                </template>
                            </v-popover>
                        </tr>
                    </template>
                </tbody>
            </table>

            <div v-if="! pagination.hide"><div style="float: left; margin-top: 30px; font-style: italic; color: #15223d;">Showing <span>{{ pagination.min }} - {{ pagination.max }}</span> of <span>{{ pagination.totalOrders }}</span> orders</div>
            <div style="float: right; margin-top: 30px;">
                
                <!-- <div style="width:85px; position: relative; left: 116px; height: 22px;"> -->
                <div style="min-width:100px; float:right;">

                    <button v-if="pagination.currentPaginationIndex != 0" v-on:click="decrementPagination()" style="width:auto; background-color:transparent; box-shadow: none; text-transform: capitalize; color: #15223d;"><img src="./right-arrow.svg" style="height:12px;">&nbsp;Back</button>

                    <ul style="display:inline-block;">
                        <li v-if="value.index == pagination.currentPaginationIndex" style="display: inline; padding:3px;" v-for="(value, index) in pagination.paginationLink" v-on:click="updatePaginationModel(value.index)"><button style="width:auto; border-radius:0px; border-bottom:3px solid #f7b020; background-color:transparent; box-shadow: none; color: #15223d;">{{ value.value }}</button></li>
                        <li v-else style="display: inline; padding:3px;" v-on:click="updatePaginationModel(value.index)"><button style="width:auto; background-color:transparent; box-shadow: none; color: #15223d;">{{ value.value }}</button></li>
                    </ul>

                    <button v-if="(pagination.currentPaginationIndex + 1) != pagination.totalPaginationCount" v-on:click="incrementPagination()" style="width:auto; background-color:transparent; box-shadow: none; text-transform: capitalize; color: #15223d;">Next&nbsp;<img src="./left-arrow.svg" style="height:12px;"></button>
                    
                </div> 
                
            </div></div>

        </div>

    
      <DefaultModal :modalName="deleteModal" :title="'Delete Saved Quote'" :rightBtnText="'Yes, Delete Quote'" :leftBtnText="'Nevermind'" @rightBtnAction="rightBtnDeleteModal" @leftBtnAction="leftBtnDeleteModal">
          <slot>
              <p>Are you sure you want to delete this quote?</p>
              <p>Deleted quotes cannot be restored.</p>
          </slot>
      </DefaultModal>

      <MessageModal :modalName="errorMessage" :title="'Failed'" :message="'Deletion Failed'"></MessageModal>

    </div>

</template>