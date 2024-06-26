import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as clientAction from '../../../../ngrx/clients/client.action';
import * as trainerAction from '../../../../ngrx/trainers/trainer.action';
import { getclientBlogList } from '../../../../ngrx/clients/client.selectors';
import { CommonModule } from '@angular/common';
import { getcurrentTrainerBlogList } from '../../../../ngrx/trainers/trainer.selectors';
import { FormsModule } from '@angular/forms';
import * as userActions from '../../../../ngrx/userauth/user.action';
import { getTrainerDetails } from '../../../../ngrx/userauth/user.selectors';
import { GetuserdataService } from '../../../../services/getuserdata.service';
@Component({
  selector: 'app-trainer-blog-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trainer-blog-list.component.html',
  styleUrl: './trainer-blog-list.component.css',
})
export class TrainerBlogListComponent {
  clientData!: any;
  blogList!: any[];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 10;
  searchQuery: string = '';
  currentTrainerBlogsList: boolean = false;
  dropdownVisible = false;
  trainerData!: any;

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
    });
    // this.store.dispatch(clientAction.getTotalBlogList())

    let user_id = this.GetuserdataService.getUserid();
    this.store.dispatch(userActions.getCurrentTrainer({ user_id }));

    this.store.select(getTrainerDetails).subscribe((data) => {
      this.trainerData = data;
    });
  }

  blogContent(id: string | undefined) {
    if (id) {
      this.router.navigate(['/trainerBlogContent', id]);
    }
  }
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.fetchData();
  }
  fetchData() {
    const skip = (this.currentPage - 1) * this.itemsPerPage;
    const limit = this.itemsPerPage;
    if (this.currentTrainerBlogsList === true) {
      const user_id = this.GetuserdataService.getUserid();
      if (user_id) {
        this.store.dispatch(
          trainerAction.currentTrainerBlogList({ user_id, skip, limit })
        );
        this.store.select(getcurrentTrainerBlogList).subscribe((data) => {
          this.blogList = data;
        });
      }
    }
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

  addBlog() {
    this.router.navigate(['/addBlogs']);
  }

  AllBlogs() {
    let skip = (this.currentPage - 1) * this.itemsPerPage;
    let limit = this.itemsPerPage;

    this.store.dispatch(clientAction.getBlogListClients({ skip, limit }));
    this.store.select(getclientBlogList).subscribe((data) => {
      this.blogList = data;
      this.totalItems = data.length;
    });
    this.currentTrainerBlogsList = false;
  }

  currentTrainerBlogs() {
    this.currentTrainerBlogsList = true;
    const user_id = this.GetuserdataService.getUserid();
    const skip = (this.currentPage - 1) * this.itemsPerPage;
    const limit = this.itemsPerPage;
    if (user_id) {
      this.store.dispatch(
        trainerAction.currentTrainerBlogList({ user_id, skip, limit })
      );
      this.store.select(getcurrentTrainerBlogList).subscribe((data) => {
        this.blogList = data;
      });
    }
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
  calender() {
    this.router.navigate(['/calender']);
  }

  profile() {
    let id = this.GetuserdataService.getUserid();
    this.router.navigate(['/trainerprofile', id]);
  }
  chatsystem() {
    this.router.navigate(['/trainerChat']);
  }
  videoCallSelectClient() {
    this.router.navigate(['/videoCallSelectClient']);
  }

  blogs() {
    this.router.navigate(['/trainerBlogList']);
  }
  clientRequest() {
    this.router.navigate(['/clientRequest']);
  }
  clientList() {
    this.router.navigate(['/clientlist']);
  }
  logout() {
    this.router.navigate(['/trainerLogin']);
  }
}
