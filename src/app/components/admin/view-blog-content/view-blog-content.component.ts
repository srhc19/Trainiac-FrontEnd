import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as trainerAction from '../../../ngrx/trainers/trainer.action';
import { Store } from '@ngrx/store';
import { getBlogContent } from '../../../ngrx/trainers/trainer.selectors';
import { Blog } from '../../../ngrx/trainers/trainer.interface';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-blog-content',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './view-blog-content.component.html',
  styleUrl: './view-blog-content.component.css',
})
export class ViewBlogContentComponent implements OnInit {
  cancelForm!: FormGroup;
  id!: string | null;
  isNavHidden: boolean = true;
  blogContent!: Blog;
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const paramMap = this.route.snapshot.paramMap;
    const _id = paramMap.get('id');
    // this.toaster.success('hellooooooooo');

    if (_id) {
      this.store.dispatch(trainerAction.viewBlogContent({ _id }));
      this.store.select(getBlogContent).subscribe((data) => {
        this.blogContent = data;
      });
    }

    this.cancelForm = this.fb.group({
      textarea: ['', Validators.required],
    });
  }
  toggleNav() {
    this.isNavHidden = !this.isNavHidden;
  }
  publish(_id: string | null) {
    if (_id) {
      this.store.dispatch(trainerAction.publishBlog({ _id }));
    }
  }

  onCancel(_id: string | null) {
    if (_id && this.cancelForm.valid) {
      let note = this.cancelForm.value.textarea;

      this.store.dispatch(trainerAction.cancelBlog({ _id, note }));
      this.cancelForm.reset();
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.cancelForm.get(field);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }
  trainerslist() {
    this.router.navigate(['/adminTrainerslist']);
  }
  adminBlog() {
    this.router.navigate(['/adminBlog']);
  }
  sessionManagement() {
    this.router.navigate(['/adminVideoCallManagement']);
  }
  Dashboard() {
    this.router.navigate(['/Dashboard']);
  }
  logout() {
    this.router.navigate(['/clientLogin']);
  }
  adminClient() {
    this.router.navigate(['/clients']);
  }
  adminPaymentData() {
    this.router.navigate(['/adminPaymentData']);
  }
}
