import { Component } from '@angular/core';
import {AsyncPipe, CommonModule, NgForOf} from "@angular/common";
import {EventCardComponent} from "../event-card/event-card.component";
import {Observable, switchMap} from "rxjs";
import {EventModel, MyEventsModel} from "../../../../core/models/events.model";
import {HttpService} from "../../../../core/services/http.service";
import {AppState} from "../../../../core/store/root.reducer";
import {Store} from "@ngrx/store";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [
    EventCardComponent,
    CommonModule,
    NgxSkeletonLoaderModule,
    TranslatePipe,
  ],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss'
})
export class MyEventsComponent {
  myEvents: MyEventsModel;
  isLoading: boolean = true;

  constructor(private http: HttpService, private store: Store<AppState>) {
    this.store.select('user').pipe(
      switchMap(user => {
        return this.http.getOwnEvents(user.user!.id);
      })
    ).subscribe(events => {
      this.myEvents = events;
      this.isLoading = false;
    });
  }
}
