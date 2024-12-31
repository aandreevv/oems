import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  ConnectionsFailedAction,
  ConnectionsFetchAction,
  ConnectionsFetchedAction, EditProfileFetchAction, FollowersFailedAction,
  FollowersFetchAction, FollowersFetchedAction, FollowingsFailedAction, FollowingsFetchAction, FollowingsFetchedAction,
  InterestsFailedAction,
  InterestsFetchAction,
  InterestsFetchedAction, LoginFailedAction,
  LoginFetchAction,
  LoginFetchedAction,
  RegisterFetchAction,
  RegisterFetchedAction,
  SetUpProfileFailedAction,
  SetUpProfileFetchAction,
  SetUpProfileFetchedAction, SetUserPhotoFetchAction,
  UserActionTypes,
  UserDataFailedAction,
  UserDataFetchAction,
  UserDataFetchedAction
} from "./user.actions";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {of, take} from "rxjs";
import { HttpService } from "../../services/http.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { AuthResponseModel } from "../../models/auth.model";
import {UserDataResponse} from "../../models/user.model";
import {Router} from "@angular/router";
import {UserConnection, UserInterest} from "../../models/profile.model";

@Injectable()
export class UserEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.LoginFetch),
      switchMap((action: LoginFetchAction) =>
        this.http.userLogin(action.payload).pipe(
          map((res: AuthResponseModel) => {
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            this.store.dispatch(new UserDataFetchAction());
            this.router.navigate(['/dashboard/profile'])
            return new LoginFetchedAction();
          }),
          catchError((error: HttpErrorResponse) => {
            return of(new LoginFailedAction(error.error.messages));
          })
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.RegisterFetch),
      switchMap((action: RegisterFetchAction) =>
        this.http.userRegister(action.payload).pipe(
          map((res: AuthResponseModel) => {
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            this.store.dispatch(new UserDataFetchAction());
            this.router.navigate(['/complete-profile'])
            return new RegisterFetchedAction(true);
          }),
          catchError((error: HttpErrorResponse) => {
            return of(new LoginFailedAction(error.error.messages));
          })
        )
      )
    )
  );

  getUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.UserDataFetch),
      switchMap(() =>
        this.http.getUserData().pipe(
          map((res: UserDataResponse) => {
            return new UserDataFetchedAction(res);
          }),
          catchError((error: HttpErrorResponse) => {
            return of(new UserDataFailedAction());
          })
        )
      )
    )
  );

  setUpProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.SetUpProfileFetch),
      switchMap((action: SetUpProfileFetchAction) =>
        this.http.setUpProfile(action.payload.profile).pipe(
          map((res: UserDataResponse) => {
            this.http.sendUserInterests(action.payload.interests).pipe(take(1)).subscribe();
            return new SetUpProfileFetchedAction(res)
          }),
          tap(() => this.router.navigate(['/dashboard/profile'])),
          catchError(error => of(new LoginFailedAction(error.error.messages)))
        )
      )
    )
  );

  editProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.EditProfileFetch),
      switchMap((action: EditProfileFetchAction) =>
        this.http.editUserProfile(action.payload).pipe(
          map((res: UserDataResponse) => {
            return new UserDataFetchedAction(res);
          }),
          catchError(error => of(new LoginFailedAction(error.error.messages)))
        )
      )
    )
  )

  fetchConnections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.ConnectionsFetch),
      switchMap((action: ConnectionsFetchAction) =>
      this.http.getUserConnections(action.payload).pipe(
        map((res: UserConnection[]) => {
          return new ConnectionsFetchedAction(res);
        }),
        catchError(error => of(new ConnectionsFailedAction()))
      ))
    )
  );

  fetchInterests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.InterestsFetch),
      switchMap((action: InterestsFetchAction) =>
        this.http.getUserInterests(action.payload).pipe(
          map((res: UserInterest[]) => {
            return new InterestsFetchedAction(res);
          }),
          catchError(error => of(new InterestsFailedAction()))
        ))
    )
  );

  fetchFollowers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.FollowersFetch),
      switchMap((action: FollowersFetchAction) =>
        this.http.getUserFollowers(action.payload).pipe(
          map((res: UserDataResponse[]) => {
            return new FollowersFetchedAction(res);
          }),
          catchError(error => of(new FollowersFailedAction()))
        ))
    )
  );

  fetchFollowings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.FollowingsFetch),
      switchMap((action: FollowingsFetchAction) =>
        this.http.getUserFollowings(action.payload).pipe(
          map((res: UserDataResponse[]) => {
            return new FollowingsFetchedAction(res);
          }),
          catchError(error => of(new FollowingsFailedAction()))
        ))
    )
  );

  setUserPhoto$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActionTypes.SetUserPhotoFetch),
      switchMap((action: SetUserPhotoFetchAction) =>
      this.http.setUserPhoto(action.payload.image).pipe(
        map((res: UserDataResponse) => {
          return new UserDataFetchedAction(res);
        })
      ))
    )
  )

  constructor(private actions$: Actions, private http: HttpService, private store: Store, private router: Router) {}
}
