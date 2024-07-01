import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Console } from 'console';
import { Observable } from 'rxjs';
import {
  Blog,
  addnewClientInterface,
  exercises,
  listofclientinterface,
} from './trainer.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class trainerService {
  private url = environment.apiUrl;
  private apiUrl = `${this.url}/user/trainer`;

  constructor(private http: HttpClient) {}

  addnewClient(trainerid: string, clientName: string, clientEmail: string) {
    return this.http.post<addnewClientInterface>(
      `${this.apiUrl}/addnewClient`,
      {
        trainerid,
        clientName,
        clientEmail,
      }
    );
  }

  getClientList(trainerid: string) {
    return this.http.post<listofclientinterface>(
      `${this.apiUrl}/getClientList`,
      { trainerid }
    );
  }
  addCardioWorkout(
    trainerid: string,
    clientemail: string,
    workoutDate: Date,
    activity: string,
    intensity: string,
    duration: string
  ) {
    return this.http.post<any>(`${this.apiUrl}/addCardioWorkout`, {
      trainerid,
      clientemail,
      workoutDate,
      activity,
      intensity,
      duration,
    });
  }

  addGymWorkout(
    clientEmail: string,
    exercises: Array<exercises>,
    targetMuscleGroup: string,
    workoutDate: string
  ) {
    return this.http.post<any>(`${this.apiUrl}/addGymWorkout`, {
      clientEmail,
      exercises,
      targetMuscleGroup,
      workoutDate,
    });
  }
  addYogaWorkout(
    clientEmail: string,
    workoutDate: string,
    activity: string,
    duration: string
  ) {
    return this.http.post<any>(`${this.apiUrl}/addyogaWorkout`, {
      clientEmail,
      workoutDate,
      activity,
      duration,
    });
  }
  updateTrainerProfile(formData: any) {
    return this.http.post<any>(`${this.apiUrl}/updateTrainerProfile`, formData);
  }

  trainerlogin(email: string, password: string) {
    console.log('trainer login');
    return this.http.post<any>(`${this.apiUrl}/trainerlogin`, {
      email,
      password,
    });
  }

  getChatListTrainer(user_id: string) {
    console.log('get chat list service in trainer');
    return this.http.post<any>(`${this.apiUrl}/getChatListTrainer`, {
      user_id,
    });
  }
  getMessageListTrainer(senderemail: string, receiveremail: string) {
    console.log('get MEssages');
    return this.http.post<any>(`${this.apiUrl}/getMessagesTrainer`, {
      senderemail,
      receiveremail,
    });
  }
  startVedioSession(
    vedioSessionClientsId: string[],
    trainer_id: string,
    randomid: any
  ) {
    return this.http.post<any>(`${this.apiUrl}/startVedioSession`, {
      vedioSessionClientsId,
      trainer_id,
      randomid,
    });
  }
  getCurrentVedioCallId(trainer_Id: string) {
    return this.http.post<any>(`${this.apiUrl}/getCurrentVedioCallId`, {
      trainer_Id,
    });
  }

  checkIfTrainer(trainer_Id: string) {
    return this.http.post<any>(`${this.apiUrl}/checkIfTrainer`, {
      trainer_Id,
    });
  }
  updateSession(randomId: string, trainer_Id: string) {
    return this.http.post<any>(`${this.apiUrl}/updateSession`, {
      randomId,
    });
  }

  removeWorkout(formattedDate: string, user_id: string) {
    return this.http.post<any>(`${this.apiUrl}/removeWorkout`, {
      formattedDate,
      user_id,
    });
  }

  addBlog(formData: any) {
    console.log(formData, 'service');
    return this.http.post<any>(`${this.apiUrl}/addBlog`, formData);
  }
  getBlogDetails(skip: number, limit: number) {
    return this.http.post<any>(`${this.apiUrl}/getBlogDetails`, {
      skip,
      limit,
    });
  }

  viewBlogContent(_id: string) {
    return this.http.post<any>(`${this.apiUrl}/viewBlogContent`, {
      _id,
    });
  }

  publishBlog(_id: string) {
    return this.http.post<any>(`${this.apiUrl}/publishBlog`, {
      _id,
    });
  }
  cancelBlog(_id: string, note: string) {
    return this.http.post<any>(`${this.apiUrl}/cancelBlog`, {
      _id,
      note,
    });
  }

  currentTrainerBlogList(user_id: string, skip: number, limit: number) {
    return this.http.post<any>(`${this.apiUrl}/currentTrainerBlogList`, {
      user_id,
      skip,
      limit,
    });
  }
  addProgress(formData: FormData) {
    return this.http.post<any>(`${this.apiUrl}/addProgress`, formData);
  }

  getProgressData(user_id: string) {
    return this.http.post<any>(`${this.apiUrl}/getProgressData`, { user_id });
  }

  getprogressDetails(_id: string) {
    return this.http.post<any>(`${this.apiUrl}/getprogressDetails`, {
      _id,
    });
  }
  getSessionList() {
    return this.http.get<any>(`${this.apiUrl}/getSessionList`);
  }
  checkIfClient(id: string) {
    return this.http.post<any>(`${this.apiUrl}/checkIfClient`, { id });
  }

  // addBackphoto(formData: FormData) {}
  adminBlogSearch(query: string) {
    return this.http.post<any>(`${this.apiUrl}/adminBlogSearch`, { query });
  }
  adminSessionSearch(query: string) {
    return this.http.post<any>(`${this.apiUrl}/adminSessionSearch`, { query });
  }
  getPaymentData(limit = 10, skip = 0) {
    return this.http.post<any>(`${this.apiUrl}/getPaymentData`, {
      limit,
      skip,
    });
  }
  removeCertificateImages(certImage: string, user_id: string) {
    return this.http.post<any>(`${this.apiUrl}/removeCertificateImages`, {
      certImage,
      user_id,
    });
  }
  sendRequestTrainer(client_id: string, trainer_id: string) {
    return this.http.post<any>(`${this.apiUrl}/sendRequestTrainer`, {
      client_id,
      trainer_id,
    });
  }
  getclientsRequest(user_id: string) {
    return this.http.post<any>(`${this.apiUrl}/getClientsRequest`, {
      user_id,
    });
  }
  acceptClientRequest(client_id: string, trainer_id: string) {
    return this.http.post<any>(`${this.apiUrl}/acceptClientsRequest`, {
      client_id,
      trainer_id,
    });
  }
  removeClientRequest(client_id: string, trainer_id: string) {
    return this.http.post<any>(`${this.apiUrl}/removeClientsRequest`, {
      client_id,
      trainer_id,
    });
  }
  clientRequestSearch(query: string) {
    return this.http.post<any>(`${this.apiUrl}/clientRequestSearch`, {
      query,
    });
  }
  messageReciversImg(receiveremail: string) {
    return this.http.post<any>(`${this.apiUrl}/messageReciversImg`, {
      receiveremail,
    });
  }
  addMessageList(receivers_id: string, currentuser_id: string) {
    return this.http.post<any>(`${this.apiUrl}/addMessageList`, {
      receivers_id,
      currentuser_id,
    });
  }
  getMessageSearchResult(text: string, user_id: string) {
    return this.http.post<any>(`${this.apiUrl}/getMessageSearchResult`, {
      text,
      user_id,
    });
  }
}
