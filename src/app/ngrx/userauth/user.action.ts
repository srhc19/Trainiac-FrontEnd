import { createAction, props } from '@ngrx/store';
import { userState } from './user.reducers';

//register
export const register = createAction(
  '[user]register',
  props<{
    name: string;
    email: string;
    password: string;
    role: string;
    captcha: string | null;
  }>()
);
export const registerSuccess = createAction(
  '[user]register success',
  props<{ registered: boolean; message: string }>()
);
export const registerFailure = createAction(
  '[user]register Fail',
  props<{ error: any }>()
);
//login
export const login = createAction(
  '[user]login',
  props<{ email: string; password: string }>()
);
//userdata :list of user for adminside
export const loginSuccess = createAction(
  '[user]login success',
  props<{
    validuser: boolean;
    message: string;
    userdata?: any[];
    userdetails?: any;
    trainerDetails?: any;
    clientDetails?: any;
  }>()
);
export const loginSuccessTrainer = createAction(
  '[user]login success',
  props<{
    validuser: boolean;
    message: string;
    userdata?: any[];
    userdetails?: any;
    trainerDetails?: any;
  }>()
);
export const loginSuccessClient = createAction(
  '[user]login success',
  props<{
    validuser: boolean;
    message: string;
    userdata?: any[];
    userdetails?: any;

    clientDetails?: any;
  }>()
);
export const loginSuccessAdmin = createAction(
  '[user]login success',
  props<{ userdata: any[] }>()
);
export const loginFailure = createAction(
  '[user]login Fail',
  props<{ errorMessage: string; error: any }>()
);

export const getUserData = createAction(
  '[user] Get User Data',
  props<{ role: string; skip: Number; limit: Number }>()
);
export const getUserDataSuccess = createAction(
  '[user] Get User Data Success',
  props<{ userdata: any[] }>()
);
export const getUserDataFailure = createAction(
  '[user] Get User Data Failure',
  props<{ error: any }>()
);

//otp
export const verifyOtp = createAction(
  '[user] verify otp',
  props<{ otp: number }>()
);
export const verifyOtpsuccess = createAction(
  '[user] verify otp success',
  props<{ message: string }>()
);
export const verifyOtpFailure = createAction(
  '[user] otp failure',
  props<{ error: any }>()
);
//get trainerlist
export const getTrainersList = createAction(
  '[user] get trainer list',
  props<{ skip: number; limit: number }>()
);
export const getTrainerListSuccess = createAction(
  '[user] trainers list success',
  props<{ trainerlist: Array<any> }>()
);
export const getTrainerListFailure = createAction(
  '[user] trainers list failure',
  props<{ error: any }>()
);
//block/unblockuser

export const changeUserStatus = createAction(
  '[user] change User status',
  props<{ _id: any }>()
);
export const changeUserStatusSuccess = createAction(
  '[user] change User status success'
);
export const changeUserStatusFailure = createAction(
  '[user] change User status failure',
  props<{ error: any }>()
);
//resendOtp
export const resendOtp = createAction('[user] resend Otp');
export const resendOtpSuccess = createAction('[user] resendOtp success');
export const resendOtpFailure = createAction(
  '[user] resend Otp failure',
  props<{ error: any }>()
);
//verifyemail

export const verifyEmail = createAction(
  '[user] verify email',
  props<{ email: string }>()
);
export const verifyEmailSuccess = createAction('[user] verify email success');
export const verifyEmailFailure = createAction(
  '[user] verify email failure',
  props<{ error: any }>()
);

// verifyemailotp

export const verifyEmailOtp = createAction(
  '[user] get otp',
  props<{ otp: number }>()
);
export const verifyEmailOtpsuccess = createAction(
  '[user] verify otp success',
  props<{ message: string }>()
);
export const verifyEmailOtpFailure = createAction(
  '[user] otp failure',
  props<{ error: any }>()
);

//verifyResendOtp
export const verifyResendOtp = createAction('[user] verify resend Otp');
export const verifyResendOtpSuccess = createAction(
  '[user] verify resendOtp success'
);
export const verifyResendOtpFailure = createAction(
  '[user] verify  resend Otp failure',
  props<{ error: any }>()
);
//updatepassword
export const updatepassword = createAction(
  '[user] update password',
  props<{ newPassword: string }>()
);
export const updatePasswordSuccess = createAction(
  '[user] update password Success'
);
export const updatePasswordFailure = createAction(
  '[user] update password Failure',
  props<{ error: any }>()
);
// get current user data

export const getCurrentUserDetails = createAction(
  '[user] get current user details',
  props<{ _id: any,skip:number,limit:number }>()
);
export const getCurrentUserDetailsSuccess = createAction(
  '[user] get current user details Success',
  props<{ trainersclientDetails: any }>()
);
export const getCurrentUserDetailsFailure = createAction(
  '[user] get current user details Failure',
  props<{ error: any }>()
);
//get current user-trainer data
export const getCurrentTrainer = createAction(
  '[user] get current trainer',
  props<{ user_id: any }>()
);
export const getCurrentTrainerSuccess = createAction(
  '[user] get current trainer success',
  props<{ trainerDetails: any }>()
);
export const getCurrentTrainerFailure = createAction(
  '[user] get current trainer Failure',
  props<{ error: any }>()
);
//get client calender
export const getCurrentClient = createAction(
  '[user] get current client',
  props<{ user_id: any }>()
);
export const getCurrentClientSuccess = createAction(
  '[user] get current client Details',
  props<{ clientDetails: any }>()
);
export const getCurrentClientFailure = createAction(
  '[user] get  current client Details',
  props<{ error: any }>()
);

//trainer list Search

export const trainerlistSearch = createAction(
  '[user] trainer list Search',
  props<{ query: string }>()
);
export const trainerlistSearchSuccess = createAction(
  '[user] trainer list Search Success',
  props<{ trainerlist: Array<any> }>()
);
export const trainerlistSearchFailure = createAction(
  '[user] trainer list Search Failure',
  props<{ error: any }>()
);

//admin client Search
export const adminclientSearch = createAction(
  '[user] admin client Search',
  props<{ query: string }>()
);
export const adminclientSearchSuccess = createAction(
  '[user] admin client SearchSuccess',
  props<{ userdata: any[] }>()
);
export const adminclientSearchFailure = createAction(
  '[user] admin client Search Failure',
  props<{ error: any }>()
);
//admin Trainer Search

export const adminTrainerSearch = createAction(
  '[user] admin Trainer Search',
  props<{ query: string }>()
);
export const adminTrainerSearchSuccess = createAction(
  '[user] admin Trainer SearchSuccess',
  props<{ userdata: any[] }>()
);
export const adminTrainerSearchFailure = createAction(
  '[user] admin Trainer Search Failure',
  props<{ error: any }>()
);
