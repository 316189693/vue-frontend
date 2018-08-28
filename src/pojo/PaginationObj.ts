export default class Pagination {
     pageSize: number;
     currentPage: number;
     totalSize: number;
     text: string;

     constructor(pageSize: number = 10, currentPage: number = 1, totalSize: number = 0, text: string = "") {
         this.pageSize = pageSize;
         this.currentPage = currentPage;
         this.totalSize = totalSize;
         this.text = text;
     }

     hasPages() {
         return this.totalSize >= 1 && this.currentPage >= 1 && this.pageSize >= 1;
     }

     startNum() {
         if (!this.hasPages()) {
             return 0;
         }
         return (this.currentPage - 1) * this.pageSize + 1;
     }

     endNum() {
         if (!this.hasPages()) {
             return 0;
         }
         if (this.currentPage * this.pageSize > this.totalSize) {
             return this.totalSize;
         }
         return this.currentPage * this.pageSize;
     }

     getTotalSize() {
         if (this.totalSize < 1) {
             this.totalSize = 0;
         }
         return this.totalSize;
     }

     getCurrentPage() {
         return this.currentPage;
     }

     getPageSize() {
         return this.pageSize;
     }

     getTotalPages() {
         if (!this.hasPages()) {
             return 0;
         }
         return Math.ceil(this.getTotalSize() / this.pageSize);
     }

     getTotalPageList() {
         let totalPages = [];
         for (let i = 0; i < this.getTotalPages(); i++) {
             let page = {pageNum: (i + 1)};
             totalPages.push(page);
         }
         return totalPages;
     }

    /**
     *
     * @returns example: Showing 1-10 of 45 customers
     */
     displayText() {
         if (!this.hasPages()) {
             return "";
         }
         return "Showing " + this.startNum() + " - " + this.endNum() + " of " + this.totalSize + " " + this.text;
     }

     nextPage() {
         if (this.currentPage >= this.getTotalPages()) {
             return this.currentPage;
         }
         this.currentPage += 1;
         return this.currentPage;
     }

     prePage() {
         if (this.currentPage <= 1) {
             return this.currentPage;
         }
         this.currentPage -= 1;
         return this.currentPage;
     }
}
