import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as trainerAction from '../../../../ngrx/trainers/trainer.action';
import { getclientRequestList } from '../../../../ngrx/trainers/trainer.selectors';
import * as userActions from '../../../../ngrx/userauth/user.action';
import { getTrainerDetails } from '../../../../ngrx/userauth/user.selectors';
import { GetuserdataService } from '../../../../services/getuserdata.service';
@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css',
})
export class RequestsComponent implements OnInit, OnChanges {
  searchQuery: string = '';
  trainerData!: any;
  requestList!: any[];
  dropdownVisible = false;
  constructor(
    private router: Router,
    private store: Store,
    private GetuserdataService: GetuserdataService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    let user_id = this.GetuserdataService.getUserid();
    if (user_id) {
      this.store.dispatch(trainerAction.getclientsRequest({ user_id }));
      this.store.select(getclientRequestList).subscribe((data) => {
        this.requestList = data;
      });
    }

    this.store.dispatch(userActions.getCurrentTrainer({ user_id }));

    this.store.select(getTrainerDetails).subscribe((data) => {
      this.trainerData = data;
    });
  }

  performSearch() {
    this.searchFunction(this.searchQuery);
  }

  searchFunction(query: string) {
    console.log(query);
    if (query !== '') {
      this.store.dispatch(trainerAction.clientRequestSearch({ query }));
      this.store.select(getclientRequestList).subscribe((data) => {
        let array: any[] = [];

        data.forEach((trainer) => {
          trainer.requests.forEach((request: any) => {
            array.push(request);
          });
        });

        this.requestList = array;
        console.log(this.requestList, 'Filtered Requests');
      });
    }
  }

  AcceptRequest(client_id: string) {
    let trainer_id = this.GetuserdataService.getUserid();

    if (trainer_id) {
      this.store.dispatch(
        trainerAction.acceptClientRequest({ client_id, trainer_id })
      );
      // this.refreshRequestList(trainer_id);
      this.updateRequestList(client_id, true);
      this.cd.detectChanges();
    }
  }
  RemoveRequest(client_id: string) {
    let trainer_id = this.GetuserdataService.getUserid();

    if (trainer_id) {
      this.store.dispatch(
        trainerAction.removeClientRequest({ client_id, trainer_id })
      );
      // this.refreshRequestList(trainer_id);
      this.updateRequestList(client_id, false);
      this.cd.detectChanges();
    }
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
  logout() {
    this.router.navigate(['/trainerLogin']);
  }

  updateRequestList(client_id: string, status: boolean): void {
    this.requestList = this.requestList.map((data) => {
      if (data.client_id === client_id) {
        return { ...data, status };
      }
      return data;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    let trainer_id = this.GetuserdataService.getUserid();

    this.refreshRequestList(trainer_id);
  }
  refreshRequestList(trainer_id: string): void {
    console.log('refreshlist called');
    this.store.dispatch(
      trainerAction.getclientsRequest({ user_id: trainer_id })
    );

    this.store.select(getclientRequestList).subscribe((data) => {
      this.requestList = data;
      console.log('req updated');
    });
  }
  clientlist() {}
}
