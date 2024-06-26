import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as userActions from '../../../ngrx/userauth/user.action';
import { Store } from '@ngrx/store';
import { geterrormessage } from '../../../ngrx/userauth/user.selectors';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css',
})
export class LoginpageComponent implements OnInit {
  formData = {
    email: '',
    password: '',
  };

  applyClass = false;
  message = '';
  constructor(private router: Router, private store: Store) {}
  //btn loading
  isLoading: boolean = false;

  ngOnInit(): void {
    this.store.select(geterrormessage).subscribe((errorMessage) => {
      this.message = errorMessage;
      if (errorMessage) {
        this.applyClass = true;
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.formData.email !== '' && this.formData.password !== '') {
      this.isLoading = true;
      this.store.dispatch(
        userActions.login({
          email: this.formData.email,
          password: this.formData.password,
        })
      );
    }
  }
  registerlink() {
    this.router.navigate(['./register']);
  }
  Forgotpassword() {
    this.router.navigate(['/emailverification']);
  }
}
