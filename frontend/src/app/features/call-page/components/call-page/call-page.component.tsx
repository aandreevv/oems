import {AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import * as React from 'react';
import {CommunicationService} from "../../../../core/services/communication.service";
import {SyncConnectCallCompositeConfig} from "../../../../core/models/call-composite.model";
import {ContosoCallContainer} from "../call-composite/test";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-call-page',
  templateUrl: './call-page.component.html',
  styleUrl: './call-page.component.scss'
})
export class CallPageComponent implements OnInit, AfterViewInit, OnChanges {
  config: SyncConnectCallCompositeConfig;
  @ViewChild('callContainer', {static: true}) callContainer: ElementRef<HTMLElement>;

  constructor(private communicationService: CommunicationService, private route: ActivatedRoute) {
    const roomId: any = localStorage.getItem('roomId');
    const token: any = localStorage.getItem('userTokenACS');
    const displayName: any = localStorage.getItem('userName');
    this.config = {
      userId: { communicationUserId: '1'},
      displayName,
      roomId,
      token
    }
  }

  ngOnInit(): void {
    console.debug("React version: ", React.version);
  }

  ngAfterViewInit() {
    this.createCall();
  }

  ngOnChanges(changes: SimpleChanges) {
    const {
      config: { previousValue, currentValue },
    } = changes;

    if(previousValue && currentValue && previousValue.token !== currentValue.token) {
      this.communicationService.destroyCall();
      this.createCall();
    }
  }

  ngOnDestroy(): void {
    this.communicationService.destroyCall();
  }

  private createCall(): void {
    if (!this.communicationService.callHTMLInstance) {
      this.communicationService.createRoot(this.callContainer.nativeElement).render(
        <ContosoCallContainer
          userId={this.config.userId}
          token={this.config.token}
          roomId={this.config.roomId}
          displayName={this.config.displayName}/>
      )
      this.communicationService.callHTMLInstance = this.callContainer.nativeElement;
    } else {
      this.callContainer.nativeElement.replaceWith(this.communicationService.callHTMLInstance!);
    }
  }
}
