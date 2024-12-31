import {Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef} from '@angular/core';
import { ChatService } from '../../../../core/services/chat.service';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import {SyncConnectChatCompositeConfig} from "../../../../core/models/call-composite.model";
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../../core/services/http.service";
import * as React from "react";
import {ContosoChatContainer} from "../chat-composite/chat-container";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    DatePipe
  ],
})
export class ChatComponent implements OnInit {
  @Input() threadId: string;
  config: SyncConnectChatCompositeConfig;
  @ViewChild('chatContainer', {static: true}) chatContainer: ElementRef<HTMLElement>;

  constructor(private chatService: ChatService, private route: ActivatedRoute, private http: HttpService) {
    this.http.getUserToken().subscribe(res => {
      const token = res.token;
      const userIdentifier = res.identityId;
      const displayName: any = localStorage.getItem('userName');
      const threadId: string = this.threadId;

      this.config = {
        userIdentifier,
        displayName,
        threadId,
        token,
      }

      this.createChat();
    })
  }

  ngOnInit(): void {
    console.debug("React version: ", React.version);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['threadId'] && !changes['threadId'].firstChange) {
      this.chatService.destroyChat();
      this.createChat();
    }
  }

  ngOnDestroy(): void {
    this.chatService.destroyChat();
  }

  private createChat(): void {
    this.chatService.createRoot(this.chatContainer.nativeElement).render(
      <ContosoChatContainer
        userIdentifier={this.config.userIdentifier}
        token={this.config.token}
        threadId={this.threadId}
        displayName={this.config.displayName}/>
    )
  }
}
