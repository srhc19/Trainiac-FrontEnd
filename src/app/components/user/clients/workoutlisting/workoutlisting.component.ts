import { Component, OnInit, HostListener } from '@angular/core';
import * as userActions from '../../../../ngrx/userauth/user.action';
import * as clientActions from '../../../../ngrx/clients/client.action';
import { Store } from '@ngrx/store';
import { getClientDetails } from '../../../../ngrx/userauth/user.selectors';
import { getworkoutlist } from '../../../../ngrx/clients/client.selectors';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GetuserdataService } from '../../../../services/getuserdata.service';

@Component({
  selector: 'app-workoutlisting',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './workoutlisting.component.html',
  styleUrl: './workoutlisting.component.css',
})
export class WorkoutlistingComponent implements OnInit {
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 20;
  clientData!: any;
  workoutList!: any;
  dropdownVisible = false;
  isLoading: boolean = true;
  constructor(
    private store: Store,
    private router: Router,
    private GetuserdataService: GetuserdataService
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    let user_id = this.GetuserdataService.getUserid();

    this.store.dispatch(userActions.getCurrentClient({ user_id }));

    this.store.select(getClientDetails).subscribe((clientDetail) => {
      this.clientData = clientDetail;
    });
    let offset = 0;
    this.store.dispatch(clientActions.getworkoutlists({ offset }));
    this.store.select(getworkoutlist).subscribe((list) => {
      this.workoutList = list;
      this.isLoading = false;
    });
  }

  onPageChange(pageNumber: number) {
    this.isLoading = true;
    this.currentPage = pageNumber;
    let offset = 10 * (pageNumber - 1);
    if (pageNumber === 120) {
      offset = 0;
    }

    this.store.dispatch(clientActions.getworkoutlists({ offset }));
    this.store.select(getworkoutlist).subscribe((list) => {
      this.workoutList = list;
      this.isLoading = false;
    });
    this.totalItems += 10;
  }
  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }
  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
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
