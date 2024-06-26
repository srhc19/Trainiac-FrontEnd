import { createAction, props } from '@ngrx/store';
import {
  Blog,
  Client,
  ProgressData,
  exercises,
  listofclientinterface,
  trainerChatList,
} from './trainer.interface';

//add new client to trainers clientlist
export const addnewClient = createAction(
  '[trainer] add new client ',
  props<{ trainerid: string; clientName: string; clientEmail: string }>()
);
export const addnewClientSuccess = createAction(
  '[trainer] add new client success ',
  props<{ message: String }>()
);
export const addnewClientFailure = createAction(
  '[trainer] add new client  Failure',
  props<{ error: any }>()
);
//get client list to show in trainers calender

export const getClientList = createAction(
  '[trainer] get Client list',
  props<{ trainerid: string }>()
);
export const getClientListSuccess = createAction(
  '[trainer] get Client list Success',
  props<{ listofclient: Client[] }>()
);
export const getClientListFailure = createAction(
  '[trainer] get Client list Failure',
  props<{ error: any }>()
);
//add cardio workout to client
export const addCardioWorkout = createAction(
  '[trainer] add cardio workout',
  props<{
    trainerid: string;
    clientemail: string;
    workoutDate: Date;
    activity: string;
    intensity: string;
    duration: string;
  }>()
);
export const addCardioWorkoutSuccess = createAction(
  '[trainer] add cardio workout Success',
  props<{
    message: String;
    workoutAdded?: boolean;
  }>()
);
export const addCardioWorkoutFailure = createAction(
  '[trainer] add cardio workout Failure',
  props<{
    error: any;
  }>()
);
//add Gym Workout to client
export const addGymWorkout = createAction(
  '[trainer] add gym workout',
  props<{
    clientEmail: string;
    exercises: Array<exercises>;
    targetMuscleGroup: string;
    workoutDate: string;
  }>()
);
export const addGymWorkoutSuccess = createAction(
  '[trainer] add gym workout Success',
  props<{
    message: String;
    workoutAdded?: boolean;
  }>()
);
export const addGymWorkoutFailure = createAction(
  '[trainer] add gym workout Failure',
  props<{
    error: any;
  }>()
);

//add Yoga Workout to clients
export const addYogaWorkout = createAction(
  '[trainer] add Yoga workout',
  props<{
    clientEmail: string;
    workoutDate: string;
    activity: string;
    duration: string;
  }>()
);
export const addYogaWorkoutSuccess = createAction(
  '[trainer] add Yoga workout Success',
  props<{
    message: String;
    workoutAdded?: boolean;
  }>()
);
export const addYogaWorkoutFailure = createAction(
  '[trainer] add Yoga workout Failure',
  props<{
    error: any;
  }>()
);
//Remove workout routine
export const removeWorkout = createAction(
  '[trainer] remove workout from client calender',
  props<{ formattedDate: string; user_id: string }>()
);
export const removeWorkoutSuccess = createAction(
  '[trainer] remove workout from client calender success',
  props<{ clientDetail: any }>()
);

export const removeWorkoutFailure = createAction(
  '[trainer] remove workout from client calender failure',
  props<{ error: any }>()
);

//update Trainer  Profile

export const updateTrainerProfile = createAction(
  '[trainer] update Trainer  Profile',
  props<{
    formData: any;
  }>()
);
export const updateTrainerProfileSuccess = createAction(
  '[trainer] update Trainer  Profile',
  props<{
    message: String;
    workoutAdded?: boolean;
  }>()
);
export const updateTrainerProfileFailure = createAction(
  '[trainer] update Trainer  Profile Failure',
  props<{
    error: any;
  }>()
);

// trainer login

export const trainerLogin = createAction(
  '[trainer] Trainer Login',
  props<{ email: string; password: string }>()
);
//userdata :list of user for adminside
export const trainerLoginSuccess = createAction(
  '[trainer] Trainer Login Success',
  props<{
    validuser: boolean;
    message: string;
    userdata?: any[];
    userdetails?: any;
    trainerDetails?: any;
  }>()
);

export const trainerLoginFailure = createAction(
  '[trainer]Trainer Login Failure',
  props<{ errorMessage: string; error: any }>()
);
export const trainerLoginSuccessClient = createAction(
  '[trainer]Trainer Login Success if role client'
);
//get list of people in chat list
export const getChatListTrainer = createAction(
  '[trainer get chat list trainer',
  props<{ user_id: string }>()
);
export const getChatListTrainerSuccess = createAction(
  '[trainer] get chat list trainer Success',
  props<{ trainerChatList: trainerChatList[] }>()
);
export const getChatListTrainerFailure = createAction(
  '[trainer] get chat list trainer Failure',
  props<{ error: any }>()
);
//get messages
export const getMessageListTrainer = createAction(
  '[trainer] get messages trainer',
  props<{
    senderemail: string;
    receiveremail: string;
  }>()
);
export const getMessageListTrainerSuccess = createAction(
  '[trainer] get messages trainer Success',
  props<{ messagelist: any }>()
);
export const getMessageListTrainerFailure = createAction(
  '[trainer] get messages trainer Failure',
  props<{ error: any }>()
);

// add vedio session details to db

export const startVedioSession = createAction(
  '[trainer] store vedio session details in db',
  props<{
    vedioSessionClientsId: string[];
    trainer_id: string;
    randomid: any;
  }>()
);
export const startVedioSessionSuccess = createAction(
  '[trainer] store vedio session details in db success',
  props<{ sessionAdded: boolean }>()
);
export const startVedioSessionFailure = createAction(
  '[trainer] store vedio session details in db failure',
  props<{ error: any }>()
);

//getCurrentVedioCall

export const getCurrentVedioCallId = createAction(
  '[trainer] get current vedio Call details in db',
  props<{ trainer_Id: string }>()
);
export const getCurrentVedioCallIdSuccess = createAction(
  '[trainer] get current vedio Call details in db success',
  props<{ vedioCallId: string }>()
);
export const getCurrentVedioCallIdFailure = createAction(
  '[trainer] get current vedio Call details in db failure',
  props<{ error: any }>()
);

export const checkIfTrainer = createAction(
  '[trainer] check if Trainer',
  props<{ trainer_Id: string }>()
);
export const checkIfTrainerSuccess = createAction(
  '[trainer] check if trainer success',
  props<{ isTrainer: boolean }>()
);
export const checkIfTrainerFailure = createAction(
  '[trainer] check if trainer failure',
  props<{ error: any }>()
);

// Update session
export const updateSession = createAction(
  '[trainer] Update session details',
  props<{ randomId: string; trainer_Id: string }>()
);
export const updateSessionSuccess = createAction(
  '[trainer]  Update session details'
);
export const updateSessionFailure = createAction(
  '[trainer] check if trainer failure',
  props<{ error: any }>()
);
//add blog

export const addBlog = createAction(
  '[trainer] Add blogs ',
  props<{ formData: FormData }>()
);
export const addBlogSuccess = createAction(
  '[trainer]  Add blog successs',
  props<{ blogAdded: boolean }>()
);
export const addBlogFailure = createAction(
  '[trainer] Add blog Trainer',
  props<{ error: any }>()
);

//Admin get blog details
export const getBlogDetails = createAction(
  '[trainer]  get blog details admin',
  props<{ skip: number; limit: number }>()
);
export const getBlogDetailsSuccess = createAction(
  '[trainer]  get blog details admin success',
  props<{ adminBlogDetails: any }>()
);
export const getBlogDetailsFailure = createAction(
  '[trainer]  get blog details admin failure',
  props<{ error: any }>()
);

// view Blog Content by admin

export const viewBlogContent = createAction(
  '[trainer]  view blog content',
  props<{ _id: string }>()
);
export const viewBlogContentSuccess = createAction(
  '[trainer]  view blog content success',
  props<{ blogContent: any }>()
);
export const viewBlogContentFailure = createAction(
  '[trainer] view blog content failure',
  props<{ error: any }>()
);

//publish blog

export const publishBlog = createAction(
  '[trainer]  publish blog content',
  props<{ _id: string }>()
);
export const publishBlogSuccess = createAction(
  '[trainer]  publish blog content success',
  props<{ message: string; blogContent: Blog }>()
);
export const publishBlogFailure = createAction(
  '[trainer] publish blog content failure',
  props<{ error: any }>()
);
//cancel Blog

export const cancelBlog = createAction(
  '[trainer]  cancel blog content',
  props<{ _id: string; note: string }>()
);
export const cancelBlogSuccess = createAction(
  '[trainer]  cancel blog content success',
  props<{ message: string; blogContent: Blog }>()
);
export const cancelBlogFailure = createAction(
  '[trainer] cancel blog content failure',
  props<{ error: any }>()
);
//current Trainer BlogList

export const currentTrainerBlogList = createAction(
  '[trainer]  current Trainer BlogList',
  props<{ user_id: string; skip: number; limit: number }>()
);
export const currentTrainerBlogListSuccess = createAction(
  '[trainer]  current Trainer Blog List Success',
  props<{ blogDetails: Blog }>()
);
export const currentTrainerBlogListFailure = createAction(
  '[trainer] current Trainer Blog List failure',
  props<{ error: any }>()
);

//Add client Progress Data

export const addProgress = createAction(
  '[trainer]  add Progress data',
  props<{ formData: FormData }>()
);
export const addProgressSuccess = createAction(
  '[trainer]  add Progress data Success',
  props<{ message: string }>()
);
export const addProgressFailure = createAction(
  '[trainer] add Progress datafailure',
  props<{ error: any }>()
);
//get Progress Data

export const getProgressData = createAction(
  '[trainer]  get Progress Data',
  props<{ user_id: string }>()
);
export const getProgressDataSuccess = createAction(
  '[trainer] get Progress Data Success',
  props<{ ProgressData: ProgressData[] }>()
);
export const getProgressDataFailure = createAction(
  '[trainer] get Progress Data',
  props<{ error: any }>()
);

export const getprogressDetails = createAction(
  '[trainer]  get Progress Details',
  props<{ _id: string }>()
);
export const getprogressDetailsSuccess = createAction(
  '[trainer] get Progress Details Success',
  props<{ progressDetails: ProgressData }>()
);
export const getprogressDetailsFailure = createAction(
  '[trainer] get Progress Details Failure',
  props<{ error: any }>()
);

//get Session List for admin

export const getSessionList = createAction('[trainer] get Session list ');
export const getSessionListSuccess = createAction(
  '[trainer] get Session list success ',
  props<{ sessionData: any }>()
);
export const getSessionListFailure = createAction(
  '[trainer] get Session list failure ',
  props<{ error: any }>()
);

// check if client

export const checkIfClient = createAction(
  '[trainer] check if client ',
  props<{ id: string }>()
);
export const checkIfClientSuccess = createAction(
  '[trainer] check if client  success ',
  props<{ isClient: boolean }>()
);
export const checkIfClientFailure = createAction(
  '[trainer] check if client failure ',
  props<{ error: any }>()
);
//admin Blog Search
export const adminBlogSearch = createAction(
  '[trainer]  admin blog search',
  props<{ query: string }>()
);
export const adminBlogSearchSuccess = createAction(
  '[trainer]  admin blog search success',
  props<{ adminBlogDetails: any }>()
);
export const adminBlogSearchFailure = createAction(
  '[trainer]  admin blog search failure',
  props<{ error: any }>()
);
//admin Session Search
export const adminSessionSearch = createAction(
  '[trainer] admin Session Search ',
  props<{ query: string }>()
);
export const adminSessionSearchSuccess = createAction(
  '[trainer] admin Session Search success ',
  props<{ sessionData: any }>()
);
export const adminSessionSearchFailure = createAction(
  '[trainer] admin Session Search failure ',
  props<{ error: any }>()
);
//get payment data

export const getPaymentData = createAction(
  '[trainer] get payment Data ',
  props<{ limit: number; skip: number }>()
);
export const getPaymentDataSuccess = createAction(
  '[trainer] get payment Data success ',
  props<{ paymentData: any[] }>()
);
export const getPaymentDataFailure = createAction(
  '[trainer] get payment Data failure ',
  props<{ error: any }>()
);
//remove Certificate Images({certImage,user_id}))

export const removeCertificateImages = createAction(
  '[trainer] remove Certificate Images ',
  props<{ certImage: any; user_id: string }>()
);
export const removeCertificateImagesSuccess = createAction(
  '[trainer] remove Certificate Images success'
);
export const removeCertificateImagesFailure = createAction(
  '[trainer] remove Certificate Images failure ',
  props<{ error: any }>()
);
//send request to trainer

export const sendRequestTrainer = createAction(
  '[trainer] send request to trainer ',
  props<{ client_id: string; trainer_id: string }>()
);
export const sendRequestTrainerSuccess = createAction(
  '[trainer] send request to trainer success'
);
export const sendRequestTrainerFailure = createAction(
  '[trainer] send request to trainer failure ',
  props<{ error: any }>()
);
// get trainer request

export const getclientsRequest = createAction(
  '[trainer] get clients Request ',
  props<{ user_id: string }>()
);
export const getclientsRequestSuccess = createAction(
  '[trainer] get clients Request success',
  props<{ clientRequestList: any }>()
);
export const getclientsRequestFailure = createAction(
  '[trainer] get clients Request failure ',
  props<{ error: any }>()
);
//accept Client Request

export const acceptClientRequest = createAction(
  '[trainer] accept clients Request ',
  props<{ client_id: string; trainer_id: string }>()
);
export const acceptClientRequestSuccess = createAction(
  '[trainer] accept clients Request success'
);
export const acceptClientRequestFailure = createAction(
  '[trainer] accept clients Request failure ',
  props<{ error: any }>()
);
//remove Client Request
export const removeClientRequest = createAction(
  '[trainer] remove clients Request ',
  props<{ client_id: string; trainer_id: string }>()
);
export const removeClientRequestSuccess = createAction(
  '[trainer] remove clients Request success'
);
export const removeClientRequestFailure = createAction(
  '[trainer] remove clients Request failure ',
  props<{ error: any }>()
);
//client  Request  Search in trainer

export const clientRequestSearch = createAction(
  '[trainer]  client Request search ',
  props<{ query: string }>()
);
export const clientRequestSearchSuccess = createAction(
  '[trainer]  clients Request search success',
  props<{ clientRequestList: any }>()
);
export const clientRequestSearchFailure = createAction(
  '[trainer] clients Request search failure ',
  props<{ error: any }>()
);
// get message Recivers Img

export const messageReciversImg = createAction(
  '[trainer]  get message Recivers Img ',
  props<{ receiveremail: string }>()
);
export const messageReciversImgSuccess = createAction(
  '[trainer]  clients Request search success',
  props<{ receiversImg: string }>()
);
export const messageReciversImgFailure = createAction(
  '[trainer] clients Request search failure ',
  props<{ error: any }>()
);
//addMessageList({receiver_id,currentuser_id}))
export const addMessageList = createAction(
  '[trainer]  add Message List  ',
  props<{ receiver_id: string; currentuser_id: string }>()
);
export const addMessageListSuccess = createAction(
  '[trainer]  add Message List success'
);
export const addMessageListFailure = createAction(
  '[trainer] add Message List failure ',
  props<{ error: any }>()
);
