import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as trainerActions from '../../../../ngrx/trainers/trainer.action';
import { Store } from '@ngrx/store';
import { getmessagelist } from '../../../../ngrx/trainers/trainer.selectors';
import { ChatSocketService } from '../../../../services/chat-socket.service';
import { UserProfile } from '../../../../ngrx/trainers/trainer.interface';

@Component({
  selector: 'app-trainers-messages',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './trainers-messages.component.html',
  styleUrl: './trainers-messages.component.css',
})
export class TrainersMessagesComponent {
  // @ViewChild('messageContainer') private messageContainer!: ElementRef;
  messageForm!: FormGroup;
  message: string = '';
  messages: any[] = [];
  receiveremail!: string;
  name!: string;
  Bio!: string;

  @Input() set user(receiverData: UserProfile) {
    if (receiverData) {
      this.loadUserMessages(receiverData);
    }
  }
  constructor(private store: Store, private chatService: ChatSocketService) {}

  // ngAfterViewChecked() {
  //   this.scrollToBottom();
  // }
  loadUserMessages(receiverData: UserProfile) {
    this.name = receiverData.name;
    this.Bio = receiverData.Bio;

    this.receiveremail = receiverData.email;

    let user_id = localStorage.getItem('user_id');
    let senderemail = localStorage.getItem('user_email');
    let receiverEmail = receiverData.email;

    if (user_id && senderemail) {
      this.store.dispatch(
        trainerActions.getMessageListTrainer({
          senderemail,
          receiveremail: receiverData.email,
        })
      );
      this.store.select(getmessagelist).subscribe((datas) => {
        this.messages = [];
        datas.forEach((data) => {
          let messageObj = {
            isSender: data.senderEmail === senderemail,
            content: data.content,
          };
          this.messages.push(messageObj);
        });
      });
    }
  }
  createMessage() {
    if (this.messageForm.valid) {
      const message = this.messageForm.value.message;
      const senderId = localStorage.getItem('user_email');
      const receiverId = this.receiveremail;
      const sendersName = '';

      if (senderId && receiverId) {
        console.log(`Sending message: ${message} to ${receiverId}`);
        this.chatService.sendMessage(
          senderId,
          receiverId,
          message,
          sendersName
        );
        this.message = '';
      }
      let data = { name: this.name, Bio: this.Bio, email: this.receiveremail };

      if (this.name && this.receiveremail) {
        this.loadUserMessages(data);
      }
      this.messageForm.reset();
    }
  }

  // private scrollToBottom(): void {
  //   try {
  //     this.messageContainer.nativeElement.scrollTop =
  //       this.messageContainer.nativeElement.scrollHeight;
  //   } catch (err) {
  //     console.error('Could not scroll to bottom', err);
  //   }
  // }
}
