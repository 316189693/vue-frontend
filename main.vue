<template>
  <div id="app" class="app">
    <Navbar v-if="hideForLogin()"></Navbar>
    <transition name="router" mode="out-in">
      <router-view class="view router-view"></router-view>
    </transition>
    <Foot v-if="hideForLogin()"></Foot>
  </div>
</template>
