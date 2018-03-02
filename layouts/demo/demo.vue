<template>

    <div>
        <div class="row grid-container">
            <div class="grid-100 tablet-grid-100 mobile-grid-100">
                <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                    <h1 class="title">Get A Quote</h1>
                </div>

                <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                    <div class="grid-50 tablet-grid-50 mobile-grid-100 container step-container">
                        <div class="grid-100 tablet-grid-100 container">
                            <h1 class="step-header">
                                <span class="label-number active">1</span>Where are we picking up?</h1>
                        </div>

                        <div class="grid-50 tablet-grid-50 mobile-grid-100">
                            <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                                <div class="grid-80 tablet-grid-100">
                                    <label class="input-label">Location Type</label>
                                    <select class="dropdown">
                                        <option>Residential</option>
                                        <option>Residential 1</option>
                                    </select>
                                </div>
                            </div>

                            <div class="grid-100 tablet-grid-100 container mobile-grid-100">
                                <div class="grid-70 tablet-grid-90 mobile-grid-100">
                                    <label class="input-label">Zip Code</label>
                                    <input type="text" placeholder="90000" id="input_zip_code_pickup" data-client-error="This is a required field.">
                                </div>
                            </div>

                            <div class="grid-100 tablet-grid-100 container">
                                <div class="grid-70 tablet-grid-80 mobile-grid-70">
                                    <label class="input-label">City</label>
                                    <input type="text" value="Autopop City" disabled>
                                </div>

                                <div class="grid-30 tablet-grid-20 mobile-grid-30">
                                    <label class="input-label">State</label>
                                    <input type="text" disabled>
                                </div>
                            </div>

                            <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                                <div class="grid-70 tablet-grid-90">
                                    <label class="input-label">Ready for Pickup</label>
                                    <input type="text" class="input-date">
                                </div>
                            </div>
                        </div>

                        <div class="grid-50 tablet-grid-50 mobile-grid-100">
                            <div class="grid-100 tablet-grid-100 mobile-grid-100 container step-container">
                                <h1 class="section-header optional-label">Additional Information</h1>
                            </div>

                            <div class="grid-100 tablet-grid-100 container">
                                <ul class="checkbox-list">
                                    <li class="tooltip-light"><input type="checkbox" id="checkbox_liftgate_pickup">
                                        <label class="checkbox" for="checkbox_liftgate_pickup">
                                            <span>Lift Gate Required</span>
                                        </label>
                                    </li>
                                    <li class="tooltip-light"><input type="checkbox" class="checkbox" id="checkbox_limited_pickup">
                                        <label class="checkbox" for="checkbox_limited_pickup">
                                            <span>Limited Access</span>
                                        </label>
                                    </li>
                                    <li class="tooltip-light"><input type="checkbox" class="checkbox" id="checkbox_jack_pickup">
                                        <label class="checkbox" for="checkbox_jack_pickup">
                                            <span>Pallet Jack Required</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="grid-50 tablet-grid-50 container">
                        <div class="grid-100 tablet-grid-100 container step-container">
                            <h1 class="step-header">
                                <span class="label-number">2</span>Where are we delivering?</h1>
                        </div>

                        <div class="grid-50 tablet-grid-50">
                            <div class="grid-100 tablet-grid-100 container">
                                <div class="grid-80 tablet-grid-100">
                                    <label class="input-label">Location Type</label>
                                    <select class="dropdown">
                                        <option>Residential</option>
                                        <option>Residential 1</option>
                                    </select>
                                </div>
                            </div>

                            <div class="grid-100 tablet-grid-100 container">
                                <div class="grid-70 tablet-grid-90">
                                    <label class="input-label">Zip Code</label>
                                    <input type="text" placeholder="90000">
                                </div>
                            </div>

                            <div class="grid-100 tablet-grid-100 container">
                                <div class="grid-70 tablet-grid-90">
                                    <label class="input-label">City</label>
                                    <input type="text" value="Autopop City" disabled>
                                </div>

                                <div class="grid-30 tablet-grid-20">
                                    <label class="input-label">State</label>
                                    <input type="text" disabled>
                                </div>
                            </div>
                        </div>

                        <div class="grid-50 tablet-grid-50">
                            <div class="grid-100 tablet-grid-100 container">
                                <h1 class="section-header optional-label">Additional Information</h1>
                            </div>

                            <div class="grid-100 tablet-grid-100 container">
                                <ul class="checkbox-list">
                                    <li class="tooltip-light"><input type="checkbox" id="checkbox_liftgate_delivery">
                                        <label class="checkbox" for="checkbox_liftgate_delivery">
                                            <span>Lift Gate Required</span>
                                        </label>
                                    </li>
                                    <li class="tooltip-light"><input type="checkbox" class="checkbox" id="checkbox_limited_delivery">
                                        <label class="checkbox" for="checkbox_limited_delivery">
                                            <span>Limited Access</span>
                                        </label>
                                    </li>
                                    <li class="tooltip-light"><input type="checkbox" class="checkbox" id="checkbox_jack_delivery">
                                        <label class="checkbox" for="checkbox_jack_delivery">
                                            <span>Pallet Jack Required</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid-100 tablet-grid-100 container">
                    <div class="grid-100 tablet-grid-100 container">
                        <h1 class="step-header">
                            <span class="label-number">3</span>What are you shipping?</h1>
                    </div>

                    <div class="grid-100 tablet-grid-100 container manifest-line-container">
                        <span class="manifest-line-count">1</span>

                        <div class="grid-20 tablet-grid-25">
                            <label class="input-label">Pallet Dimensions</label>
                            <select class="dropdown">
                                <option>Select</option>
                                <option>Pallets: Standard (48&ldquo;x40&ldquo;)</option>
                                <option>Pallets: (48&ldquo;x48&ldquo;)</option>
                                <option>Pallets: (60&ldquo;x48&ldquo;)</option>
                                <option>Pallets: (Enter Dimension)</option>
                            </select>
                        </div>

                        <div class="grid-10 tablet-grid-15">
                            <label class="input-label">Width</label>
                            <input type="text" placeholder="48">
                        </div>

                        <div class="grid-10 tablet-grid-15">
                            <label class="input-label">Length</label>
                            <input type="text" placeholder="40">
                        </div>

                        <div class="grid-10 tablet-grid-15">
                            <label class="input-label">Height</label>
                            <input type="text" placeholder="40">
                        </div>

                        <div class="grid-10 tablet-grid-15">
                            <label class="input-label">Quantity</label>
                            <input type="text" placeholder="8">
                        </div>

                        <div class="grid-10 tablet-grid-10">
                            <label class="input-label">Total Weight</label>
                            <input type="text" placeholder="1000">
                        </div>

                        <div class="grid-15 tablet-grid-15">
                            <label class="input-label optional-label">Class *
                                <span class="tooltip-light"></span>
                            </label>
                            <!-- <span class="tooltip-light"> 
						<div class="tooltip-bubble">
							<p>Can we stack your pallets? Charges are made based on <span>pallet space</span>. One pallet space is 48&ldquo;x40&ldquo; and the entire height of the truck.</p>
						</div>
					</span> -->
                            <select class="dropdown">
                                <option></option>
                                <option>Option 1</option>
                            </select>
                        </div>

                        <input type="checkbox" id="input_stackable">
                        <label class="checkbox" for="input_stackable" style="margin-top: 30px;">
                            <span>Stackable?</span>
                        </label>
                    </div>

                    <div class="grid-100 tablet-grid-100 container">
                        <div class="grid-30 tablet-grid-50 pallets-count-container">
                            <p>This shipment will take up
                                <span class="pallet-space-count">1</span> pallet spaces.</p>
                        </div>
                    </div>

                    <div class="grid-100 tablet-grid-100 container">
                        <div class="grid-15 tablet-grid-20" style="margin-left: 3.5%;">
                            <button type="button" class="button-standard-small add">Add Line</button>
                        </div>

                        <div class="grid-15 tablet-grid-20">
                            <button type="button" class="button-standard-small remove" disabled>Remove Lines</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid-100 tablet-grid-100 container footer">
                <div class="grid-100 tablet-grid-100 container">
                    <p>* Class will be determined based on what you enter 'Total Weight' and shipment dimensions. A Freight Class will be automatically calculated if 'Class' is left blank. </p>
                </div>

                <div class="grid-100 tablet-grid-100 container">
                    <div class="footer-button">
                        <div class="grid-50 tablet-grid-20">
                            <button type="button" class="button-standard-large" id="btn_cancel_quote">Cancel</button>
                        </div>

                        <div class="grid-50 tablet-grid-20">
                            <button type="button" class="button-yellow-large" id="btn_get_quote">Get Quote</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END OF GET A QUOTE PAGE -->

            <!-- BEGINNING SCHEDULE PICKUP PAGE -->
            <div class="grid-100 tablet-grid-100">
                <div class="grid-100 tablet-grid-100 container title">
                    <h1 class="title">Schedule Pickup</h1>
                    <p class="sub-title sub-header">Location Information</p>
                </div>

                <div class="grid-100 tablet-grid-100 container">
                    <div class="grid-50 tablet-grid-50 container">
                        <div class="grid-100 tablet-grid-100 container">
                            <h1 class="step-header">
                                <span class="label-number active">1</span>Where are we picking up?</h1>
                        </div>

                        <div class="grid-50 tablet-grid-70 container">
                            <label class="input-label">Location Type</label>
                            <select class="dropdown" disabled>
                                <option>Business</option>
                            </select>
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
                            <label class="input-label">Address 2 </label>
                            <input type="text">
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <div class="grid-40 tablet-grid-40">
                                <label class="input-label">City</label>
                                <input type="text" value="Los Angeles" disabled>
                            </div>

                            <div class="grid-20 tablet-grid-40">
                                <label class="input-label">State</label>
                                <input type="text" value="CA" disabled>
                            </div>

                            <div class="grid-20 tablet-grid-40">
                                <label class="input-label">Zip Code</label>
                                <input type="text" value="90014" disabled>
                            </div>
                        </div>

                        <div class="grid-80 tablet-grid-100 container">
                            <label class="input-label">Email</label>
                            <input type="text">
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <div class="grid-40 tablet-grid-50">
                                <label class="input-label">Phone</label>
                                <input type="text">
                            </div>

                            <div class="grid-40 tablet-grid-50">
                                <label class="input-label optional-label">Fax</label>
                                <input type="text">
                            </div>
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <h1 class="section-header optional-label">Pickup Window Hours</h1>
                            <p class="sub-header">Ready for Pickup: 02/06/2018</p>
                        </div>

                        <div class="grid-80 tablet-grid-100 container">
                            <div class="grid-40 tablet-grid-50">
                                <label class="input-label">From</label>
                                <select class="dropdown">
                                    <option></option>
                                </select>
                            </div>

                            <div class="grid-10 tablet-grid-10" style="margin-top: 15px;">
                                <label>&nbsp;</label>
                                <label>to</label>
                            </div>

                            <div class="grid-40 tablet-grid-50">
                                <label class="input-label">To</label>
                                <select class="dropdown">
                                    <option></option>
                                </select>
                            </div>
                        </div>

                        <div class="grid-80 tablet-grid-100 container">
                            <label class="input-label">Special Instructions
                                <span class="character-limit">(150 character limit)</span>
                            </label>
                            <textarea></textarea>
                            <span class="character-limit">150 characters remaining</span>
                        </div>
                    </div>

                    <div class="grid-50 tablet-grid-50 container" style="position: relative;">
                        <div class="grid-100 tablet-grid-100 container">
                            <h1 class="step-header">
                                <span class="label-number">2</span>Where are we delivering?</h1>
                        </div>

                        <div class="grid-50 tablet-grid-70 container">
                            <label class="input-label">Location Type</label>
                            <select class="dropdown" disabled>
                                <option>Business</option>
                            </select>
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
                            <label class="input-label">Address 2 </label>
                            <input type="text">
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <div class="grid-40 tablet-grid-40">
                                <label class="input-label">City</label>
                                <input type="text" value="Princeton" disabled>
                            </div>

                            <div class="grid-20 tablet-grid-40">
                                <label class="input-label">State</label>
                                <input type="text" value="NJ" disabled>
                            </div>

                            <div class="grid-20 tablet-grid-40">
                                <label class="input-label">Zip Code</label>
                                <input type="text" value="08540" disabled>
                            </div>
                        </div>

                        <div class="grid-80 tablet-grid-100 container">
                            <label class="input-label">Email</label>
                            <input type="text">
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <div class="grid-40 tablet-grid-50">
                                <label class="input-label">Phone</label>
                                <input type="text">
                            </div>

                            <div class="grid-40 tablet-grid-50">
                                <label class="input-label optional-label">Fax</label>
                                <input type="text">
                            </div>
                        </div>

                        <div class="grid-80 tablet-grid-100 container info-container notification-container">
                            <p>Shipments that are picked up after
                                <span class="text-bold"> 15:00 (3:00 PM)</span> may be processed the following day.</p>
                            <p>This may or may not cause a delay in delivery.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid-100 tablet-grid-100 container footer">
                <div class="grid-100 tablet-grid-100 container">
                    <div class="footer-button">
                        <div class="grid-50 tablet-grid-20">
                            <button type="button" class="button-standard-large">Cancel</button>
                        </div>

                        <div class="grid-50 tablet-grid-20">
                            <button type="button" class="button-yellow-large">Continue</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid-100 tablet-grid-100 container">
                <div class="grid-20 tablet-grid-50 toast-message">
                    <p>Let's schedule a pickup appointment...one moment please...</p>
                </div>
            </div>

            <div class="grid-100 tablet-grid-100 container">
                <div class="grid-50 tablet-grid-50 message-box">
                    <p class="step-header">YOUR ESTIMATED QUOTE #0001: $1,295.00</p>
                    <p class="textfield-text">Note: This is just an estimate. Actual price may vary depending on charges incurred at pickup or delivery.</p>

                    <div class="grid-100 tablet-grid-100 container">
                        <div class="grid-50 tablet-grid-50">
                            <button class="button-standard-large">Save Quote</button>
                        </div>

                        <div class="grid-50 tablet-grid-50">
                            <button class="button-yellow-large">Schedule Pickup</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row grid-container">
            <div class="grid-100 tablet-grid-100">
                <div class="grid-100 tablet-grid-100 container title">
                    <h1 class="title">Schedule Pickup</h1>
                    <p class="sub-title sub-header">Shipment Information</p>
                </div>
            </div>

            <div class="grid-100 tablet-grid-100 container">
                <div class="grid-100 tablet-grid-100 container">
                    <h1 class="step-header">
                        <span class="label-number active">3</span>What are we carrying?</h1>
                </div>

                <div class="grid-100 tablet-grid-100 container">
                    <div class="grid-40 tablet-grid-60 info-container">
                        <div class="grid-50 tablet-grid-50">
                            <p>Total Pallets:
                                <span class="text-bold">9</span>
                            </p>
                            <p>Pallet Spaces:
                                <span class="text-bold">5</span>
                            </p>
                            <p>Total Weight:
                                <span class="text-bold">1,300 lbs</span>
                            </p>
                        </div>

                        <div class="grid-50 tablet-grid-50">
                            <label class="input-label optional-label">Order Reference #
                                <span class="tooltip-light"></span>
                            </label>
                            <input type="text"></div>
                    </div>
                </div>
            </div>

            <div class="grid-100 tablet-grid-100 container">
                <span class="manifest-line-count">1</span>

                <div class="grid-95 tablet-grid-95">
                    <div class="grid-100 tablet-grid-100 container schedule-pickup-hidden">
                        <div class="grid-25 tablet-grid-25">
                            <label class="input-label">Shipment Description
                                <span class="character-limit">(50 character limit)</span>
                            </label>
                            <input type="text" value="cellphones">
                        </div>

                        <input type="checkbox" id="hazmat">
                        <label class="checkbox" for="hazmat" style="margin-top: 30px;">
                            <span>Hazardous Material</span>
                        </label>
                    </div>

                    <div class="grid-100 tablet-grid-100 container">
                        <div class="grid-25 tablet-grid-25">
                            <label class="input-label">Pallet Dimensions</label>
                            <select class="dropdown" disabled>
                                <option>Select</option>
                                <option selected>Pallets: Standard (48&ldquo;x40&ldquo;)</option>
                                <option>Pallets: (48&ldquo;x48&ldquo;)</option>
                                <option>Pallets: (60&ldquo;x48&ldquo;)</option>
                                <option>Pallets: (Enter Dimension)</option>
                            </select>
                        </div>

                        <div class="grid-10 tablet-grid-15">
                            <label class="input-label">Width</label>
                            <input type="text" value="48" disabled>
                        </div>

                        <div class="grid-10 tablet-grid-15">
                            <label class="input-label">Length</label>
                            <input type="text" value="40" disabled>
                        </div>

                        <div class="grid-10 tablet-grid-15">
                            <label class="input-label">Height</label>
                            <input type="text" value="40" disabled>
                        </div>

                        <div class="grid-10 tablet-grid-15">
                            <label class="input-label">Quantity</label>
                            <input type="text" value="8" disabled>
                        </div>

                        <div class="grid-10 tablet-grid-10">
                            <label class="input-label">Total Weight</label>
                            <input type="text" value="1000" disabled>
                        </div>

                        <div class="grid-15 tablet-grid-15">
                            <label class="input-label optional-label">Class *
                                <span class="tooltip-light"></span>
                            </label>
                            <!-- <span class="tooltip-light"> 
								<div class="tooltip-bubble">
									<p>Can we stack your pallets? Charges are made based on <span>pallet space</span>. One pallet space is 48&ldquo;x40&ldquo; and the entire height of the truck.</p>
								</div>
							</span> -->
                            <select class="dropdown" disabled>
                                <option></option>
                                <option>Option 1</option>
                            </select>
                        </div>

                        <input type="checkbox" id="input_stackable">
                        <label class="checkbox" for="input_stackable" style="margin-top: 30px;" disabled>
                            <span>Stackable?</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="row grid-container">
            <div class="grid-100 tablet-grid-100">
                <div class="grid-parent grid-100 tablet-grid-100 container title">
                    <h1 class="title">Ready to Ship?</h1>

                    <div class="grid-parent grid-15 tablet-grid-20 container">
                        <button class="button-yellow-medium" disabled>Start Quote</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="row grid-container">
            <div class="grid-100 tablet-grid-100">
                <div class="grid-parent grid-100 tablet-grid-100 container">
                    <h1 class="step-header">My Orders</h1>
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
                                <input type="radio" id="radio1" name="radio">
                                <label class="radio" for="radio1">
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
                            <td class="actions"></td>
                        </tr>
                        <tr>
                            <td>
                                <input type="radio" id="radio2" name="radio">
                                <label class="radio" for="radio2">
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
                            <td class="actions"></td>
                        </tr>
                        <tr>
                            <td>
                                <input type="radio" id="radio3" name="radio">
                                <label class="radio" for="radio3">
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
                            <td class="actions"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="row grid-container">
            <div class="grid-100 tablet-grid-100">
                <div class="grid-100 tablet-grid-100 container title">
                    <h1 class="title">Schedule Pickup</h1>
                    <p class="sub-title sub-header">Review</p>
                </div>
            </div>

            <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                <div class="grid-100 tablet-grid-50 mobile-grid-100 container step-container">
                    <div class="grid-100 tablet-grid-100 container">
                        <h1 class="step-header">
                            <span class="label-number active">4</span>Who should we send the invoice to?</h1>
                    </div>

                    <div class="grid-50 tablet-grid-50 mobile-grid-100">
                        <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                            <div class="grid-100 tablet-grid-100">
                                <label class="input-label">Company</label>
                                <input type="text" value="Freshzim" disabled>
                            </div>
                        </div>

                        <div class="grid-100 tablet-grid-100 container mobile-grid-100">
                            <div class="grid-100 tablet-grid-90 mobile-grid-100">
                                <label class="input-label">Address 1</label>
                                <input type="text" value="1218 Brannon Street" disabled>
                            </div>
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <div class="grid-60 tablet-grid-60 mobile-grid-70">
                                <label class="input-label">City</label>
                                <input type="text" value="Los Angeles" disabled>
                            </div>

                            <div class="grid-20 tablet-grid-20 mobile-grid-30">
                                <label class="input-label">State</label>
                                <input type="text" value="CA" disabled>
                            </div>

                            <div class="grid-20 tablet-grid-20 mobile-grid-30">
                                <label class="input-label">Zip Code</label>
                                <input type="text" value="90014" disabled>
                            </div>
                        </div>

                        <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                            <div class="grid-100 tablet-grid-90">
                                <label class="input-label">Email</label>
                                <input type="text" value="connie@abccompany.com" disabled>
                            </div>
                        </div>

                        <div class="grid-100 tablet-grid-100 mobile-grid-100 container">
                            <div class="grid-60 tablet-grid-60">
                                <label class="input-label">Phone</label>
                                <input type="text" value="213-529-0000" disabled>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid-container">
            <div class="grid-100 tablet-grid-100">
                <div class="grid-100 tablet-grid-100 container title">
                    <h1 class="title">Confirm Shipment Details</h1>
                </div>

                <div class="grid-100 tablet-grid-100 container">
                    <div class="grid-50 tablet-grid-50">
                        <div class="grid-100 tablet-grid-100">
                            <h1 class="step-header">
                                <span class="label-number">1</span>Where are we picking up?</h1>
                        </div>

                        <div class="grid-100 tablet-grid-100 container">
                            <div class="grid-80 tablet-grid-80">
                                <table class="table-details">
                                    <tbody>
                                        <tr>
                                            <td>Type</td>
                                            <td>Business</td>
                                        </tr>
                                        <tr>
                                            <td>Address</td>
                                            <td>Freshzim</td>
                                        </tr>
                                        <tr>
                                            <td>Ready for Pickup</td>
                                            <td>02/06/2018</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div class="grid-20 tablet-grid-20">
                                <input type="checkbox" id="checkbox_liftgate_pickup">
                                <label class="checkbox" for="checkbox_liftgate_pickup">
                                    <span>Lift Gate Required</span>
                                </label>

                                <input type="checkbox" id="checkbox_liftgate_pickup">
                                <label class="checkbox" for="checkbox_liftgate_pickup">
                                    <span>Pallet Jack Required</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--- Track Shipments TMS-491 -->

        <div class="grid-container" style="margin-top: 175px;">
            <div class="grid-100 tablet-grid-100">
                <div class="grid-100 tablet-grid-100 container title">
                    <h1 class="title">Track Shipments</h1>
                </div>

                <div class="grid-100 tablet-grid-100 container tracking-container">
                    <div class="grid-80 tablet-grid-80">
                        <label class="input-label">PRO #</label>
                        <input type="text" class="input-search">
                        <span class="text-disclosure">By clicking "Track" you are agreeing to the
                            <span class="text-bold">Terms & Conditions</span>
                        </span>
                    </div>

                    <div class="grid-15 tablet-grid-20" style="margin-top: 15px;">
                        <button class="button-yellow-medium">Track</button>
                    </div>
                </div>

                <div class="tracking-process">
                    <ul class="tracking-status-text">
                        <li>
                            <p class="complete">Origin</p>
                        </li>

                        <li>
                            <p>In Transit</p>
                        </li>

                        <li>
                            <p>Destination</p>
                        </li>
                    </ul>

                    <ul class="tracking-status-icon">
                        <li id="status-pick-up" data-status="pick-up">
                            <span class="circle complete"></span>
                        </li>

                        <li id="status-transit" data-status="transit">
                            <span class="line complete"></span>
                            <span class="circle"></span>
                        </li>

                        <li id="status-delivered" data-status="delivered">
                            <span class="line"></span>
                            <span class="circle"></span>
                        </li>
                    </ul>

                    <ul class="tracking-status-text">
                        <li>
                            <span class="details">Fri Feb 9</span>
                            <span class="details">City of Industry, CA</span>
                        </li>

                        <li></li>

                        <li>
                            <span class="details">Estimated: Mon Feb 19</span>
                            <span class="details"></span>
                        </li>
                    </ul>
                </div>

                <div class="grid-100 tablet-grid-100 container title">
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

    </div>

</template>