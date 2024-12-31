import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthPageComponent} from "./features/auth-page/components/auth-page/auth-page.component";
import {HomePageComponent} from "./features/home-page/components/home-page/home-page.component";
import {
  CompleteProfileComponent
} from "./features/complete-profile/components/complete-profile/complete-profile.component";
import {CallPageComponent} from "./features/call-page/components/call-page/call-page.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {SetUpProfileGuard} from "./shared/guards/setup-profile.guard";
import {CompleteProfileGuard} from "./shared/guards/complete-profile.guard";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: HomePageComponent,
    canActivate: [SetUpProfileGuard],
    loadChildren: () => import('./features/home-page/home-page.module').then(m => m.HomePageModule),
  },
  {
    path: 'auth',
    component: AuthPageComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/auth-page/auth-page.module').then(m => m.AuthPageModule),
  },
  {
    path: 'complete-profile',
    component: CompleteProfileComponent,
    canActivate: [CompleteProfileGuard]
  },
  {
    path: 'call/:id',
    component: CallPageComponent,
    canActivate: []
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
