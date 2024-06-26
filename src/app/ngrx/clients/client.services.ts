import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Console } from 'console';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class clientService {
  private url = environment.apiUrl;
  private apiUrl = `${this.url}/user/client`;

  constructor(private http: HttpClient) {}

  // trainerlist() {
  //   console.log('trainer service');
  //   return this.http.get<any>(`${this.apiUrl}/user/client/trainerlist`);
  // }

  updateClientProfile(formData: any) {
    console.log('client Service');
    return this.http.post<any>(`${this.apiUrl}/updateClientProfile`, formData);
  }

  clientLogin(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/clientLogin`, {
      email,
      password,
    });
  }

  getworkoutlists(offset: number) {
    return this.http.post<any>(`${this.apiUrl}/exercises`, { offset });
  }
  getChatList(user_id: string) {
    console.log('get chat list service');
    return this.http.post<any>(`${this.apiUrl}/getChatList`, { user_id });
  }
  getMessageList(senderemail: string, receiveremail: string) {
    return this.http.post<any>(`${this.apiUrl}/getMessages`, {
      senderemail,
      receiveremail,
    });
  }

  checkForVedioSession(client_id: string) {
    return this.http.post<any>(`${this.apiUrl}/checkForVedioSession`, {
      client_id,
    });
  }

  getBlogListClients(skip: number, limit: number) {
    console.log('service............', skip, limit);
    return this.http.post<any>(`${this.apiUrl}/getBlogListClients`, {
      skip,
      limit,
    });
  }

  getClientsTrainerDetails(email: string) {
    return this.http.post<any>(`${this.apiUrl}/getTrainerData`, { email });
  }

  addTestimonial(content: string, user_id: string) {
    console.log('add testimonai segurhbj');
    return this.http.post<any>(`${this.apiUrl}/addTestimonial`, {
      content,
      user_id,
    });
  }

  getTestimonials(trainerId: string) {
    console.log(trainerId, 'service');
    return this.http.post<any>(`${this.apiUrl}/getTestimonial`, {
      trainerId,
    });
  }

  addBackPhoto(formData: FormData) {
    console.log('blogservildjclkd');
    return this.http.post<any>(`${this.apiUrl}/addBackPhoto`, formData);
  }
  addSidePhoto(formData: FormData) {
    return this.http.post<any>(`${this.apiUrl}/addSidePhoto`, formData);
  }
  addFrontPhoto(formData: FormData) {
    return this.http.post<any>(`${this.apiUrl}/addFrontphoto`, formData);
  }
  updateProgress(updatedData: any, _id: string) {
    return this.http.post<any>(`${this.apiUrl}/updateProgress`, {
      updatedData,
      _id,
    });
  }

  bloglistSearch(query: string) {
    return this.http.post<any>(`${this.apiUrl}/bloglistSearch`, {
      query,
    });
  }
}
