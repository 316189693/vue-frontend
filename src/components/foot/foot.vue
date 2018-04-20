<template>
<footer class="component-footer footer">
  <div class="container text-center">
    <!-- <p class="text-muted">{{ $formatMessage("footer-powered-by", { version : version, build : build }) }}</p> -->
    <iframe style="display:none" :src="iframeLoginSource"></iframe>
  </div>
</footer>
</template>
<style lang="scss" src="./foot.scss" scoped></style>
