import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { userService } from '../userauth/user.services';
import { Router } from '@angular/router';
import * as clientActions from '../clients/client.action';
import * as userActions from '../userauth/user.action';
import { catchError, map, merge, mergeAll, mergeMap, switchMap } from 'rxjs';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { clientService } from './client.services';
import { ToastrService } from 'ngx-toastr';
import { GetuserdataService } from '../../services/getuserdata.service';

@Injectable()
export class clientEffects {
  // gettrainerlist$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(clientActions.trainerslist),
  //     mergeMap(() =>
  //       this.clientService.trainerlist().pipe(
  //         map((response) => {
  //           let trainerlist = response.trainerlist;
  //           console.log(trainerlist, 'trgggggggggggggg');
  //           return clientActions.trainerslistsuccess({ trainerlist });
  //         }),
  //         catchError((error) => {
  //           this.router.navigate(['/login']);
  //           return of(clientActions.trainerslistfailure());
  //         })
  //       )
  //     )
  //   )
  // );

  updateClientProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.updateClientProfile),
      mergeMap(({ formData }) =>
        this.clientService.updateClientProfile(formData).pipe(
          map((response) => {
            let message = response.message;
            let user_id = this.GetuserdataService.getUserid();
            let updated = response.updated;
            if (updated) {
              this.toastr.success('profile succesfully updated');
              this.router.navigate(['/clientProfile', user_id]);
            } else {
              this.toastr.error('Failed to updated profile');
            }

            return clientActions.updateClientProfileSuccess({ message });
          }),
          catchError((error) => {
            return of(clientActions.updateClientProfileFailure({ error }));
          })
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.clientLogin),
      mergeMap(({ email, password }) =>
        this.clientService.clientLogin(email, password).pipe(
          map((response) => {
            let validuser = response.validuser;
            let message = response.message;
            let accessToken = response.AccessToken;
            let role = response.role;
            let clientDetails = response.clientDetails;
            let trainerDetails = response.trainerDetails;

            let userdetails = response.userdetails;
            // if (userdetails) {
            //   localStorage.setItem('user_id', userdetails._id);

            //   localStorage.setItem('user_email', userdetails.email);
            //   localStorage.setItem('user_name', userdetails.name);
            // }
            localStorage.setItem('AccessToken', accessToken);
            localStorage.setItem('RefreshToken', response.RefreshToken);

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
                this.router.navigate(['/trainerLogin']);
                return clientActions.clientLoginSuccessTrainer();
              } else if (role === 'Client') {
                this.router.navigate(['/trainerslist', userdetails._id]);
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
            this.toastr.error(error.error.message);
            console.error('Error occurred:', error);
            let errorMessage = 'An error occurred';
            if (error && error.error && error.error.message) {
              errorMessage = error.error.message;
            }

            this.router.navigate(['/clientLogin']);
            return of(userActions.loginFailure({ errorMessage, error }));
          })
        )
      )
    )
  );

  getworkoutlists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.getworkoutlists),
      mergeMap(({ offset }) =>
        this.clientService.getworkoutlists(offset).pipe(
          map((response) => {
            let workoutlist = response.workoutList;
            console.log(workoutlist, 'effects');

            let updated = response.updated;
            // if (workoutlist) {
            //   this.router.navigate(['/clientProfile']);
            // }

            return clientActions.getworkoutlistsSuccess({ workoutlist });
          }),
          catchError((error) => {
            return of(clientActions.getworkoutlistsFailure({ error }));
          })
        )
      )
    )
  );
  getChatList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.getChatList),
      mergeMap(({ user_id }) =>
        this.clientService.getChatList(user_id).pipe(
          map((response) => {
            let clientChatList = response.chatlist;

            // let updated = response.clientChatList;
            // if (workoutlist) {
            //   this.router.navigate(['/clientProfile']);
            // }

            return clientActions.getChatListSuccess({ clientChatList });
          }),
          catchError((error) => {
            return of(clientActions.getChatListFailure({ error }));
          })
        )
      )
    )
  );
  getMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.getMessageList),
      mergeMap(({ senderemail, receiveremail }) =>
        this.clientService.getMessageList(senderemail, receiveremail).pipe(
          map((response) => {
            let messagelist = response.messages;

            // let updated = response.clientChatList;
            // if (workoutlist) {
            //   this.router.navigate(['/clientProfile']);
            // }

            return clientActions.getMessageListSuccess({ messagelist });
          }),
          catchError((error) => {
            return of(clientActions.getMessageListFailure({ error }));
          })
        )
      )
    )
  );

  checkForVedioSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.checkForVedioSession),
      mergeMap(({ user_id }) =>
        this.clientService.checkForVedioSession(user_id).pipe(
          map((response) => {
            let clientSessionDetails = response.clientSessionDetails;

            // let timeOfSession = response.timeOfSession;

            return clientActions.checkForVedioSessionSuccess({
              clientSessionDetails,
            });
          }),
          catchError((error) => {
            return of(clientActions.checkForVedioSessionFailure({ error }));
          })
        )
      )
    )
  );

  getBlogListClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.getBlogListClients),
      mergeMap(({ skip, limit }) =>
        this.clientService.getBlogListClients(skip, limit).pipe(
          map((response) => {
            let blogList = response.blogList;
            console.log(blogList, 'effects');

            // let timeOfSession = response.timeOfSession;

            return clientActions.getBlogListClientsSuccess({
              blogList,
            });
          }),
          catchError((error) => {
            return of(clientActions.getBlogListClientsFailure({ error }));
          })
        )
      )
    )
  );

  getClientsTrainerDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.getClientsTrainerDetails),
      mergeMap(({ email }) =>
        this.clientService.getClientsTrainerDetails(email).pipe(
          map((response) => {
            let trainerData = response.trainerData;
            console.log(trainerData, '///');
            return clientActions.getClientsTrainerDetailsSuccess({
              trainerData,
            });
          }),
          catchError((error) => {
            return of(clientActions.getClientsTrainerDetailsFailure({ error }));
          })
        )
      )
    )
  );

  addTestimonial$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.addTestimonial),
      mergeMap(({ content, user_id }) =>
        this.clientService.addTestimonial(content, user_id).pipe(
          map((response) => {
            let dataAdded = response.dataAdded;
            console.log('cccccccccccccccccc', dataAdded);
            this.toastr.success('Testimonial succesfully added ');

            return clientActions.addTestimonialSuccess({
              dataAdded,
            });
          }),
          catchError((error) => {
            return of(clientActions.addTestimonialFailure({ error }));
          })
        )
      )
    )
  );

  getTestimonials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.getTestimonials),
      mergeMap(({ trainerId }) =>
        this.clientService.getTestimonials(trainerId).pipe(
          map((response) => {
            let TestimonialData = response.testimonyData;

            return clientActions.getTestimonialsSuccess({
              TestimonialData,
            });
          }),
          catchError((error) => {
            return of(clientActions.getTestimonialsFailure({ error }));
          })
        )
      )
    )
  );
  addBackphoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.addBackPhoto),
      mergeMap(({ formData }) =>
        this.clientService.addBackPhoto(formData).pipe(
          map((response) => {
            const backPhotoUrl = response.backPhotoUrl;
            console.log(backPhotoUrl, 'effect response');
            return clientActions.addBackPhotoSuccess({
              backPhotoUrl,
            });
          }),
          catchError((error) => {
            return of(clientActions.addBackPhotoFailure({ error }));
          })
        )
      )
    )
  );

  addSidePhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.addSidePhoto),
      mergeMap(({ formData }) =>
        this.clientService.addSidePhoto(formData).pipe(
          map((response) => {
            const sidePhotoUrl = response.sidePhotoUrl;

            return clientActions.addSidePhotoSuccess({
              sidePhotoUrl,
            });
          }),
          catchError((error) => {
            return of(clientActions.addSidePhotoFailure({ error }));
          })
        )
      )
    )
  );

  addFrontPhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.addFrontPhoto),
      mergeMap(({ formData }) =>
        this.clientService.addFrontPhoto(formData).pipe(
          map((response) => {
            const frontPhotoUrl = response.frontPhotoUrl;

            return clientActions.addFrontPhotoSuccess({
              frontPhotoUrl,
            });
          }),
          catchError((error) => {
            return of(clientActions.addFrontPhotoFailure({ error }));
          })
        )
      )
    )
  );

  updateProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.updateProgress),
      mergeMap(({ updatedData, _id }) =>
        this.clientService.updateProgress(updatedData, _id).pipe(
          map((response) => {
            const updated = response.updated;
            if (updated) {
              this.toastr.success('Data Succesfully updated');
            }
            return clientActions.updateProgressSuccess({
              updated,
            });
          }),
          catchError((error) => {
            return of(clientActions.updateProgressFailure({ error }));
          })
        )
      )
    )
  );

  bloglistSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clientActions.bloglistSearch),
      mergeMap(({ query }) =>
        this.clientService.bloglistSearch(query).pipe(
          map((response) => {
            const blogList = response.blogList;
            if (blogList.length === 0) {
              this.toastr.error('No data available for this query');
            }

            return clientActions.bloglistSearchSuccess({
              blogList,
            });
          }),
          catchError((error) => {
            return of(clientActions.bloglistSearchFailure({ error }));
          })
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private clientService: clientService,
    private toastr: ToastrService,
    private router: Router,
    private GetuserdataService: GetuserdataService
  ) {}
}
