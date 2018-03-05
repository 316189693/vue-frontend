<template>
<nav class="component-navbar navbar navbar-default navbar-static-top">
  <div class="container">
    <div class="navbar-header">
      <ul>                   
          <li><a @click="logout" class="active_tab">Logout</a></li>
        <li><a href="#" v-bind:class="{active_tab : navbarTab.activeTab === 4}" v-on:click="navbarTab.activeTab = 4">My Account</a></li>       
        <li><a href="#" v-bind:class="{active_tab : navbarTab.activeTab === 3}" v-on:click="navbarTab.activeTab = 3">Track</a></li>
        <li><a href="#/getquote" v-bind:class="{active_tab : navbarTab.activeTab === 2}" v-on:click="navbarTab.activeTab = 2">Quote & Ship</a></li>
        <li><a href="#/home" v-bind:class="{active_tab : navbarTab.activeTab === 1}" v-on:click="navbarTab.activeTab = 1">Home</a></li>
      </ul>
    </div>
    
  </div>
</nav>
</template>
<style lang="scss" src="./navbar.scss" scoped></style>
