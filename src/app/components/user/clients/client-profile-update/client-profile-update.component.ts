import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as clientActions from '../../../../ngrx/clients/client.action';
import { log } from 'console';
import { trainerService } from '../../../../ngrx/trainers/trainer.services';
import {
  getClientDetails,
  getTrainerDetails,
} from '../../../../ngrx/userauth/user.selectors';
import * as userActions from '../../../../ngrx/userauth/user.action';
import { ToastrService } from 'ngx-toastr';
import { GetuserdataService } from '../../../../services/getuserdata.service';
@Component({
  selector: 'app-client-profile-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-profile-update.component.html',
  styleUrl: './client-profile-update.component.css',
})
export class ClientProfileUpdateComponent {
  profileForm!: FormGroup;
  clientData!: any;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private trainerService: trainerService,
    private store: Store,
    private toastr: ToastrService,
    private GetuserdataService: GetuserdataService
  ) {}

  ngOnInit(): void {
    let user_id = this.GetuserdataService.getUserid();
    this.store.dispatch(userActions.getCurrentClient({ user_id }));

    this.store.select(getClientDetails).subscribe((data) => {
      if (data) {
        this.clientData = data;
        console.log(this.clientData, 'clientdata');

        // Initialize form values with received data
        this.profileForm.patchValue({
          name: this.clientData.name,
          bio: this.clientData.Bio,
          description: this.clientData.description,
        });

        const goalsArray = this.profileForm.get('goals') as FormArray;
        this.clientData.goals.forEach((goal: string) => {
          console.log('hry');
          goalsArray.push(this.formBuilder.group({ goal }));
        });
      }
    });
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      bio: ['', Validators.required],
      goals: this.formBuilder.array([]),
      profileImage: [''],
      bannerImage: [''],

      description: ['', [Validators.maxLength(1000), Validators.required]],
    });
  }

  get goals() {
    return this.profileForm.get('goals') as FormArray;
  }

  addGoal() {
    const goalGroup = this.formBuilder.group({
      goal: ['', Validators.required],
    });
    this.goals.push(goalGroup);
  }

  removeGoal(index: number) {
    this.goals.removeAt(index);
  }

  // onProfileImageSelected(event: any): void {
  //   const file = event.target.files[0];
  //   this.profileForm.patchValue({
  //     profileImage: file,
  //   });
  // }

  // onBannerImageSelected(event: any): void {
  //   const file = event.target.files[0];
  //   this.profileForm.patchValue({
  //     bannerImage: file,
  //   });
  // }
  onProfileImageSelected(event: any): void {
    const file = event.target.files[0];
    if (this.isValidImageFile(file)) {
      this.profileForm.patchValue({
        profileImage: file,
      });
    } else {
      alert('Invalid file type. Please select an image file.');
    }
  }

  onBannerImageSelected(event: any): void {
    const file = event.target.files[0];
    if (this.isValidImageFile(file)) {
      this.profileForm.patchValue({
        bannerImage: file,
      });
    } else {
      alert('Invalid file type. Please select an image file.');
    }
  }

  isValidImageFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedTypes.includes(file.type);
  }
  onSubmit() {
    if (this.profileForm.valid) {
      this.isLoading = true;
      console.log(this.profileForm.value);
      const name = this.profileForm.get('name')?.value;
      const bio = this.profileForm.get('bio')?.value;
      const description = this.profileForm.get('description')?.value;
      const profileImage = this.profileForm.get('profileImage')?.value;
      const bannerImage = this.profileForm.get('bannerImage')?.value;

      // const goals = this.profileForm.value.goals;
      const clientid = this.GetuserdataService.getUserid();

      const formData = new FormData();
      if (clientid) {
        formData.append('clientid', clientid);
      }
      formData.append('name', name);
      formData.append('bio', bio);
      formData.append('description', description);
      if (profileImage && profileImage !== '') {
        formData.append('profileImage', profileImage);
      }
      if (bannerImage && bannerImage !== '') {
        formData.append('bannerImage', bannerImage);
      }

      const goals = this.profileForm.value.goals;
      formData.append('goals', JSON.stringify(goals));

      this.store.dispatch(clientActions.updateClientProfile({ formData }));
    } else {
      this.profileForm.markAllAsTouched();
      this.toastr.error('update all details');
    }
  }

  get form() {
    return this.profileForm.controls;
  }

  removeProfileImage() {}
  removeBannerImage() {}
  removeCertificateImage(certImage: any) {}
}
// I am a 20-year-old professional working in a fast-paced corporate environment. Despite my busy schedule, I prioritize my health and fitness. I enjoy various physical activities, including running, weightlifting, and yoga. My fitness goals are to improve my endurance, build lean muscle mass, and enhance my overall well-being. I am seeking a knowledgeable and supportive trainer who can help me design a personalized workout routine and provide guidance on nutrition to achieve my goals effectively.
