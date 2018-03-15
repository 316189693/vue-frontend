<template>
<nav class="component-navbar navbar navbar-default navbar-static-top">
  <div class="container">
    <div class="navbar-header">
      <ul>                   
          <li><a @click="logout" class="active_tab">Logout</a></li>
        <li><a href="#" v-bind:class="{active_tab : currentPage == 'notSetYet'}" >My Account</a></li>       
        <li><a href="#/track" v-bind:class="{active_tab : currentPage == 'Track'}" >Track</a></li>
        <li><a href="#/getquote" v-bind:class="{active_tab : currentPage == 'GetQuote' || currentPage == 'SavedQuote' || currentPage == 'SchedulePickup' || currentPage == 'SchedulePickupShipment' || currentPage == 'SchedulePickupReview'}" >Quote & Ship</a></li>
        <li><a href="#/home" v-bind:class="{active_tab : currentPage == 'Home'}" >Home</a></li>
      </ul>
    </div>
    
  </div>
</nav>
</template>
<style lang="scss" src="./navbar.scss" scoped></style>
