import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { getTrainerDetails } from '../../../../ngrx/userauth/user.selectors';
import * as userActions from '../../../../ngrx/userauth/user.action';
import * as trainerAction from '../../../../ngrx/trainers/trainer.action';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getisClient } from '../../../../ngrx/trainers/trainer.selectors';
import { GetuserdataService } from '../../../../services/getuserdata.service';

@Component({
  selector: 'app-display-trainer-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './display-trainer-profile.component.html',
  styleUrl: './display-trainer-profile.component.css',
})
export class DisplayTrainerProfileComponent {
  trainerData!: any;
  isClient: boolean = false;
  dropdownVisible = false;
  displayMessage = true;
  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private GetuserdataService: GetuserdataService
  ) {}
  ngOnInit(): void {
    const user_id = this.route.snapshot.paramMap.get('id');
    const _id = this.GetuserdataService.getUserid();

    if (user_id === _id) {
      this.displayMessage = false;
    }

    this.store.dispatch(userActions.getCurrentTrainer({ user_id }));

    this.store.select(getTrainerDetails).subscribe((data) => {
      this.trainerData = data;
      console.log(this.trainerData, 'trainerdata...');
      console.log(this.trainerData.skills, 'skills...');
    });
    const id = this.GetuserdataService.getUserid();
    if (id) {
      this.store.dispatch(trainerAction.checkIfClient({ id }));
    }
    this.store.select(getisClient).subscribe((data) => {
      this.isClient = data;
    });
  }

  updateProfile() {
    this.router.navigate(['/updatetTrainerProfile']);
  }
  addReview() {
    const user_id = this.route.snapshot.paramMap.get('id');
    if (user_id) {
      this.router.navigate(['/addTestimonial', user_id]);
    }
  }
  message() {
    const receiver_id = this.route.snapshot.paramMap.get('id');
    const currentuser_id = this.GetuserdataService.getUserid();
    if (receiver_id && currentuser_id) {
      this.store.dispatch(
        trainerAction.addMessageList({ receiver_id, currentuser_id })
      );
      this.router.navigate(['/clientChat']);
    }
  }
  SendRequest() {
    const trainer_id = this.route.snapshot.paramMap.get('id');
    const client_id = this.GetuserdataService.getUserid();
    if (client_id && trainer_id) {
      this.store.dispatch(
        trainerAction.sendRequestTrainer({ client_id, trainer_id })
      );
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
  logout() {
    this.router.navigate(['/clientLogin']);
  }
}
