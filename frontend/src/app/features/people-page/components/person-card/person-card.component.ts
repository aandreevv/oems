import {Component, Input} from '@angular/core';
import {UserDataResponse} from "../../../../core/models/user.model";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {HttpService} from "../../../../core/services/http.service";
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";

@Component({
  selector: 'app-person-card',
  standalone: true,
  imports: [
    NgIf,
    TranslatePipe
  ],
  templateUrl: './person-card.component.html',
  styleUrl: './person-card.component.scss'
})
export class PersonCardComponent {
  @Input() person: UserDataResponse;

  constructor(private router: Router, private http: HttpService) {
  }

  followUser(event: Event): void {
    event.stopPropagation();
    this.http.followUser(this.person.id).subscribe()
  }

  navigateToUserProfile(): void {
    this.router.navigate([`/dashboard/people/${this.person.id}`]);
  }
}
