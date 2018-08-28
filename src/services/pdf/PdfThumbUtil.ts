import pdfjsLib from 'pdfjs-dist';
import PDFThumbnail from "../../pojo/PDFThumbnail";
export default class PdfThumb {
    constructor() {}

    /**
     * user pdf fist page to generate thumbnail and attach to canvas
     * @param {PDFThumbnail} pdfThumbnail
     */
    public static generatePdfThumb (pdfThumbnail: PDFThumbnail) {
        let url = pdfThumbnail.pdf_url;
        let loadingTask = pdfjsLib.PDFJS.getDocument(url);
        loadingTask.then(function(pdf: any) {
            // Fetch the first page
            let pageNumber = 1;
            pdf.getPage(pageNumber).then(function(page: any) {
                let scale = 0.4;
                let viewport = page.getViewport(scale);

                // Prepare canvas using PDF page dimensions
                let ele =  document.getElementById(pdfThumbnail.canvasId || 'the-canvas') || new HTMLCanvasElement();
                let canvas = Object.assign(new HTMLCanvasElement(), ele);
                let context = canvas.getContext('2d');
                canvas.height = pdfThumbnail.height;
                canvas.width = pdfThumbnail.width;

                // Render PDF page into canvas context
                let renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext);
            });
        }, function (reason) {
            // PDF loading error
            console.error(reason);
        });
    }
}
