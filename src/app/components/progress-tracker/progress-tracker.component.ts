import { Component, OnInit, HostListener } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as trainerAction from '../../ngrx/trainers/trainer.action';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { GetuserdataService } from '../../services/getuserdata.service';

@Component({
  selector: 'app-progress-tracker',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './progress-tracker.component.html',
  styleUrl: './progress-tracker.component.css',
})
export class ProgressTrackerComponent implements OnInit {
  progressForm: FormGroup;
  dropdownVisible = false;
  id!: string | null;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private GetuserdataService: GetuserdataService
  ) {
    this.progressForm = this.fb.group({
      currentWeight: [
        '',
        [Validators.required, Validators.min(0), Validators.max(300)],
      ],
      waist: [
        '',
        [Validators.required, Validators.min(0), Validators.max(200)],
      ],
      hips: ['', [Validators.required, Validators.min(0), Validators.max(200)]],
      chest: [
        '',
        [Validators.required, Validators.min(0), Validators.max(200)],
      ],
      arms: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      legs: ['', [Validators.required, Validators.min(0), Validators.max(150)]],
      calves: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      forearms: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      bodyFatPercentage: ['', [Validators.min(0), Validators.max(100)]],

      frontPhoto: [null],
      sidePhoto: [null],
      backPhoto: [null],
    });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  // Handle file input change
  onFileChange(event: any, field: string) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.progressForm.patchValue({
        [field]: file,
      });
    } else {
      this.toastr.error('Please upload a valid image file.');
      // alert('Please upload a valid image file.');
    }
  }

  onSubmit() {
    if (this.progressForm.valid) {
      const formData = new FormData();

      formData.append(
        'currentWeight',
        this.progressForm.get('currentWeight')?.value
      );
      formData.append('waist', this.progressForm.get('waist')?.value);
      formData.append('hips', this.progressForm.get('hips')?.value);
      formData.append('chest', this.progressForm.get('chest')?.value);
      formData.append('arms', this.progressForm.get('arms')?.value);
      formData.append('legs', this.progressForm.get('legs')?.value);
      formData.append('calves', this.progressForm.get('calves')?.value);
      formData.append('forearms', this.progressForm.get('forearms')?.value);
      formData.append(
        'bodyFatPercentage',
        this.progressForm.get('bodyFatPercentage')?.value
      );

      // Append image files to formData
      formData.append('frontPhoto', this.progressForm.get('frontPhoto')?.value);
      formData.append('sidePhoto', this.progressForm.get('sidePhoto')?.value);
      formData.append('backPhoto', this.progressForm.get('backPhoto')?.value);

      if (this.id) {
        let user_id = this.id;
        formData.append('user_id', user_id);
        this.store.dispatch(trainerAction.addProgress({ formData }));
        this.progressForm.reset();
      }
    } else {
      this.progressForm.markAllAsTouched();
      // this.toastr.error('update all details');
    }
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
    const dropdownMenu = document.getElementById(
      'dropdown-menu'
    ) as HTMLElement;
    dropdownMenu.style.display = this.dropdownVisible ? 'block' : 'none';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 500) {
      this.closeDropdown();
    }
  }

  closeDropdown() {
    this.dropdownVisible = false;
    const dropdownMenu = document.getElementById(
      'dropdown-menu'
    ) as HTMLElement;
    dropdownMenu.style.display = 'none';
  }
  calender() {
    const id = this.GetuserdataService.getUserid();
    this.router.navigate(['/clientcalender', id]);
  }
  profile() {
    let user_id = this.GetuserdataService.getUserid();
    this.router.navigate(['/clientProfile', user_id]);
  }
  workoutlist() {
    this.router.navigate(['/clientWorkoutList']);
  }
  chatsystem() {
    this.router.navigate(['/clientChat']);
  }
  videoCallSelectClient() {
    this.router.navigate(['/videoCallSelectClient']);
  }
  clientBlogList() {
    this.router.navigate(['/clientBlogList']);
  }
  ProgressTracker() {
    let user_id = this.GetuserdataService.getUserid();
    if (user_id) {
      this.router.navigate(['/ProgressTracker', user_id]);
    }
  }
  trainerslist() {
    let user_id = this.GetuserdataService.getUserid();
    if (user_id) {
      this.router.navigate(['/trainerslist', user_id]);
    }
  }
  logout() {
    this.router.navigate(['/clientLogin']);
  }
}
