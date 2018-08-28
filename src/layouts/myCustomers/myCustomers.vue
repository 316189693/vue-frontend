<template>
    <div class="grid-container tablet-grid-80">

        <div class="grid-100 tablet-grid-80 container title">
            <h1 class="title">My Customers</h1>
            <div class="grid-100 tablet-grid-100 container flex-justify-content">
                <div class="grid-50 tablet-grid-65" >
                    <label class="input-label">Search</label>
                    <input type="text" placeholder="Search for customer name or company"  @input = "inputSearchTermChanged" name="searchStr" @keyup.enter.stop.prevent = "doSearch()"  v-model='formData.searchStr' v-validate="'required'" :class="{ 'input': true, 'my-suctomer-search-is-danger': formData.show_customers_no_found_text,'is-danger': formData.show_customers_no_found_text,'input-search': true}">
                    <pre v-if="formData.show_customers_no_found_text" class="help is-danger">{{formData.customer_no_found_text}}</pre>
                </div>

                <div class="grid-15 tablet-grid-35 margin-top-15" :class="{'margin-top--15': (formData.show_customers_no_found_text)}">
                    <button v-if="!formData.show_clear_results_btn" class="button-yellow-medium" @click.stop.prevent="doSearch()">{{formData.search_btn_text}}</button>
                    <button v-if="formData.show_clear_results_btn" class="button-yellow-medium" @click.stop.prevent="doSearch()">{{formData.clear_results_btn_text}}</button>
                </div>
            </div>
        </div>

        <div class="grid-100 tablet-grid-80" v-if="formData.has_customers">
            <div class="grid-100 tablet-grid-100">
                <table class="table-client table-card">
                    <thead>
                    <tr>
                        <th>Company</th>
                        <th>Customer</th>
                        <th>Shipping Address</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Signup Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="customer in formData.customers">
                        <tr> <!-- NOTE: column-title attribute is not needed because mockup does not have label, only title  -->
                            <td column-title="Company">{{customer.location_name}}</td>
                            <td column-title="Customer">{{customer.user_firstname + " " + customer.user_lastname}}</td>
                            <td column-title="Shipping Address">{{customer.getShippingAddress()}}</td>
                            <td column-title="Phone">{{customer.location_phone}}</td>
                            <td column-title="Email">{{customer.user_email}}</td>
                            <td column-title="Signup Date">{{customer.user_created_date}}</td>
                        </tr>
                    </template>
                    </tbody>
                </table>
                <div class="grid-100 tablet-grid-80 container margin-top-40" >
                    <div class="grid-25 tablet-grid-25 my-customers-container" v-if="formData.show_total_info">
                        <p class="margin-top-p">
                            <span class="customer-text">You have signed up <span class="text-bold">{{formData.pagination.getTotalSize()}}</span> customers.</span>
                        </p>
                    </div>
                </div>
                <div class="grid-100 tablet-grid-80 container pagination_margin">
                    <Pagination :pagination = "formData.pagination" @goToPage = "doSearchByPageNum"></Pagination>
                </div>
            </div>
        </div>

    </div>
</template>
<style lang="scss" src="./myCustomers.scss" scoped></style>
