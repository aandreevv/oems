import { Component } from '@angular/core';
import {EventCardComponent} from "../event-card/event-card.component";
import {EventModel} from "../../../../core/models/events.model";
import {HttpService} from "../../../../core/services/http.service";
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";

@Component({
  selector: 'app-attendances',
  standalone: true,
  imports: [
    EventCardComponent,
    NgxSkeletonLoaderModule
  ],
  templateUrl: './attendances.component.html',
  styleUrl: './attendances.component.scss'
})
export class AttendancesComponent {
  attendancesEvents: EventModel[];
  isLoading = true;

  constructor(private http: HttpService) {
    const id = localStorage.getItem('userId')!;
    this.http.getEventAttendances(id).subscribe(value => {
      this.attendancesEvents = value;
      this.isLoading = false;
    });
  }
}
