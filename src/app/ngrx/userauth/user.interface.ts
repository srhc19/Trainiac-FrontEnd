export interface registerResponse {
  message: string;
  registered: boolean;
}

export interface loginResponse {
  message: string;
  validuser: boolean;
  isAdmin: boolean;
  userdata: Array<any>;
  AccessToken: string;
  role: string;
  userdetails: any;
  trainerDetails?: any;
  clientDetails?: any;
}

export interface getUserData {
  userdata: Array<any>;
}
