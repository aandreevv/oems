import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {HomePageRoutingModule} from "./home-page-routing.module";



@NgModule({
  declarations: [],
  imports: [
    HomePageRoutingModule,
    CommonModule,
    RouterOutlet
  ]
})
export class HomePageModule { }
