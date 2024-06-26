import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as userActions from '../../ngrx/userauth/user.action';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { getmessage } from '../../ngrx/userauth/user.selectors';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css',
})
export class OtpComponent implements OnInit {
  otpForm!: FormGroup;
  timer: number = 60;
  timerInterval: any;
  message: string = '';
  applyClass: boolean = false;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.otpForm = this.fb.group({
      otp: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
    });

    this.startTimer();
  }
  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.timerInterval);
        this.message = 'Time Limit has been Expired,Try Resend Otp ';
        this.applyClass = true;
        // this.otpForm.disable();
      }
    }, 1000);
  }

  onSubmit() {
    if (this.otpForm.valid) {
      this.isLoading = true;
      console.log('Submitting OTP:', this.otpForm.value.otp);
      let otp = this.otpForm.value.otp;
      this.store.dispatch(userActions.verifyOtp({ otp }));
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    }
  }

  resendOTP() {
   if(this.timer <= 0){
    this.timer = 60;
  
    this.message = '';
    this.isLoading = false;
    this.startTimer();
    this.otpForm.enable();
    this.otpForm.get('otp')?.setValue('');
    this.store.dispatch(userActions.resendOtp());
   }
  }
}
