import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as userActions from '../../ngrx/userauth/user.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-emailverificaton',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './emailverificaton.component.html',
  styleUrl: './emailverificaton.component.css',
})
export class EmailverificatonComponent implements OnInit {
  emailForm!: FormGroup;
  constructor(private fb: FormBuilder, private store: Store) {}
  //btn loading
  isLoading: boolean = false;

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  onSubmit() {
    if (this.emailForm.valid) {
      this.isLoading = true;
      const email = this.emailForm.value.email;

      this.store.dispatch(userActions.verifyEmail({ email }));
      setTimeout(() => {
        this.isLoading = false;
      }, 4000);
    }
  }
}
