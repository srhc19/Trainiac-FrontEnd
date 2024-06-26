import { CommonModule } from '@angular/common';
import { Component, Input, Output, input } from '@angular/core';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-reusable-dashboard-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reusable-dashboard-table.component.html',
  styleUrl: './reusable-dashboard-table.component.css',
})
export class ReusableDashboardTableComponent {
  @Input() columns!: string[];
  @Input() data!: any[];
  @Output() CheckboxChange: EventEmitter<any> = new EventEmitter<any>();

  onCheckboxChange(item: any) {
    console.log(item, 'item in reusable', item._id);
    this.CheckboxChange.emit(item._id);
  }
}
