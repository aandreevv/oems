import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClickOutsideDirective} from "./directives/click-outside.directive";
import {CustomDatePipe} from "./pipes/custom-date.pipe";



@NgModule({
  declarations: [ClickOutsideDirective, CustomDatePipe],
  imports: [
    CommonModule
  ],
  exports: [ClickOutsideDirective, CustomDatePipe]
})
export class SharedModule { }
