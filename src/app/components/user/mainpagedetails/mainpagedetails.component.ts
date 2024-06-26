import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpagedetails',
  standalone: true,
  imports: [],
  templateUrl: './mainpagedetails.component.html',
  styleUrl: './mainpagedetails.component.css',
})
export class MainpagedetailsComponent {
  constructor(private router: Router) {}

  register() {
    this.router.navigate(['/register']);
  }
}
