export class PageOptions {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  isNext: boolean;
  isPrevious: boolean;

  constructor(pageSize: number, currentPage: number, totalItems: number) {
    this.totalPages = Math.ceil(totalItems / pageSize);
    this.totalItems = totalItems;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.isNext = this.currentPage < this.totalPages;
    this.isPrevious = this.currentPage > 1;
  }
}
