import { clientState } from './client.reducers';
import {
  createFeature,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

const selectClientState = createFeatureSelector<clientState>('client');
export const getworkoutlist = createSelector(
  selectClientState,
  (state: clientState) => state.workoutlist
);
export const getChatList = createSelector(
  selectClientState,
  (state: clientState) => state.clientChatList
);

export const getmessagelist = createSelector(
  selectClientState,
  (state: clientState) => state.messagelist
);

export const getclientSessionDetails = createSelector(
  selectClientState,
  (state: clientState) => state.clientSessionDetails
);

export const getclientBlogList = createSelector(
  selectClientState,
  (state: clientState) => state.blogList
);

export const gettrainerData = createSelector(
  selectClientState,
  (state: clientState) => state.trainerData
);

export const getTestimonialData = createSelector(
  selectClientState,
  (state: clientState) => state.TestimonialData
);

export const getBackPhotoUrl = createSelector(
  selectClientState,
  (state: clientState) => state.backPhotoUrl
);
export const getSidePhotoUrl = createSelector(
  selectClientState,
  (state: clientState) => state.sidePhotoUrl
);
export const getFrontPhotoUrl = createSelector(
  selectClientState,
  (state: clientState) => state.frontPhotoUrl
);
