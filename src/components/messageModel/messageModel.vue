<template>
  <div id="message_model">
    <modal :name="modalName" :adaptive="true" :pivot-y="yPosition" :width="width" :height="height" :max-width="maxWidth" :max-height="maxHeight" @opened="closeModelAfterSecond" :clickToClose="false">    
      <h1 id="pre_message_title">{{title}}</h1>
      <p id="pre_message_message">{{message}}</p>
      <slot></slot>
    </modal>

  </div>

</template>
<style lang="scss" src="./messageModel.scss" scoped></style>
