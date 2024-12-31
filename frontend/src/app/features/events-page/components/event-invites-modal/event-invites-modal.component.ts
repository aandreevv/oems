import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {catchError, debounceTime, distinctUntilChanged, Observable, of, startWith, switchMap} from "rxjs";
import {UserDataResponse} from "../../../../core/models/user.model";
import {HttpService} from "../../../../core/services/http.service";
import {map} from "rxjs/operators";
import {AsyncPipe, NgForOf} from "@angular/common";
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";

@Component({
  selector: 'app-event-invites-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    AsyncPipe,
    TranslatePipe
  ],
  templateUrl: './event-invites-modal.component.html',
  styleUrl: './event-invites-modal.component.scss'
})
export class EventInvitesModalComponent {
  @Input() eventId: string;
  @Input() attendees: UserDataResponse[];
  @Input() ownerId: string;

  searchForm: FormGroup;
  users$: Observable<UserDataResponse[]> = of([]);
  invitedPeople: UserDataResponse[];

  constructor(private http: HttpService) {
    this.searchForm = new FormGroup({
      search: new FormControl(),
    });

    this.searchForm.get('search')?.valueChanges
      .pipe(
        startWith(''),
        debounceTime(700),
        distinctUntilChanged(),
        switchMap(value => {
          if (!value) {
            this.users$ = of([]);
            return of([]);
          }
          return this.http.searchForUserByName(value).pipe(
            catchError(() => of([]))
          );
        }),
        map(users => this.filterUsers(users))
      )
      .subscribe((data: UserDataResponse[]) => {
        this.users$ = of(data);
      });
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('id');

    if (userId === this.ownerId) {
      this.http.getEventInvites(this.eventId).subscribe(invites => {
        this.invitedPeople = invites.map(invite => invite.receiver);
      });
    }
  }

  private filterUsers(users: UserDataResponse[]): UserDataResponse[] {
    return users.filter(user => !this.invitedPeople.some(filteredUser => filteredUser.id === user.id) && !this.attendees.some(users => users.id === user.id));
  }

  invitePersonToEvent(userId: string): void {
    this.http.invitePersonToPrivateEvent(this.eventId, userId, '').subscribe();
  }
}
