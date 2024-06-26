import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-reusabletable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reusabletable.component.html',
  styleUrl: './reusabletable.component.css',
})
export class ReusabletableComponent implements OnInit {
  @Input() columns!: string[];
  @Input() data!: any[];
  @Input() currentPage!: number;
  @Input() itemsPerPage!: number;
  @Input() totalItems!: number;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() CheckboxChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
  ngOnInit(): void {
    console.log(this.columns);
  }

  onPageChange(pageNumber: number) {
    this.pageChange.emit(pageNumber);
  }

  onCheckboxChange(item: any) {
    console.log(item, 'item in reusable', item._id);
    this.CheckboxChange.emit(item._id);
  }
  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }
}
