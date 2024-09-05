import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit, HostListener } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as userActions from '../../../../ngrx/userauth/user.action';
import {
  getClientDetails,
  getTrainerDetails,
} from '../../../../ngrx/userauth/user.selectors';
import { Router } from '@angular/router';
import { CardioModalComponent } from '../cardio-modal/cardio-modal.component';
import { GymModalComponent } from '../gym-modal/gym-modal.component';
import { YogaModalComponent } from '../yoga-modal/yoga-modal.component';
import { AddnewClientComponent } from '../addnew-client/addnew-client.component';
import * as trainerAction from '../../../../ngrx/trainers/trainer.action';
import { getlistOfClients } from '../../../../ngrx/trainers/trainer.selectors';
import { GetuserdataService } from '../../../../services/getuserdata.service';
interface Client {
  id?: string;
  name?: string;
  email?: string;
  color?: string;
  client_id?: string;
}

interface Task {
  id?: string;
  clientId?: string;
  date: string;
  time: string;
  description: string;
}

@Component({
  selector: 'app-calender1',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardioModalComponent,
    GymModalComponent,
    YogaModalComponent,
    AddnewClientComponent,
  ],
  templateUrl: './calender1.component.html',
  styleUrl: './calender1.component.css',
})
export class Calender1Component implements OnInit {
  currentMonth!: string;
  currentYear!: number;
  days!: string[];
  clientDetails!: any;
  workoutRoutines: any;
  clientlist!: Array<Client>;
  currentClient!: string;
  dropdownVisible = false;
  trainerData!: any;
  currentClientName!: string;

  //dropdown & modal
  dropdownfunction: boolean = true;
  dropdownAddTask: boolean = true;
  cardioModal: boolean = true;
  gymModal: boolean = true;
  yogaModal: boolean = true;

  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
    private GetuserdataService: GetuserdataService
  ) {}
  isLoading: boolean = false;

  ngOnInit(): void {
    this.dropdownfunction = true;
    let currentClient = '';
    let trainerid = this.GetuserdataService.getUserid();
    if (trainerid) {
      let getclientlist = this.store.dispatch(
        trainerAction.getClientList({ trainerid })
      );
      this.store.select(getlistOfClients).subscribe((list) => {
        this.clientlist = list;

        if (this.clientlist[0]?.client_id) {
          currentClient = this.clientlist[0]?.client_id;

          let user_id = currentClient;
          this.store.dispatch(userActions.getCurrentClient({ user_id }));
        }
      });
    }

    this.store.select(getClientDetails).subscribe((clientDetail) => {
      this.clientDetails = clientDetail;

      this.workoutRoutines = this.clientDetails?.workoutRoutines;
    });

    const date = new Date();
    this.currentMonth = date.toLocaleString('default', { month: 'long' });
    this.days = this.generateDaysInMonth(date.getFullYear(), date.getMonth());
    this.currentYear = date.getFullYear();

    let user_id = this.GetuserdataService.getUserid();
    this.store.dispatch(userActions.getCurrentTrainer({ user_id }));

    this.store.select(getTrainerDetails).subscribe((data) => {
      this.trainerData = data;
    });
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

    const matchingRoutine = this.workoutRoutines?.find(
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
  dropdown() {
    this.dropdownfunction = !this.dropdownfunction;
  }
  dropDownTask() {
    this.dropdownAddTask = !this.dropdownAddTask;
  }

  opencardioModal() {
    this.gymModal = true;
    this.yogaModal = true;
    this.cardioModal = !this.cardioModal;
  }
  opengymModal() {
    this.cardioModal = true;
    this.yogaModal = true;
    this.gymModal = !this.gymModal;
  }
  openyogaModal() {
    this.gymModal = true;
    this.cardioModal = true;
    this.yogaModal = !this.yogaModal;
  }

  closeYogaModal() {
    this.yogaModal = true;
  }
  closeCardioModal() {
    this.cardioModal = true;
  }
  closeGymModal() {
    this.gymModal = true;
  }

  // closecardiomodel() {
  //   this.cardiomodal = true;
  // }

  removeWorkout(day: string) {
    const formattedDay = day.length === 1 ? '0' + day : day;
    const formattedMonth = this.getMonthIndex(this.currentMonth) + 1;
    const formattedMonthWithZero = formattedMonth.toString().padStart(2, '0');

    const formattedDate = `${this.currentYear}-${formattedMonthWithZero}-${formattedDay}`;
    let user_id = this.clientDetails.user_id;

    this.store.dispatch(
      trainerAction.removeWorkout({ formattedDate, user_id })
    );
    this.store.select(getClientDetails).subscribe((clientDetail) => {
      this.clientDetails = clientDetail;

      this.workoutRoutines = this.clientDetails?.workoutRoutines;
    });
  }

  getnewClientsDetails(user_id: any, name?: string) {
    this.store.dispatch(userActions.getCurrentClient({ user_id }));
    this.dropdownfunction = !this.dropdownfunction;
    if (name) {
      this.currentClientName = name;
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
  clientRequest() {
    this.router.navigate(['/clientRequest']);
  }

  clientList() {
    this.router.navigate(['/clientlist']);
  }

  logout() {
    this.router.navigate(['/trainerLogin']);
  }
}
