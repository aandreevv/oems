import {UserInterestsType} from "./profile.model";
import {UserDataResponse} from "./user.model";

export interface EventModel {
  id: string;
  name: string;
  description: string;
  date: string;
  access: EventAccessType;
  paid: boolean;
  price: number;
  image: string;
  roomId: string;
  chatId: string;
  categories: UserInterestsType[];
  type: EventCallType;
  owner: UserDataResponse;
}

export enum EventAccessType {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export enum EventCallType {
  ATTENDEE_CALL = 'ATTENDEE_CALL',
  CONSUME_ONLY_CALL = 'CONSUME_ONLY_CALL',
}

export interface EventCreateModel {
  name: string;
  description: string;
  date: string;
  access: EventAccessType;
  paid: boolean;
  price: number | null;
  categories: UserInterestsType[];
  type: EventCallType;
}

export interface MyEventsModel {
  futureEvents: EventModel[];
  pastEvents: EventModel[];
}

export interface EventInvite {
  id: string;
  sender: UserDataResponse;
  receiver: UserDataResponse;
  inviteText: string;
  responseText: string
  createdAt: string;
  updatedAt: string;
  status: string;
  event: EventModel;
}
