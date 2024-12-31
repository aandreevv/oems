import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {catchError, debounceTime, distinctUntilChanged, filter, Observable, of, startWith, switchMap} from "rxjs";
import {HttpService} from "../../../../core/services/http.service";
import {UserDataResponse} from "../../../../core/models/user.model";
import {PersonCardComponent} from "../person-card/person-card.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";

@Component({
  selector: 'app-people-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PersonCardComponent,
    NgForOf,
    AsyncPipe,
    TranslatePipe
  ],
  templateUrl: './people-search.component.html',
  styleUrl: './people-search.component.scss'
})
export class PeopleSearchComponent {
  searchForm: FormGroup;
  users$: Observable<UserDataResponse[]> = of([]);
  recommendedUsers$: Observable<UserDataResponse[]>;

  constructor(private http: HttpService) {
    this.recommendedUsers$ = this.http.getRecommendedPeople();

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
        })
      )
      .subscribe((data: UserDataResponse[]) => {
        this.users$ = of(data);
      });
  }
}
