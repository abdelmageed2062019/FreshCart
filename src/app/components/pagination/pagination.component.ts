import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() numberOfPages: number = 1;
  @Input() isLoading: boolean = true;

  @Output() pageChange = new EventEmitter<number>();


  constructor() { }

  onPageClick(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.numberOfPages && pageNumber !== this.currentPage) {
      this.pageChange.emit(pageNumber);
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.numberOfPages }, (_, index) => index + 1);
  }

}
