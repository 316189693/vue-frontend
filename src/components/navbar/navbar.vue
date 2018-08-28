<template>
<nav class="component-navbar navbar navbar-default navbar-static-top">
  <div class="container">
    <div class="navbar-header">
      <ul>
        <li>
          <a v-bind:class="{active_tab : currentPage == 'myAccount' || currentPage == 'myAccountEdit' || currentPage == 'myCustomers' || currentPage == 'addressBook'}" >My Account</a>
          <div class="navbar-content">
            <a href="#/myAccount"><p><span class="text-bold">{{fullName}}</span></p>View My Account</a>
            <a href="#/addressBook">Address Book</a>
              <template v-if="group_name == 'SALES'">
                  <a  href="#/myCustomers" >My Customers</a>
              </template>
            <a @click="logout">Logout</a>
          </div>
        </li>
        <li v-for="item in menuItems" :key="item.id">
            <a v-bind:class="{active_tab : searchLink(item.class) }">
            {{ item.name }}
            </a>
            <div class="navbar-content">
              <template v-for="subitem in subMenuItems">
                <template v-if="subitem.menu_name == 'Delivery Estimation Sheet'">
                    <a :key="subitem.menu_id" href="javascript:;" @click='openPDF' v-if="item.id === subitem.menu_category_id"> 
                      {{ subitem.menu_name }}
                    </a>
                </template>
                <template v-else>
                    <a :key="subitem.menu_id" v-bind:href="subitem.menu_link" v-if="item.id === subitem.menu_category_id"> 
                      {{ subitem.menu_name }}
                    </a>
                </template>
              </template>
            </div>
        </li> 
        <li>
          <a href="#/home" v-bind:class="{active_tab : currentPage == 'Home'}">Home</a>
        </li> 

      </ul>
    </div>
  </div>
</nav>
</template>
<style lang="scss" src="./navbar.scss" scoped></style>
