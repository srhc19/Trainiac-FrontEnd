import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { getlistOfClients } from '../../../../ngrx/trainers/trainer.selectors';
import * as trainerActions from '../../../../ngrx/trainers/trainer.action';
import { Client, exercises } from '../../../../ngrx/trainers/trainer.interface';
import { GetuserdataService } from '../../../../services/getuserdata.service';

@Component({
  selector: 'app-gym-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './gym-modal.component.html',
  styleUrl: './gym-modal.component.css',
})
export class GymModalComponent implements OnInit {
  gymForm!: FormGroup;
  clientlist!: Client[];
  initialValue = {
    targetMuscleGroup: '',
    clientEmail: '',
    workoutDate: '',
    exercises: [],
  };
  @Output() closemodal: EventEmitter<void> = new EventEmitter<void>();
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private GetuserdataService: GetuserdataService
  ) {}
  ngOnInit() {
    this.gymForm = this.fb.group({
      targetMuscleGroup: ['', Validators.required],
      clientEmail: ['', Validators.required],
      workoutDate: ['', Validators.required],
      exercises: this.fb.array([]),
    });

    let trainerid = this.GetuserdataService.getUserid();
    if (trainerid) {
      let getclientlist = this.store.dispatch(
        trainerActions.getClientList({ trainerid })
      );
      this.store.select(getlistOfClients).subscribe((list) => {
        this.clientlist = list;
        console.log(this.clientlist, 'cardiomodal');
      });
    }
  }

  get exercises(): FormArray {
    return this.gymForm.get('exercises') as FormArray;
  }

  addExercise() {
    this.exercises.push(
      this.fb.group({
        name: ['', Validators.required],
        sets: ['', [Validators.required, Validators.min(0)]],
        reps: ['', [Validators.required, Validators.min(0)]],
        weight: '',
      })
    );
  }

  removeExercise(index: number) {
    this.exercises.removeAt(index);
  }

  addGymWorkout() {
    console.log(this.gymForm.value);
    if (this.gymForm.valid) {
      let clientEmail: string = this.gymForm.value.clientEmail;
      let exercises: Array<exercises> = this.gymForm.value.exercises;
      let targetMuscleGroup: string = this.gymForm.value.targetMuscleGroup;
      let workoutDate: string = this.gymForm.value.workoutDate;

      this.store.dispatch(
        trainerActions.addGymWorkout({
          clientEmail,
          exercises,
          targetMuscleGroup,
          workoutDate,
        })
      );
      this.gymForm.reset(this.initialValue);
    }
  }

  closeModalClick() {
    this.closemodal.emit();
  }
}
