import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import * as trainerAction from '../../ngrx/trainers/trainer.action';
import { ActivatedRoute, Router } from '@angular/router';
import { getProgressData } from '../../ngrx/trainers/trainer.selectors';
import { ProgressData } from '../../ngrx/trainers/trainer.interface';
import { CommonModule } from '@angular/common';
import { GetuserdataService } from '../../services/getuserdata.service';

@Component({
  selector: 'app-progress-tracker-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-tracker-data.component.html',
  styleUrl: './progress-tracker-data.component.css',
})
export class ProgressTrackerDataComponent implements OnInit {
  progressData!: ProgressData[];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 10;
  dropdownVisible = false;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private GetuserdataService: GetuserdataService
  ) {}

  ngOnInit(): void {
    const user_id = this.route.snapshot.paramMap.get('id');
    if (user_id) {
      this.store.dispatch(trainerAction.getProgressData({ user_id }));
      this.store.select(getProgressData).subscribe((data) => {
        this.progressData = data;
      });
    }
  }
  DetailedView(_id: string) {
    this.router.navigate(['/ProgressDetails', _id]);
  }

  addNewData() {
    const _id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/addProgress', _id]);
  }

  getWeightChange(index: number): number {
    if (index === 0) return 0; // No previous data point to compare with
    return (
      this.progressData[index].currentWeight -
      this.progressData[index - 1].currentWeight
    );
  }
  getBodyFatChange(index: number): number {
    if (index === 0) return 0; // No previous data point to compare with
    return (
      this.progressData[index].bodyFatPercentage -
      this.progressData[index - 1].bodyFatPercentage
    );
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
    }
    // this.store.dispatch(clientAction.getBlogListClients({ skip, limit }));
    // this.store.select(getclientBlogList).subscribe((data) => {
    //   this.blogList = data;
    // });
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
  getTotalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  getPageNumbers() {
    const totalPages = this.getTotalPages();
    return Array(totalPages)
      .fill(0)
      .map((_, index) => index + 1);
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
  trainerProfile(id: string) {
    this.router.navigate(['/trainerprofile', id]);
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
