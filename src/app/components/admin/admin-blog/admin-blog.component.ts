import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReusabletableComponent } from '../../reusabletable/reusabletable.component';
import { Store } from '@ngrx/store';
import * as trainerAction from '../../../ngrx/trainers/trainer.action';
import { getadminBlogDetails } from '../../../ngrx/trainers/trainer.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TruncatePipe } from '../../../pipe/truncate.pipe';

@Component({
  selector: 'app-admin-blog',
  standalone: true,
  imports: [ReusabletableComponent, CommonModule, FormsModule, TruncatePipe],
  templateUrl: './admin-blog.component.html',
  styleUrl: './admin-blog.component.css',
})
export class AdminBlogComponent implements OnInit {
  blogdata!: any[];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 10;
  startIndex: number = 0;
  searchQuery: string = '';
  isNavHidden: boolean = true;

  constructor(private router: Router, private store: Store) {}
  toggleNav() {
    this.isNavHidden = !this.isNavHidden;
  }
  ngOnInit(): void {
    let skip = (this.currentPage - 1) * this.itemsPerPage;
    let limit = this.itemsPerPage;
    this.store.dispatch(trainerAction.getBlogDetails({ skip, limit }));
    this.store.select(getadminBlogDetails).subscribe((data) => {
      this.blogdata = data;
      console.log(this.blogdata, 'blogdata in admin blog component');
    });
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

  handleChange(event: any) {}

  performSearch() {
    this.searchFunction(this.searchQuery);
  }

  searchFunction(query: string) {
    console.log(query);
    if (query !== '') {
      this.store.dispatch(trainerAction.adminBlogSearch({ query }));
      this.store.select(getadminBlogDetails).subscribe((data) => {
        this.blogdata = data;
        console.log(this.blogdata, 'blogdata in admin blog component');
      });
    }
  }

  viewBlog(_id: string) {
    // this.store.dispatch(trainerAction.viewBlogContent(_id));

    this.router.navigate(['/adminBlogContent', _id]);
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
  adminPaymentData() {
    this.router.navigate(['/adminPaymentData']);
  }
}
