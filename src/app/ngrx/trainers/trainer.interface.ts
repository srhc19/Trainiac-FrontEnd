export interface addnewClientInterface {
  message: string;
  valid: boolean;
}
export interface Client {
  name: string;
  client_id: string;
  email: string;
}
export interface listofclientinterface {
  message: string;
  clientData: Client[];

  valid?: boolean;
}

export interface exercises {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}
export interface trainerChatList {
  name: string;
  email: string;
  _id: string;
  bio: string;
  profileimage: string;
}
export interface Blog {
  title: string;
  author: string;
  content: {
    paragraphs: string[];
  };
  user_id: string;
  _id?: string;
  status?: string;
  imagePath?: string;
}

export interface ProgressData {
  createdAt: string;
  _id: string;
  user_id: string;
  currentWeight: number;
  waist: number;
  hips: number;
  chest: number;
  arms: number;
  legs: number;
  calves: number;
  forearms: number;
  bodyFatPercentage: number;
  frontPhoto: string;
  sidePhoto: string;
  backPhoto: string;

  __v?: number;
}

export interface VideoSession {
  _id: string;
  trainerId: string;
  clientsId: string[];
  startedAt: Date;
  endedAt: Date;
  currentDate: string;
  randomId: string;
  __v: number;
}
export interface UserProfile {
  email: string;
  name: string;
  Bio: string;
}
