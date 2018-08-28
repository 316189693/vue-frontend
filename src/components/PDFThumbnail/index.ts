import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import template from "./PDFThumbnail.vue";
import PDFThumbnailObj from "../../pojo/PDFThumbnail";
import  PdfThumbUtil from "../../services/pdf/PdfThumbUtil";

@Component({
    mixins: [template]
})
export default class PDFThumbnail extends Vue {
    @Prop()
    pdfThumbnail: PDFThumbnailObj;

    @Watch("pdfThumbnail.pdf_url", {
        deep: true,
        immediate: true
    })
    scrollDown(val: any, oldVal: any, event: any) {
        if (val) {
            PdfThumbUtil.generatePdfThumb(this.pdfThumbnail);
        }

    }
}