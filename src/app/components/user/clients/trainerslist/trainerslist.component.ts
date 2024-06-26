import { Component, NgModule, OnInit, HostListener } from '@angular/core';

import { Store } from '@ngrx/store';
// import * as clientActions from '../../../../ngrx/clients/client.action';
import * as userActions from '../../../../ngrx/userauth/user.action';
import { CommonModule } from '@angular/common';
import {
  geTrainerList,
  getClientDetails,
} from '../../../../ngrx/userauth/user.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { clientService } from '../../../../ngrx/clients/client.services';
import { FormsModule } from '@angular/forms';
import { GetuserdataService } from '../../../../services/getuserdata.service';

@Component({
  selector: 'app-trainerslist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trainerslist.component.html',
  styleUrl: './trainerslist.component.css',
})
export class TrainerslistComponent {
  trainerList: Array<any> = [];
  rating: any = 0;
  clientData!: any;
  user_id!: string;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 10;
  searchQuery: string = '';
  dropdownVisible = false;
  constructor(
    private store: Store,
    private router: Router,
    private clientService: clientService,
    private GetuserdataService: GetuserdataService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    let user_id = this.route.snapshot.paramMap.get('id');
    // let user_id = localStorage.getItem('user_id');

    this.store.dispatch(userActions.getCurrentClient({ user_id }));
    this.store.select(getClientDetails).subscribe((clientDetail) => {
      this.clientData = clientDetail;
    });
    // this.clientService.exerciseslist();
    this.gettrainerlist();

    this.store.select(geTrainerList).subscribe((trainerList) => {
      this.trainerList = trainerList;
      // this.rating = trainerList.rating;
    });
  }
  gettrainerlist() {
    let skip = (this.currentPage - 1) * this.itemsPerPage;
    let limit = this.itemsPerPage;
    this.store.dispatch(userActions.getTrainersList({ skip, limit }));
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.fetchData();
  }
  fetchData() {
    const skip = (this.currentPage - 1) * this.itemsPerPage;
    const limit = this.itemsPerPage;

    this.store.dispatch(userActions.getTrainersList({ skip, limit }));
    this.store.select(geTrainerList).subscribe((trainerList) => {
      this.trainerList = trainerList;
      // this.rating = trainerList.rating;
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
    if (query !== '') {
      this.store.dispatch(userActions.trainerlistSearch({ query }));
      this.store.select(geTrainerList).subscribe((trainerList) => {
        this.trainerList = trainerList;
        // this.rating = trainerList.rating;
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
  calender() {
    let id = this.GetuserdataService.getUserid();
    // const id = localStorage.getItem('user_id');
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
    // let user_id = localStorage.getItem('user_id');
    if (user_id) {
      this.router.navigate(['/ProgressTracker', user_id]);
    }
  }
  trainerProfile(id: string) {
    this.router.navigate(['/TrainerProfileDetails', id]);
  }
  logout() {
    this.router.navigate(['/clientLogin']);
  }
  editprofile() {
    this.router.navigate(['/updatetClientProfile']);
  }
}
