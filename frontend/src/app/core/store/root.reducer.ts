import { ActionReducerMap } from '@ngrx/store';
import { UserModel } from '../models/user.model';
import { UserActions } from './user/user.actions';
import { UserReducer } from './user/user.reducer';

export interface AppState {
  user: UserModel;
}

export const rootReducer: ActionReducerMap<AppState, UserActions> = {
  user: UserReducer,
};
