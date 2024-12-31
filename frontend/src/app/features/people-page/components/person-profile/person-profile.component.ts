import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {UserDataResponse} from '../../../../core/models/user.model'; // Переконайтесь, що шлях правильний
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import {HttpService} from "../../../../core/services/http.service";
import {UserConnection} from "../../../../core/models/profile.model";
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";

@Component({
  selector: 'app-person-profile',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './person-profile.component.html',
  styleUrls: ['./person-profile.component.scss']
})
export class PersonProfileComponent {
  user$: Observable<UserDataResponse>;
  connections$: Observable<UserConnection[]>;

  isFollowing: boolean | null = null;
  numberOfFollowers: number = 0;

  constructor(private route: ActivatedRoute, private http: HttpService) {
    this.user$ = this.route.data.pipe(
      map(data => data['user'] as UserDataResponse)
    );
    this.connections$ = this.route.data.pipe(
      map(data => data['connections'] as UserConnection[])
    );
  }

  followUser(id: string) {
    this.http.followUser(id).subscribe(() => {
      this.isFollowing = true;
      this.numberOfFollowers++;
    });
  }

  unfollowUser(id: string) {
    this.http.unfollowUser(id).subscribe(() => {
      this.isFollowing = false;
      this.numberOfFollowers--;
    });
  }
}
