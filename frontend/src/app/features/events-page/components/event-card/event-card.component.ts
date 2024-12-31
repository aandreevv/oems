import {Component, Input} from '@angular/core';
import {EventAccessType, EventModel} from "../../../../core/models/events.model";
import {DatePipe} from "@angular/common";
import {SharedModule} from "../../../../shared/shared.module";
import {AppState} from "../../../../core/store/root.reducer";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [
    DatePipe,
    SharedModule,
    TranslatePipe
  ],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss'
})
export class EventCardComponent {
  @Input() event: EventModel;

  userId: string;

  constructor(private store: Store<AppState>, private router: Router) {
    this.store
      .select('user')
      .subscribe(user => {
        this.userId = user.user!.id
      })
  }

  openEventPage(): void {
    this.router.navigateByUrl('dashboard/events/' + this.event.id);
  }

  openOwnerProfilePage(): void {
    if (this.userId === this.event.owner.id) {
      this.router.navigateByUrl('dashboard/profile')
    } else {
      this.router.navigateByUrl('dashboard/people/' + this.event.owner.id)
    }
  }

  addHoursToDate(dateStr: string): string {
    const date = new Date(dateStr);

    date.setHours(date.getHours() - 3);

    return date.toISOString();
  }

  protected readonly EventAccessType = EventAccessType;
}
