import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChatSocketService } from '../../../../services/chat-socket.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ChatdisplayComponent } from '../chatdisplay/chatdisplay.component';
import * as userActions from '../../../../ngrx/userauth/user.action';
import * as trainerActions from '../../../../ngrx/trainers/trainer.action';
import { getTrainerDetails } from '../../../../ngrx/userauth/user.selectors';
import { computeMsgId } from '@angular/compiler';
import { CommonModule } from '@angular/common';
import {
  getReceiversImg,
  getmessagelist,
} from '../../../../ngrx/trainers/trainer.selectors';
import { TrainersMessagesComponent } from '../trainers-messages/trainers-messages.component';
import { UserProfile } from '../../../../ngrx/trainers/trainer.interface';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { mergeEffects } from '@ngrx/effects';
import { GetuserdataService } from '../../../../services/getuserdata.service';
@Component({
  selector: 'app-chat-system',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ChatdisplayComponent,
    CommonModule,
    TrainersMessagesComponent,
    PickerComponent,
  ],
  templateUrl: './chat-systemtrainer.component.html',
  styleUrl: './chat-systemtrainer.component.css',
})
export class ChatSystemTrainerComponent
  implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy
{
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  // user!: UserProfile;
  showEmojiPicker = false;
  trainerData!: any;
  reciverimage!: string;
  messageForm!: FormGroup;
  message: string = '';
  messages: any[] = [];
  receiveremail!: string;

  name!: string;
  Bio!: string;
  dropdownVisible = false;
  showChatList = true;
  showMessages = false;
  isMobile = false;

  showinputField = false;
  constructor(
    private fb: FormBuilder,
    private chatService: ChatSocketService,
    private store: Store,
    private router: Router,
    private GetuserdataService: GetuserdataService
  ) {
    this.checkIfMobile();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.requestNotificationPermission();
    let user_id = this.GetuserdataService.getUserid();

    let locName = localStorage.getItem('receiversName');
    let locEmail = localStorage.getItem('receiverEmail');
    let locBio = localStorage.getItem('receiversBio');

    if (locName && locEmail) {
      let data = { name: locName, Bio: locBio ? locBio : '', email: locEmail };
      this.displayProfile(data);
    }

    this.store.dispatch(userActions.getCurrentTrainer({ user_id }));

    this.store.select(getTrainerDetails).subscribe((data) => {
      this.trainerData = data;
      console.log(this.trainerData, 'trainerdata');
    });

    this.chatService.getMessage(this.trainerData.email).subscribe((message) => {
      if (this.trainerData.email === message.senderId) {
        this.onMessage(message._id);
        this.messages.push({
          isSender: true,
          content: message.content,
          read: message.read,
          id: message._id,
        });
        // this.chatService.markMessageAsRead(message._id);
        // this.onMessageRead(message._id);
      } else {
        this.onMessage(message._id);
        this.messages.push({
          isSender: false,
          content: message.content,
          read: message.read,
          id: message._id,
        });
      }

      // this.chatService.onMessageRead(message._id).subscribe((data) => {
      //   console.log(data, 'data in trainer chat on message read');
      //   this.updateMessageStatus(data.messageId, true); // Update the read status of the message
      // });
      // let data = { name: this.name, Bio: this.Bio, email: this.receiveremail };
      // if (this.name && this.receiveremail) {
      //   this.displayProfile(data);
      // }
    });

    this.messageForm = this.fb.group({
      message: ['', Validators.required],
    });
  }

  // updateMessageStatus(messageId: string, read: boolean) {
  //   const message = this.messages.find((m) => m.id === messageId);
  //   if (message) {
  //     message.read = read;
  //   }
  // }
  onMessage(messageId: string) {
    this.chatService.onMessageRead(messageId).subscribe((data) => {
      const message = this.messages.find((m) => m.id === data.messageId);
      console.log(message);
      if (message) {
        message.read = true;
      }
    });
  }
  addEmoji(event: any) {
    const emoji = event.emoji.native;
    const message = this.messageForm.controls['message'].value || '';
    this.messageForm.controls['message'].setValue(message + emoji);
    this.showEmojiPicker = false;
  }
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }
  createMessage() {
    if (this.messageForm.valid) {
      const message = this.messageForm.value.message;
      const senderId = this.GetuserdataService.getEmail();
      const receiverId = this.receiveremail;
      const sendersName = this.trainerData.name;

      if (senderId && receiverId) {
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
        this.displayProfile(data);
      }
      this.messageForm.reset();
      this.scrollToBottom();
    }
  }

  displayProfile(receiverData: UserProfile) {
    if (this.messageForm) {
      this.messageForm.reset();
    }
    this.showinputField = true;
    // this.user = receiverData;
    // this.scrollToBottom();
    this.name = receiverData.name;
    this.Bio = receiverData.Bio;

    this.receiveremail = receiverData.email;

    let user_id = this.GetuserdataService.getUserid();
    let senderemail = this.GetuserdataService.getEmail();
    let receiverEmail = receiverData.email;
    localStorage.setItem('receiverEmail', receiverData.email);
    localStorage.setItem('receiversName', receiverData.name);
    localStorage.setItem('receiversBio', receiverData.Bio);
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
            read: data.read,
            id: data._id,
          };
          this.messages.push(messageObj);
        });
      });

      this.store.dispatch(
        trainerActions.messageReciversImg({ receiveremail: receiverData.email })
      );
      this.store.select(getReceiversImg).subscribe((data) => {
        this.reciverimage = data;
      });
      this.scrollToBottom();
    }
    if (this.isMobile) {
      this.showChatList = false;
      this.showMessages = true;
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
    this.checkIfMobile();
    if (event.target.innerWidth > 500) {
      this.closeDropdown();
    }
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.closeDropdown();
      this.showChatList = !this.showMessages;
    } else {
      this.showChatList = true;
      this.showMessages = true;
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
  requestNotificationPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      });
    } else {
      console.log('This browser does not support notifications.');
    }
  }
  ngOnDestroy(): void {
    this.showinputField = false;
    localStorage.removeItem('receiverEmail');
    localStorage.removeItem('receiversName');
    localStorage.removeItem('receiversBio');
  }
  videoCall() {
    this.router.navigate(['/videoCall']);
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
  private scrollToBottom(): void {
    if (this.chatContainer) {
      try {
        this.chatContainer.nativeElement.scrollTop =
          this.chatContainer.nativeElement.scrollHeight;
      } catch (err) {
        console.error('Scroll to bottom failed:', err);
      }
    }
  }
  backToChatList() {
    this.showChatList = true;
  }
}
