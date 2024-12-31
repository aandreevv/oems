import { Component } from '@angular/core';
import {EventModel} from "../../../../core/models/events.model";
import {UserDataResponse} from "../../../../core/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {HttpService} from "../../../../core/services/http.service";
import {userInterestsArray, UserInterestsBadges} from "../../../../core/models/profile.model";
import {ModalComponent} from "../../../../shared/components/modal/modal.component";
import {EventInvitesModalComponent} from "../event-invites-modal/event-invites-modal.component";
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf,
    ModalComponent,
    EventInvitesModalComponent,
    TranslatePipe
  ],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.scss'
})
export class EventPageComponent {
  event: EventModel;
  attendees: UserDataResponse[];
  categoriesBadges: UserInterestsBadges[];

  isOwner: boolean = false;
  isInvitePeopleModalOpen: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpService, private router: Router) {
    const userId = localStorage.getItem('id')!;

    this.route.data.pipe(map((data) => data['event'])).subscribe(event => {
      this.event = event;
      this.categoriesBadges = this.getEventBadges();
      this.isOwner = this.event.owner.id === userId;
    });
    this.route.data.pipe(map((data) => data['attendees'])).subscribe(attendees => {
      this.attendees = attendees;
    });
  }

  checkIsRegistered(): boolean {
    const userId = localStorage.getItem('id')!;
    return !!this.attendees.find(user => user.id === userId);
  }

  getBadgeStyles(styles: {color: string, backgroundColor: string}) {
    const { backgroundColor, color } = styles;
    return `background-color: ${backgroundColor}; color: ${color}`;
  }

  getEventBadges(): UserInterestsBadges[] {
    const eventCategories = this.event.categories;
    return userInterestsArray.filter((badge: UserInterestsBadges) => eventCategories.includes(badge.value));
  }

  formatText(text: string): string {
    return text.replace(/\n/g, '<br>');
  }

  registerToEvent(): void {
    this.http.registerToPublicEvent(this.event.id).subscribe(attendees => {
      this.attendees = attendees;
    })
  }

  joinEvent(): void {
    this.http.getUserToken().subscribe(token => {
      localStorage.setItem('userTokenACS', token.token);
      localStorage.setItem('roomId', this.event.roomId)
      this.router.navigateByUrl('call/' + this.event.roomId);
    });
  }

  buyTicketToEvent() {
    this.http.buyTicketForPaidEvent(this.event.id, this.event.price).subscribe();
  }

  isRoomAvailable(): boolean {
    const currentTimeUtc = new Date().toISOString();
    const eventTimeUtc = new Date(this.event.date).toISOString();
    const currentTime = new Date(currentTimeUtc);
    const eventTime = new Date(eventTimeUtc);

    const startWindowUtc = new Date(eventTime.getTime() - 5 * 60 * 60 * 1000); // 5 hours before event time
    const endWindowUtc = new Date(eventTime.getTime() + 5 * 60 * 60 * 1000); // 5 hours after event time

    return currentTime >= startWindowUtc && currentTime <= endWindowUtc;
  }

  openPeopleInviteModal() {
    this.isInvitePeopleModalOpen = true;
  }
}
