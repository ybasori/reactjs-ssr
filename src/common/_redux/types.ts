interface Payload {
  data?: any;
  msg?: string;
  id?: string & number;
}
export interface Action {
  payload: Payload;
  type: string;
}

export interface AuthState {
  isLoadingPostAuthAuthenticate: boolean;
  auth: any;
  errorPostAuthAuthenticate: any;
}

export interface BlogState {
  isLoadingGetBlogIndex: boolean;
  successGetBlogIndex: any;
  errorGetBlogIndex: any;
  isLoadingGetBlogShow: boolean;
  successGetBlogShow: any;
  errorGetBlogShow: any;
  isLoadingPostBlogStore: boolean;
  successPostBlogStore: any;
  errorPostBlogStore: any;
  isLoadingPutBlogUpdate: boolean;
  successPutBlogUpdate: any;
  errorPutBlogUpdate: any;
  isLoadingDeleteBlogDelete: boolean;
  successDeleteBlogDelete: any;
  errorDeleteBlogDelete: any;
}

export interface SignupState {
  isLoadingPostSignupRegister: boolean;
  successPostSignupRegister: any;
  errorPostSignupRegister: any;
}

export interface Reducers {
  auth: AuthState;
  blog: BlogState;
  signup: SignupState;
}
