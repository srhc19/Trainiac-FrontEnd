import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as trainerAction from '../../../ngrx/trainers/trainer.action';
import { getpaymentData } from '../../../ngrx/trainers/trainer.selectors';
@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css',
})
export class PaymentDetailsComponent implements OnInit {
  paymentData!: any[];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 10;
  isNavHidden = true;
  constructor(private router: Router, private store: Store) {}
  toggleNav() {
    this.isNavHidden = !this.isNavHidden;
  }
  ngOnInit(): void {
    let limit = 10;
    let skip = 0;
    this.store.dispatch(trainerAction.getPaymentData({ limit, skip }));
    this.store.select(getpaymentData).subscribe((data) => {
      this.paymentData = data;
    });
  }
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.fetchData();
  }
  fetchData() {
    const skip = (this.currentPage - 1) * this.itemsPerPage;
    const limit = this.itemsPerPage;

    this.store.dispatch(trainerAction.getPaymentData({ limit, skip }));
    this.store.select(getpaymentData).subscribe((data) => {
      this.paymentData = data;
    });
  }

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
  logout() {
    this.router.navigate(['/clientLogin']);
  }
  adminClient() {
    this.router.navigate(['/clients']);
  }
  adminPaymentData() {}
}
