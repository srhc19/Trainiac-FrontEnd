import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  HostListener,
} from '@angular/core';
import { NavlinksComponent } from '../../navlinks/navlinks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as userActions from '../../../ngrx/userauth/user.action';
import * as trainerAction from '../../../ngrx/trainers/trainer.action';
import {
  getTrainerDetails,
  gettrainersclientDetails,
} from '../../../ngrx/userauth/user.selectors';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { PaymentComponent } from '../../payment/payment.component';
import { ToastrService } from 'ngx-toastr';
import { GetuserdataService } from '../../../services/getuserdata.service';

function randomID(len: any) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

@Component({
  selector: 'app-vedio-call-select-clients',
  standalone: true,
  imports: [
    NavlinksComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    PaymentComponent,
  ],
  templateUrl: './vedio-call-select-clients.component.html',
  styleUrl: './vedio-call-select-clients.component.css',
})
export class VedioCallSelectClientsComponent implements OnInit {
  userdata!: any;
  trainerData!: any;
  clientlist!: any;
  trainerList!: any;
  checkedItemIds: string[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 10;
  dropdownVisible = false;
  constructor(
    private store: Store,
    private router: Router,
    private toastr: ToastrService,
    private GetuserdataService: GetuserdataService
  ) {}

  ngOnInit(): void {
    let user_id = this.GetuserdataService.getUserid();

    this.store.dispatch(userActions.getCurrentTrainer({ user_id }));

    this.store.select(getTrainerDetails).subscribe((data) => {
      this.trainerData = data;
    });
    let _id = this.GetuserdataService.getUserid();
    let skip = 0;
    let limit = 10;
    this.store.dispatch(
      userActions.getCurrentUserDetails({ _id, skip, limit })
    );
    this.store.select(gettrainersclientDetails).subscribe((data) => {
      this.clientlist = data;
    });
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
      this.store.dispatch(
        userActions.getCurrentUserDetails({ _id: user_id, skip, limit })
      );
      this.store.select(gettrainersclientDetails).subscribe((data) => {
        this.clientlist = data;
        console.log(this.clientlist, 'clientlist... ');
      });
    }
    // this.store.dispatch(clientAction.getBlogListClients({ skip, limit }));
    // this.store.select(getclientBlogList).subscribe((data) => {
    //   this.blogList = data;
    // });
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

  toggleChecked(itemId: string) {
    const index = this.checkedItemIds.indexOf(itemId);
    if (index === -1) {
      this.checkedItemIds.push(itemId);
    } else {
      this.checkedItemIds.splice(index, 1);
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

  startVedioSession() {
    if (this.trainerData.premium.paid === true) {
      let vedioSessionClientsId = this.checkedItemIds;
      let trainer_id = this.GetuserdataService.getUserid();
      let randomid: any = randomID(5);
      if (trainer_id) {
        this.store.dispatch(
          trainerAction.startVedioSession({
            vedioSessionClientsId,
            trainer_id,
            randomid,
          })
        );
        // localStorage.setItem('vedioSessionIds',vedioSessionClientsId)
        // window.location.reload();
        this.router.navigate(['/videoCall', randomid]);
      }
    } else {
      this.toastr.error('you need premium accound to start vedio call');
    }
  }

  performSearch() {
    this.searchFunction(this.searchQuery);
  }

  searchFunction(query: string) {
    console.log(query);
    if (query !== '') {
      this.clientlist = this.clientlist.filter((obj: any) =>
        obj.name.toLowerCase().includes(query)
      );

      // this.store.dispatch(trainAction.bloglistSearch({ query }));
      // this.store.select(getclientBlogList).subscribe((data) => {
      //   this.blogList = data;
      // });
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
}
