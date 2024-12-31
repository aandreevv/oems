import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-people-page',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './people-page.component.html',
  styleUrl: './people-page.component.scss'
})
export class PeoplePageComponent {

}
