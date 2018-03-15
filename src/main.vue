<template>
  <div id="app" class="app">
    <Navbar v-if="hideForLogin()"></Navbar>
    <transition name="fade" mode="out-in">
      <router-view class="view router-view"></router-view>
    </transition>
    <Foot v-if="hideForLogin()"></Foot>
    <transition name="fade">
        <messageModel :modalName="messageModel.messageName" :waitMillsSecondsToClose = "messageModel.waitMillsSecondsToClose" :titleColor = "messageModel.titleColor" :yPosition="messageModel.yPosition" :width="messageModel.width" :height="messageModel.height" :max-width="messageModel.maxWidth" :max-height="messageModel.maxHeight" :title="messageModel.messageModelTitle" :message="messageModel.messageModelMessage" :closeAction="closeMessageModel">
        </messageModel>
    </transition>
  </div>
</template>



