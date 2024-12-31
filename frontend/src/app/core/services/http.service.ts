import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthResponseModel, AuthUserDataModel, TokenResponseModel, VideoRoomModel} from "../models/auth.model";
import {Profile, ProfileSmall, UserDataResponse} from "../models/user.model";
import {UserConnection, UserConnectionsType, UserInterest, UserInterestsType} from "../models/profile.model";
import {EventCreateModel, EventInvite, EventModel, MyEventsModel} from "../models/events.model";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) { }

  // auth
  userLogin(userData: AuthUserDataModel): Observable<AuthResponseModel> {
    return this.httpClient.post<AuthResponseModel>('api/auth/sign-in', userData);
  }

  userRegister(userData: AuthUserDataModel): Observable<AuthResponseModel> {
    return this.httpClient.post<AuthResponseModel>('api/auth/sign-up', userData);
  }

  refreshTokens(refreshToken: string): Observable<AuthResponseModel> {
    return this.httpClient.post<AuthResponseModel>('api/auth/refresh', {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    });
  }

  setUpProfile(profileInfo: Profile): Observable<UserDataResponse> {
    return this.httpClient.put<UserDataResponse>('api/auth/setup-profile', profileInfo);
  }

  // ACS
  getUserToken(): Observable<TokenResponseModel> {
    return this.httpClient.post<TokenResponseModel>('api/communication/token', {});
  }

  createVideoRoom(): Observable<VideoRoomModel> {
    return this.httpClient.post<VideoRoomModel>('api/communication/rooms', {})
  }

  // user
  getUserData(): Observable<UserDataResponse> {
    return this.httpClient.get<UserDataResponse>('api/users/me');
  }

  editUserProfile(user: Partial<ProfileSmall>): Observable<UserDataResponse> {
    return this.httpClient.patch<UserDataResponse>('api/users/me', user);
  }

  getUserDataById(id: string): Observable<UserDataResponse> {
    return this.httpClient.get<UserDataResponse>(`api/users/${id}`);
  }

  getUserConnections(userId: string): Observable<UserConnection[]> {
    return this.httpClient.get<UserConnection[]>(`api/users/${userId}/connections`);
  }

  addConnections(connection: {type: UserConnectionsType, url: string}): Observable<UserConnection[]> {
    return this.httpClient.post<UserConnection[]>(`api/users/connections`, connection);
  }

  getUserInterests(userId: string): Observable<UserInterest[]> {
    return this.httpClient.get<UserInterest[]>(`api/users/${userId}/interests`);
  }

  sendUserInterests(userData: string[]): Observable<any> {
    return this.httpClient.post<any>('api/users/interests', {types: userData});
  }

  getUserFollowers(userId: string): Observable<UserDataResponse[]> {
    return this.httpClient.get<UserDataResponse[]>(`api/users/${userId}/followers`);
  }

  getUserFollowings(userId: string): Observable<UserDataResponse[]> {
    return this.httpClient.get<UserDataResponse[]>(`api/users/${userId}/followings`);
  }

  setUserPhoto(image: File): Observable<UserDataResponse> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    const fd = new FormData();
    fd.append('image', image, image.name)

    return this.httpClient.patch<UserDataResponse>('api/users/image', fd, {headers});
  }

  searchForUserByName(name: string): Observable<UserDataResponse[]> {
    return this.httpClient.get<UserDataResponse[]>(`api/users/search?search=${name}`)
  }

  followUser(id: string): Observable<any> {
    return this.httpClient.post<any>(`api/users/${id}/follow`, {});
  }

  unfollowUser(id: string): Observable<any> {
    return this.httpClient.delete(`api/users/${id}/unfollow`);
  }

  getRecommendedPeople(): Observable<UserDataResponse[]> {
    return this.httpClient.get<UserDataResponse[]>('api/users/recommended');
  }

  getOwnEvents(userId: string): Observable<MyEventsModel> {
    return this.httpClient.get<MyEventsModel>(`api/users/${userId}/events`);
  }

  getEventAttendances(userId: string): Observable<EventModel[]> {
    return this.httpClient.get<EventModel[]>(`api/users/${userId}/attendances`);
  }

  getInvites(userId: string): Observable<any[]> {
    return this.httpClient.get<EventModel[]>(`api/users/${userId}/invites`);
  }

  responseToInvite(inviteId: string, status: any, responseText?: string): Observable<any> {
    return this.httpClient.patch<any>(`api/users/invites/${inviteId}/status/${status}`, {responseText})
  }

  // events
  createEvent(event: EventCreateModel): Observable<EventModel> {
    return this.httpClient.post<EventModel>('api/events', event);
  }

  getRecommendedEvents(): Observable<EventModel[]> {
    return this.httpClient.get<EventModel[]>('api/events/recommended');
  }

  searchEvent(name: string): Observable<EventModel[]> {
    return this.httpClient.get<EventModel[]>(`api/events/search?search=${name}`);
  }

  getEventById(id: string): Observable<EventModel> {
    return this.httpClient.get<EventModel>(`api/events/${id}`);
  }

  getEventAttendees(id: string): Observable<UserDataResponse[]> {
    return this.httpClient.get<UserDataResponse[]>(`api/events/${id}/attendees`);
  }

  registerToPublicEvent(id: string): Observable<UserDataResponse[]> {
    return this.httpClient.put<UserDataResponse[]>(`api/events/${id}/attendees`, {});
  }

  invitePersonToPrivateEvent(eventId: string, userId: string, inviteText: string): Observable<any> {
    return this.httpClient.put<any>(`api/events/${eventId}/invites/${userId}`, inviteText);
  }

  getEventInvites(eventId: string): Observable<EventInvite[]> {
    return this.httpClient.get<EventInvite[]>(`api/events/${eventId}/invites`);
  }

  buyTicketForPaidEvent(eventId: string, paid: number): Observable<any> {
    return this.httpClient.post<any>(`api/events/${eventId}/tickets`, {paid});
  }

  //chats
  getChats(): Observable<any> {
    return this.httpClient.get<any>('api/communication/chats');
  }
}
