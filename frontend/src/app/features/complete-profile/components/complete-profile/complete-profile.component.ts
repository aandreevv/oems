import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Language} from 'src/app/core/models/user.model';
import {Store} from "@ngrx/store";
import {CommonModule} from "@angular/common";
import {userInterestsArray, UserInterestsType} from "../../../../core/models/profile.model";
import {SetUpProfileFetchAction} from "../../../../core/store/user/user.actions";
import {selectErrorMessage} from "../../../../core/store/user/user.selectors";
import {Observable} from "rxjs";
import {AppState} from "../../../../core/store/root.reducer";

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrl: './complete-profile.component.scss'
})
export class CompleteProfileComponent {
  completeProfileForm: FormGroup;
  interestsForm: FormGroup;
  isMainInfoMode: boolean;
  error$: Observable<string>;
  readonly userInterestsArray: { value: UserInterestsType, label: string }[] = userInterestsArray;
  readonly Language = Language;

  constructor(private store: Store<AppState>) {
    this.isMainInfoMode = true;
    this.completeProfileForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\+380\d{9}$/)]),
      bio: new FormControl(''),
      language: new FormControl(Language.ENGLISH, [Validators.required]),
    });

    this.error$ = this.store.select(selectErrorMessage);
  }

  sendCompleteProfileData() {
    const userData = this.completeProfileForm.value;

    this.store.dispatch(new SetUpProfileFetchAction({profile: userData, interests: []}));
  }

  private requireThreeCheckboxesTrue(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const controls = (formGroup as FormGroup).controls;
      const selectedCheckboxesCount = Object.values(controls).filter(control => control.value).length;
      return selectedCheckboxesCount >= 3 ? null : { requireThreeCheckboxesTrue: true };
    };
  }
}
