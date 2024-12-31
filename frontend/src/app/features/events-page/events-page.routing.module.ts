import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventsSearchComponent} from "./components/events-search/events-search.component";
import {EventPageComponent} from "./components/event-page/event-page.component";
import {RecommendedEventsComponent} from "./components/recommended-events/recommended-events.component";
import {MyEventsComponent} from "./components/my-events/my-events.component";
import {EventInfoResolver} from "../people-page/resolvers/event-info.resolver";
import {EventAttendeesResolver} from "../people-page/resolvers/event-attendees.resolver";
import {EventInvitesComponent} from "./components/event-invites/event-invites.component";
import {AttendancesComponent} from "./components/attendances/attendances.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'search',
  },
  {
    path: 'search',
    component: EventsSearchComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'recommended',
      },
      {
        path: 'recommended',
        component: RecommendedEventsComponent,
      },
      {
        path: 'my-events',
        component: MyEventsComponent,
      },
      {
        path: 'invites',
        component: EventInvitesComponent,
      },
      {
        path: 'attendances',
        component: AttendancesComponent,
      }
    ]
  },
  {
    path: ':id',
    component: EventPageComponent,
    resolve: {
      event: EventInfoResolver,
      attendees: EventAttendeesResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsPageRoutingModule { }
