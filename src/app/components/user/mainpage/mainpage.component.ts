import { Component } from '@angular/core';
import { MainpagedetailsComponent } from '../mainpagedetails/mainpagedetails.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  standalone: true,
  imports: [MainpagedetailsComponent, FooterComponent],
  templateUrl: './mainpage.component.html',
  styleUrl: './mainpage.component.css',
})
export class MainpageComponent {
  constructor(private router: Router) {}

  login() {
    this.router.navigate(['/login']);
  }
  register() {
    this.router.navigate(['/register']);
  }
}
