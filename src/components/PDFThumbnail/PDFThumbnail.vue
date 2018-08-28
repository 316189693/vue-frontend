<template>
    <div class="file">
        <p class="file-category" v-if="pdfThumbnail.show_name">{{pdfThumbnail.name}}</p>

        <a :href="pdfThumbnail._jump_to_url_after_click" target="_BLANK">
            <canvas :id="pdfThumbnail.canvasId"></canvas>
        </a>
    </div>
</template>
