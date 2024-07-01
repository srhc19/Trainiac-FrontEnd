import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getClientDetails } from '../../../../ngrx/userauth/user.selectors';
import * as userActions from '../../../../ngrx/userauth/user.action';
import * as clientActions from '../../../../ngrx/clients/client.action';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {
  getclientSessionDetails,
  gettrainerData,
} from '../../../../ngrx/clients/client.selectors';
import { PaymentComponent } from '../../../payment/payment.component';
import { GetuserdataService } from '../../../../services/getuserdata.service';

@Component({
  selector: 'app-client-calender',
  standalone: true,
  imports: [CommonModule, FormsModule, PaymentComponent],
  templateUrl: './client-calender.component.html',
  styleUrl: './client-calender.component.css',
})
export class ClientCalenderComponent implements OnInit {
  currentMonth!: string;
  currentYear!: number;
  days!: string[];
  clientDetails!: any;
  workoutRoutines: any;
  sessionDetails: any;
  trainerData!: any;
  dropdownVisible = false;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private GetuserdataService: GetuserdataService
  ) {}
  isLoading: boolean = false;

  ngOnInit(): void {
    let user_id = this.route.snapshot.paramMap.get('id');
    // const user_id = this.GetuserdataService.getUserid();
    if (user_id) {
      this.store.dispatch(userActions.getCurrentClient({ user_id }));

      this.store.select(getClientDetails).subscribe((clientDetail) => {
        this.clientDetails = clientDetail;

        this.workoutRoutines = this.clientDetails.workoutRoutines;
      });

      const date = new Date();
      this.currentMonth = date.toLocaleString('default', { month: 'long' });
      this.days = this.generateDaysInMonth(date.getFullYear(), date.getMonth());
      this.currentYear = date.getFullYear();

      this.store.dispatch(clientActions.checkForVedioSession({ user_id }));
      this.store.select(getclientSessionDetails).subscribe((data) => {
        this.sessionDetails = data[0];
      });
    }
  }

  prevMonth(): void {
    const currentYear = this.currentYear;
    let currentMonth = this.getMonthIndex(this.currentMonth);

    if (currentMonth === 0) {
      this.currentYear = currentYear - 1;
      currentMonth = 11; // December
    } else {
      currentMonth -= 1;
    }

    this.currentMonth = this.getMonthName(currentMonth);
    this.days = this.generateDaysInMonth(this.currentYear, currentMonth);
  }

  nextMonth(): void {
    const currentYear = this.currentYear;
    let currentMonth = this.getMonthIndex(this.currentMonth);

    if (currentMonth === 11) {
      this.currentYear = currentYear + 1;
      currentMonth = 0;
    } else {
      currentMonth += 1;
    }

    this.currentMonth = this.getMonthName(currentMonth);
    this.days = this.generateDaysInMonth(this.currentYear, currentMonth);
  }
  getTasksForDay(day: string): any {
    const formattedDay = day.length === 1 ? '0' + day : day;
    const formattedMonth = this.getMonthIndex(this.currentMonth) + 1;
    const formattedMonthWithZero = formattedMonth.toString().padStart(2, '0');

    const formattedDate = `${this.currentYear}-${formattedMonthWithZero}-${formattedDay}`;

    const matchingRoutine = this.workoutRoutines.find(
      (workout: any) => workout.workoutDate === formattedDate
    );

    return matchingRoutine ? [matchingRoutine] : [];
  }

  getMonthIndex(monthName: string): number {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months.findIndex((month) => month === monthName);
  }

  getMonthName(monthIndex: number): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[monthIndex];
  }

  generateDaysInMonth(year: number, month: number): string[] {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray: string[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      daysArray.push(date.toLocaleDateString('default', { day: 'numeric' }));
    }

    return daysArray;
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

  removeTask(day: string, time: string, description: string): void {
    const dateKey = `${this.currentYear}-${
      this.getMonthIndex(this.currentMonth) + 1
    }-${day}`;

    if (this.workoutRoutines[dateKey]) {
      this.workoutRoutines[dateKey] = this.workoutRoutines[dateKey].filter(
        (task: any) => !(task.time === time && task.description === description)
      );
    }
  }

  joinSession() {
    if (this.sessionDetails) {
      const randomID = this.sessionDetails.randomId;
      this.router.navigate(['/videoCall', randomID]);
    }
  }

  viewTrainer() {
    if (this.clientDetails) {
      const email = this.clientDetails.trainers[0];
      this.store.dispatch(clientActions.getClientsTrainerDetails({ email }));
      this.store.select(gettrainerData).subscribe((data) => {
        this.trainerData = data;
      });
      const id = this.trainerData.user_id;
      this.router.navigate(['/trainerprofile', id]);
    }
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
    this.router.navigate(['/trainerslist']);
  }

  logout() {
    this.router.navigate(['/clientLogin']);
  }
}
