import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as trainerAction from '../../../../ngrx/trainers/trainer.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-addnew-client',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addnew-client.component.html',
  styleUrl: './addnew-client.component.css',
})
export class AddnewClientComponent implements OnInit {
  clientForm!: FormGroup;
  initialValue = {
    clientName: '',
    email: '',
  };
  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      clientName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      console.log(this.clientForm.value);
      let clientName = this.clientForm.value.clientName;
      let clientEmail = this.clientForm.value.email;
      let trainerid = localStorage.getItem('user_id');

      if (trainerid) {
        this.store.dispatch(
          trainerAction.addnewClient({ trainerid, clientName, clientEmail })
        );
        this.clientForm.reset(this.initialValue);
      }
    }
  }
}
