import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Client } from '../../../../ngrx/trainers/trainer.interface';
import { Store } from '@ngrx/store';
import * as trainerActions from '../../../../ngrx/trainers/trainer.action';
import { getlistOfClients } from '../../../../ngrx/trainers/trainer.selectors';
import { GetuserdataService } from '../../../../services/getuserdata.service';

@Component({
  selector: 'app-yoga-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './yoga-modal.component.html',
  styleUrl: './yoga-modal.component.css',
})
export class YogaModalComponent {
  yogaForm!: FormGroup;
  clientlist!: Client[];
  initialValue = {
    clientEmail: '',
    workoutDate: '',
    activity: '',
    duration: '',
  };
  @Output() closemodal: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private GetuserdataService: GetuserdataService
  ) {}

  ngOnInit() {
    this.yogaForm = this.fb.group({
      clientEmail: ['', Validators.required],
      workoutDate: ['', Validators.required],
      activity: ['', Validators.required],
      duration: [
        '',
        [Validators.required, Validators.min(0), Validators.max(180)],
      ],
    });
    let trainerid = this.GetuserdataService.getUserid();
    if (trainerid) {
      let getclientlist = this.store.dispatch(
        trainerActions.getClientList({ trainerid })
      );
      this.store.select(getlistOfClients).subscribe((list) => {
        this.clientlist = list;
      });
    }
  }

  addYogaWorkout() {
    if (this.yogaForm.valid) {
      let clientEmail = this.yogaForm.value.clientEmail;
      let workoutDate = this.yogaForm.value.workoutDate;
      let activity = this.yogaForm.value.activity;
      let duration = this.yogaForm.value.duration;
      this.store.dispatch(
        trainerActions.addYogaWorkout({
          clientEmail,
          workoutDate,
          activity,
          duration,
        })
      );
      this.yogaForm.reset(this.initialValue);
    }
  }
  closeModalClick() {
    this.closemodal.emit();
  }
}
