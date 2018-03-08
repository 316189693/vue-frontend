<template>
  <div>
    <modal :name="modalName" :adaptive="true" :pivot-y="yPosition" :width="width" :height="height" :max-width="maxWidth" :max-height="maxHeight" :clickToClose="false">    
      <h1 class="h1-model-class">{{title}}</h1>
      <p class="p-model-class">{{message}}</p>
      <div class="slot_section">
          <slot></slot>
      </div>
   
      <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
        <div class="ui-dialog-buttonset">
            <button type="button" class="ui-button ui-corner-all ui-widget delete" @click="rightBtnAction">{{rightBtnText}}</button>
            <button type="button" class="btn ui-button btn-default" @click="leftBtnAction">{{leftBtnText}}</button>
        </div>
      </div>
      <!-- <div tabindex="-1" role="dialog" class="ui-dialog ui-corner-all ui-widget ui-widget-content ui-front ui-dialog-buttons ui-draggable">
        <div class="ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle">
          <span id="ui-id-10" class="ui-dialog-title">{{title}}</span>
        </div>
        <div id="ui-id-9" class="ui-dialog-content ui-widget-content" style="width: auto; min-height: 0px; max-height: none; height: auto;">
          <p>{{message}}</p>
        </div>
        <div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
          <div class="ui-dialog-buttonset">
            <button type="button" class="btn btn-default" @click="cancelAction">{{cancelText}}</button>
            <button type="button" class="ui-button ui-corner-all ui-widget delete" @click="confirmAction">{{confirmText}}</button>
          </div>
        </div>
      </div> -->
    </modal>

  </div>

</template>
<style lang="scss" src="./modal.scss" scoped></style>
