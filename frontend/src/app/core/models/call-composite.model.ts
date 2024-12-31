import {CommunicationUserIdentifier} from "@azure/communication-common";
import {CallAdapter} from "@azure/communication-react";

export interface SyncConnectCallCompositeConfig {
  userId: CommunicationUserIdentifier;
  displayName: string;
  roomId: string;
  token: string;
}

export interface SyncConnectChatCompositeConfig {
  userIdentifier: string;
  displayName: string;
  threadId: string;
  token: string;
}

export interface SyncConnectCallCompositeProps {
  config: SyncConnectCallCompositeConfig;
  updateCallAdapter(adapter: CallAdapter): void;
}
