import { createSelector } from '@ngrx/store';
import { UserModel } from "../../models/user.model";
import {AppState} from "../root.reducer";

const selectUserState = (state: AppState) => state.user;

export const selectUser = createSelector(
  selectUserState,
  (state: UserModel) => state.user
);

export const selectIsLoggedIn = createSelector(
  selectUserState,
  (state: UserModel) => state.isLoggedIn
);

export const selectIsLoading = createSelector(
  selectUserState,
  (state: UserModel) => state.isLoading
);

export const selectErrorMessage = createSelector(
  selectUserState,
  (state: UserModel) => state.errorMessage
)

export const selectUserConnections = createSelector(
  selectUserState,
  (state: UserModel) => state.connections
);

export const selectUserInterests = createSelector(
  selectUserState,
  (state: UserModel) => state.interests
);

export const selectUserFollowers = createSelector(
  selectUserState,
  (state: UserModel) => state.followers
);

export const selectUserFollowings = createSelector(
  selectUserState,
  (state: UserModel) => state.followings
);
