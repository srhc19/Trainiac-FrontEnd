import { State, createReducer, on } from '@ngrx/store';
import * as clientActions from '../clients/client.action';
import { register } from 'module';
import { initialState } from '../userauth/user.reducers';
import { userState } from '../userauth/user.reducers';
import { state } from '@angular/animations';
import { clientChatList } from './client.interface';

export interface clientState extends userState {
  workoutlist: Array<any>;
  clientChatList: Array<clientChatList>;
  messagelist: Array<any>;
  clientSessionDetails: any;
  blogList: any[];
  trainerData: any;
  TestimonialData: any;
  backPhotoUrl: string;
  sidePhotoUrl: string;
  frontPhotoUrl: string;
}
export const clientState: clientState = {
  ...initialState,
  workoutlist: [],
  clientChatList: [],
  messagelist: [],
  clientSessionDetails: [],
  blogList: [],
  trainerData: {},
  TestimonialData: [],
  backPhotoUrl: '',
  sidePhotoUrl: '',
  frontPhotoUrl: '',
};

export const clientReducer = createReducer(
  clientState,
  on(clientActions.getworkoutlistsSuccess, (state, { workoutlist }) => ({
    ...state,
    workoutlist,
  })),
  on(clientActions.getChatListSuccess, (state, { clientChatList }) => ({
    ...state,
    clientChatList,
  })),
  on(clientActions.getMessageListSuccess, (state, { messagelist }) => ({
    ...state,
    messagelist,
  })),
  on(
    clientActions.checkForVedioSessionSuccess,
    (state, { clientSessionDetails }) => ({
      ...state,
      clientSessionDetails,
    })
  ),
  on(clientActions.getBlogListClientsSuccess, (state, { blogList }) => ({
    ...state,
    blogList,
  })),
  on(
    clientActions.getClientsTrainerDetailsSuccess,
    (state, { trainerData }) => ({
      ...state,
      trainerData,
    })
  ),
  on(clientActions.getTestimonialsSuccess, (state, { TestimonialData }) => ({
    ...state,
    TestimonialData,
  })),
  on(clientActions.addBackPhotoSuccess, (state, { backPhotoUrl }) => ({
    ...state,
    backPhotoUrl,
  })),
  on(clientActions.addFrontPhotoSuccess, (state, { frontPhotoUrl }) => ({
    ...state,
    frontPhotoUrl,
  })),
  on(clientActions.addSidePhotoSuccess, (state, { sidePhotoUrl }) => ({
    ...state,
    sidePhotoUrl,
  })),
  on(clientActions.bloglistSearchSuccess, (state, { blogList }) => ({
    ...state,
    blogList,
  }))
);
