import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {LoginFetchAction} from "../../../../core/store/user/user.actions";
import {selectErrorMessage, selectIsLoading} from "../../../../core/store/user/user.selectors";
import {AppState} from "../../../../core/store/root.reducer";
import {filter, Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  error$: Observable<string>;
  isLoading: boolean = false;

  constructor(private store: Store<AppState>) {
    this.initForm();
    this.error$ = this.store.select(selectErrorMessage);
  }

  onSubmitForm(): void {
    this.isLoading = true;
    const userData = this.loginForm.value;
    this.store.dispatch(new LoginFetchAction(userData));
  }

  private initForm(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)]),
    })
  }
}
