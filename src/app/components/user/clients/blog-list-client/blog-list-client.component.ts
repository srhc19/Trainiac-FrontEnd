import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import * as clientAction from '../../../../ngrx/clients/client.action';
import { Blog } from '../../../../ngrx/trainers/trainer.interface';
import { getclientBlogList } from '../../../../ngrx/clients/client.selectors';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { getClientDetails } from '../../../../ngrx/userauth/user.selectors';
import * as userActions from '../../../../ngrx/userauth/user.action';
import { GetuserdataService } from '../../../../services/getuserdata.service';
@Component({
  selector: 'app-blog-list-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-list-client.component.html',
  styleUrl: './blog-list-client.component.css',
})
export class BlogListClientComponent implements OnInit {
  clientData!: any;
  blogList!: any[];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 10;
  searchQuery: string = '';
  dropdownVisible = false;

  constructor(
    private store: Store,
    private router: Router,
    private GetuserdataService: GetuserdataService
  ) {}

  ngOnInit(): void {
    let skip = (this.currentPage - 1) * this.itemsPerPage;
    let limit = this.itemsPerPage;
    this.store.dispatch(clientAction.getBlogListClients({ skip, limit }));
    this.store.select(getclientBlogList).subscribe((data) => {
      this.blogList = data;
      this.totalItems = data.length;
      // console.log(this.blogList, '...');
    });
    let user_id = this.GetuserdataService.getUserid();

    this.store.dispatch(userActions.getCurrentClient({ user_id }));
    this.store.select(getClientDetails).subscribe((clientDetail) => {
      this.clientData = clientDetail;
    });
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.fetchData();
  }
  fetchData() {
    const skip = (this.currentPage - 1) * this.itemsPerPage;
    const limit = this.itemsPerPage;

    this.store.dispatch(clientAction.getBlogListClients({ skip, limit }));
    this.store.select(getclientBlogList).subscribe((data) => {
      this.blogList = data;
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

  performSearch() {
    this.searchFunction(this.searchQuery);
  }

  searchFunction(query: string) {
    console.log(query);
    if (query !== '') {
      this.store.dispatch(clientAction.bloglistSearch({ query }));
      this.store.select(getclientBlogList).subscribe((data) => {
        this.blogList = data;
      });
    }
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
    const dropdownMenu = document.getElementById(
      'dropdown-menu'
    ) as HTMLElement;
    dropdownMenu.style.display = this.dropdownVisible ? 'block' : 'none';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 500) {
      this.closeDropdown();
    }
  }

  closeDropdown() {
    this.dropdownVisible = false;
    const dropdownMenu = document.getElementById(
      'dropdown-menu'
    ) as HTMLElement;
    dropdownMenu.style.display = 'none';
  }

  blogContent(id: string | undefined) {
    if (id) {
      this.router.navigate(['/clientBlogContent', id]);
    }
  }
  calender() {
    const id = this.GetuserdataService.getUserid();
    this.router.navigate(['/clientcalender', id]);
  }
  profile() {
    let user_id = this.GetuserdataService.getUserid();
    this.router.navigate(['/clientProfile', user_id]);
  }
  workoutlist() {
    this.router.navigate(['/clientWorkoutList']);
  }
  chatsystem() {
    this.router.navigate(['/clientChat']);
  }
  videoCallSelectClient() {
    this.router.navigate(['/videoCallSelectClient']);
  }
  clientBlogList() {
    this.router.navigate(['/clientBlogList']);
  }
  ProgressTracker() {
    let user_id = this.GetuserdataService.getUserid();
    if (user_id) {
      this.router.navigate(['/ProgressTracker', user_id]);
    }
  }
  trainerslist() {
    let user_id = this.GetuserdataService.getUserid();
    if (user_id) {
      this.router.navigate(['/trainerslist', user_id]);
    }
  }
  logout() {
    this.router.navigate(['/clientLogin']);
  }
}
