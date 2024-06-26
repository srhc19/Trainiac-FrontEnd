import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class GetuserdataService {
  token = localStorage.getItem('AccessToken');
  constructor() {}
  //
  // username: name,
  // isAdmin: isAdmin,
  // user_id: id,
  // useremail: email,
  getUserid() {
    if (this.token) {
      const decodedToken: any = jwtDecode(this.token);
      const { user_id } = decodedToken;
      return user_id;
    }
  }
  getEmail() {
    if (this.token) {
      const decodedToken: any = jwtDecode(this.token);
      const { useremail } = decodedToken;
      return useremail;
    }
  }
}
