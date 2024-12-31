import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {ChatService} from "../../../../core/services/chat.service";
import {NgForOf} from "@angular/common";
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  standalone: true,
      imports: [
            NgForOf,
            TranslatePipe
      ],
})
export class ChatListComponent implements OnInit {
  @Input() threads: any[] = [];
  @Input() selectedThreadId: string;
  @Output() chatSelected = new EventEmitter<string>();

  constructor(private chatService: ChatService) {}

  ngOnInit() {}

  selectChat(threadId: string) {
    this.chatSelected.emit(threadId);
  }
}
