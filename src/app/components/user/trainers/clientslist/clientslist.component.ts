import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as userActions from '../../../../ngrx/userauth/user.action';
import {
  getTrainerDetails,
  gettrainersclientDetails,
} from '../../../../ngrx/userauth/user.selectors';
import { GetuserdataService } from '../../../../services/getuserdata.service';

@Component({
  selector: 'app-clientslist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientslist.component.html',
  styleUrl: './clientslist.component.css',
})
export class ClientslistComponent implements OnInit {
  clientlist!: Array<any>;
  startIndex: number = 0;
  trainerData!: any;
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 10;
  dropdownVisible = false;

  constructor(
    private store: Store,
    private router: Router,
    private GetuserdataService: GetuserdataService
  ) {}

  ngOnInit(): void {
    let user_id = this.GetuserdataService.getUserid();

    this.store.dispatch(userActions.getCurrentTrainer({ user_id }));

    this.store.select(getTrainerDetails).subscribe((data) => {
      this.trainerData = data;
    });

    let _id = this.GetuserdataService.getUserid();
    const skip = 0;
    const limit = 10;
    if (_id) {
      this.store.dispatch(
        userActions.getCurrentUserDetails({ _id, skip, limit })
      );
      this.store.select(gettrainersclientDetails).subscribe((data) => {
        this.clientlist = data;
        console.log(this.clientlist, 'clientlist... ');
      });
    }
  }
  performSearch() {
    this.searchFunction(this.searchQuery);
  }

  searchFunction(query: string) {
    console.log(query);
    if (query !== '') {
      this.clientlist = this.clientlist.filter((obj) =>
        obj.name.toLowerCase().includes(query)
      );

      // this.store.dispatch(trainAction.bloglistSearch({ query }));
      // this.store.select(getclientBlogList).subscribe((data) => {
      //   this.blogList = data;
      // });
    }
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.fetchData();
  }
  fetchData() {
    const skip = (this.currentPage - 1) * this.itemsPerPage;
    const limit = this.itemsPerPage;

    const user_id = this.GetuserdataService.getUserid();
    if (user_id) {
      this.store.dispatch(
        userActions.getCurrentUserDetails({ _id: user_id, skip, limit })
      );
      this.store.select(gettrainersclientDetails).subscribe((data) => {
        this.clientlist = data;
        console.log(this.clientlist, 'clientlist... ');
      });
    }
    // this.store.dispatch(clientAction.getBlogListClients({ skip, limit }));
    // this.store.select(getclientBlogList).subscribe((data) => {
    //   this.blogList = data;
    // });
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

  clientProfile(id: string) {
    this.router.navigate(['/ClientProfileDetails', id]);
  }
  editprofile() {
    this.router.navigate(['/updatetTrainerProfile']);
  }
  clientRequest() {
    this.router.navigate(['/clientRequest']);
  }
  logout() {
    this.router.navigate(['/trainerLogin']);
  }
  clientList() {}
}
