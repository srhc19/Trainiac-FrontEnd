import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatSocketService {
  socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  joinRoom(userId: string) {
    this.socket.emit('join', userId);
  }

  sendMessage(
    senderId: string,
    receiverId: string,
    message: string,
    sendersName: string
  ) {
    console.log('socket');
    const messageData = {
      senderId: senderId,
      receiverId: receiverId,
      content: message,
      sendersName,
    };
    this.socket.emit('chat message', messageData);
  }

  getMessage(userId: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on(`chat message ${userId}`, (data: any) => {
        console.log(userId, data.senderId, 'get message in chat....');
        this.showNotification(data.sendersName, data.content);
        observer.next(data);
      });
    });
  }

  // markMessageAsRead(messageId: string) {
  //   this.socket.emit('message read', messageId);
  // }

  onMessageRead(msgId: string): Observable<any> {
    this.socket.emit('message read', msgId);
    return new Observable<any>((observer) => {
      this.socket.on(`message read ${msgId}`, (data: any) => {
        observer.next(data);
      });
    });
  }

  showNotification(sendersName: string, content: string) {
    if (Notification.permission === 'granted') {
      new Notification(`New message from  Trainiac : ${sendersName}`, {
        body: content,
        icon: 'path/to/icon.png',
      });
    } else {
      console.log('permission not granded...');
    }
  }
}
