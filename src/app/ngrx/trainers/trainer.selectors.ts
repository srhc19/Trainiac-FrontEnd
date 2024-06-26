import { trainerState } from './trainer.reducers';
import {
  createFeature,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

const selectTrainerState = createFeatureSelector<trainerState>('trainer');
export const getlistOfClients = createSelector(
  selectTrainerState,
  (state: trainerState) => state.listofclient
);
export const getChatList = createSelector(
  selectTrainerState,
  (state: trainerState) => state.trainerChatList
);
export const getmessagelist = createSelector(
  selectTrainerState,
  (state: trainerState) => state.messagelist
);

export const getisTrainer = createSelector(
  selectTrainerState,
  (state: trainerState) => state.isTrainer
);

export const getadminBlogDetails = createSelector(
  selectTrainerState,
  (state: trainerState) => state.adminBlogDetails
);

export const getBlogContent = createSelector(
  selectTrainerState,
  (state: trainerState) => state.blogContent
);
export const getcurrentTrainerBlogList = createSelector(
  selectTrainerState,
  (state: trainerState) => state.blogDetails
);
export const getProgressData = createSelector(
  selectTrainerState,
  (state: trainerState) => state.ProgressData
);

export const getprogressDetails = createSelector(
  selectTrainerState,
  (state: trainerState) => state.progressDetails
);

export const getSessionData = createSelector(
  selectTrainerState,
  (state: trainerState) => state.sessionData
);

export const getisClient = createSelector(
  selectTrainerState,
  (state: trainerState) => state.isClient
);
export const getpaymentData = createSelector(
  selectTrainerState,
  (state: trainerState) => state.paymentData
);

export const getclientRequestList = createSelector(
  selectTrainerState,
  (state: trainerState) => state.clientRequestList
);

export const getReceiversImg = createSelector(
  selectTrainerState,
  (state: trainerState) => state.receiversImg
);
