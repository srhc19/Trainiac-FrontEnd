import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { onInitEffects } from '@ngrx/effects/src/lifecycle_hooks';
import * as userActions from '../../ngrx/userauth/user.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css',
})
export class ForgotpasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}
  //btn loading
  isLoading: boolean = false;
  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      newPassword: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      confirmNewPassword: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          this.confirmPasswordValidator.bind(this),
        ]),
      ],
    });
  }

  confirmPasswordValidator(
    control: FormGroup
  ): { [s: string]: boolean } | null {
    if (!control.parent || !control) {
      return null;
    }
    const newPassword = control.parent.get('newPassword')?.value;
    const confirmPassword = control.value;

    if (newPassword !== confirmPassword) {
      return { passwordsDontMatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      this.isLoading = true;

      let newPassword = this.changePasswordForm.value.confirmNewPassword;

      this.store.dispatch(userActions.updatepassword({ newPassword }));
    }
  }
}
