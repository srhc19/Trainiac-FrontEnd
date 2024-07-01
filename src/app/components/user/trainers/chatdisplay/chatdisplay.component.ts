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
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-chatdisplay',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chatdisplay.component.html',
  styleUrl: './chatdisplay.component.css',
})
export class ChatdisplayComponent {
  chatList!: trainerChatList[];
  @Output() profileChange: EventEmitter<UserProfile> =
    new EventEmitter<UserProfile>();
  SearchForm!: FormGroup;
  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
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
    this.SearchForm = this.fb.group({
      text: ['', Validators.required],
    });
  }
  displayProfile(email: string, name: string, bio: string) {
    let receiverData: UserProfile = { email, name, Bio: bio };
    this.profileChange.emit(receiverData);
  }

  Onsubmit() {
    if (this.SearchForm.valid) {
      let text = this.SearchForm.value.text;
      let user_id = this.GetuserdataService.getUserid();

      if (user_id) {
        this.store.dispatch(
          trainerActions.getMessageSearchResult({ text, user_id })
        );
      }
    }
  }
}
