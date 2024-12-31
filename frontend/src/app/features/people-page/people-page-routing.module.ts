import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PeopleSearchComponent} from "./components/people-search/people-search.component";
import {PersonProfileComponent} from "./components/person-profile/person-profile.component";
import {UserProfileResolver} from "./resolvers/user-profile.resolver";
import {UserConnectionsResolver} from "./resolvers/user-connections.resolver";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'search',
  },
  {
    path: 'search',
    component: PeopleSearchComponent,
  },
  {
    path: ':id',
    component: PersonProfileComponent,
    resolve: {
      user: UserProfileResolver,
      connections: UserConnectionsResolver,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeoplePageRoutingModule { }
