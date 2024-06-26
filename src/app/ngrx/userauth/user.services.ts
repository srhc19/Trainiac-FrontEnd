import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Console } from 'console';
import { Observable } from 'rxjs';
import { loginResponse, registerResponse, getUserData } from './user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class userService {
  private url = environment.apiUrl
  private apiUrl = `${this.url}`;

  constructor(private http: HttpClient) {}

  register(
    name: string,
    email: string,
    password: string,
    role: string,
    captcha: string | null
  ) {
    return this.http.post<registerResponse>(`${this.apiUrl}/user/register`, {
      name,
      email,
      password,
      role,
      captcha,
    });
  }

  login(email: string, password: string) {
    return this.http.post<loginResponse>(`${this.apiUrl}/user/login`, {
      email,
      password,
    });
  }
  getUserData(role: string, skip: Number, limit: Number) {
    return this.http.post<getUserData>(`${this.apiUrl}/user/userdata`, {
      role,
      skip,
      limit,
    });
  }

  verifyOtp(otp: number) {
    return this.http.post<any>(`${this.apiUrl}/user/verifyOtp`, { otp });
  }

  trainerList(skip: number, limit: number) {
    return this.http.post<any>(`${this.apiUrl}/user/client/trainerlist`, {
      skip,
      limit,
    });
  }

  changeUserStatus(_id: any) {
    return this.http.post<any>(`${this.apiUrl}/user/changeUserStatus`, { _id });
  }
  resendOtp() {
    return this.http.get<any>(`${this.apiUrl}/user/resendotp`);
  }

  verifyEmail(email: string) {
    console.log('verify email sfjhfbjkhbfjk');
    return this.http.post<any>(`${this.apiUrl}/user/verifyEmail`, { email });
  }

  verifyEmailOtp(otp: number) {
    console.log('verify email otp', otp);
    return this.http.post<any>(`${this.apiUrl}/user/verifyEmailOtp`, { otp });
  }

  updatePassword(newPassword: string) {
    return this.http.post<any>(`${this.apiUrl}/user/updatePassword`, {
      newPassword,
    });
  }
  getCurrentUserDetails(_id: string, skip: number, limit: number) {
    return this.http.post<any>(`${this.apiUrl}/user/getCurrentUser`, {
      _id,
      skip,
      limit,
    });
  }
  getCurrentTrainer(user_id: any) {
    return this.http.post<any>(`${this.apiUrl}/user/getCurrentTrainer`, {
      user_id,
    });
  }

  getCurrentClient(user_id: any) {
    return this.http.post<any>(`${this.apiUrl}/user/getCurrentClient`, {
      user_id,
    });
  }
  trainerlistSearch(query: string) {
    return this.http.post<any>(`${this.apiUrl}/user/trainerlistSearch`, {
      query,
    });
  }

  adminclientSearch(query: string) {
    return this.http.post<any>(`${this.apiUrl}/user/adminclientSearch`, {
      query,
    });
  }
  adminTrainerSearch(query: string) {
    return this.http.post<any>(`${this.apiUrl}/user/adminTrainerSearch`, {
      query,
    });
  }

  razorpaySuccess(payment_id: any, order_id: any) {
    console.log('razorpaySs');
    this.http.post<any>(`${this.apiUrl}/user/adminTrainerSearch`, {
      query: 'f',
    });
    // return this.http.post<any>(`${this.apiUrl}/user/razorpaySuccess`, {
    //   payment_id,
    //   order_id,
    // });
  }

  isUserBlocked(user_id: string | null) {
    return this.http.post<any>(`${this.apiUrl}/user/isUserBlocked`, {
      user_id,
    });
  }

  isUserAdmin(user_id: string | null) {
    return this.http.post<any>(`${this.apiUrl}/user/isUserAdmin`, {
      user_id,
    });
  }
}
