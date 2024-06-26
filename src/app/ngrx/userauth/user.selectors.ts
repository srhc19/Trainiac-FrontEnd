import { userState } from './user.reducers';
import {
  createFeature,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

const selectuserState = createFeatureSelector<userState>('user');
export const getmessage = createSelector(
  selectuserState,
  (state: userState) => state.message
);
export const geterrormessage = createSelector(
  selectuserState,
  (state: userState) => state.errorMessage
);
export const getuserdata = createSelector(
  selectuserState,
  (state: userState) => state.userdata
);
export const geTrainerList = createSelector(
  selectuserState,
  (state: userState) => state.trainerlist
);
export const getTrainerDetails = createSelector(
  selectuserState,
  (state: userState) => state.trainerDetails
);
export const getClientDetails = createSelector(
  selectuserState,
  (state: userState) => state.clientDetails
);
export const gettrainersclientDetails = createSelector(
  selectuserState,
  (state: userState) => state.trainersclientDetails
);
