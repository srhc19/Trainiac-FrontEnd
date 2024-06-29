import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  HostListener,
  AfterViewInit,
  AfterViewChecked,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as userActions from '../../../../ngrx/userauth/user.action';
import * as clientActions from '../../../../ngrx/clients/client.action';
import { ChatSocketService } from '../../../../services/chat-socket.service';
import { OnIdentifyEffects } from '@ngrx/effects';
import { getClientDetails } from '../../../../ngrx/userauth/user.selectors';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {
  getChatList,
  getmessagelist,
} from '../../../../ngrx/clients/client.selectors';
import { clientChatList } from '../../../../ngrx/clients/client.interface';
import { ChatdispalyComponent } from '../chatdispaly/chatdispaly.component';
import * as trainerActions from '../../../../ngrx/trainers/trainer.action';
import { getReceiversImg } from '../../../../ngrx/trainers/trainer.selectors';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { GetuserdataService } from '../../../../services/getuserdata.service';
@Component({
  selector: 'app-chat-system',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ChatdispalyComponent,
    PickerComponent,
  ],
  templateUrl: './chat-system.component.html',
  styleUrl: './chat-system.component.css',
})
export class ChatSystemComponent
  implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy
{
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  showEmojiPicker = false;
  clientData!: any;
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
    let locName = localStorage.getItem('receiversName');
    let locEmail = localStorage.getItem('receiverEmail');
    let locBio = localStorage.getItem('receiversBio');

    if (locName && locEmail) {
      let data = { name: locName, Bio: locBio ? locBio : '', email: locEmail };
      this.displayProfile(data);
    }

    let user_id = this.GetuserdataService.getUserid();
    this.store.dispatch(userActions.getCurrentClient({ user_id }));
    this.store.select(getClientDetails).subscribe((clientDetail) => {
      this.clientData = clientDetail;
      if (this.clientData && this.clientData.email) {
        this.chatService.joinRoom(this.clientData.email);
      }
    });
    //get people from users chat system

    this.chatService.getMessage(this.clientData.email).subscribe((message) => {
      if (this.clientData.email === message.senderId) {
        this.onMessage(message._id);
        this.messages.push({
          isSender: true,
          content: message.content,
          read: message.read,
          id: message._id,
        });
        // this.chatService.markMessageAsRead(message._id);
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

  onMessage(messageId: string) {
    console.log(messageId, 'on message read');
    this.chatService.onMessageRead(messageId).subscribe((data) => {
      const message = this.messages.find((m) => m.id === data.messageId);
      console.log(message);
      if (message) {
        message.read = true;
      }
    });
  }
  createMessage() {
    if (this.messageForm.valid) {
      const message = this.messageForm.value.message;
      const senderId = this.GetuserdataService.getEmail();
      const receiverId = this.receiveremail;
      const sendersName = this.clientData.name;

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
        this.displayProfile(data);
      }
      this.messageForm.reset();
      this.scrollToBottom();
    }
  }
  addEmoji(event: any) {
    const emoji = event.emoji.native;
    const message = this.messageForm.controls['message'].value;
    this.messageForm.controls['message'].setValue(message + emoji);
    this.showEmojiPicker = false;
  }
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }
  displayProfile(receiverData: { email: string; name: string; Bio: string }) {
    if (this.messageForm) {
      this.messageForm.reset();
    }
    this.showinputField = true;
    this.name = receiverData.name;
    this.Bio = receiverData.Bio;
    console.log(receiverData, '...');
    this.receiveremail = receiverData.email;

    localStorage.setItem('receiverEmail', receiverData.email);
    localStorage.setItem('receiversName', receiverData.name);
    localStorage.setItem('receiversBio', receiverData.Bio);
    let user_id = this.GetuserdataService.getUserid();
    let senderemail = this.GetuserdataService.getEmail();
    let receiverEmail = receiverData.email;

    if (user_id && senderemail) {
      this.store.dispatch(
        clientActions.getMessageList({
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
    this.isMobile = window.innerWidth < 768; // Adjust breakpoint as needed
    if (this.isMobile) {
      this.closeDropdown(); // Close dropdown on mobile view
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
    let user_id = this.GetuserdataService.getUserid();
    if (user_id) {
      this.router.navigate(['/trainerslist', user_id]);
    }
  }
  logout() {
    this.router.navigate(['/clientLogin']);
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
