<template>

    <modal :name="modalName" :adaptive="true" :pivot-x="xPosition" :pivot-y="yPosition" :width="width" :height="height" :max-width="maxWidth" :max-height="maxHeight" :clickToClose="clickToClose || noButtons">
      <h1 class="h1-model-class">{{title}}<button class="ui-button close-modal-x" @click="closeModal"></button></h1>
      <div class="slot_section">
          <slot></slot>
      </div>

      <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix" v-if="!noButtons">
        <div class="ui-dialog-buttonset">
            <button type="button" class="ui-button ui-corner-all ui-widget confirm" :style="rightBtnStyle" @click="rightBtnAction">{{rightBtnText}}</button>
            <button type="button" class="btn ui-button btn-default cancel" :style="leftBtnStyle" @click="leftBtnAction">{{leftBtnText}}</button>
        </div>
      </div>
    </modal>

</template>
<style lang="scss" src="./changePassword.scss" scoped></style>
