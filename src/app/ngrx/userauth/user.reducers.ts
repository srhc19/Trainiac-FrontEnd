import { State, createReducer, on } from '@ngrx/store';
import * as userActions from '../userauth/user.action';
import { register } from 'module';

export interface userState {
  name: string;
  email: string;

  role: string;
  registered: boolean;
  message: string;
  errorMessage: string;
  userdata: Array<any>;
  trainerlist: Array<any>;
  userdetails: any;
  clientDetails: any;
  trainerDetails: any;
  trainersclientDetails: any;
}
export const initialState: userState = {
  name: '',
  email: '',

  role: '',
  registered: false,
  message: '',
  errorMessage: '',
  userdata: [],
  trainerlist: [],
  userdetails: {},
  clientDetails: {},
  trainerDetails: {},
  trainersclientDetails: [],
};

export const userReducer = createReducer(
  initialState,
  on(userActions.registerSuccess, (state, { registered, message }) => ({
    ...state,
    registered,
    message,
  })),
  on(userActions.loginFailure, (state, { errorMessage, error }) => ({
    ...state,
    errorMessage,
    error,
  })),
  on(userActions.loginSuccessAdmin, (state, { userdata }) => ({
    ...state,

    userdata,
  })),
  on(userActions.getUserDataSuccess, (state, { userdata }) => ({
    ...state,
    userdata,
  })),
  on(userActions.getTrainerListSuccess, (state, { trainerlist }) => ({
    ...state,
    trainerlist,
  })),
  on(userActions.verifyOtpsuccess, (state, { message }) => ({
    ...state,
    message,
  })),
  on(userActions.verifyOtp, (state) => ({
    ...state,
    message: '',
  })),
  on(userActions.register, (state) => ({
    ...state,
    message: '',
  })),
  on(
    userActions.loginSuccessClient,
    (state, { userdetails, clientDetails }) => ({
      ...state,
      userdetails,
      clientDetails,
    })
  ),
  on(
    userActions.loginSuccessTrainer,
    (state, { userdetails, trainerDetails }) => ({
      ...state,
      userdetails,
      trainerDetails,
    })
  ),
  on(
    userActions.getCurrentUserDetailsSuccess,
    (state, { trainersclientDetails }) => ({
      ...state,
      trainersclientDetails,
    })
  ),
  on(userActions.getCurrentTrainerSuccess, (state, { trainerDetails }) => ({
    ...state,

    trainerDetails,
  })),
  on(userActions.getCurrentClientSuccess, (state, { clientDetails }) => ({
    ...state,

    clientDetails,
  })),
  on(userActions.trainerlistSearchSuccess, (state, { trainerlist }) => ({
    ...state,

    trainerlist,
  })),
  on(userActions.adminclientSearchSuccess, (state, { userdata }) => ({
    ...state,

    userdata,
  })),
  on(userActions.adminTrainerSearchSuccess, (state, { userdata }) => ({
    ...state,

    userdata,
  }))
);
