import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as trainerActions from '../../ngrx/trainers/trainer.action';
import * as userActions from '../userauth/user.action';
import { tap } from 'rxjs/operators';
import { trainerService } from './trainer.services';
import { catchError, map, merge, mergeAll, mergeMap, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { of } from 'rxjs';
import { Router } from '@angular/router';
import { response } from 'express';
import { GetuserdataService } from '../../services/getuserdata.service';

@Injectable()
export class TrainerEffects {
  addnewClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.addnewClient),
      mergeMap(({ trainerid, clientName, clientEmail }) =>
        this.trainerService
          .addnewClient(trainerid, clientName, clientEmail)
          .pipe(
            map((response) => {
              let message = response.message;
              return trainerActions.addnewClientSuccess({ message });
            }),
            catchError((error) => {
              return of(trainerActions.addnewClientFailure({ error }));
            })
          )
      )
    )
  );

  getClientList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.getClientList),
      mergeMap(({ trainerid }) =>
        this.trainerService.getClientList(trainerid).pipe(
          map((response) => {
            let listofclient = response.clientData;

            return trainerActions.getClientListSuccess({ listofclient });
          }),
          catchError((error) => {
            return of(trainerActions.getClientListFailure({ error }));
          })
        )
      )
    )
  );
  addCardioWorkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.addCardioWorkout),
      mergeMap(
        ({
          trainerid,
          clientemail,
          workoutDate,
          activity,
          intensity,
          duration,
        }) =>
          this.trainerService
            .addCardioWorkout(
              trainerid,
              clientemail,
              workoutDate,
              activity,
              intensity,
              duration
            )
            .pipe(
              map((response) => {
                let message = response.message;
                this.toastr.success('workout succesfully added');
                return trainerActions.addCardioWorkoutSuccess({ message });
              }),
              catchError((error) => {
                return of(trainerActions.addCardioWorkoutFailure({ error }));
              })
            )
      )
    )
  );

  addGymWorkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.addGymWorkout),
      mergeMap(({ clientEmail, exercises, targetMuscleGroup, workoutDate }) =>
        this.trainerService
          .addGymWorkout(clientEmail, exercises, targetMuscleGroup, workoutDate)
          .pipe(
            map((response) => {
              let message = response.message;
              this.toastr.success('workout succesfully added');
              return trainerActions.addGymWorkoutSuccess({ message });
            }),
            catchError((error) => {
              return of(trainerActions.addGymWorkoutFailure({ error }));
            })
          )
      )
    )
  );
  addYogaWorkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.addYogaWorkout),
      mergeMap(({ clientEmail, workoutDate, activity, duration }) =>
        this.trainerService
          .addYogaWorkout(clientEmail, workoutDate, activity, duration)
          .pipe(
            map((response) => {
              let message = response.message;
              this.toastr.success('workout succesfully added');
              return trainerActions.addYogaWorkoutSuccess({ message });
            }),
            catchError((error) => {
              return of(trainerActions.addYogaWorkoutFailure({ error }));
            })
          )
      )
    )
  );

  updateTrainerProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.updateTrainerProfile),
      mergeMap(({ formData }) =>
        this.trainerService.updateTrainerProfile(formData).pipe(
          map((response) => {
            let message = response.message;
            console.log(response);
            if (response.updated) {
              console.log('hr');
              this.toastr.success('Profile Succesfully updated');
            } else {
              console.log('gr');
              this.toastr.error('Failed to updated profile .Please try again');
            }
            const user_id = this.GetuserdataService.getUserid();
            this.router.navigate(['/trainerprofile', user_id]);

            return trainerActions.updateTrainerProfileSuccess({ message });
          }),
          catchError((error) => {
            return of(trainerActions.updateTrainerProfileFailure({ error }));
          })
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.trainerLogin),
      mergeMap(({ email, password }) =>
        this.trainerService.trainerlogin(email, password).pipe(
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
                this.router.navigate(['/clientlist', userdetails._id]);
                return userActions.loginSuccessTrainer({
                  validuser,
                  message,
                  userdetails,
                  trainerDetails,
                });
              } else if (role === 'Client') {
                this.router.navigate(['/clientLogin']);
                return trainerActions.trainerLoginSuccessClient();
              }
            } else {
              this.router.navigate(['/trainerLogin']);
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

            this.router.navigate(['/trainerLogin']);
            return of(userActions.loginFailure({ errorMessage, error }));
          })
        )
      )
    )
  );
  getChatList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.getChatListTrainer),
      mergeMap(({ user_id }) =>
        this.trainerService.getChatListTrainer(user_id).pipe(
          map((response) => {
            let trainerChatList = response.chatlist;

            // let updated = response.clientChatList;
            // if (workoutlist) {
            //   this.router.navigate(['/clientProfile']);
            // }

            return trainerActions.getChatListTrainerSuccess({
              trainerChatList,
            });
          }),
          catchError((error) => {
            return of(trainerActions.getChatListTrainerFailure({ error }));
          })
        )
      )
    )
  );
  getMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.getMessageListTrainer),
      mergeMap(({ senderemail, receiveremail }) =>
        this.trainerService
          .getMessageListTrainer(senderemail, receiveremail)
          .pipe(
            map((response) => {
              let messagelist = response.messages;

              // let updated = response.clientChatList;
              // if (workoutlist) {
              //   this.router.navigate(['/clientProfile']);
              // }

              return trainerActions.getMessageListTrainerSuccess({
                messagelist,
              });
            }),
            catchError((error) => {
              return of(trainerActions.getMessageListTrainerFailure({ error }));
            })
          )
      )
    )
  );

  startVedioSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.startVedioSession),
      mergeMap(({ vedioSessionClientsId, trainer_id, randomid }) =>
        this.trainerService
          .startVedioSession(vedioSessionClientsId, trainer_id, randomid)
          .pipe(
            map((response) => {
              let sessionAdded = response.sessionAdded;

              // let updated = response.clientChatList;
              // if (workoutlist) {
              //   this.router.navigate(['/clientProfile']);
              // }

              return trainerActions.startVedioSessionSuccess({ sessionAdded });
            }),
            catchError((error) => {
              return of(trainerActions.startVedioSessionFailure({ error }));
            })
          )
      )
    )
  );

  getCurrentVedioCallId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.getCurrentVedioCallId),
      mergeMap(({ trainer_Id }) =>
        this.trainerService.getCurrentVedioCallId(trainer_Id).pipe(
          map((response) => {
            let vedioCallId = response.vedioCallId;

            // let updated = response.clientChatList;
            // if (workoutlist) {
            //   this.router.navigate(['/clientProfile']);
            // }

            return trainerActions.getCurrentVedioCallIdSuccess({ vedioCallId });
          }),
          catchError((error) => {
            return of(trainerActions.getCurrentVedioCallIdFailure({ error }));
          })
        )
      )
    )
  );
  checkIfTrainer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.checkIfTrainer),
      mergeMap(({ trainer_Id }) =>
        this.trainerService.checkIfTrainer(trainer_Id).pipe(
          map((response) => {
            let isTrainer = response.isTrainer;

            return trainerActions.checkIfTrainerSuccess({ isTrainer });
          }),
          catchError((error) => {
            return of(trainerActions.checkIfTrainerFailure({ error }));
          })
        )
      )
    )
  );
  updateSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.updateSession),
      mergeMap(({ randomId, trainer_Id }) =>
        this.trainerService.updateSession(randomId, trainer_Id).pipe(
          map((response) => {
            return trainerActions.updateSessionSuccess();
          }),
          catchError((error) => {
            return of(trainerActions.updateSessionFailure({ error }));
          })
        )
      )
    )
  );

  removeWorkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.removeWorkout),
      mergeMap(({ formattedDate, user_id }) =>
        this.trainerService.removeWorkout(formattedDate, user_id).pipe(
          map((response) => {
            const clientDetails = response.clientDetails;
            console.log('succesfully removed workout from client calender');
            this.toastr.success(
              'succesfully removed workout from client calender'
            );
            return userActions.getCurrentClientSuccess(clientDetails);
          }),
          catchError((error) => {
            return of(trainerActions.removeWorkoutFailure({ error }));
          })
        )
      )
    )
  );

  addBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.addBlog),
      mergeMap(({ formData }) =>
        this.trainerService.addBlog(formData).pipe(
          map((response) => {
            const blogAdded = response.blogAdded;
            this.toastr.success('Blog Succesfully Added');
            return trainerActions.addBlogSuccess(blogAdded);
          }),
          catchError((error) => {
            this.toastr.error('Failed to add blog');
            return of(trainerActions.addBlogFailure({ error }));
          })
        )
      )
    )
  );

  getBlogDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.getBlogDetails),
      mergeMap(({ skip, limit }) =>
        this.trainerService.getBlogDetails(skip, limit).pipe(
          map((response) => {
            const adminBlogDetails = response.blogDetails;
            return trainerActions.getBlogDetailsSuccess({ adminBlogDetails });
          }),
          catchError((error) => {
            return of(trainerActions.getBlogDetailsFailure({ error }));
          })
        )
      )
    )
  );

  viewBlogContent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.viewBlogContent),
      mergeMap(({ _id }) =>
        this.trainerService.viewBlogContent(_id).pipe(
          map((response) => {
            const blogContent = response.blogContent;
            return trainerActions.viewBlogContentSuccess({ blogContent });
          }),
          catchError((error) => {
            return of(trainerActions.viewBlogContentFailure({ error }));
          })
        )
      )
    )
  );

  publishBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.publishBlog),
      mergeMap(({ _id }) =>
        this.trainerService.publishBlog(_id).pipe(
          map((response) => {
            const message = response.message;
            const blogContent = response.Blog;
            this.toastr.success(message, 'Blog Succesfully Published');
            console.log(blogContent);
            return trainerActions.publishBlogSuccess({ message, blogContent });
          }),
          catchError((error) => {
            return of(trainerActions.publishBlogFailure({ error }));
          })
        )
      )
    )
  );

  cancelBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.cancelBlog),
      mergeMap(({ _id, note }) =>
        this.trainerService.cancelBlog(_id, note).pipe(
          map((response) => {
            const message = response.message;
            const blogContent = response.Blog;
            this.toastr.error(message, 'Blog Cancelled');

            return trainerActions.cancelBlogSuccess({ message, blogContent });
          }),
          catchError((error) => {
            this.toastr.error('Failed to cancel blog', 'Error');

            return of(trainerActions.cancelBlogFailure({ error }));
          })
        )
      )
    )
  );

  currentTrainerBlogList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.currentTrainerBlogList),
      mergeMap(({ user_id, skip, limit }) =>
        this.trainerService.currentTrainerBlogList(user_id, skip, limit).pipe(
          map((response) => {
            const message = response.message;
            const blogDetails = response.blogDetails;

            return trainerActions.currentTrainerBlogListSuccess({
              blogDetails,
            });
          }),
          catchError((error) => {
            this.toastr.error('Failed to cancel blog', 'Error');
            alert('Failed to cancel blog');
            return of(trainerActions.cancelBlogFailure({ error }));
          })
        )
      )
    )
  );
  addProgress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.addProgress),
      mergeMap(({ formData }) =>
        this.trainerService.addProgress(formData).pipe(
          map((response) => {
            this.toastr.success(response.message);
            const blogAdded = response.blogAdded;
            return trainerActions.addProgressSuccess(blogAdded);
          }),
          catchError((error) => {
            this.toastr.success(error.error.message);
            return of(trainerActions.addProgressFailure({ error }));
          })
        )
      )
    )
  );

  getProgressData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.getProgressData),
      mergeMap(({ user_id }) =>
        this.trainerService.getProgressData(user_id).pipe(
          map((response) => {
            const ProgressData = response.progressData;
            return trainerActions.getProgressDataSuccess({ ProgressData });
          }),
          catchError((error) => {
            return of(trainerActions.getProgressDataFailure({ error }));
          })
        )
      )
    )
  );

  getprogressDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.getprogressDetails),
      mergeMap(({ _id }) =>
        this.trainerService.getprogressDetails(_id).pipe(
          map((response) => {
            const progressDetails = response.progressDetails;
            console.log(progressDetails, 'details in effects  ....');
            return trainerActions.getprogressDetailsSuccess({
              progressDetails,
            });
          }),
          catchError((error) => {
            return of(trainerActions.getprogressDetailsFailure({ error }));
          })
        )
      )
    )
  );

  getSessionList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.getSessionList),
      mergeMap(() =>
        this.trainerService.getSessionList().pipe(
          map((response) => {
            const sessionData = response.sessionData;

            return trainerActions.getSessionListSuccess({
              sessionData,
            });
          }),
          catchError((error) => {
            return of(trainerActions.getSessionListFailure({ error }));
          })
        )
      )
    )
  );

  checkIfClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.checkIfClient),
      mergeMap(({ id }) =>
        this.trainerService.checkIfClient(id).pipe(
          map((response) => {
            const isClient = response.isClient;
            console.log(isClient, 'effects..');
            return trainerActions.checkIfClientSuccess({
              isClient,
            });
          }),
          catchError((error) => {
            return of(trainerActions.checkIfClientFailure({ error }));
          })
        )
      )
    )
  );

  adminBlogSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.adminBlogSearch),
      mergeMap(({ query }) =>
        this.trainerService.adminBlogSearch(query).pipe(
          map((response) => {
            const adminBlogDetails = response.blogList;
            if (adminBlogDetails.length === 0) {
              this.toastr.error('No data available for the search');
            }

            return trainerActions.adminBlogSearchSuccess({
              adminBlogDetails,
            });
          }),
          catchError((error) => {
            return of(trainerActions.adminBlogSearchFailure({ error }));
          })
        )
      )
    )
  );

  adminSessionSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.adminSessionSearch),
      mergeMap(({ query }) =>
        this.trainerService.adminSessionSearch(query).pipe(
          map((response) => {
            const sessionData = response.sessionData;
            if (sessionData.length === 0) {
              this.toastr.error('No data available for the search');
            }

            return trainerActions.adminSessionSearchSuccess({
              sessionData,
            });
          }),
          catchError((error) => {
            return of(trainerActions.adminSessionSearchFailure({ error }));
          })
        )
      )
    )
  );
  getPaymentData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.getPaymentData),
      mergeMap(({ limit, skip }) =>
        this.trainerService.getPaymentData(limit, skip).pipe(
          map((response) => {
            const paymentData = response.paymentData;
            // if (sessionData.length === 0) {
            //   this.toastr.error('No data available for the search');
            // }

            return trainerActions.getPaymentDataSuccess({
              paymentData,
            });
          }),
          catchError((error) => {
            return of(trainerActions.getBlogDetailsFailure({ error }));
          })
        )
      )
    )
  );
  removeCertificateImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.removeCertificateImages),
      mergeMap(({ certImage, user_id }) =>
        this.trainerService.removeCertificateImages(certImage, user_id).pipe(
          map((response) => {
            const removed = response.removed;
            if (removed) {
              this.toastr.success('Image succesfully Removed');
            } else {
              this.toastr.error('Failed to remove image');
            }

            return trainerActions.removeCertificateImagesSuccess();
          }),
          catchError((error) => {
            return of(trainerActions.removeCertificateImagesFailure({ error }));
          })
        )
      )
    )
  );
  sendRequestTrainer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.sendRequestTrainer),
      mergeMap(({ client_id, trainer_id }) =>
        this.trainerService.sendRequestTrainer(client_id, trainer_id).pipe(
          map((response) => {
            const requestSuccess = response.requestSuccess;
            if (requestSuccess) {
              this.toastr.success('Request send to trainer');
            } else {
              this.toastr.error('Failed to send request try again');
            }

            return trainerActions.sendRequestTrainerSuccess();
          }),
          catchError((error) => {
            return of(trainerActions.sendRequestTrainerFailure({ error }));
          })
        )
      )
    )
  );

  getclientsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.getclientsRequest),
      mergeMap(({ user_id }) =>
        this.trainerService.getclientsRequest(user_id).pipe(
          map((response) => {
            const clientRequestList = response.clientRequestList;
            console.log(clientRequestList, 'list in effects');

            return trainerActions.getclientsRequestSuccess({
              clientRequestList,
            });
          }),
          catchError((error) => {
            return of(trainerActions.getclientsRequestFailure({ error }));
          })
        )
      )
    )
  );

  acceptClientRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.acceptClientRequest),
      mergeMap(({ client_id, trainer_id }) =>
        this.trainerService.acceptClientRequest(client_id, trainer_id).pipe(
          map((response) => {
            const clientAdded = response.clientAdded;
            if (clientAdded) {
              this.toastr.success('Succesfuly added client');
            } else {
              this.toastr.error('Failed to add client.Please try again');
            }

            return trainerActions.acceptClientRequestSuccess();
          }),
          catchError((error) => {
            return of(trainerActions.acceptClientRequestFailure({ error }));
          })
        )
      )
    )
  );
  removeClientRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.removeClientRequest),
      mergeMap(({ client_id, trainer_id }) =>
        this.trainerService.removeClientRequest(client_id, trainer_id).pipe(
          map((response) => {
            const clientRemoved = response.clientRemoved;
            if (clientRemoved) {
              this.toastr.success('Succesfully removed clients');
            } else {
              this.toastr.error('Failed to remove client.Please try again');
            }

            return trainerActions.removeClientRequestSuccess();
          }),
          catchError((error) => {
            return of(trainerActions.removeClientRequestFailure({ error }));
          })
        )
      )
    )
  );

  clientRequestSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.clientRequestSearch),
      mergeMap(({ query }) =>
        this.trainerService.clientRequestSearch(query).pipe(
          map((response) => {
            const clientRequestList = response.clientRequestList;
            if (clientRequestList.length === 0) {
              this.toastr.error('No results for the search');
            }

            return trainerActions.clientRequestSearchSuccess({
              clientRequestList,
            });
          }),
          catchError((error) => {
            return of(trainerActions.clientRequestSearchFailure({ error }));
          })
        )
      )
    )
  );

  messageReciversImg$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.messageReciversImg),
      mergeMap(({ receiveremail }) =>
        this.trainerService.messageReciversImg(receiveremail).pipe(
          map((response) => {
            const receiversImg = response.profileimage;

            return trainerActions.messageReciversImgSuccess({
              receiversImg,
            });
          }),
          catchError((error) => {
            return of(trainerActions.messageReciversImgFailure({ error }));
          })
        )
      )
    )
  );
  addMessageList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(trainerActions.addMessageList),
      mergeMap(({ receiver_id, currentuser_id }) =>
        this.trainerService.addMessageList(receiver_id, currentuser_id).pipe(
          map((response) => {
            return trainerActions.addMessageListSuccess();
          }),
          catchError((error) => {
            return of(trainerActions.addMessageListFailure({ error }));
          })
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private trainerService: trainerService,
    private toastr: ToastrService,
    private router: Router,
    private GetuserdataService: GetuserdataService
  ) {}
}
