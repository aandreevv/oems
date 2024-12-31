import {AuthUserDataModel} from "../../models/auth.model";
import { Action } from "@ngrx/store";
import {Profile, UserDataResponse} from "../../models/user.model";
import {UserConnection, UserInterest} from "../../models/profile.model";

export enum UserActionTypes {
  LoginFetch = '[User] Login Fetch',
  LoginFetched = '[User] Login Fetched',
  LoginFailed = '[User] Login Failed',
  UserDataFetch = '[User] User Data Fetch',
  UserDataFetched = '[User] User Data Fetched',
  UserDataFailed = '[User] User Data Failed',
  Logout = '[User] Logout',
  SetUpProfileFetch = '[User] SetUp Profile Fetch',
  SetUpProfileFetched = '[User] SetUp Profile Fetched',
  SetUpProfileFailed = '[User] SetUp Profile Failed',
  RegisterFetch = '[User] Register Fetch',
  RegisterFetched = '[User] Register Fetched',
  EditProfileFetch = '[User] EditProfile Fetch',
  ConnectionsFetch = '[User] Connections Fetch',
  ConnectionsFetched = '[User] Connections Fetched',
  ConnectionsFailed = '[User] Connections Failed',
  InterestsFetch = '[User] Interests Fetch',
  InterestsFetched = '[User] Interests Fetched',
  InterestsFailed = '[User] Interests Failed',
  FollowersFetch = '[User] Followers Fetch',
  FollowersFetched = '[User] Followers Fetched',
  FollowersFailed = '[User] Followers Failed',
  FollowingsFetch = '[User] Following Fetch',
  FollowingsFetched = '[User] Following Fetched',
  FollowingsFailed = '[User] Following Failed',
  SetUserPhotoFetch = '[User] Set User Photo Fetch',
  SetUserPhotoFetched = '[User] Set User Photo Fetched',
}

export class LoginFetchAction implements Action {
  readonly type = UserActionTypes.LoginFetch;

  constructor(public payload: AuthUserDataModel) {}
}

export class LoginFetchedAction implements Action {
  readonly type = UserActionTypes.LoginFetched;
}

export class LoginFailedAction implements Action {
  readonly type = UserActionTypes.LoginFailed;
  constructor(public payload: string) {
  }
}

export class UserDataFetchAction implements Action {
  readonly type = UserActionTypes.UserDataFetch;
}

export class UserDataFetchedAction implements Action {
  readonly type = UserActionTypes.UserDataFetched;

  constructor(public payload: UserDataResponse) {}
}

export class UserDataFailedAction implements Action {
  readonly type = UserActionTypes.UserDataFailed;
}

export class LogoutAction implements Action {
  readonly type = UserActionTypes.Logout;
}

export class SetUpProfileFetchAction implements Action {
  readonly type = UserActionTypes.SetUpProfileFetch;
  constructor(public payload: { profile: Profile, interests: string[] }) {}
}

export class SetUpProfileFetchedAction implements Action {
  readonly type = UserActionTypes.SetUpProfileFetched;
  constructor(public payload: UserDataResponse) {}
}

export class SetUpProfileFailedAction implements Action {
  readonly type = UserActionTypes.SetUpProfileFailed;
}

export class RegisterFetchAction implements Action {
  readonly type = UserActionTypes.RegisterFetch;
  constructor(public payload: AuthUserDataModel) {}
}

export class RegisterFetchedAction implements Action {
  readonly type = UserActionTypes.RegisterFetched;
  constructor(public payload: boolean) {}
}

export class EditProfileFetchAction implements Action {
  readonly type = UserActionTypes.EditProfileFetch;
  constructor(public payload: Partial<Profile>) {}
}

export class ConnectionsFetchAction implements Action {
  readonly type = UserActionTypes.ConnectionsFetch;
  constructor(public payload: string) {}
}

export class ConnectionsFetchedAction implements Action {
  readonly type = UserActionTypes.ConnectionsFetched;
  constructor(public payload: UserConnection[]) {}
}

export class ConnectionsFailedAction implements Action {
  readonly type = UserActionTypes.ConnectionsFailed;
}

export class InterestsFetchAction implements Action {
  readonly type = UserActionTypes.InterestsFetch;
  constructor(public payload: string) {}
}

export class InterestsFetchedAction implements Action {
  readonly type = UserActionTypes.InterestsFetched;
  constructor(public payload: UserInterest[]) {}
}

export class InterestsFailedAction implements Action {
  readonly type = UserActionTypes.InterestsFailed;
}

export class FollowersFetchAction implements Action {
  readonly type = UserActionTypes.FollowersFetch;
  constructor(public payload: string) {}
}

export class FollowersFetchedAction implements Action {
  readonly type = UserActionTypes.FollowersFetched;
  constructor(public payload: UserDataResponse[]) {}
}

export class FollowersFailedAction implements Action {
  readonly type = UserActionTypes.FollowersFailed;
}

export class FollowingsFetchAction implements Action {
  readonly type = UserActionTypes.FollowingsFetch;
  constructor(public payload: string) {}
}

export class FollowingsFetchedAction implements Action {
  readonly type = UserActionTypes.FollowingsFetched;
  constructor(public payload: UserDataResponse[]) {}
}

export class FollowingsFailedAction implements Action {
  readonly type = UserActionTypes.FollowingsFailed;
}

export class SetUserPhotoFetchAction implements Action {
  readonly type = UserActionTypes.SetUserPhotoFetch;
  constructor(public payload: { image: File }) {}
}

export class SetUserPhotoFetchedAction implements Action {
  readonly type = UserActionTypes.SetUserPhotoFetched;
  constructor(public payload: UserDataResponse) {}
}

export type UserActions =
  | LoginFetchAction
  | LoginFetchedAction
  | LoginFailedAction
  | UserDataFetchAction
  | UserDataFetchedAction
  | UserDataFailedAction
  | LogoutAction
  | SetUpProfileFetchAction
  | SetUpProfileFetchedAction
  | SetUpProfileFailedAction
  | RegisterFetchAction
  | RegisterFetchedAction
  | EditProfileFetchAction
  | ConnectionsFetchAction
  | ConnectionsFetchedAction
  | ConnectionsFailedAction
  | InterestsFetchAction
  | InterestsFetchedAction
  | InterestsFailedAction
  | FollowersFetchAction
  | FollowersFetchedAction
  | FollowersFailedAction
  | FollowingsFetchAction
  | FollowingsFetchedAction
  | FollowingsFailedAction
  | SetUserPhotoFetchAction
  | SetUserPhotoFetchedAction;
