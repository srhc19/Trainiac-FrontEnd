import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-vedio-call-input',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './vedio-call-input.component.html',
  styleUrl: './vedio-call-input.component.css',
})
export class VedioCallInputComponent implements OnInit {
  FormGroup!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.FormGroup = this.fb.group({
      link: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  OnSubmit() {
    if (this.FormGroup.valid) {
      console.log(this.FormGroup.value);
    }
  }
}
