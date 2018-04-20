<template>
	<div>
	<div class="home-container">
			<img class="img-bg" src="../../assets/images/group-3.png" />
		<div class="row grid-container" style="margin-top:50px; min-height: 300px">
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

		                <div class="grid-parent grid-15 tablet-grid-20 container">
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
		        	<div class="grid-80 tablet-grid-75">
			            <div class="grid-parent grid-100 tablet-grid-100 container">
			                <h1 class="step-header">My Orders</h1>
			            </div>
			        </div>
			        <div class="grid-20 tablet-grid-25">
							<download-excel class="" :data="items" :fields="json_fields" type="csv" name="MyOrdersTable.csv">

							<button class="button-standard-small download">Download Table</button>

						</download-excel>
		            </div>
			        <div class="grid-100 tablet-grid-100" style="padding-top:15px;">
			            <table class="table-client">
			                <thead>
			                    <tr>
			                        <th>PU #</th>
			                        <th>PRO #</th>
			                        <th>REFERENCE #</th>
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
									<tr v-for="(item, index) in items.slice(0, 20)" @click="orderReview(item,$event)" style="cursor: pointer;" :key="index">
					         		<td>{{item.pu}}</td>
					         		<td>{{item.pro}}</td>
					         		<td>{{item.ref_no}}</td>
					         		<td>{{item.pickup | date_MDY_Slash}}</td>
					         		<td>{{item.tms_order_pickup_city | capitalizeEach}}, {{item.tms_order_pickup_state}}</td>
					         		<td>{{item.delivery | date_MDY_Slash}}</td>
					         		<td>{{item.tms_order_delivery_city | capitalizeEach}}, {{item.tms_order_delivery_state}}</td>
					         		<td>{{item.pts}}</td>
					         		<td>{{item.lbs | weight}}</td>
					         		<td>
					         		<v-popover offset="0" :auto-hide="true">
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
				                    </td>
					         	</tr>
			                </tbody>
			            </table>
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
