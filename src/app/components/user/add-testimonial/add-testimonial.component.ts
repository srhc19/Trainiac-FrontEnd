import { Component, HostListener } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as clientAction from '../../../ngrx/clients/client.action';

import { Store } from '@ngrx/store';
import { getTestimonialData } from '../../../ngrx/clients/client.selectors';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { GetuserdataService } from '../../../services/getuserdata.service';

@Component({
  selector: 'app-add-testimonial',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-testimonial.component.html',
  styleUrl: './add-testimonial.component.css',
})
export class AddTestimonialComponent {
  myForm!: FormGroup;
  trainerData!: any;
  dropdownVisible = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store,
    private toastr: ToastrService,
    private GetuserdataService: GetuserdataService
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      textarea: ['', Validators.required],
    });
    const trainerId = this.route.snapshot.paramMap.get('id');
    if (trainerId) {
      this.store.dispatch(clientAction.getTestimonials({ trainerId }));
      this.store.select(getTestimonialData).subscribe((data) => {
        this.trainerData = data;
        console.log(this.trainerData, '.................................');
      });
    }
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      const user_id = this.GetuserdataService.getUserid();
      const content = this.myForm.value.textarea;
      if (user_id && content) {
        this.store.dispatch(clientAction.addTestimonial({ content, user_id }));
        this.myForm.reset();
      }
    } else {
      this.toastr.error('Add your review');
    }
  }

  calender() {
    const id = this.GetuserdataService.getUserid();
    this.router.navigate(['/clientcalender', id]);
  }
  profile() {
    this.router.navigate(['/clientProfile']);
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
  logout() {
    this.router.navigate(['/clientLogin']);
  }
  trainerslist() {
    this.router.navigate(['/trainerslist']);
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
}
