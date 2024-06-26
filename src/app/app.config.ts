import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { userReducer } from './ngrx/userauth/user.reducers';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { AuthEffects } from './ngrx/userauth/user.effects';
import { authorizationInterceptor } from './interceptors/authorization.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TrainerEffects } from './ngrx/trainers/trainer.effects';
import { trainerReducer } from './ngrx/trainers/trainer.reducers';
import { clientEffects } from './ngrx/clients/client.effects';
import { clientReducer } from './ngrx/clients/client.reducers';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ChatSocketService } from './services/chat-socket.service';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RazorpayService } from './services/razorpay.service';

// const config: SocketIoConfig = {
//   url: 'http://localhost:3000',
//   options: {},
// };

export const appConfig: ApplicationConfig = {
  providers: [
    RazorpayService,
    provideRouter(routes),
    provideClientHydration(),
    provideStore({
      user: userReducer,
      trainer: trainerReducer,
      client: clientReducer,
    }),
    provideEffects([AuthEffects, TrainerEffects, clientEffects]),
    provideHttpClient(
      withInterceptors([authorizationInterceptor]),
      withFetch()
    ),

    // provideAnimationsAsync(),
    provideAnimations(),

    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),

    provideNativeDateAdapter(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('YOUR_GOOGLE_CLIENT_ID'),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
};
