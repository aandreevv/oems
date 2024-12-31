import { Component } from '@angular/core';
import {EventInvite} from "../../../../core/models/events.model";
import {HttpService} from "../../../../core/services/http.service";
import {NgForOf, NgIf} from "@angular/common";
import {SharedModule} from "../../../../shared/shared.module";
import {Router} from "@angular/router";
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";

@Component({
  selector: 'app-event-invites',
  standalone: true,
  imports: [
    NgForOf,
    SharedModule,
    TranslatePipe,
    NgIf
  ],
  templateUrl: './event-invites.component.html',
  styleUrl: './event-invites.component.scss'
})
export class EventInvitesComponent {
  invites: EventInvite[];

  constructor(private http: HttpService, private router: Router) {
    const userId = localStorage.getItem('id')!;

    this.http.getInvites(userId).subscribe(invites => {
      this.invites = invites;
    });
  }

  navigateToEventPage(id: string): void {
    this.router.navigateByUrl('dashboard/events/' + id);
  }

  navigateToSenderProfile(id: string): void {
    this.router.navigateByUrl('dashboard/people/' + id);
  }

  responseToInvite(id: string, answer: string, eventId: string): void {
    this.http.responseToInvite(id, answer).subscribe((res) => {
      this.invites = this.invites.filter(invite => !invite.id === res.id);

      if (answer === 'ACCEPTED') {
        this.router.navigateByUrl('dashboard/events/' + eventId);
      }
    });
  }

  openEventPage(eventId: string): void {
    this.router.navigateByUrl('dashboard/events/' + eventId);
  }
}
