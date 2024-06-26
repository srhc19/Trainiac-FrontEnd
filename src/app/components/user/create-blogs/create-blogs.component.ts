import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavlinksComponent } from '../../navlinks/navlinks.component';
import * as trainerActions from '../../../ngrx/trainers/trainer.action';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetuserdataService } from '../../../services/getuserdata.service';

@Component({
  selector: 'app-create-blogs',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NavlinksComponent],
  templateUrl: './create-blogs.component.html',
  styleUrl: './create-blogs.component.css',
})
export class CreateBlogsComponent implements OnInit {
  selectedFile!: File;
  blogForm!: FormGroup;
  isFileValid: boolean = false;
  errorMessage: string = '';
  imageDimensions: { width: number; height: number } | null = null;
  dropdownVisible = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private toastr: ToastrService,
    private GetuserdataService: GetuserdataService
  ) {}

  get paragraphs(): FormArray {
    return this.blogForm.get('content.paragraphs') as FormArray;
  }

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      author: ['', [Validators.required, Validators.maxLength(15)]],
      content: this.fb.group({
        paragraphs: this.fb.array([this.fb.control('', Validators.required)]),
      }),
    });
  }

  addParagraph(): void {
    this.paragraphs.push(this.fb.control('', Validators.required));
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const width = img.width;
        const height = img.width;
        this.imageDimensions = { width, height };
        if (width >= 2560 && height >= 1440) {
          this.isFileValid = true;
          this.errorMessage = '';
          this.selectedFile = file;
        } else {
          this.isFileValid = false;
          this.errorMessage =
            'Invalid image dimensions. Please upload a 2560x1440 image.';
        }
      };
    }
  }

  onSubmit(): void {
    if (this.blogForm.valid && this.isFileValid) {
      const blogDetails = this.blogForm.value;
      const user_id = this.GetuserdataService.getUserid();

      if (user_id) {
        blogDetails.user_id = user_id;
      }

      const formData = new FormData();
      formData.append('blogDetails', JSON.stringify(blogDetails));
      formData.append('image', this.selectedFile);

      console.log('Selected file:', this.selectedFile);
      console.log('Blog details:', blogDetails);

      // Dispatch the action with formData
      this.store.dispatch(trainerActions.addBlog({ formData }));
      this.blogForm.reset();
    } else {
      this.blogForm.markAllAsTouched();
      this.toastr.error('update all details');
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
}
