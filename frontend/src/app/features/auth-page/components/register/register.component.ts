import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {RegisterFetchAction} from "../../../../core/store/user/user.actions";
import {Observable} from "rxjs";
import {AppState} from "../../../../core/store/root.reducer";
import {selectErrorMessage} from "../../../../core/store/user/user.selectors";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  error$: Observable<string>;
  isLoading: boolean = false;

  constructor(private store: Store<AppState>) {
    this.initForm();
    this.error$ = this.store.select(selectErrorMessage);
  }

  onSubmitForm(): void {
    this.isLoading = true;
    const userData = this.registerForm.value;
    this.store.dispatch(new RegisterFetchAction(userData));
  }

  private initForm(): void {
    this.registerForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)]),
    })
  }
}
