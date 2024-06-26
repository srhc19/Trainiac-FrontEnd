import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userActions from '../../ngrx/userauth/user.action';
import { tap } from 'rxjs/operators';
import { catchError, map, merge, mergeAll, mergeMap, switchMap } from 'rxjs';
import { userService } from './user.services';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { response } from 'express';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class AuthEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.register),
      tap(({ name, email, password, role, captcha }) => {
        console.log('Data received in AuthEffects:', {
          name,
          email,
          password,
          role,
          captcha,
        });
      }),
      mergeMap(({ name, email, password, role, captcha }) =>
        this.userService.register(name, email, password, role, captcha).pipe(
          map((response) => {
            let registered = response.registered;
            let message = response.message;

            if (registered) {
              this.router.navigate(['/otp']);
            } else {
              this.toastr.error(response.message);
              this.router.navigate(['/register']);
            }
            return userActions.registerSuccess({ registered, message });
          }),
          catchError((error) => of(userActions.registerFailure({ error })))
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.login),
      mergeMap(({ email, password }) =>
        this.userService.login(email, password).pipe(
          map((response) => {
            let validuser = response.validuser;
            let message = response.message;
            let accessToken = response.AccessToken;
            let role = response.role;
            let clientDetails = response.clientDetails;
            let trainerDetails = response.trainerDetails;

            let userdetails = response.userdetails;
            if (userdetails) {
              localStorage.setItem('user_id', userdetails._id);
              console.log(userdetails.email, 'email in usreffects');
              localStorage.setItem('user_email', userdetails.email);
            }
            localStorage.setItem('AccessToken', accessToken);

            if (validuser) {
              if (response.isAdmin) {
                if (response.userdata) {
                  //userdata: the list users if its admin
                  let userdata = response.userdata;
                  this.router.navigate(['/clients']);
                  return userActions.loginSuccessAdmin({
                    userdata,
                  });
                }
              }

              if (role === 'trainer') {
                this.router.navigate(['/clientlist']);
                return userActions.loginSuccessTrainer({
                  validuser,
                  message,
                  userdetails,
                  trainerDetails,
                });
              } else if (role === 'Client') {
                this.router.navigate(['/trainerslist']);
                return userActions.loginSuccessClient({
                  validuser,
                  message,
                  userdetails,
                  clientDetails,
                });
              }
            } else {
              this.router.navigate(['/clientLogin']);
            }
            return userActions.loginSuccess({ validuser, message });
          }),
          catchError((error) => {
            console.error('Error occurred:', error);
            let errorMessage = 'An error occurred';
            if (error && error.error && error.error.message) {
              errorMessage = error.error.message;
            }

            this.router.navigate(['/register']);
            return of(userActions.loginFailure({ errorMessage, error }));
          })
        )
      )
    )
  );
  userdata$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getUserData),
      mergeMap(({ role, skip, limit }) =>
        this.userService.getUserData(role, skip, limit).pipe(
          map((response) => {
            let userdata = response.userdata;

            return userActions.getUserDataSuccess({ userdata });
          }),
          catchError((error) => {
            // this.router.navigate(['/login']);
            return of(userActions.getUserDataFailure({ error }));
          })
        )
      )
    )
  );

  verifyOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.verifyOtp),
      mergeMap(({ otp }) =>
        this.userService.verifyOtp(otp).pipe(
          map((response) => {
            let isVerified = response.isVerified;
            let role = response.role;

            let message = response.message;
            console.log(message);
            // const changepasswordValue = localStorage.getItem('changepassword');
            // console.log(changepasswordValue);

            if (isVerified) {
              // if (changepasswordValue === 'true') {
              //   console.log('yrp');
              //   this.router.navigate(['/changepassword']);
              // }
              if (role === 'trainer') {
                this.router.navigate(['/trainerLogin']);
              } else {
                this.router.navigate(['/clientLogin']);
              }
            } else {
              this.toastr.error(response.message);
              this.router.navigate(['/otp']);

              // this.snackBar.open(
              //   message,
              //   'Something went wrong, Try resend otp',
              //   {
              //     duration: 9000,
              //     horizontalPosition: 'center',
              //     verticalPosition: 'top',
              //     panelClass: ['mat-snackbar-warn', 'errormessage'],
              //   }
              // );
            }

            return userActions.verifyOtpsuccess({ message });
          }),
          catchError((error) => {
            this.toastr.error('Something went wrong please try again');
            this.router.navigate(['/register']);
            return of(userActions.verifyOtpFailure({ error }));
          })
        )
      )
    )
  );

  trainerlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getTrainersList),
      mergeMap(({ skip, limit }) =>
        this.userService.trainerList(skip, limit).pipe(
          map((response) => {
            let trainerlist = response.trainerlist;

            return userActions.getTrainerListSuccess({ trainerlist });
          }),
          catchError((error) => {
            this.router.navigate(['/clientLogin']);
            return of(userActions.getTrainerListFailure({ error }));
          })
        )
      )
    )
  );

  changeUserStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.changeUserStatus),
      tap(({ _id }) => {
        console.log('Data received in AuthEffects:', _id, {
          _id,
        });
      }),
      mergeMap(({ _id }) =>
        this.userService.changeUserStatus(_id).pipe(
          map((response) => {
            let trainerlist = response.trainerlist;
            this.toastr.success(response.message);
            return userActions.changeUserStatusSuccess();
          }),
          catchError((error) => {
            this.router.navigate(['/clientLogin']);
            return of(userActions.registerFailure({ error }));
          })
        )
      )
    )
  );

  resendOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.resendOtp),
      mergeMap(() =>
        this.userService.resendOtp().pipe(
          map((response) => {
            this.router.navigate(['/otp']);

            return userActions.resendOtpSuccess();
          }),
          catchError((error) => {
            this.router.navigate(['/register']);
            return of(userActions.verifyOtpFailure({ error }));
          })
        )
      )
    )
  );

  verifyemail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.verifyEmail),
      mergeMap(({ email }) =>
        this.userService.verifyEmail(email).pipe(
          map((response) => {
            if (response.message === 'User dont exist') {
              this.toastr.error('wrong email please try again');
              this.router.navigate(['/emailverification']);
            } else {
              this.router.navigate(['/emailverificationotp']);
            }

            return userActions.verifyEmailSuccess();
          }),
          catchError((error) => {
            // this.router.navigate(['/login']);
            this.toastr.error(error.error.message);
            this.router.navigate(['/emailverification']);
            return of(userActions.verifyEmailFailure({ error }));
          })
        )
      )
    )
  );

  verifyemailotp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.verifyEmailOtp),
      mergeMap(({ otp }) =>
        this.userService.verifyEmailOtp(otp).pipe(
          map((response) => {
            console.log(response.Verified);
            let Verified = response.Verified;

            let message = response.message;

            if (Verified) {
              this.router.navigate(['/changePassword']);
            } else {
              this.toastr.error(response.message);

              this.router.navigate(['/emailverificationotp']);
            }

            // this.router.navigate(['/changePassword']);
            return userActions.verifyEmailOtpsuccess({ message });
          }),
          catchError((error) => {
            // this.router.navigate(['/login']);
            return of(userActions.verifyEmailOtpFailure({ error }));
          })
        )
      )
    )
  );

  verifyresendOtp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.verifyResendOtp),
      mergeMap(() =>
        this.userService.resendOtp().pipe(
          map((response) => {
            this.router.navigate(['/emailverificationotp']);

            return userActions.verifyResendOtpSuccess();
          }),
          catchError((error) => {
            this.router.navigate(['/register']);
            return of(userActions.verifyResendOtpFailure({ error }));
          })
        )
      )
    )
  );

  updatepassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.updatepassword),
      mergeMap(({ newPassword }) =>
        this.userService.updatePassword(newPassword).pipe(
          map((response) => {
            let updated = response.updated;
            let role = response.role;
            if (!updated) {
              this.toastr.error('something went wrong ,try again');
            }
            if (role === 'trainer') {
              this.router.navigate(['/trainerLogin']);
            } else {
              this.router.navigate(['/clientLogin']);
            }
            this.toastr.success('password succesfully updated');
            return userActions.updatePasswordSuccess();
          }),
          catchError((error) => {
            this.router.navigate(['/register']);
            return of(userActions.updatePasswordFailure({ error }));
          })
        )
      )
    )
  );

  getCurrentUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getCurrentUserDetails),
      mergeMap(({ _id, skip, limit }) =>
        this.userService.getCurrentUserDetails(_id, skip, limit).pipe(
          map((response) => {
            let trainersclientDetails = response.clientDetails;
            return userActions.getCurrentUserDetailsSuccess({
              trainersclientDetails,
            });
          }),
          catchError((error) => {
            this.router.navigate(['/register']);
            return of(userActions.getCurrentUserDetailsFailure({ error }));
          })
        )
      )
    )
  );

  getCurrentTrainer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getCurrentTrainer),
      mergeMap(({ user_id }) =>
        this.userService.getCurrentTrainer(user_id).pipe(
          map((response) => {
            let trainerDetails = response.currentTrainer;
            console.log(trainerDetails, 'trainerdetails in response');
            return userActions.getCurrentTrainerSuccess({ trainerDetails });
          }),
          catchError((error) => {
            this.router.navigate(['/register']);
            return of(userActions.getCurrentTrainerFailure({ error }));
          })
        )
      )
    )
  );

  getCurrentClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.getCurrentClient),
      mergeMap(({ user_id }) =>
        this.userService.getCurrentClient(user_id).pipe(
          map((response) => {
            let clientDetails = response.currentClient;

            return userActions.getCurrentClientSuccess({ clientDetails });
          }),
          catchError((error) => {
            this.router.navigate(['/register']);
            return of(userActions.getCurrentClientFailure({ error }));
          })
        )
      )
    )
  );

  trainerlistSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.trainerlistSearch),
      mergeMap(({ query }) =>
        this.userService.trainerlistSearch(query).pipe(
          map((response) => {
            let trainerlist = response.trainerlist;

            return userActions.trainerlistSearchSuccess({ trainerlist });
          }),
          catchError((error) => {
            return of(userActions.trainerlistSearchFailure({ error }));
          })
        )
      )
    )
  );

  adminclientSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.adminclientSearch),
      mergeMap(({ query }) =>
        this.userService.adminclientSearch(query).pipe(
          map((response) => {
            let userdata = response.userdata;

            return userActions.adminclientSearchSuccess({ userdata });
          }),
          catchError((error) => {
            return of(userActions.adminclientSearchFailure({ error }));
          })
        )
      )
    )
  );

  adminTrainerSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.adminTrainerSearch),
      mergeMap(({ query }) =>
        this.userService.adminTrainerSearch(query).pipe(
          map((response) => {
            let userdata = response.userdata;

            return userActions.adminTrainerSearchSuccess({ userdata });
          }),
          catchError((error) => {
            return of(userActions.adminTrainerSearchFailure({ error }));
          })
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private userService: userService,
    private router: Router,
    private snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {}
}
