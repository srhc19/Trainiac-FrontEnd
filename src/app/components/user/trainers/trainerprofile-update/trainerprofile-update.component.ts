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
import * as trainerActions from '../../../../ngrx/trainers/trainer.action';
import { log } from 'console';
import { trainerService } from '../../../../ngrx/trainers/trainer.services';
import { getTrainerDetails } from '../../../../ngrx/userauth/user.selectors';
import * as userActions from '../../../../ngrx/userauth/user.action';
import * as trainerAction from '../../../../ngrx/trainers/trainer.action';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetuserdataService } from '../../../../services/getuserdata.service';

@Component({
  selector: 'app-trainerprofile-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './trainerprofile-update.component.html',
  styleUrl: './trainerprofile-update.component.css',
})
export class TrainerprofileUpdateComponent implements OnInit {
  profileForm!: FormGroup;
  trainerData!: any;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private trainerService: trainerService,
    private store: Store,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private GetuserdataService: GetuserdataService
  ) {}

  ngOnInit(): void {
    // const user_id = this.route.snapshot.paramMap.get('id');
    const user_id = this.GetuserdataService.getUserid();
    this.store.dispatch(userActions.getCurrentTrainer({ user_id }));
    this.store.select(getTrainerDetails).subscribe((data) => {
      if (data) {
        this.trainerData = data;
        console.log(this.trainerData, 'trainerdata......');

        // Initialize form values with received data
        this.profileForm.patchValue({
          name: this.trainerData.name,
          bio: this.trainerData.Bio,
          description: this.trainerData.description,
        });

        const skillsArray = this.profileForm.get('skills') as FormArray;
        this.trainerData.skills.forEach((skill: string) => {
          skillsArray.push(this.formBuilder.group({ skill }));
        });
      }
    });

    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      bio: ['', Validators.required],
      skills: this.formBuilder.array([]),
      profileImage: [''],
      bannerImage: [''],
      certificateImages: this.formBuilder.array([]),
      description: ['', Validators.maxLength(1000)],
    });

    const id = this.GetuserdataService.getUserid();
    if (id) {
      const checkIfClient = this.store.dispatch(
        trainerAction.checkIfClient({ id })
      );
    }
  }

  get skills() {
    return this.profileForm.get('skills') as FormArray;
  }

  addSkill() {
    const skillGroup = this.formBuilder.group({
      skill: ['', Validators.required],
    });
    this.skills.push(skillGroup);
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
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

  // onCertificateImagesSelected(event: any): void {
  //   const files = event.target.files;
  //   if (files && files.length) {
  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i];
  //       this.certificateImagesArray.push(this.formBuilder.control(file));
  //     }
  //   }
  // }
  onProfileImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file && this.isValidImageFile(file)) {
      this.profileForm.patchValue({
        profileImage: file,
      });
    } else {
      // Handle invalid file type
      console.error('Invalid file type. Please select an image.');
    }
  }

  onBannerImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file && this.isValidImageFile(file)) {
      this.profileForm.patchValue({
        bannerImage: file,
      });
    } else {
      // Handle invalid file type
      console.error('Invalid file type. Please select an image.');
    }
  }

  onCertificateImagesSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (this.isValidImageFile(file)) {
          this.certificateImagesArray.push(this.formBuilder.control(file));
        } else {
          // Handle invalid file type
          console.error('Invalid file type. Please select an image.');
        }
      }
    }
  }
  isValidImageFile(file: File): boolean {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return validImageTypes.includes(file.type);
  }
  get certificateImagesArray(): FormArray {
    return this.profileForm.get('certificateImages') as FormArray;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.isLoading = true;
      const name = this.profileForm.get('name')?.value;
      const bio = this.profileForm.get('bio')?.value;
      const description = this.profileForm.get('description')?.value;
      const profileImage = this.profileForm.get('profileImage')?.value;
      const bannerImage = this.profileForm.get('bannerImage')?.value;
      const certificateImages =
        this.profileForm.get('certificateImages')?.value;
      // const skills = this.profileForm.value.skills;
      const trainerid = this.GetuserdataService.getUserid();

      const formData = new FormData();
      if (trainerid) {
        formData.append('trainerid', trainerid);
      }
      formData.append('name', name);
      formData.append('bio', bio);
      formData.append('description', description);
      if (profileImage) {
        formData.append('profileImage', profileImage); // Assuming profileImage is a File object
      }
      if (bannerImage) {
        formData.append('bannerImage', bannerImage); // Assuming bannerImage is a File object
      }

      if (certificateImages && certificateImages.length > 0) {
        certificateImages.forEach((certificateImage: File) => {
          formData.append('certificateImages', certificateImage);
        });
      }
      // skills.forEach((skill: string) => {
      //   formData.append('skills', skill);
      // });
      const skills = this.profileForm.value.skills;
      formData.append('skills', JSON.stringify(skills));

      // this.trainerService.updateTrainerProfile(formData);

      this.store.dispatch(trainerActions.updateTrainerProfile({ formData }));
    } else {
      this.profileForm.markAllAsTouched();
      this.toastr.error('update all details');
    }
  }

  get form() {
    return this.profileForm.controls;
  }

  // removeProfileImage() {}
  // removeBannerImage() {}
  removeCertificateImage(certImage: any) {
    const user_id = this.GetuserdataService.getUserid();
    if (user_id) {
      this.store.dispatch(
        trainerAction.removeCertificateImages({ certImage, user_id })
      );

      this.store.dispatch(userActions.getCurrentTrainer({ user_id }));
      this.store.select(getTrainerDetails).subscribe((data) => {
        this.trainerData = data;
      });
    }
  }
}
