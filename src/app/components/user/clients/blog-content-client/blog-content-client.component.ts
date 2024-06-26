import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Blog } from '../../../../ngrx/trainers/trainer.interface';
import * as trainerAction from '../../../../ngrx/trainers/trainer.action';
import { getBlogContent } from '../../../../ngrx/trainers/trainer.selectors';
import { CommonModule } from '@angular/common';
import { GetuserdataService } from '../../../../services/getuserdata.service';

@Component({
  selector: 'app-blog-content-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog-content-client.component.html',
  styleUrl: './blog-content-client.component.css',
})
export class BlogContentClientComponent {
  cancelForm!: FormGroup;
  id!: string | null;
  blogContent!: Blog;
  dropdownVisible = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private fb: FormBuilder,
    private router: Router,
    private GetuserdataService: GetuserdataService
  ) {}

  ngOnInit(): void {
    const paramMap = this.route.snapshot.paramMap;
    const _id = paramMap.get('id');

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

  logout() {
    this.router.navigate(['/clientLogin']);
  }
}
