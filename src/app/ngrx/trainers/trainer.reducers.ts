import { State, createReducer, on } from '@ngrx/store';
import * as trainerActions from '../trainers/trainer.action';
import { register } from 'module';
import { initialState } from '../userauth/user.reducers';
import { userState } from '../userauth/user.reducers';
import * as trainerAction from '../trainers/trainer.action';
import {
  Blog,
  Client,
  ProgressData,
  trainerChatList,
} from './trainer.interface';

export interface trainerState extends userState {
  listofclient: Client[];
  trainerChatList: trainerChatList[];
  messagelist: Array<any>;
  isTrainer: boolean;
  adminBlogDetails: Blog[];
  blogContent: Blog;
  blogDetails: any;
  ProgressData: ProgressData[];
  progressDetails: ProgressData;
  sessionData: any;
  isClient: boolean;
  paymentData: any[];
  clientRequestList: any[];
  receiversImg: string;
}
export const trainerState: trainerState = {
  ...initialState,
  listofclient: [],
  trainerChatList: [],
  messagelist: [],
  isTrainer: false,
  adminBlogDetails: [],
  blogContent: {
    title: '',
    author: '',
    content: { paragraphs: [''] },
    user_id: '',
  },
  blogDetails: [],
  ProgressData: [],

  progressDetails: {
    createdAt: '',
    _id: '',
    user_id: '',
    currentWeight: 0,
    waist: 0,
    hips: 0,
    chest: 0,
    arms: 0,
    legs: 0,
    calves: 0,
    forearms: 0,
    bodyFatPercentage: 0,
    frontPhoto: '',
    sidePhoto: '',
    backPhoto: '',
  },
  sessionData: [],
  isClient: false,
  paymentData: [],
  clientRequestList: [],
  receiversImg: '',
};

export const trainerReducer = createReducer(
  trainerState,
  on(trainerAction.getClientListSuccess, (state, { listofclient }) => ({
    ...state,
    listofclient,
  })),
  on(trainerAction.getChatListTrainerSuccess, (state, { trainerChatList }) => ({
    ...state,
    trainerChatList,
  })),
  on(trainerAction.getMessageListTrainerSuccess, (state, { messagelist }) => ({
    ...state,
    messagelist,
  })),
  on(trainerAction.checkIfTrainerSuccess, (state, { isTrainer }) => ({
    ...state,
    isTrainer,
  })),
  on(trainerAction.getBlogDetailsSuccess, (state, { adminBlogDetails }) => ({
    ...state,
    adminBlogDetails,
  })),
  on(trainerAction.viewBlogContentSuccess, (state, { blogContent }) => ({
    ...state,
    blogContent,
  })),
  on(trainerAction.publishBlogSuccess, (state, { blogContent }) => ({
    ...state,
    blogContent,
  })),
  on(trainerAction.cancelBlogSuccess, (state, { blogContent }) => ({
    ...state,
    blogContent,
  })),
  on(trainerAction.currentTrainerBlogListSuccess, (state, { blogDetails }) => ({
    ...state,
    blogDetails,
  })),
  on(trainerAction.getProgressDataSuccess, (state, { ProgressData }) => ({
    ...state,
    ProgressData,
  })),
  on(trainerAction.getprogressDetailsSuccess, (state, { progressDetails }) => ({
    ...state,
    progressDetails,
  })),
  on(trainerAction.getSessionListSuccess, (state, { sessionData }) => ({
    ...state,
    sessionData,
  })),
  on(trainerAction.checkIfClientSuccess, (state, { isClient }) => ({
    ...state,
    isClient,
  })),
  on(trainerAction.adminBlogSearchSuccess, (state, { adminBlogDetails }) => ({
    ...state,
    adminBlogDetails,
  })),
  on(trainerAction.getPaymentDataSuccess, (state, { paymentData }) => ({
    ...state,
    paymentData,
  })),
  on(
    trainerAction.getclientsRequestSuccess,
    (state, { clientRequestList }) => ({
      ...state,
      clientRequestList,
    })
  ),
  on(
    trainerAction.clientRequestSearchSuccess,
    (state, { clientRequestList }) => ({
      ...state,
      clientRequestList,
    })
  ),
  on(trainerAction.messageReciversImgSuccess, (state, { receiversImg }) => ({
    ...state,
    receiversImg,
  }))
);
