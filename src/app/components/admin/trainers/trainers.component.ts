import { Component, NgModule, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getuserdata } from '../../../ngrx/userauth/user.selectors';
import { CommonModule } from '@angular/common';
import * as userActions from '../../../ngrx/userauth/user.action';
import { Router } from '@angular/router';
import { ReusabletableComponent } from '../../reusabletable/reusabletable.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [ReusabletableComponent, FormsModule,CommonModule],
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.css',
})
export class TrainersComponent {
  userdata!: any[];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 10;
  startIndex: number = 0;
  searchQuery: string = '';
  isNavHidden: boolean = true;

  constructor(private store: Store, private router: Router) {}
  toggleNav() {
    this.isNavHidden = !this.isNavHidden;
  }

  ngOnInit(): void {
    this.refresh();

    this.store.select(getuserdata).subscribe((userdata) => {
      this.userdata = userdata;
      console.log(userdata, 'userdata');
    });
  }

  refresh() {
    let skip = (this.currentPage - 1) * this.itemsPerPage;
    let limit = this.itemsPerPage;
    let role = 'trainer';
    this.store.dispatch(userActions.getUserData({ role, skip, limit }));
  }
  handleCheckboxChange(_id: any) {
    console.log(_id, 'id in client component');
    this.store.dispatch(userActions.changeUserStatus({ _id }));
  }
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.fetchData();
  }
  fetchData() {
    const skip = (this.currentPage - 1) * this.itemsPerPage;
    const limit = this.itemsPerPage;
    this.startIndex = skip;
    let role = 'trainer';
    this.store.dispatch(userActions.getUserData({ role, skip, limit }));
    this.store.select(getuserdata).subscribe((userdata) => {
      this.userdata = userdata;
      console.log(userdata, 'userdata');
    });
    // Assuming you have an API endpoint for fetching paginated data
    // You need to replace 'apiEndpoint' with your actual API endpoint
    // this.store.dispatch(userActions.fetchPaginatedData({ skip, limit }));
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

  performSearch() {
    this.searchFunction(this.searchQuery);
  }

  searchFunction(query: string) {
    console.log(query);
    if (query !== '') {
      this.store.dispatch(userActions.adminTrainerSearch({ query }));
      this.store.select(getuserdata).subscribe((userdata) => {
        this.userdata = userdata;
        console.log(userdata, 'userdata');
      });
    }
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
