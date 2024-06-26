import { Routes } from '@angular/router';
import { RegisterComponent } from './components/user/register/register.component';
import { MainpageComponent } from './components/user/mainpage/mainpage.component';
import { LoginpageComponent } from './components/user/loginpage/loginpage.component';
import { ClientsComponent } from './components/admin/clients/clients.component';
import { authenticationGuard } from './guards/authentication.guard';
import { TrainerslistComponent } from './components/user/clients/trainerslist/trainerslist.component';
import { OtpComponent } from './components/otp/otp.component';
import { EmailverificatonComponent } from './components/emailverificaton/emailverificaton.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { TrainerprofileComponent } from './components/user/trainers/trainerprofile/trainerprofile.component';
import { TrainerprofileUpdateComponent } from './components/user/trainers/trainerprofile-update/trainerprofile-update.component';
import { EmailVerificationOtpComponent } from './components/email-verification-otp/email-verification-otp.component';
import { ClientProfileComponent } from './components/user/clients/client-profile/client-profile.component';
import { TrainersComponent } from './components/admin/trainers/trainers.component';
import { ClientslistComponent } from './components/user/trainers/clientslist/clientslist.component';

import { ClientCalenderComponent } from './components/user/clients/client-calender/client-calender.component';
import { Calender1Component } from './components/user/trainers/calender1/calender1.component';
import { ClientProfileUpdateComponent } from './components/user/clients/client-profile-update/client-profile-update.component';
import { TrainerLoginComponent } from './components/user/trainers/trainer-login/trainer-login.component';
import { ClientLoginComponent } from './components/user/clients/client-login/client-login.component';
import { WorkoutlistingComponent } from './components/user/clients/workoutlisting/workoutlisting.component';
import { ChatSystemComponent } from './components/user/clients/chat-system/chat-system.component';
import { VedioCallComponent } from './components/user/vedio-call/vedio-call.component';
import { VedioCallSelectClientsComponent } from './components/user/vedio-call-select-clients/vedio-call-select-clients.component';
import { ChatSystemTrainerComponent } from './components/user/trainers/chat-systemtrainer/chat-systemtrainer.component';
import { BlogComponent } from './components/user/blog/blog.component';
import { CreateBlogsComponent } from './components/user/create-blogs/create-blogs.component';
import { AdminBlogComponent } from './components/admin/admin-blog/admin-blog.component';
import { ViewBlogContentComponent } from './components/admin/view-blog-content/view-blog-content.component';
import { NotFoundComponent } from './components/admin/not-found/not-found.component';
import { validObjectIdGuard } from './guards/valid-object-id.guard';
import { validVedioCallIdGuard } from './guards/valid-vedio-call-id.guard';
import { BlogListClientComponent } from './components/user/clients/blog-list-client/blog-list-client.component';
import { BlogContentClientComponent } from './components/user/clients/blog-content-client/blog-content-client.component';
import { TrainerBlogListComponent } from './components/user/trainers/trainer-blog-list/trainer-blog-list.component';
import { ProgressTrackerComponent } from './components/progress-tracker/progress-tracker.component';
import { ProgressTrackerDataComponent } from './components/progress-tracker-data/progress-tracker-data.component';
import { ViewProgressDataComponent } from './components/view-progress-data/view-progress-data.component';
import { VideoCallManagementComponent } from './components/admin/video-call-management/video-call-management.component';

import { AddTestimonialComponent } from './components/user/add-testimonial/add-testimonial.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { EditProgressDataComponent } from './components/user/edit-progress-data/edit-progress-data.component';
import { PaymentDetailsComponent } from './components/admin/payment-details/payment-details.component';
import { RequestsComponent } from './components/user/trainers/requests/requests.component';
import { DisplayClientProfileComponent } from './components/user/trainers/display-client-profile/display-client-profile.component';
import { DisplayTrainerProfileComponent } from './components/user/clients/display-trainer-profile/display-trainer-profile.component';
import { userBlockedGuardGuard } from './guards/user-blocked-guard.guard';
import { localStorageCleanupGuardGuard } from './guards/local-storage-cleanup-guard.guard';
import { TrainerBlogContentComponent } from './components/user/trainers/trainer-blog-content/trainer-blog-content.component';
import { checkIfAdminGuard } from './guards/check-if-admin.guard';

export const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'mainpage', component: MainpageComponent },
  { path: 'login', component: LoginpageComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'trainerslist',
    component: TrainerslistComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'trainerslist/:id',
    component: TrainerslistComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'clientlist',
    component: ClientslistComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'clientlist/:id',
    component: ClientslistComponent,
    canActivate: [authenticationGuard, validObjectIdGuard],
  },
  { path: 'otp', component: OtpComponent },
  { path: 'emailverification', component: EmailverificatonComponent },
  { path: 'changePassword', component: ForgotpasswordComponent },
  {
    path: 'trainerprofile/:id',
    component: TrainerprofileComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'edittrainerprofile',
    component: TrainerprofileUpdateComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  { path: 'emailverificationotp', component: EmailVerificationOtpComponent },
  {
    path: 'clientProfile/:id',
    component: ClientProfileComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'adminTrainerslist',
    component: TrainersComponent,
    canActivate: [authenticationGuard, checkIfAdminGuard],
  },

  {
    path: 'calender',
    component: Calender1Component,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'clientcalender/:id',
    component: ClientCalenderComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'updatetTrainerProfile',
    component: TrainerprofileUpdateComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'updatetClientProfile',
    component: ClientProfileUpdateComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'trainerLogin',
    component: TrainerLoginComponent,
    canActivate: [localStorageCleanupGuardGuard],
  },
  {
    path: 'clientLogin',
    component: ClientLoginComponent,
    canActivate: [localStorageCleanupGuardGuard],
  },
  {
    path: 'clientWorkoutList',
    component: WorkoutlistingComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'clientChat',
    component: ChatSystemComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'videoCall/:id',
    component: VedioCallComponent,
    canActivate: [validVedioCallIdGuard, authenticationGuard],
  },
  {
    path: 'videoCallSelectClient',
    component: VedioCallSelectClientsComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'trainerChat',
    component: ChatSystemTrainerComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'blogs',
    component: BlogComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'addBlogs',
    component: CreateBlogsComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'adminBlog',
    component: AdminBlogComponent,
    canActivate: [authenticationGuard, checkIfAdminGuard],
  },
  {
    path: 'adminBlogContent/:id',
    component: ViewBlogContentComponent,
    canActivate: [validObjectIdGuard, authenticationGuard, checkIfAdminGuard],
  },
  {
    path: 'adminPaymentData',
    component: PaymentDetailsComponent,
    canActivate: [authenticationGuard, checkIfAdminGuard],
  },
  {
    path: 'clientBlogContent/:id',
    component: BlogContentClientComponent,
    canActivate: [
      validObjectIdGuard,
      userBlockedGuardGuard,
      authenticationGuard,
    ],
  },
  {
    path: 'trainerBlogContent/:id',
    component: TrainerBlogContentComponent,
    canActivate: [
      validObjectIdGuard,
      userBlockedGuardGuard,
      authenticationGuard,
    ],
  },
  {
    path: 'trainerBlogList',
    component: TrainerBlogListComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },

  {
    path: 'clientBlogList',
    component: BlogListClientComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'ProgressTracker/:id',
    component: ProgressTrackerDataComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'ProgressDetails/:id',
    component: ViewProgressDataComponent,
    canActivate: [userBlockedGuardGuard],
  },
  {
    path: 'addProgress/:id',
    component: ProgressTrackerComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'adminVideoCallManagement',
    component: VideoCallManagementComponent,
    canActivate: [authenticationGuard, checkIfAdminGuard],
  },
  {
    path: 'addTestimonial/:id',
    component: AddTestimonialComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'editProgressData/:id',
    component: EditProgressDataComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'clientRequest',
    component: RequestsComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'ClientProfileDetails/:id',
    component: DisplayClientProfileComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'TrainerProfileDetails/:id',
    component: DisplayTrainerProfileComponent,
    canActivate: [userBlockedGuardGuard, authenticationGuard],
  },
  {
    path: 'Dashboard',
    component: DashboardComponent,
    canActivate: [authenticationGuard],
  },

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];
