<template>
	<div>
	<div class="home-container">
			<img class="img-bg" src="../../assets/images/group-3.png" />
		<div class="row grid-container get-started">
	        <div class="grid-100 tablet-grid-100">
	        	<template v-if="group_name == 'SALES'">
		            <div class="grid-parent grid-100 tablet-grid-100 container title">
							<h1 class="title" style="text-transform:unset; margin-bottom:10px;">Let's Get Started</h1>

		                <div class="grid-parent grid-15 tablet-grid-20 container">
								<button class="button-yellow-medium" @click="redirectCustomerSignup">Customer Signup</button>
		                </div>
		            </div>
		        </template>
		        <template v-else>
		            <div class="grid-parent grid-100 tablet-grid-100 container title">
							<h1 class="title" style="text-transform:unset; margin-bottom:10px;">Ready to Ship?</h1>

		                <div class="grid-parent grid-15 tablet-grid-35 mobile-grid-40 container">
								<button class="button-yellow-medium" @click="redirectQuote">Get a Quote</button>
		                </div>
		            </div>
		        </template>
	        </div>
	    </div>

			<div class="grid-100 tablet-grid-100 container" v-show="isLoading">
				<div class="toast-message-container">
			        <div class="toast-message-home">
			            <p>Loading your orders...hang tight!</p>
			        </div>
			    </div>
			</div>
	    <div class="grid-container">
			<template v-if='items[0]'>
				<div v-show="items[0]">
		        	<div class="grid-80 tablet-grid-60">
			            <div class="grid-parent grid-100 tablet-grid-100 container">
			                <h1 class="step-header">My Orders</h1>
			            </div>
			        </div>
			        <div class="grid-20 tablet-grid-35">
							<download-excel class="" :data="items" :fields="json_fields" type="csv" name="MyOrdersTable.csv">

							<button class="button-standard-small download">Download Table</button>

						</download-excel>
		            </div>
			        <div class="grid-100 tablet-grid-80" style="padding-top:15px;">
			        	<div class="grid-100 tablet-grid-100">
				            <table class="table-client table-card">
				                <thead>
				                    <tr>
				                        <th>PU #</th>
				                        <th>PRO #</th>
				                        <th>REFERENCE #</th>
										<th>STATUS</th>
				                        <th>Pickup Date</th>
				                        <th>Origin</th>
				                        <th>Delivery Date</th>
				                        <th>Destination</th>
				                        <th>Pallets</th>
				                        <th>Weight</th>
				                        <th></th>
				                    </tr>
				                </thead>
				                <tbody name="list" is="transition-group">
				                	<template v-if="items.length > 0">
				                		<tr v-for="(item, index) in items.slice(pagination.min - 1, pagination.max)" @click="orderReview(item,$event)" style="cursor: pointer;" :key="index">
							         		<span class="card-header">
	                                          <td column-title="PU #">{{item.pu}}</td>
	                                          <td class="inline-pro" column-title="PRO #">{{item.pro}}</td>
	                                          <td column-title="REFERENCE #">{{item.ref_no}}</td>
								         	</span>
								         	<td column-title="STATUS">{{item.stageText}}</td>
							         		<td column-title="Pickup Date">{{item.pickup | date_MDY_Slash}}</td>
							         		<td column-title="Origin">{{item.tms_order_pickup_city | capitalizeEach}}, {{item.tms_order_pickup_state}}</td>
							         		<td column-title="Delivery Date">{{item.delivery | date_MDY_Slash}}</td>
							         		<td column-title="Destination">{{item.tms_order_delivery_city | capitalizeEach}}, {{item.tms_order_delivery_state}}</td>
							         		<td column-title="Pallets">{{item.pts}}</td>
							         		<td column-title="Weight">{{item.lbs | weight}}</td>
							         		<v-popover offset="0" class="actions-td" :auto-hide="true">
					                            <button class="actions"></button>
														<template slot="popover">
					                               	<p v-if="item.bol_link != null" @click="openPOD(item.bol_link)" class="available">View BOL(s)</p>
					                           		<p v-else class="not-available">View BOL(s)</p>
				                              		<p v-if="item.pod_link != null" @click="openPOD(item.pod_link)" class="available">View POD(s)</p>
					                            	<p v-else class="not-available">View POD(s)</p>
				                                	<p @click="openShipping(item.order)">View Shipping Labels</p>
					                                <!-- <a v-close-popover>Close</a> -->
					                            </template>
					                        </v-popover>
							         	</tr>
				                	</template>
				                </tbody>
				            </table>

			            <div v-if="! pagination.hide"><div style="float: left; margin-top: 30px; font-style: italic; color: #15223d;">Showing <span>{{ pagination.min }} - {{ pagination.max }}</span> of <span>{{ pagination.totalOrders }}</span> orders</div>
			            <div style="float: right; margin-top: 30px;">
			            	
			            	<!-- <div style="width:285px; position: relative; left: 116px; height: 22px;"> -->
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
			        </div>
				</div>
			</template>
        	<div v-show="!items[0]&&!isLoading">
                <div class="grid-100 tablet-grid-100">
		            <div class="grid-parent grid-100 tablet-grid-100 container no-order">
		                <span>You don't have any orders with us yet!</span>
		            </div>
		        </div>
            </div>
	    </div>
    </div>
	</div>
</template>
<style lang="scss" src="./home.scss" scoped></style>
