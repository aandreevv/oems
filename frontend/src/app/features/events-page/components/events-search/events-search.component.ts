import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
  ValidatorFn
} from "@angular/forms";
import {PersonCardComponent} from "../../../people-page/components/person-card/person-card.component";
import {EventCardComponent} from "../event-card/event-card.component";
import {catchError, debounceTime, distinctUntilChanged, Observable, of, startWith, switchMap} from "rxjs";
import {HttpService} from "../../../../core/services/http.service";
import {EventAccessType, EventCallType, EventModel} from "../../../../core/models/events.model";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {ModalComponent} from "../../../../shared/components/modal/modal.component";
import {UserInterest, userInterestsArray} from "../../../../core/models/profile.model";
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";

@Component({
  selector: 'app-events-search',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    NgForOf,
    PersonCardComponent,
    ReactiveFormsModule,
    EventCardComponent,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    ModalComponent,
    NgIf,
    TranslatePipe,
  ],
  templateUrl: './events-search.component.html',
  styleUrls: ['./events-search.component.scss'],
})
export class EventsSearchComponent implements OnInit {
  searchForm: FormGroup;
  createEventForm: FormGroup;

  events$: Observable<EventModel[]> = of([]);
  recommendedEvents$: Observable<EventModel[]>;

  isCreateEventModalOpen: boolean = false;
  isLoading: boolean = false;

  protected readonly EventAccessType = EventAccessType;
  protected readonly userInterestsArray = userInterestsArray;
  protected readonly EventCallType = EventCallType;

  constructor(private http: HttpService, private router: Router) {
    this.recommendedEvents$ = this.http.getRecommendedEvents();

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
            this.events$ = of([]);
            return of([]);
          }
          return this.http.searchEvent(value).pipe(
            catchError(() => of([]))
          );
        })
      )
      .subscribe((data: EventModel[]) => {
        this.events$ = of(data);
      });

    const formControls = this.userInterestsArray.map(control => new FormControl(false));

    type UserInterestsType = typeof userInterestsArray[number]['value'];

    this.createEventForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      access: new FormControl(EventAccessType.PUBLIC, Validators.required),
      type: new FormControl(EventCallType.ATTENDEE_CALL, Validators.required),
      paid: new FormControl(false),
      price: new FormControl({value: null, disabled: true}),
      categories: new FormGroup(
        formControls.reduce((acc, formControl, index) => {
          acc[this.userInterestsArray[index].value] = formControl;
          return acc;
        }, {} as { [key in UserInterestsType]: FormControl }),
        [this.requireOneCheckboxTrue()]
      )
    });
  }

  ngOnInit(): void {
    this.createEventForm.get('paid')?.valueChanges.subscribe(paidValue => {
      const priceControl = this.createEventForm.get('price');
      if (paidValue) {
        priceControl?.enable();
      } else {
        priceControl?.disable();
      }
    });
  }

  requireOneCheckboxTrue(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const controls = (formGroup as FormGroup).controls;
      const hasAtLeastOne = Object.values(controls).some(control => control.value);
      return hasAtLeastOne ? null : { requireOneCheckboxTrue: true };
    };
  }

  openCreateEventModal(): void {
    this.isCreateEventModalOpen = true;
  }

  closeCreateEventModal(): void {
    this.isCreateEventModalOpen = false;
  }

  combineDateTime(date: string, time: string): string {
    const dateTimeString = `${date}T${time}:00.000Z`;
    const dateObject = new Date(dateTimeString);
    return dateObject.toISOString();
  }

  submitForm(): void {
    this.isLoading = true;
    const { name, description, date, time, access, type, categories, paid, price } = this.createEventForm.value;

    const selectedCategories: any[] = Object.keys(categories).filter(key => categories[key]);
    const chosenPrice = paid ? price : null;
    const dateTime = this.combineDateTime(date, time);

    const eventData = {
      name,
      description,
      access,
      type,
      paid,
      date: dateTime,
      categories: selectedCategories,
      price: chosenPrice,
    }

    this.http.createEvent(eventData).subscribe((res) => {
      this.closeCreateEventModal();
      this.router.navigateByUrl('dashboard/events/' + res.id);
    })
  }
}
