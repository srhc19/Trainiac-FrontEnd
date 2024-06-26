import { createAction, props } from '@ngrx/store';
import { clientChatList } from './client.interface';
import { withNoXsrfProtection } from '@angular/common/http';

// export const trainerslist = createAction('[client] get trainers list');

// export const trainerslistsuccess = createAction(
//   '[client]get trainers list',
//   props<{ trainerlist: Array<any> }>()
// );

// export const trainerslistfailure = createAction('[client]get trainers list');

//update Client Profile
export const updateClientProfile = createAction(
  '[client] update Client  Profile',
  props<{
    formData: FormData;
  }>()
);
export const updateClientProfileSuccess = createAction(
  '[client] update Client  Profile',
  props<{
    message: String;
    workoutAdded?: boolean;
  }>()
);
export const updateClientProfileFailure = createAction(
  '[client] update Client  Profile Failure',
  props<{
    error: any;
  }>()
);
//client Login

export const clientLogin = createAction(
  '[client]client Login',
  props<{ email: string; password: string }>()
);
//userdata :list of user for adminside
export const clientLoginSuccess = createAction(
  '[client] client Login Success',
  props<{
    validuser: boolean;
    message: string;
    userdata?: any[];
    userdetails?: any;

    clientDetails?: any;
  }>()
);
export const clientLoginFailure = createAction(
  '[client] client Login Failure',
  props<{ errorMessage: string; error: any }>()
);
export const clientLoginSuccessTrainer = createAction(
  '[client] Login Success if role Trainer'
);

//get workout lists

export const getworkoutlists = createAction(
  '[client] get workout listing',
  props<{ offset: number }>()
);

export const getworkoutlistsSuccess = createAction(
  '[client] get workout listing Success',
  props<{ workoutlist: any[] }>()
);

export const getworkoutlistsFailure = createAction(
  '[client] get workout listing Failure',
  props<{ error: any }>()
);
//get list of people in chat list
export const getChatList = createAction(
  '[client] get chat list',
  props<{ user_id: string }>()
);
export const getChatListSuccess = createAction(
  '[client] get chat list Success',
  props<{ clientChatList: clientChatList[] }>()
);
export const getChatListFailure = createAction(
  '[client] get chat list Failure',
  props<{ error: any }>()
);

//get messages
export const getMessageList = createAction(
  '[client] get messages',
  props<{
    senderemail: string;
    receiveremail: string;
  }>()
);
export const getMessageListSuccess = createAction(
  '[client] get messages Success',
  props<{ messagelist: any }>()
);
export const getMessageListFailure = createAction(
  '[client] get messages Failure',
  props<{ error: any }>()
);
//check For VedioSession

export const checkForVedioSession = createAction(
  '[client] check for vedio session ',
  props<{ user_id: string }>()
);
export const checkForVedioSessionSuccess = createAction(
  '[client] check for vedio session  successs',
  props<{ clientSessionDetails: any }>()
);
export const checkForVedioSessionFailure = createAction(
  '[client] check for vedio session failure ',
  props<{ error: any }>()
);

//get blog list for clients

export const getBlogListClients = createAction(
  '[client] get blog list for clients ',
  props<{ skip: number; limit: number }>()
);
export const getBlogListClientsSuccess = createAction(
  '[client] get blog list for clients   successs',
  props<{ blogList: any }>()
);
export const getBlogListClientsFailure = createAction(
  '[client] get blog list for clients failure ',
  props<{ error: any }>()
);

//get client trainer Details

export const getClientsTrainerDetails = createAction(
  '[client] Clients Trainer Details ',
  props<{ email: string }>()
);
export const getClientsTrainerDetailsSuccess = createAction(
  '[client] Clients Trainer Details successs',
  props<{ trainerData: any }>()
);
export const getClientsTrainerDetailsFailure = createAction(
  '[client] Clients Trainer Details failure ',
  props<{ error: any }>()
);
//add Testimonial

export const addTestimonial = createAction(
  '[client] add Testimonial ',
  props<{ content: string; user_id: string }>()
);
export const addTestimonialSuccess = createAction(
  '[client] add Testimonial successs',
  props<{ dataAdded: boolean }>()
);
export const addTestimonialFailure = createAction(
  '[client] add Testimonial failure ',
  props<{ error: any }>()
);
//getTestimonials

export const getTestimonials = createAction(
  '[client] get Testimonial ',
  props<{ trainerId: string }>()
);
export const getTestimonialsSuccess = createAction(
  '[client] get Testimonial successs',
  props<{ TestimonialData: any }>()
);
export const getTestimonialsFailure = createAction(
  '[client] get Testimonial failure ',
  props<{ error: any }>()
);
//addBackphoto
export const addBackPhoto = createAction(
  '[trainer] add Back photo ',
  props<{ formData: FormData }>()
);
export const addBackPhotoSuccess = createAction(
  '[trainer] add Back photo  success ',
  props<{ backPhotoUrl: string }>()
);
export const addBackPhotoFailure = createAction(
  '[trainer]add Back photo failure ',
  props<{ error: any }>()
);
//addSidephoto
export const addSidePhoto = createAction(
  '[trainer] add Side photo ',
  props<{ formData: FormData }>()
);
export const addSidePhotoSuccess = createAction(
  '[trainer] add Side photo  success ',
  props<{ sidePhotoUrl: string }>()
);
export const addSidePhotoFailure = createAction(
  '[trainer]add Side photo failure ',
  props<{ error: any }>()
);

//addFrontphoto
export const addFrontPhoto = createAction(
  '[trainer] add Front photo ',
  props<{ formData: FormData }>()
);
export const addFrontPhotoSuccess = createAction(
  '[trainer] add Front photo  success ',
  props<{ frontPhotoUrl: string }>()
);
export const addFrontPhotoFailure = createAction(
  '[trainer]add Front photo failure ',
  props<{ error: any }>()
);

///update progress

export const updateProgress = createAction(
  '[trainer] update Progress Data ',
  props<{ updatedData: any; _id: string }>()
);
export const updateProgressSuccess = createAction(
  '[trainer] update Progress success ',
  props<{ updated: boolean }>()
);
export const updateProgressFailure = createAction(
  '[trainer] update progress failure ',
  props<{ error: any }>()
);

export const bloglistSearch = createAction(
  '[client] get blog list search',
  props<{ query: string }>()
);
export const bloglistSearchSuccess = createAction(
  '[client] get blog list search  successs',
  props<{ blogList: any }>()
);
export const bloglistSearchFailure = createAction(
  '[client] get blog list search failure ',
  props<{ error: any }>()
);
