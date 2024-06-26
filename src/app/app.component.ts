import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainpageComponent } from './components/user/mainpage/mainpage.component';
import { LoginpageComponent } from './components/user/loginpage/loginpage.component';
import { ClientsComponent } from './components/admin/clients/clients.component';
import { BloglistComponent } from './components/user/bloglist/bloglist.component';
import { BlogComponent } from './components/user/blog/blog.component';
import { RegisterComponent } from './components/user/register/register.component';
import { TrainerslistComponent } from './components/user/clients/trainerslist/trainerslist.component';
import { OtpComponent } from './components/otp/otp.component';

import { TrainerprofileComponent } from './components/user/trainers/trainerprofile/trainerprofile.component';
import { ClientProfileComponent } from './components/user/clients/client-profile/client-profile.component';

import { ClientslistComponent } from './components/user/trainers/clientslist/clientslist.component';
import { ChatSystemComponent } from './components/user/clients/chat-system/chat-system.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MainpageComponent,
    LoginpageComponent,
    ClientsComponent,
    BloglistComponent,
    BlogComponent,
    RegisterComponent,
    TrainerslistComponent,
    OtpComponent,

    TrainerprofileComponent,
    ClientProfileComponent,

    ClientslistComponent,
    ChatSystemComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Trainiac';
}
