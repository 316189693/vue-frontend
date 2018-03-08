<template>
<div>
	<div class="home-container">
		<img class="img-bg" src="../../assets/images/group-3.png"/>
		<div class="row grid-container" style="margin-top:50px;">
	        <div class="grid-100 tablet-grid-100">
	            <div class="grid-parent grid-100 tablet-grid-100 container title">
	                <h1 class="title">Ready to Ship?</h1>

	                <div class="grid-parent grid-15 tablet-grid-20 container">
	                    <button class="button-yellow-medium" @click="redirectQuote">Start Quote</button>
	                </div>
	            </div>
	        </div>
	    </div>
	    <br/>
	    <div class="grid-container">
	        <div class="grid-100 tablet-grid-100">
	            <div class="grid-parent grid-100 tablet-grid-100 container">
	                <h1 class="step-header">My Orders</h1>
	            </div>
	        </div>
	        <br/>
	        <div class="grid-100 tablet-grid-100">
	            <table class="table-client">
	                <thead>
	                    <tr>
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
	                    <tr v-for="item in items">
			         		<td>{{item.pu}}</td>
			         		<td>{{item.pro}}</td>
			         		<td>{{item.tms_order_status}}</td>
			         		<td>{{item.pickup}}</td>
			         		<td>{{item.tms_order_pickup_city}}</td>
			         		<td>{{item.delivery}}</td>
			         		<td>{{item.tms_order_delivery_city}}</td>
			         		<td>{{item.pts}}</td>
			         		<td>{{item.lbs}}</td>
			         		<td class="actions">
		                        <div class="speech-bubble">
		                            <p @click="openBOL(item.order)">View BOL(s)</p>
		                            <p v-if="item.pod_link != null" @click="openPOD(item.pod_link)">View POD(s)</p>
		                            <p v-else style="color:#15223D; opacity: 0.7; cursor:unset">View POD(s)</p>
		                            <p @click="openShipping(item.order)">View Shipping Labels</p>
		                        </div>
		                    </td>
			         	</tr>
	                </tbody>
	            </table>
	        </div>
	    </div>
    </div>
</div>
</template>
<style lang="scss" src="./home.scss" scoped></style>
