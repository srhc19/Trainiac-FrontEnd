import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import * as trainerActions from '../../../../ngrx/trainers/trainer.action';
import { Store } from '@ngrx/store';
import { getlistOfClients } from '../../../../ngrx/trainers/trainer.selectors';
import { Client } from '../../../../ngrx/trainers/trainer.interface';
import { CommonModule } from '@angular/common';
import { GetuserdataService } from '../../../../services/getuserdata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cardio-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cardio-modal.component.html',
  styleUrl: './cardio-modal.component.css',
})
export class CardioModalComponent implements OnInit {
  cardioForm!: FormGroup;
  clientlist!: Array<Client>;
  @Input() selectedClient!: string;
  @Output() closemodal: EventEmitter<void> = new EventEmitter<void>();

  initialValue = {
    clientEmail: '',
    workoutDate: '',
    activity: '',
    intensity: '',
    duration: '',
  };

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private GetuserdataService: GetuserdataService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    this.cardioForm = this.fb.group({
      clientEmail: ['', Validators.required],
      workoutDate: ['', Validators.required],
      activity: ['', Validators.required],
      intensity: ['', Validators.required],
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

  closeModalClick() {
    this.closemodal.emit();
  }
  addCardioWorkout() {
    if (this.cardioForm.valid) {
      let workoutDate = this.cardioForm.value.workoutDate;
      let activity = this.cardioForm.value.activity;
      let intensity = this.cardioForm.value.intensity;
      let duration = this.cardioForm.value.duration;
      let clientemail = this.cardioForm.value.clientEmail;
      let trainerid = this.GetuserdataService.getUserid();
      console.log(this.cardioForm.value);

      if (trainerid) {
        this.store.dispatch(
          trainerActions.addCardioWorkout({
            trainerid,
            clientemail,
            workoutDate,
            activity,
            intensity,
            duration,
          })
        );
        this.cardioForm.reset(this.initialValue);
      }
    }
  }
}
