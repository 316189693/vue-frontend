<template>
    <div id="sitecontent">
        <!-- BEGINNING OF TMS-698 -->
        <div class="grid-container">
            <div class="grid-100 tablet-grid-100">
                <div class="grid-100 tablet-grid-100 container title">
                    <h1 class="title">Track Shipments</h1>
                    <p class="sub-header sub-title">NOTE: Some element classes and in-style css had to be modified to keep alignment and responsive mode working</p>
                </div>

                <div class="grid-100 tablet-grid-100 container tracking-container">
                    <div class="grid-80 tablet-grid-75" style="padding-right: 0px;">
                        <label class="input-label">Reference # or PRO # or PU #</label>
                        <input type="text" class="input-search" placeholder="Search by Reference # or PRO # or PU #">
                    </div>

                    <div class="grid-15 tablet-grid-25" style="margin-top: 15px; margin-bottom: 20px; padding-right: 0px;">
                        <button class="button-yellow-medium">Track</button>
                    </div>

                    <div class="grid-parent grid-100 tablet-grid-100">
                        <div class="grid-80 tablet-grid-100 card-table-container margin-bottom-40">
                            <div class="grid-parent grid-100 tablet-grid-100 container">
                                <p>This PU# has multiple orders associated with it. </p>
                                <p>Please select the order you wish to track:</p>
                            </div>

                            <table class="table-client">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>PRO #</th>
                                        <th>Reference #</th>
                                        <th>Delivery Date</th>
                                        <th>Pallets</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="selected-row">
                                        <td>
                                            <input type="radio" id="radio0" name="radio" checked>
                                            <label for="radio0" title="" class="radio"></label>
                                        </td>
                                        <td>1111001834</td>
                                        <td>K3456</td>
                                        <td>04/11/2018</td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="radio" id="radio1" name="radio">
                                            <label for="radio1" title="" class="radio"></label>
                                        </td>
                                        <td>1111001833</td>
                                        <td>J6333</td>
                                        <td>04/11/2018</td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input type="radio" id="radio2" name="radio">
                                            <label for="radio2" title="" class="radio"></label>
                                        </td>
                                        <td>1111001832</td>
                                        <td>J3929</td>
                                        <td>04/11/2018</td>
                                        <td>1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="grid-100 tablet-grid-100 container">
                    <table class="table-tracking">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="3" class="date">Sunday, February 11, 2018</td>
                            </tr>
                            <tr>
                                <td>02/20/2018</td>
                                <td>Order In Transit</td>
                                <td>Irvine, CA</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="date">Saturday, February 10, 2018</td>
                            </tr>
                            <tr>
                                <td>02/10/2018</td>
                                <td>Order Picked Up</td>
                                <td>City of Industry, CA</td>
                            </tr>
                            <tr>
                                <td>02/10/2018</td>
                                <td>Order Updated</td>
                                <td>City of Industry, CA</td>
                            </tr>
                            <tr>
                                <td colspan="3" class="date">Friday, February 9, 2018</td>
                            </tr>
                            <tr>
                                <td>02/9/2018</td>
                                <td>Order created</td>
                                <td>City of Industry, CA</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- END OF TICKET TMS-698 -->

        <!-- BEGINNING OF CUSTOMER SIGN UP -->
        <div class="row grid-container">
            <div class="grid-100 tablet-grid-100 container">
                <StageHeader :headerTitle="'Customer Signup'" :headerSubtitle="'Signup'" :stage="1" :pages="['Signup','Additional Information','Review']"></StageHeader>
            </div>

            <div class="grid-100 tablet-grid-100 container">
                <div class="grid-100 tablet-grid-100 container step-container">
                    <div class="grid-50 tablet-grid-80 container">
                        <div class="grid-100 tablet-grid-100 container margin-left-10">
                            <h1 class="step-header">
                                <span class="label-number active">1</span>Shipping Information
                            </h1>
                        </div>

                        <div class="grid-80 tablet-grid-100 container">
                            <label class="input-label">Company</label>
                            <input type="text">
                        </div>

                        <div class="grid-80 tablet-grid-100 container">
                            <label class="input-label">Address 1</label>
                            <input type="text">
                        </div>

                        <div class="grid-80 tablet-grid-100 container">
                            <label class="input-label optional-label">Address 2</label>
                            <input type="text">
                        </div>

                        <div class="grid-80 tablet-grid-100 container">
                            <div class="grid-50 tablet-grid-50">
                                <label class="input-label">City</label>
                                <input type="text">
                            </div>

                            <div class="grid-25 tablet-grid-25">
                                <label class="input-label">State</label>
                                <select class="dropdown"></select>
                            </div>

                            <div class="grid-25 tablet-grid-25">
                                <label class="input-label">Zip Code</label>
                                <input type="text">
                            </div>
                        </div>

                        <div class="grid-80 tablet-grid-100 container  margin-bottom-40">
                            <div class="grid-50 tablet-grid-50">
                                <label class="input-label">Phone</label>
                                <input type="text" placeholder="xxx-xxx-xxxx">
                            </div>

                            <div class="grid-50 tablet-grid-50">
                                <label class="input-label optional-label">Fax</label>
                                <input type="text" placeholder="xxx-xxx-xxxx">
                            </div>
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <h1 class="step-header">
                                <span class="label-number">3</span>Account Creation
                            </h1>
                        </div>

                        <div class="grid-80 tablet-grid-100 container">
                            <div class="grid-50 tablet-grid-50">
                                <label class="input-label">First Name</label>
                                <input type="text">
                            </div>

                            <div class="grid-50 tablet-grid-50">
                                <label class="input-label">Last Name</label>
                                <input type="text">
                            </div>
                        </div>

                        <div class="grid-80 tablet-grid-100 container">
                            <div class="grid-50 tablet-grid-50">
                                <label class="input-label">Email</label>
                                <input type="text">
                            </div>

                            <div class="grid-50 tablet-grid-50">
                                <label class="input-label">Username</label>
                                <input type="text">
                            </div>
                            <div>&nbsp;</div>
                        </div>
                    </div>

                    <div class="grid-parent grid-50 tablet-grid-80">
                        <div class="grid-100 tablet-grid-100 container">
                            <h1 class="step-header">
                                <span class="label-number">2</span>Billing Information

                                <input type="checkbox" id="billing_info">
                                <label class="checkbox" for="billing_info">
                                    <span>Same as Shipping Address</span>
                                </label>
                            </h1>
                        </div>

                        <div class="grid-80 tablet-grid-100 container">
                            <label class="input-label">Company/Bill To</label>
                            <input type="text">
                        </div>

                        <div class="grid-80 tablet-grid-100 container">
                            <label class="input-label">Address 1</label>
                            <input type="text">
                        </div>

                        <div class="grid-80 tablet-grid-100 container">
                            <label class="input-label optional-label">Address 2</label>
                            <input type="text">
                        </div>

                        <div class="grid-80 tablet-grid-100 container">
                            <div class="grid-50 tablet-grid-50">
                                <label class="input-label">City</label>
                                <input type="text">
                            </div>

                            <div class="grid-25 tablet-grid-25">
                                <label class="input-label">State</label>
                                <select class="dropdown"></select>
                            </div>

                            <div class="grid-25 tablet-grid-25">
                                <label class="input-label">Zip Code</label>
                                <input type="text">
                            </div>
                        </div>

                        <div class="grid-80 tablet-grid-100 container">
                            <div class="grid-50 tablet-grid-50">
                                <label class="input-label">Phone</label>
                                <input type="text" placeholder="xxx-xxx-xxxx">
                            </div>

                            <div class="grid-50 tablet-grid-50">
                                <label class="input-label optional-label">Fax</label>
                                <input type="text" placeholder="xxx-xxx-xxxx">
                            </div>
                        </div>

                        <div class="grid-80 tablet-grid-100 container">
                            <div class="grid-60 tablet-grid-60">
                                <label class="input-label">Requested Credit Limit</label>
                                <input type="text" value="$500">
                            </div>

                            <div>&nbsp;</div>
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

            <div class="grid-100 tablet-grid-100 container" style="margin: 40px 55px;">
                <MainButtonSet :rightBtnText="'Next'"></MainButtonSet>
            </div>
        </div>
        <!-- END OF CUSTOMER SIGN UP -->

        <div class="row grid-container">
            <div class="grid-100 tablet-grid-100 simple-landing">
                <div class="grid-100 tablet-grid-100 container">
                    <TrackProgressBar></TrackProgressBar>
                </div>
            </div>
        </div>

        <!-- BEGINNING OF CUSTOMER SIGNUP ADDITIONAL INFO -->
        <div class="grid-container">
            <div class="grid-100 tablet-grid-100 container">
                <StageHeader :headerTitle="'Customer Signup'" :headerSubtitle="'Additional Information'" :stage="2" :pages="['Signup','Additional Information','Review']"></StageHeader>
            </div>

            <div class="grid-100 tablet-grid-100 container">
                <div class="grid-100 tablet-grid-80 container step-container">
                    <div class="grid-100 tablet-grid-100 container margin-left-10">
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
                        <input type="radio" id="visited_yes">
                        <label class="radio" for="visited_yes">
                            <span>Yes</span>
                        </label>

                        <input type="radio" id="visited_no">
                        <label class="radio" for="visited_no">
                            <span>No</span>
                        </label>
                    </div>

                    <div class="grid-100 tablet-grid-100 container">
                        <p class="sub-header">Ask the customer the following questions to learn more about their needs and how we can serve them.</p>
                    </div>

                    <div class="grid-100 tablet-grid-100 container">
                        <div class="grid-50 tablet-grid-100 margin-bottom-40">
                            <div class="grid-parent grid-80 tablet-grid-100 container">
                                <p class="text-bold">2. How do you receive your orders from your customers?</p>
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <input type="text">
                            </div>

                            <div class="grid-parent grid-80 tablet-grid-100 ">
                                <p class="text-bold margin-top-20">3. Is this your only shipping location?</p>
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <input type="radio" id="only_location_yes">
                                <label class="radio" for="only_location_yes">
                                    <span>Yes</span>
                                </label>

                                <input type="radio" id="only_location_no">
                                <label class="radio" for="only_location_no">
                                    <span>No</span>
                                </label>
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <label class="input-label">Additional shipping locations</label>
                                <input type="text">
                            </div>

                            <div class="grid-parent grid-80 tablet-grid-100">
                                <p class="text-bold margin-top-20">4. Do you ship truckload shipments?</p>
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <input type="radio" id="truckload_yes">
                                <label class="radio" for="truckload_yes">
                                    <span>Yes</span>
                                </label>

                                <input type="radio" id="truckload_no">
                                <label class="radio" for="truckload_no">
                                    <span>No</span>
                                </label>
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <label class="input-label">If "Yes", where do you ship?</label>
                                <input type="text">
                            </div>

                            <div class="grid-parent grid-80 tablet-grid-100 container">
                                <p class="text-bold margin-top-20">5. Annual freight spend?</p>
                            </div>

                            <div class="grid-50 tablet-grid-55 container">
                                <select class="dropdown">
                                    <option>Select</option>
                                </select>
                            </div>
                        </div>

                        <div class="grid-parent grid-50 tablet-grid-100">
                            <div class="grid-parent grid-80 tablet-grid-100 container">
                                <p class="text-bold">6. How many LTL shipments do you ship each week?</p>
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <div class="grid-20 tablet-grid-30">
                                    <input type="text">
                                </div>
                            </div>

                            <div class="grid-parent grid-80 tablet-grid-100">
                                <p class="text-bold margin-top-20">7. Do you contract with 3PL warehouses?</p>
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <input type="radio" id="3pl_warehouse_yes">
                                <label class="radio" for="3pl_warehouse_yes">
                                    <span>Yes</span>
                                </label>

                                <input type="radio" id="3pl_warehouse_no">
                                <label class="radio" for="3pl_warehouse_no">
                                    <span>No</span>
                                </label>
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <label class="input-label">Additional shipping locations</label>
                                <input type="text">
                            </div>

                            <div class="grid-parent grid-80 tablet-grid-100">
                                <p class="text-bold margin-top-20">8. Do you contract with drayage services?</p>
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <input type="radio" id="drayage_yes">
                                <label class="radio" for="drayage_yes">
                                    <span>Yes</span>
                                </label>

                                <input type="radio" id="drayage_no">
                                <label class="radio" for="drayage_no">
                                    <span>No</span>
                                </label>
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <label class="input-label">Additional information</label>
                                <input type="text">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid-container">
            <div class="grid-100 tablet-grid-100">
                <div class="grid-100 tablet-grid-100 container">
                    <StageHeader :headerTitle="'Customer Signup'" :headerSubtitle="'Review'" :stage="3" :pages="['Signup','Additional Information','Review']"></StageHeader>
                </div>

                <div class="grid-100 tablet-grid-100 container">
                    <div class="grid-50 tablet-grid-100 margin-bottom-40">
                        <div class="grid-100 tablet-grid-80">
                            <h1 class="step-header">
                                <span class="label-number-summary">1</span>Shipping Information</h1>
                        </div>

                        <div class="grid-100 tablet-grid-80 container">
                            <table class="table-details">
                                <tbody>
                                    <tr>
                                        <td>Company</td>
                                        <td>TelAmeriCorp</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>3242 Southside Lane <br>Suite 200<br>Rancho Cucamonga, CA 90014
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Phone</td>
                                        <td>909-766-6772</td>
                                    </tr>
                                    <tr>
                                        <td>Fax</td>
                                        <td>909-595-2998</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="grid-100 tablet-grid-80 container">
                            <div class="grid-25 tablet-grid-25 margin-left-50">
                                <button class="button-standard-small edit"> Edit</button>
                            </div>
                        </div>
                    </div>

                    <div class="grid-parent grid-50 tablet-grid-100 margin-bottom-40">
                        <div class="grid-100 tablet-grid-80">
                            <h1 class="step-header">
                                <span class="label-number-summary">2</span>Billing Information</h1>
                        </div>

                        <div class="grid-100 tablet-grid-80 container">
                            <table class="table-details">
                                <tbody>
                                    <tr>
                                        <td>Address</td>
                                        <td>3242 Southside Lane<br>Suite 200<br>Rancho Cucamonga, CA 91701</td>
                                    </tr>
                                    <tr>
                                        <td>Phone</td>
                                        <td>909-766-6772</td>
                                    </tr>
                                    <tr>
                                        <td>Fax</td>
                                        <td>909-595-2998</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="grid-100 tablet-grid-80 container">
                            <div class="grid-25 tablet-grid-25 margin-left-50">
                                <button class="button-standard-small edit"> Edit</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid-100 tablet-grid-100 container">
                    <div class="grid-50 tablet-grid-100 margin-bottom-40">
                        <div class="grid-100 tablet-grid-80">
                            <h1 class="step-header">
                                <span class="label-number-summary">3</span>Account Creation</h1>
                        </div>

                        <div class="grid-100 tablet-grid-80 container">
                            <table class="table-details">
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>Black Anderson</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>black.anderson@telamericorp.com</td>
                                    </tr>
                                    <tr>
                                        <td>Username</td>
                                        <td>blake.anderson</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="grid-100 tablet-grid-80 container">
                            <div class="grid-25 tablet-grid-25 margin-left-50">
                                <button class="button-standard-small edit"> Edit</button>
                            </div>
                        </div>
                    </div>

                    <div class="grid-50 tablet-grid-100 margin-bottom-40">
                        <div class="grid-100 tablet-grid-80">
                            <h1 class="step-header">
                                <span class="label-number-summary">4</span>Credit Application</h1>
                        </div>

                        <div class="grid-100 tablet-grid-80">
                            <p class="sub-header margin-left-50">Please instruct the customer to fill out the credit application form.</p>
                        </div>
                    </div>
                    
                    <div class="grid-100 tablet-grid-80 margin-top-20">
                        <MainButtonSet :rightBtnText="'Create Account'"></MainButtonSet>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid-container">
            <div class="grid-100 tablet-grid-100">
                <div class="grid-100 tablet-grid-80 container title">
                    <h1 class="title">My Account</h1>
                </div>

                <div class="grid-parent grid-100 tablet-grid-100 container">
                    <div class="grid-50 tablet-grid-80">
                        <div class="grid-100 tablet-grid-100">
                            <h1 class="section-header">Account Information</h1>
                        </div>

                        <div class="grid-100 tablet-grid-100 container margin-bottom-40">
                            <table class="table-details margin-left-minus-10">
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>Simanek</td>
                                    </tr>
                                    <tr>
                                        <td>Username</td>
                                        <td>scott.simanek</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>scott.simanek@unisco.com</td>
                                    </tr>
                                    <tr>
                                        <td>Phone</td>
                                        <td>301-342-0110</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <div class="grid-25 tablet-grid-30">
                                <button class="button-standard-small edit">Edit</button>
                            </div>

                            <div class="grid-35 tablet-grid-40">
                                <button class="button-standard-small">Change Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid-container">
            <div class="grid-100 tablet-grid-80">
                <div class="grid-100 tablet-grid-100 container title">
                    <h1 class="title">My Account</h1>
                    <p class="sub-header sub-title">Editing Mode</p>
                </div>

                <div class="grid-parent grid-100 tablet-grid-100 container">
                    <div class="grid-50 tablet-grid-100">
                        <div class="grid-100 tablet-grid-100 container">
                            <h1 class="section-header">Account Information</h1>
                        </div>

                        <div class="grid-parent grid-100 tablet-grid-100">
                            <div class="grid-50 tablet-grid-50 container">
                                <label class="input-label">Name</label>
                                <input type="text" value="Scott Simanek">
                            </div>

                            <div class="grid-80 tablet-grid-75 container">
                                <label class="input-label">Username</label>
                                <input type="text" value="scott.simanek">
                            </div>

                            <div class="grid-80 tablet-grid-75 container">
                                <label class="input-label">Email</label>
                                <input type="text" value="scott.simanek@unisco.com">
                            </div>

                            <div class="grid-80 tablet-grid-75 container margin-bottom-40">
                                <label class="input-label optional-label">Phone</label>
                                <input type="text" value="213-529-0000">
                            </div>

                            <div class="grid-100 tablet-grid-100 container">
                                <div class="grid-30 tablet-grid-30">
                                    <button class="button-blue-small">Save Updates</button>
                                </div>

                                <div class="grid-35 tablet-grid-40">
                                    <button class="button-standard-small">Change Password</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END OF SALES PORTAL -->
            <div class="grid-100 tablet-grid-100 mobile-grid-100">
                <StageHeader :headerTitle="'Customer Signup'" :headerSubtitle="'Sign up'" :stage="2" :pages="['Signup','Additional Info','Review']"></StageHeader>
                <StageHeader :headerTitle="'ABC'" :headerSubtitle="'cde'" :stage="1" :pages="['Page 1','Page 2','Page 3','Page 4']"></StageHeader>
                <StageHeader :headerTitle="'CDE Page'" :headerSubtitle="'Im subtitle'" :stage="4" :pages="['Page 1','Page 2','Page 3','Page 4']"></StageHeader>
            </div>
        </div>

        <!-- BEGINNING OF TICKET TMS-492 -->
        <div class="grid-container margin-bottom-40">
            <div class="grid-100 tablet-grid-100">
                <div class="grid-100 tablet-grid-80 container title">
                    <h1 class="title">My Account (TMS-492)</h1>
                </div>

                <div class="grid-100 tablet-grid-100 container margin-left-minus-10 margin-bottom-40">
                    <div class="grid-50 tablet-grid-100 margin-bottom-40">
                        <div class="grid-100 tablet-grid-80">
                            <h1 class="section-header">Account Information</h1>
                        </div>

                        <div class="grid-100 tablet-grid-80 container">
                            <table class="table-details margin-left-minus-10">
                                <tbody>
                                    <tr>
                                        <td>Company</td>
                                        <td>Freshzim</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>325 Main Street #505<br> Los, CA 90014
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Phone</td>
                                        <td>213-529-0000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="grid-100 tablet-grid-80 container">
                            <div class="grid-25 tablet-grid-25">
                                <button class="button-standard-small edit">Edit</button>
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
                                        <td>Company</td>
                                        <td>Freshzim</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>325 Main Street #505<br> Los, CA 90014
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Payment Type</td>
                                        <td>Net Term Days</td>
                                    </tr>
                                    <tr>
                                        <td>Credit Limit</td>
                                        <td>$500.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="grid-100 tablet-grid-80 container">
                            <div class="grid-25 tablet-grid-25">
                                <button class="button-standard-small edit">Edit</button>
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
                                        <td>Connie Smith</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>connie@abccompany.com</td>
                                    </tr>
                                    <tr>
                                        <td>Username</td>
                                        <td>connie.smith</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <div class="grid-25 tablet-grid-30">
                                <button class="button-standard-small edit">Edit</button>
                            </div>

                            <div class="grid-35 tablet-grid-40">
                                <button class="button-standard-small">Change Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- BEGINNING OF RESPONSIVE TABLE CARD -->
        <!-- <div class="tablet-grid-80 card-container margin-bottom-40">
            <div class="grid-100 tablet-grid-100 container">
                <div class="grid-100 tablet-grid-100 card-title">
                    <div class="grid-50 tablet-grid-50">
                        <p>PU # 1295</p>
                        <p>Reference # 24121</p>
                    </div> 
                    <div class="grid-50 tablet-grid-50">
                        <p>PRO # 1111001886</p>
                    </div>    
                </div>
                
                <div class="grid-100 tablet-grid-100 card-body">
                    <p>hellooooo</p>

                </div>
            </div>
        </div> -->

        <div class="grid-container">
            <div class="grid-100 tablet-grid-100">
                <div class="grid-100 tablet-grid-80 container title">
                    <h1 class="title">My Account (TMS-492)</h1>
                    <p class="sub-header sub-title">Editing Mode - NOTE: Only the section selected to EDIT in My Account will turn into editable input fields shown below.</p>
                </div>

                <div class="grid-100 tablet-grid-80 container margin-bottom-40">
                    <div class="grid-50 tablet-grid-80 margin-left-minus-10 margin-bottom-40">
                        <div class="grid-100 tablet-grid-100 container">
                            <h1 class="section-header">Shipping Information</h1>
                        </div>

                        <div class="grid-parent grid-100 tablet-grid-100">
                            <div class="grid-80 tablet-grid-100 container">
                                <label class="input-label">Company</label>
                                <input type="text" value="Freshzim">
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <label class="input-label">Address 1</label>
                                <input type="text" value="325 Main Street">
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <label class="input-label optional-label">Address 2</label>
                                <input type="text" value="#505">
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <div class="grid-50 tablet-grid-40">
                                    <label class="input-label">City</label>
                                    <input type="text" value="Los Angeles">
                                </div>

                                <div class="grid-25 tablet-grid-30">
                                    <label class="input-label">State</label>
                                    <select class="dropdown">
                                        <option>CA</option>
                                    </select>
                                </div>

                                <div class="grid-25 tablet-grid-30">
                                    <label class="input-label">Zip Code</label>
                                    <input type="text" value="90014">
                                </div>
                            </div>

                            <div class="grid-80 tablet-grid-100 container margin-bottom-40">
                                <div class="grid-50 tablet-grid-50">
                                    <label class="input-label">Phone</label>
                                    <input type="text" value="213-529-0000">
                                </div>

                                <div class="grid-50 tablet-grid-50">
                                    <label class="input-label optional-label">Fax</label>
                                    <input type="text">
                                </div>
                            </div>

                            <div class="grid-100 tablet-grid-100 container">
                                <div class="grid-30 tablet-grid-40">
                                    <button class="button-blue-small">Save Updates</button>
                                </div>

                                <div class="grid-40 tablet-grid-60">&nbsp;</div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-parent grid-50 tablet-grid-80 margin-left-minus-10">
                        <div class="grid-100 tablet-grid-100 container">
                            <h1 class="section-header">Billing Information</h1>
                        </div>

                        <div class="grid-parent grid-100 tablet-grid-100">
                            <div class="grid-80 tablet-grid-100 container">
                                <label class="input-label">Company</label>
                                <input type="text" value="Freshzim">
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <label class="input-label">Address 1</label>
                                <input type="text" value="325 Main Street">
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <label class="input-label optional-label">Address 2</label>
                                <input type="text" value="#505">
                            </div>

                            <div class="grid-80 tablet-grid-100 container">
                                <div class="grid-50 tablet-grid-40">
                                    <label class="input-label">City</label>
                                    <input type="text" value="Los Angeles">
                                </div>

                                <div class="grid-25 tablet-grid-30">
                                    <label class="input-label">State</label>
                                    <select class="dropdown">
                                        <option>CA</option>
                                    </select>
                                </div>

                                <div class="grid-25 tablet-grid-30">
                                    <label class="input-label">Zip Code</label>
                                    <input type="text" value="90014">
                                </div>
                            </div>

                            <div class="grid-80 tablet-grid-100 container margin-bottom-40">
                                <div class="grid-50 tablet-grid-50">
                                    <label class="input-label">Payment Type</label>
                                    <select class="dropdown" disabled>
                                        <option selected>Net Term Days</option>
                                    </select>
                                </div>

                                <div class="grid-50 tablet-grid-50">
                                    <label class="input-label">Credit Limit</label>
                                    <input type="text" value="$500.00" disabled>
                                </div>
                            </div>

                            <div class="grid-100 tablet-grid-100 container">
                                <div class="grid-30 tablet-grid-40">
                                    <button class="button-blue-small">Save Updates</button>
                                </div>

                                <div class="grid-40 tablet-grid-60">&nbsp;</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid-100 tablet-grid-80 container">
                    <div class="grid-50 tablet-grid-80 margin-left-minus-10">
                        <div class="grid-100 tablet-grid-100 container">
                            <h1 class="section-header">Account Information</h1>
                        </div>

                        <div class="grid-parent grid-100 tablet-grid-100">
                            <div class="grid-80 tablet-grid-100 container">
                                <div class="grid-50 tablet-grid-50">
                                    <label class="input-label">First Name</label>
                                    <input type="text" value="Connie">
                                </div>

                                <div class="grid-50 tablet-grid-50">
                                    <label class="input-label">Last Name</label>
                                    <input type="text" value="Smith">
                                </div>
                            </div>

                            <div class="grid-80 tablet-grid-100 container margin-bottom-40">
                                <div class="grid-50 tablet-grid-50">
                                    <label class="input-label">Email</label>
                                    <input type="text" value="connie@abccompany.com" disabled>
                                </div>

                                <div class="grid-50 tablet-grid-50">
                                    <label class="input-label">Username</label>
                                    <input type="text" value="connie.smith" disabled>
                                </div>
                            </div>

                            <div class="grid-100 tablet-grid-100 container">
                                <div class="grid-30 tablet-grid-50">
                                    <button class="button-blue-small">Save Updates</button>
                                </div>

                                <div class="grid-35 tablet-grid-50 margin-bottom-40">
                                    <button class="button-standard-small">Change Password</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <!-- END OF TICKET TMS-492 -->

        
    </div>
</template>

