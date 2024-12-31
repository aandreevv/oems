import { Component } from '@angular/core';
import {EventCardComponent} from "../event-card/event-card.component";
import {Observable} from "rxjs";
import {EventModel} from "../../../../core/models/events.model";
import {HttpService} from "../../../../core/services/http.service";
import {CommonModule} from "@angular/common";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";

@Component({
  selector: 'app-recommended-events',
  standalone: true,
  imports: [
    EventCardComponent,
    CommonModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './recommended-events.component.html',
  styleUrl: './recommended-events.component.scss'
})
export class RecommendedEventsComponent {
  recommendedEvents: EventModel[];
  isLoading = true;

  constructor(private http: HttpService) {
    this.http.getRecommendedEvents().subscribe(value => {
      this.recommendedEvents = value;
      this.isLoading = false;
    });
  }
}
