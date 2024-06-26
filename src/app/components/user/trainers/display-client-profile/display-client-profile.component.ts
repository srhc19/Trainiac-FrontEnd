import { Component, OnInit, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { getClientDetails } from '../../../../ngrx/userauth/user.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as userActions from '../../../../ngrx/userauth/user.action';
import * as trainerAction from '../../../../ngrx/trainers/trainer.action';
import { GetuserdataService } from '../../../../services/getuserdata.service';
@Component({
  selector: 'app-display-client-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './display-client-profile.component.html',
  styleUrl: './display-client-profile.component.css',
})
export class DisplayClientProfileComponent {
  clientDetails!: any;
  description!: string;
  goals!: Array<string>;
  name!: string;
  dropdownVisible = false;
  displayMessage = true;

  isClient = false;
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
    this.router.navigate(['/clientProfile', id]);
  }
  editprofile() {
    this.router.navigate(['/updatetTrainerProfile']);
  }
  clientRequest() {
    this.router.navigate(['/clientRequest']);
  }
  updateProfile() {
    this.router.navigate(['/updatetTrainerProfile']);
  }
  logout() {
    this.router.navigate(['/trainerLogin']);
  }
  message() {
    const receiver_id = this.route.snapshot.paramMap.get('id');
    const currentuser_id = this.GetuserdataService.getUserid();
    console.log(receiver_id, currentuser_id, 'display client profile');
    if (receiver_id && currentuser_id) {
      this.store.dispatch(
        trainerAction.addMessageList({ receiver_id, currentuser_id })
      );
    }

    this.router.navigate(['/trainerChat']);
  }
}
