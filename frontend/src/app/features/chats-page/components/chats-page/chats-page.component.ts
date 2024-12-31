import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../../../core/services/http.service";
import {ChatListComponent} from "../chat-list/chat-list.component";
import {ChatComponent} from "../chat/chat.component";
import {ChatService} from "../../../../core/services/chat.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-chats-page',
  standalone: true,
  imports: [
    ChatListComponent,
    ChatComponent,
    NgIf
  ],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.scss'
})
export class ChatsPageComponent implements OnInit {
  selectedThreadId: string;
  userChats: any[] = [];
  isLoading: boolean = true;

  constructor(private http: HttpService, private chatService: ChatService) {
  }

  ngOnInit() {
    this.http.getUserToken().subscribe(token => {
      this.chatService.initializeChatClient(token.token)
        .then(() => {
          this.loadUserChats();
        })
        .catch(error => {
          throw error;
        });
    });
  }

  loadUserChats() {
    this.chatService.getUserChats()
      .then(chats => {
        this.userChats = chats;
        this.selectedThreadId = chats[0].id;
        this.isLoading = false;
      })
      .catch(error => {
        this.isLoading = false;
        console.error('Error loading user chats:', error.message);
      });
  }

  onChatSelected(threadId: string) {
    this.selectedThreadId = threadId;
  }
}
