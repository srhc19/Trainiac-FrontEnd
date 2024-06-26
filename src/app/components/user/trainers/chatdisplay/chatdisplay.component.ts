import { Component, EventEmitter, Output } from '@angular/core';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as trainerActions from '../../../../ngrx/trainers/trainer.action';
import { getChatList } from '../../../../ngrx/trainers/trainer.selectors';
import { CommonModule } from '@angular/common';
import {
  UserProfile,
  trainerChatList,
} from '../../../../ngrx/trainers/trainer.interface';
import { GetuserdataService } from '../../../../services/getuserdata.service';

@Component({
  selector: 'app-chatdisplay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatdisplay.component.html',
  styleUrl: './chatdisplay.component.css',
})
export class ChatdisplayComponent {
  chatList!: trainerChatList[];
  @Output() profileChange: EventEmitter<UserProfile> =
    new EventEmitter<UserProfile>();
  constructor(
    private store: Store,
    private router: Router,
    private GetuserdataService: GetuserdataService
  ) {}

  ngOnInit(): void {
    let user_id = this.GetuserdataService.getUserid();
    if (user_id) {
      this.store.dispatch(trainerActions.getChatListTrainer({ user_id }));
      this.store.select(getChatList).subscribe((list) => {
        this.chatList = list;
      });
    }
  }
  displayProfile(email: string, name: string, bio: string) {
    let receiverData: UserProfile = { email, name, Bio: bio };
    this.profileChange.emit(receiverData);
  }
}
