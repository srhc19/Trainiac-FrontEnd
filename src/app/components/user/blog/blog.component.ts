import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent {
  constructor(private router: Router) {}

  addBlog() {
    this.router.navigate(['/addBlogs']);
  }
}
