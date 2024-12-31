import {UserConnection, UserInterest} from "./profile.model";

export interface UserModel {
  user: UserStateModel | null;
  isLoggedIn: boolean | null;
  isLoading: boolean;
  errorMessage: string;
  connections: UserConnectionStateModel;
  interests: UserInterestStateModel;
  followers: UserFollowers;
  followings: UserFollowings;
}

export interface UserConnectionStateModel {
  connections: UserConnection[];
  isLoading: boolean;
}

export interface UserInterestStateModel {
  interests: UserInterest[];
  isLoading: boolean;
}

export interface UserFollowers {
  followers: UserStateModel[];
  isLoading: boolean;
}

export interface UserFollowings {
  followings: UserStateModel[];
  isLoading: boolean;
}

export enum Language {
  UKRAINIAN = 'UKRAINIAN',
  ENGLISH = 'ENGLISH',
}

export interface UserStateModel {
  id: string;
  email: string;
  fullName: string;
  username: string;
  language: Language;
  dateOfBirth: string;
  bio: string;
  picture: string;
  phoneNumber: string;
  followers: number;
  followings: number;
  events: number;
}

export interface UserDataResponse {
  id: string;
  email: string;
  profile: Profile,
}

export interface Profile {
  fullName: string;
  username: string;
  dateOfBirth: string;
  phoneNumber: string;
  language: Language;
  bio: string;
  picture: string;
  data: {
    followers: number;
    followings: number;
    events: number;
    followed?: boolean;
  }
}

export interface ProfileSmall {
  fullName: string;
  username: string;
  dateOfBirth: string;
  phoneNumber: string;
  language: Language;
  bio: string;
}
