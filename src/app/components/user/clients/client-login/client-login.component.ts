import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as clientActions from '../../../../ngrx/clients/client.action';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-client-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-login.component.html',
  styleUrl: './client-login.component.css',
})
export class ClientLoginComponent {
  user: SocialUser | undefined;
  loggedIn: boolean | undefined;
  formData = {
    email: '',
    password: '',
  };

  applyClass = false;
  message = '';
  constructor(
    private router: Router,
    private store: Store,
    private authService: SocialAuthService
  ) {}
  // btn loading
  isLoading: boolean = false;

  ngOnInit(): void {
    // this.store.select(geterrormessage).subscribe((errorMessage) => {
    //   this.message = errorMessage;
    //   if (errorMessage) {
    //     this.applyClass = true;
    //     this.isLoading = false;
    //   }
    // });
  }

  onSubmit() {
    if (this.formData.email !== '' && this.formData.password !== '') {
      this.isLoading = true;
      this.store.dispatch(
        clientActions.clientLogin({
          email: this.formData.email,
          password: this.formData.password,
        })
      );
    }
    this.formData = {
      email: '',
      password: '',
    };
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  registerlink() {
    this.router.navigate(['./register']);
  }
  Forgotpassword() {
    this.router.navigate(['/emailverification']);
  }
  trainerLogin() {
    this.router.navigate(['/trainerLogin']);
  }
}
