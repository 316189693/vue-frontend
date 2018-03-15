<template>
  <div id="message_model">
    <modal :name="modalName" :adaptive="true" :waitMillsSecondsToClose="waitMillsSecondsToClose" :pivot-y="yPosition" :width="width" :height="height" :max-width="maxWidth" :max-height="maxHeight" @closed="closeAction" @opened="closeModelAfterSecond" :clickToClose="clickToClose">    
      <h1 id="pre_message_title" class ="default-message-title" :style="{color:titleColor}">{{title}}</h1>
      <p id="pre_message_message">{{message}}</p>
      <slot></slot>
    </modal>

  </div>

</template>
<style lang="scss" src="./messageModel.scss" scoped></style>
