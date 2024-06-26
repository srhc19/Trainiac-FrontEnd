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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-email-verification-otp',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './email-verification-otp.component.html',
  styleUrl: './email-verification-otp.component.css',
})
export class EmailVerificationOtpComponent {
  otpForm!: FormGroup;
  timer: number = 60;
  timerInterval: any;
  // message: string = '';
  applyClass = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private toastr: ToastrService
  ) {}
  //btn loading
  isLoading: boolean = false;
  ngOnInit(): void {
    this.otpForm = this.fb.group({
      otp: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.pattern('^[0-9]*$'),
        ],
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
        this.toastr.error('Time Limit has been Expired,Try Resend Otp ');

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
      this.store.dispatch(userActions.verifyEmailOtp({ otp }));
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    }
  }

  resendOTP() {
    if (this.timer <= 0) {
      this.isLoading = false;
      this.timer = 60;

      // this.getotp();
      this.startTimer();
      this.otpForm.enable();
      this.otpForm.get('otp')?.setValue('');
      this.store.dispatch(userActions.verifyResendOtp());
    }
  }
}
