import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navlinks',
  standalone: true,
  imports: [],
  templateUrl: './navlinks.component.html',
  styleUrl: './navlinks.component.css',
})
export class NavlinksComponent {
  constructor(private router: Router) {}
  gettrainerlist() {}

  calender() {
    this.router.navigate(['/calender']);
  }
  profile() {
    this.router.navigate(['/clientProfile']);
  }
  workoutlist() {
    this.router.navigate(['/clientWorkoutList']);
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
  clientList() {
    this.router.navigate(['/clientlist']);
  }
  clientRequest() {
    this.router.navigate(['/clientRequest']);
  }
  logout() {
    this.router.navigate(['/trainerLogin']);
  }
}
