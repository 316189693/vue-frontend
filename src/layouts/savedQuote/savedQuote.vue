<template>

    <div class="grid-container">
        <div class="grid-100 tablet-grid-100">
            <div class="grid-parent grid-100 tablet-grid-100 container">
                <h1 class="title">Saved Quotes</h1>
            </div>
        </div>

        <div class="grid-100 tablet-grid-100 container">
            <div class="grid-20 tablet-grid-30">
                <button class="button-yellow-medium">Schedule a Pickup</button>
            </div>
        </div>

        <div class="grid-100 tablet-grid-100">
            <table class="table-client">
                <thead>
                    <tr>
                        <th></th>
                        <th>PU #</th>
                        <th>PRO #</th>
                        <th>Status</th>
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
                        <td>
                            <input type="radio" id="radio11" name="radio">
                            <label class="radio" for="radio11">
                            </label>
                        </td>
                        <td>203839400</td>
                        <td>1110156551</td>
                        <td>Order created</td>
                        <td>02/19/2018</td>
                        <td>City of Industry, CA</td>
                        <td>02/20/2018</td>
                        <td>Irvine, CA</td>
                        <td>3</td>
                        <td>1,314</td>
                        <td>
                            <button class="edit-row"></button>
                            <button class="delete-row"></button>
                        </td>
                    </tr>
                    <tr class="selected-row">
                        <td>
                            <input type="radio" id="radio22" name="radio" checked>
                            <label class="radio" for="radio22">
                            </label>
                        </td>
                        <td>203839400</td>
                        <td>1110156551</td>
                        <td>Order created</td>
                        <td>02/19/2018</td>
                        <td>City of Industry, CA</td>
                        <td>02/20/2018</td>
                        <td>Irvine, CA</td>
                        <td>3</td>
                        <td>1,314</td>
                        <td>
                            <button class="edit-row"></button>
                            <button class="delete-row"></button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="radio" id="radio33" name="radio">
                            <label class="radio" for="radio33">
                            </label>
                        </td>
                        <td>203839400</td>
                        <td>1110156551</td>
                        <td>Order created</td>
                        <td>02/19/2018</td>
                        <td>City of Industry, CA</td>
                        <td>02/20/2018</td>
                        <td>Irvine, CA</td>
                        <td>3</td>
                        <td>1,314</td>
                        <td>
                            <button class="edit-row"></button>
                            <button class="delete-row"></button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="radio" id="radio44" name="radio">
                            <label class="radio" for="radio44">
                            </label>
                        </td>
                        <td>203839400</td>
                        <td>1110156551</td>
                        <td>Order created</td>
                        <td>02/19/2018</td>
                        <td>City of Industry, CA</td>
                        <td>02/20/2018</td>
                        <td>Irvine, CA</td>
                        <td>3</td>
                        <td>1,314</td>
                        <td>
                            <button class="edit-row"></button>
                            <button class="delete-row"></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- <div>
        <div>Saved Quote</div>
        <button type="button" @click="goTo">Go to</button>
        <button type="button" @click="getQuote">Get Quote</button>
    </div> -->

</template>