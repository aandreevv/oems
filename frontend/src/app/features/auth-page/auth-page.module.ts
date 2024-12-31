import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthPageComponent} from "./components/auth-page/auth-page.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthPageRoutingModule} from "./auth-page-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "../../core/core.module";


@NgModule({
  declarations: [
    AuthPageComponent,
    LoginComponent,
    RegisterComponent
  ],
      imports: [
            CommonModule,
            AuthPageRoutingModule,
            ReactiveFormsModule,
            CoreModule,
      ]
})
export class AuthPageModule { }
