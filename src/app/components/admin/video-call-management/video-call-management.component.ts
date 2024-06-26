import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as trainerAction from '../../../ngrx/trainers/trainer.action';
import { getSessionData } from '../../../ngrx/trainers/trainer.selectors';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-video-call-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './video-call-management.component.html',
  styleUrl: './video-call-management.component.css',
})
export class VideoCallManagementComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 10;
  sessiondata!: any;
  searchQuery: string = '';
  isNavHidden: boolean = true;
  constructor(private store: Store, private router: Router) {}
  toggleNav() {
    this.isNavHidden = !this.isNavHidden;
  }
  ngOnInit(): void {
    this.store.dispatch(trainerAction.getSessionList());
    this.store.select(getSessionData).subscribe((data) => {
      this.sessiondata = data;
    });
  }

  performSearch() {
    this.searchFunction(this.searchQuery);
  }

  searchFunction(query: string) {
    console.log(query);
    if (query !== '') {
      this.store.dispatch(trainerAction.adminSessionSearch({ query }));
      this.store.select(getSessionData).subscribe((data) => {
        this.sessiondata = data;
      });
    }
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.fetchData();
  }
  fetchData() {}

  getTotalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  getPageNumbers() {
    const totalPages = this.getTotalPages();
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  trainerslist() {
    this.router.navigate(['/adminTrainerslist']);
  }
  adminBlog() {
    this.router.navigate(['/adminBlog']);
  }
  sessionManagement() {
    this.router.navigate(['/adminVideoCallManagement']);
  }
  Dashboard() {
    this.router.navigate(['/Dashboard']);
  }

  adminPaymentData() {
    this.router.navigate(['/adminPaymentData']);
  }
  adminClient() {
    this.router.navigate(['/clients']);
  }
  logout() {
    this.router.navigate(['/clientLogin']);
  }
}
