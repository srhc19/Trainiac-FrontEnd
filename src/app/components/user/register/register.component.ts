import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Store } from '@ngrx/store';
import * as userActions from '../../../ngrx/userauth/user.action';
import { userReducer } from '../../../ngrx/userauth/user.reducers';
import { getmessage } from '../../../ngrx/userauth/user.selectors';
// import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  captchaResolved: boolean = false;
  captchaResponse: string | null = null;
  formData = {
    name: '',
    email: '',
    password: '',
    role: 'Client',
  };
  message = '';
  applyClass = false;
  constructor(private store: Store, private router: Router) {}

  //btn loading
  isLoading: boolean = false;

  ngOnInit(): void {
    this.store.select(getmessage).subscribe((message) => {
      this.message = message;
      if (message) {
        this.applyClass = true;
      }
    });
  }
  // onCaptchaResolved(response: any): void {
  //   this.captchaResponse = response;
  //   this.captchaResolved = true;
  // }

  updateRole(event: any) {
    this.formData.role = event.target.value;
  }

  // this.captchaResolved
  onSubmit() {
    if (this.formData.name !== '' && this.formData.email !== '') {
      this.isLoading = true;
      this.store.dispatch(
        userActions.register({
          name: this.formData.name,
          email: this.formData.email,
          password: this.formData.password,
          role: this.formData.role,
          captcha: this.captchaResponse,
        })
      );

      setTimeout(() => {
        this.isLoading = false;
      }, 4000);
    }
  }

  trainerloginlink() {
    this.router.navigate(['/trainerLogin']);
  }
  clientloginlink() {
    this.router.navigate(['/clientLogin']);
  }
}
