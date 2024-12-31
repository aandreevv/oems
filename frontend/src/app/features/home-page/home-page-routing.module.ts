import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfileComponent} from "./components/profile/profile.component";
import {HomeComponent} from "./components/home/home.component";
import {PeoplePageComponent} from "../people-page/components/people-page/people-page.component";
import {EventsPageComponent} from "../events-page/components/events-page/events-page.component";
import {ChatsPageComponent} from "../chats-page/components/chats-page/chats-page.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'people',
    component: PeoplePageComponent,
    loadChildren: () => import('../people-page/people-page.module').then(m => m.PeoplePageModule),
  },
  {
    path: 'events',
    component: EventsPageComponent,
    loadChildren: () => import('../events-page/events-page.module').then(m => m.EventsPageModule),
  },
  {
    path: 'chats',
    component: ChatsPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
