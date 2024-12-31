import { Injectable } from '@angular/core';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { ChatClient, ChatThreadClient, SendMessageRequest } from '@azure/communication-chat';
import {Root, createRoot} from "react-dom/client";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  root: Root | null = null;
  private chatClient: ChatClient;

  constructor() {}

  async initializeChatClient(userAccessToken: string) {
    const tokenCredential = new AzureCommunicationTokenCredential(userAccessToken);
    this.chatClient = new ChatClient('https://communication-oems.europe.communication.azure.com/', tokenCredential);
  }

  async getUserChats(): Promise<any[]> {
    const threads = [];
    try {
      const pagedThreads = this.chatClient.listChatThreads();
      for await (const thread of pagedThreads) {
        threads.push(thread);
      }
    } catch (error) {
      throw error;
    }
    return threads;
  }

  createRoot(container: HTMLElement) {
    if (!this.root) {
      this.root = createRoot(container);
    }
    return this.root;
  }

  destroyChat() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}
