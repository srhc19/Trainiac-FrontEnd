import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as trainerAction from '../../ngrx/trainers/trainer.action';
import { getprogressDetails } from '../../ngrx/trainers/trainer.selectors';
import { ProgressData } from '../../ngrx/trainers/trainer.interface';
import { CommonModule } from '@angular/common';
import { GetuserdataService } from '../../services/getuserdata.service';

@Component({
  selector: 'app-view-progress-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-progress-data.component.html',
  styleUrl: './view-progress-data.component.css',
})
export class ViewProgressDataComponent implements OnInit {
  id!: string | null;
  details!: ProgressData;
  dropdownVisible = false;
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private GetuserdataService: GetuserdataService
  ) {}

  ngOnInit(): void {
    let _id = this.route.snapshot.paramMap.get('id');
    if (_id) {
      this.store.dispatch(trainerAction.getprogressDetails({ _id }));
      this.store.select(getprogressDetails).subscribe((data) => {
        this.details = data;
        console.log(this.details);
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
  editProgress() {
    let _id = this.route.snapshot.paramMap.get('id');
    this.router.navigate(['/editProgressData', _id]);
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
    this.router.navigate(['/trainerLogin']);
  }
}
