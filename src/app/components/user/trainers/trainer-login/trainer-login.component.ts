import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as trainerActions from '../.././../../ngrx/trainers/trainer.action';

@Component({
  selector: 'app-trainer-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trainer-login.component.html',
  styleUrl: './trainer-login.component.css',
})
export class TrainerLoginComponent implements OnInit {
  formData = {
    email: '',
    password: '',
  };

  applyClass = false;
  message = '';
  constructor(private router: Router, private store: Store) {}
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
        trainerActions.trainerLogin({
          email: this.formData.email,
          password: this.formData.password,
        })
      );
      this.formData = {
        email: '',
        password: '',
      };
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }
  }
  registerlink() {
    this.router.navigate(['./register']);
  }
  Forgotpassword() {
    this.router.navigate(['/emailverification']);
  }
  trainerLogin() {
    this.router.navigate(['/clientLogin']);
  }
}
