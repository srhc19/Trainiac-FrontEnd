import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { getClientDetails } from '../../../../ngrx/userauth/user.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as userActions from '../../../../ngrx/userauth/user.action';
import { GetuserdataService } from '../../../../services/getuserdata.service';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css',
})
export class ClientProfileComponent implements OnInit {
  clientDetails!: any;
  description!: string;
  goals!: Array<string>;
  name!: string;
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
    let _id = this.GetuserdataService.getUserid();
    if (user_id === _id) {
      this.displayMessage = false;
    }
    this.store.dispatch(userActions.getCurrentClient({ user_id }));
    this.store.select(getClientDetails).subscribe((clientDetail) => {
      this.clientDetails = clientDetail;

      this.description = clientDetail.description;
      this.goals = clientDetail.goals;
      this.name = clientDetail.name;
    });
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
    const dropdownMenu = document.getElementById(
      'dropdown-menu'
    ) as HTMLElement;
    if (dropdownMenu) {
      dropdownMenu.style.display = this.dropdownVisible ? 'block' : 'none';
    }
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
    if (dropdownMenu) {
      dropdownMenu.style.display = 'none';
    }
  }

  updatetClientProfile() {
    this.router.navigate(['/updatetClientProfile']);
  }
  message() {
    this.router.navigate(['/clientChat']);
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

  logout() {
    this.router.navigate(['/clientLogin']);
  }
}
