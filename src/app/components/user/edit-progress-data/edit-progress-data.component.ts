import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getprogressDetails } from '../../../ngrx/trainers/trainer.selectors';
import * as trainerAction from '../../../ngrx/trainers/trainer.action';
import * as clientAction from '../../../ngrx/clients/client.action';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { firstValueFrom, forkJoin, switchMap, take } from 'rxjs';
import { FileUploadServiceService } from '../../../services/file-upload-service.service';
import {
  getBackPhotoUrl,
  getFrontPhotoUrl,
  getSidePhotoUrl,
} from '../../../ngrx/clients/client.selectors';
import { GetuserdataService } from '../../../services/getuserdata.service';
interface Stat {
  key: string;
  label: string;
  min: number;
  max: number;
}

@Component({
  selector: 'app-edit-progress-data',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-progress-data.component.html',
  styleUrl: './edit-progress-data.component.css',
})
export class EditProgressDataComponent implements OnInit {
  detailsForm: FormGroup;
  tempFiles: { [key: string]: File } = {};
  backPhoto!: string;
  sidePhoto!: string;
  frontPhoto!: string;
  dropdownVisible = false;
  stats: Stat[] = [
    { key: 'currentWeight', label: 'Current Weight', min: 0, max: 300 },
    { key: 'waist', label: 'Waist', min: 0, max: 60 },
    { key: 'hips', label: 'Hips', min: 0, max: 60 },
    { key: 'chest', label: 'Chest', min: 0, max: 60 },
    { key: 'arms', label: 'Arms', min: 0, max: 24 },
    { key: 'legs', label: 'Legs', min: 0, max: 36 },
    { key: 'calves', label: 'Calves', min: 0, max: 24 },
    { key: 'forearms', label: 'Forearms', min: 0, max: 20 },
    {
      key: 'bodyFatPercentage',
      label: 'Body Fat Percentage',
      min: 0,
      max: 50,
    },
  ];
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store,
    private fileUploadService: FileUploadServiceService,
    private router: Router,
    private GetuserdataService: GetuserdataService
  ) {
    // Initialize the form group
    this.detailsForm = this.fb.group({
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
      legs: ['', [Validators.required, Validators.min(0), Validators.max(200)]],
      calves: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      forearms: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      bodyFatPercentage: [
        '',
        [Validators.required, Validators.min(0), Validators.max(50)],
      ],
      frontPhoto: [''],
      sidePhoto: [''],
      backPhoto: [''],
      createdAt: [''],
    });
  }

  ngOnInit(): void {
    let _id = this.route.snapshot.paramMap.get('id');
    if (_id) {
      this.store.dispatch(trainerAction.getprogressDetails({ _id }));
      this.store.select(getprogressDetails).subscribe((data) => {
        this.detailsForm.patchValue(data); // Update the form values with the fetched data
      });
    }
  }

  onFileChange(event: any, field: string): void {
    const file = event.target.files[0];
    if (file) {
      if (field === 'backPhoto') {
        const formData = new FormData();
        formData.append('backPhoto', file);
        this.store.dispatch(clientAction.addBackPhoto({ formData }));
      } else if (field === 'sidePhoto') {
        const formData = new FormData();
        formData.append('sidePhoto', file);
        this.store.dispatch(clientAction.addSidePhoto({ formData }));
      } else if (field === 'frontPhoto') {
        const formData = new FormData();
        formData.append('frontPhoto', file);
        this.store.dispatch(clientAction.addFrontPhoto({ formData }));
      }
    }
  }
  async onSubmit(): Promise<void> {
    try {
      const backPhotoUrl = await firstValueFrom(
        this.store.select(getBackPhotoUrl)
      );
      const sidePhotoUrl = await firstValueFrom(
        this.store.select(getSidePhotoUrl)
      );
      const frontPhotoUrl = await firstValueFrom(
        this.store.select(getFrontPhotoUrl)
      );

      this.backPhoto = backPhotoUrl;
      this.sidePhoto = sidePhotoUrl;
      this.frontPhoto = frontPhotoUrl;

      if (this.backPhoto) {
        this.detailsForm.value.backPhoto = this.backPhoto;
      }
      if (this.sidePhoto) {
        this.detailsForm.value.sidePhoto = this.sidePhoto;
      }
      if (this.frontPhoto) {
        this.detailsForm.value.frontPhoto = this.frontPhoto;
      }
      let _id = this.route.snapshot.paramMap.get('id');
      let updatedData = this.detailsForm.value;
      if (_id) {
        this.store.dispatch(clientAction.updateProgress({ updatedData, _id }));
      }
    } catch (error) {
      console.error('Error retrieving photo URLs:', error);
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
  trainerProfile(id: string) {
    this.router.navigate(['/trainerprofile', id]);
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
