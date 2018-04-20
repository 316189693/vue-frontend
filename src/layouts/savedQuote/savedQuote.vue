<template>

    <div class="grid-container">
        <div class="grid-100 tablet-grid-100">
            <div class="grid-parent grid-100 tablet-grid-100 container">
                <h1 class="title">Saved Quotes</h1>
            </div>
        </div>

        <div class="grid-100 tablet-grid-100 container">
            <div class="grid-20 tablet-grid-30">
                <button class="button-yellow-medium" @click="goToSchedule" :disabled="activeRadio < 0">Schedule a Pickup</button>
            </div>
        </div>

        <div class="grid-100 tablet-grid-100">
            <table class="table-client">
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
                    <template v-for="(item,key) in savedQuoteData">
                        <tr :class="{'selected-row': key == activeRadio}" :key="item.tms_quote_id">
                            <td>
                                <input type="radio" :id="'radio' + key" name="radio">
                                <label class="radio" :for="'radio' + key" @click="setActiveRadio(key)" :title="key == activeRadio ? 'Click to deselect' : ''">
                                </label>
                            </td>
                            <td>{{item.tms_quote_id}}</td>
                            <td>{{item.tms_quote_created_date | date_MDY_Slash}}</td>
                            <td>{{item.tms_quote_client_city | capitalizeEach}}</td>
                            <td>{{item.tms_quote_consignee_city | capitalizeEach}}</td>
                            <td>{{item.total_amount | dollar}}</td>
                            <td>
                                <button class="edit-row" @click="goToEdit(key)" v-visible="!quoteSelected" title="edit"></button>
                                <button class="delete-row" @click="deleteQuote(key,item.tms_quote_id)" v-visible="!quoteSelected" title="delete"></button>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
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