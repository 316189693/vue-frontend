<template>
  <div id="message_model">
    <modal :name="modalName" :adaptive="true" :pivot-y="yPosition" :width="width" :height="height" :max-width="maxWidth" :max-height="maxHeight" :clickToClose="false">    
      <pre id="pre_message_title">{{title}}</pre>
      <p id="pre_message_message">{{message}}</p>
      <slot></slot>
    </modal>

  </div>

</template>
<style lang="scss" src="./messageModel.scss" scoped></style>
