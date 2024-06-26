import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { clientChatList } from '../../../../ngrx/clients/client.interface';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as clientActions from '../../../../ngrx/clients/client.action';
import { getChatList } from '../../../../ngrx/clients/client.selectors';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GetuserdataService } from '../../../../services/getuserdata.service';

@Component({
  selector: 'app-chatdispaly',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chatdispaly.component.html',
  styleUrl: './chatdispaly.component.css',
})
export class ChatdispalyComponent implements OnInit {
  chatList!: clientChatList[];
  @Output() profileChange: EventEmitter<any> = new EventEmitter<string>();
  constructor(
    private store: Store,
    private router: Router,
    private GetuserdataService: GetuserdataService
  ) {}

  ngOnInit(): void {
    let user_id = this.GetuserdataService.getUserid();
    if (user_id) {
      this.store.dispatch(clientActions.getChatList({ user_id }));
      this.store.select(getChatList).subscribe((list) => {
        this.chatList = list;
      });
    }
  }
  displayProfile(email: string, name: string, Bio: string) {
    let receiverData = { email, name, Bio };
    this.profileChange.emit(receiverData);
  }
}
