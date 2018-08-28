<template>
    <div class="grid-container tablet-grid-80">
        <div class="grid-parent grid-100 tablet-grid-80 container title">
                <h1 class="title" style="text-transform:unset; margin-bottom:10px;">Ready to Ship?</h1>

            <div class="grid-parent grid-15 tablet-grid-35 mobile-grid-40 container">
                <button class="button-yellow-medium">Get a Quote</button>
            </div>
        </div>

        <div class="grid-100 tablet-grid-80">
            <div class="grid-100 tablet-grid-100">
                <table class="table-client table-card">
                    <thead>
                        <tr>
                            <th>PU #</th>
                            <th>PRO #</th>
                            <th>Reference #</th>
                            <th>Pickup Date</th>
                            <th>Origin</th>
                            <th>Delivery Date</th>
                            <th>Destination</th>
                            <th>Pallets</th>
                            <th>Weight</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <span class="card-header">
                                <td column-title="PU #">454535535</td>
                                <td column-title="PRO #">453453453</td>
                                <td column-title="Reference #">45345345</td>
                            </span>
                            <td column-title="Pickup Date">04/11/2018</td>
                            <td column-title="Origin">Los Angeles, CA</td>
                            <td column-title="Delivery Date">04/12/2018</td>
                            <td column-title="Destination">Hawthorne, CA</td>
                            <td column-title="Pallets">3</td>
                            <td column-title="Weight">100</td>
                            <v-popover offset="0" class="actions-td">
                                <button class="actions"></button>
                                <template slot="popover">
                                    <p class="available">View BOL(s)</p>
                                    <p class="not-available">View POD(s)</p>
                                    <p>View Shipping Labels</p>
                                </template>
                            </v-popover>
                        </tr>
                        <tr>
                            <span class="card-header">
                                <td column-title="PU #">454535535</td>
                                <td column-title="PRO #">453453453</td>
                                <td column-title="Reference #">45345345</td>
                            </span>
                            <td column-title="Pickup Date">04/11/2018</td>
                            <td column-title="Origin">Los Angeles, CA</td>
                            <td column-title="Delivery Date">04/12/2018</td>
                            <td column-title="Destination">Hawthorne, CA</td>
                            <td column-title="Pallets">3</td>
                            <td column-title="Weight">100</td>
                            <v-popover offset="0" class="actions-td">
                                <button class="actions"></button>
                                <template slot="popover">
                                    <p class="available">View BOL(s)</p>
                                    <p class="not-available">View POD(s)</p>
                                    <p>View Shipping Labels</p>
                                </template>
                            </v-popover>
                        </tr>
                        <tr>
                            <span class="card-header">
                                <td column-title="PU #">454535535</td>
                                <td column-title="PRO #">453453453</td>
                                <td column-title="Reference #">45345345</td>
                            </span>
                            <td column-title="Pickup Date">04/11/2018</td>
                            <td column-title="Origin">Los Angeles, CA</td>
                            <td column-title="Delivery Date">04/12/2018</td>
                            <td column-title="Destination">Hawthorne, CA</td>
                            <td column-title="Pallets">3</td>
                            <td column-title="Weight">100</td>
                            <v-popover offset="0" class="actions-td">
                                <button class="actions"></button>
                                <template slot="popover">
                                    <p class="available">View BOL(s)</p>
                                    <p class="not-available">View POD(s)</p>
                                    <p>View Shipping Labels</p>
                                </template>
                            </v-popover>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="grid-100 tablet-grid-80 container title">
                <h1 class="title">My Customers</h1>

            <div class="grid-100 tablet-grid-100 container flex-justify-content">
                <div class="grid-50 tablet-grid-65">
                    <label class="input-label">Search</label>
                    <input type="text" placeholder="Search for customer name or company" class="input-search">
                </div>

                <div class="grid-15 tablet-grid-35" style="margin-top: 15px;">
                    <button class="button-yellow-medium">Clear Results</button>
                </div>
            </div>
        </div>

        <div class="grid-100 tablet-grid-80">
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
                        <tr> <!-- NOTE: column-title attribute is not needed because mockup does not have label, only title  -->
                            <span class="card-header">
                                <td>Happy Lemon</td>
                            </span>
                            <td column-title="Customer">Donna Yee</td>
                            <td column-title="Shipping Address">18246 Gale Ave., City of Industry, CA 91748</td>
                            <td column-title="Phone">686-581-8798</td>
                            <td column-title="Email">donna@happylemon.com</td>
                            <td column-title="Signup Date">04/12/2018</td>
                        </tr>
                        <tr>
                            <span class="card-header">
                                <td>I Heart Boba</td>
                            </span>
                            <td column-title="Customer">Jackie Lee</td>
                            <td column-title="Shipping Address">18246 Gale Ave., City of Industry, CA 91748</td>
                            <td column-title="Phone">686-581-8798</td>
                            <td column-title="Email">jackie@iheartboba.com</td>
                            <td column-title="Signup Date">04/12/2018</td>
                        </tr>
                        <tr>
                            <span class="card-header">
                                <td>Jimmy John's</td>
                            </span>
                            <td column-title="Customer">Manpreet Randhawa</td>
                            <td column-title="Shipping Address">1826 Azusa Ave., City of Industry, CA 91748</td>
                            <td column-title="Phone">686-453-6765</td>
                            <td column-title="Email">manpreet@jimmys.com</td>
                            <td column-title="Signup Date">04/12/2018</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="grid-100 tablet-grid-80 container title">
                <h1 class="title">Address Book</h1>

            <div class="grid-100 tablet-grid-100 container flex-justify-content">
                <div class="grid-50 tablet-grid-65">
                    <label class="input-label">Search</label>
                    <input type="text" placeholder="Search by company name" class="input-search">
                </div>

                <div class="grid-15 tablet-grid-35" style="margin-top: 15px;">
                    <button class="button-yellow-medium">Search</button>
                </div>
            </div>
        </div>

        <div class="grid-100 tablet-grid-80">
            <div class="grid-100 tablet-grid-100">
                <table class="table-client table-card">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Customer</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <span class="card-header">
                                <td>Fisher Scientific</td>
                            </span>
                            <td column-title="Shipping Address">14236 Azusa Ave., City of Industry, CA 91748</td>
                            <td>
                                <button class="edit-row" title="edit"></button>
                                <button class="delete-row" title="delete"></button>
                            </td>
                            <td class="card-actions-td">
                                <button class="card-actions"></button>
                            </td>
                        </tr>
                        <tr>
                            <span class="card-header">
                                <td>Fisher Company</td>
                            </span>
                            <td column-title="Shipping Address">18246 Gale Ave., City of Industry, CA 91748</td>
                            <td>
                                <button class="edit-row" title="edit"></button>
                                <button class="delete-row" title="delete"></button>
                            </td>
                            <td class="card-actions-td">
                                <button class="card-actions"></button>
                            </td>
                        </tr>
                        <tr>
                            <span class="card-header">
                                <td>Fisher Something-Else</td>
                            </span>
                            <td column-title="Shipping Address">1232 Smith Ave., City of Industry, CA 91748</td>
                            <td>
                                <button class="edit-row" title="edit"></button>
                                <button class="delete-row" title="delete"></button>
                            </td>
                            <td class="card-actions-td">
                                <button class="card-actions"></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    
</template>