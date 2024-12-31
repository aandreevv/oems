import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {CommonModule} from "@angular/common";
import {Observable} from "rxjs";
import {UserStateModel} from "../../models/user.model";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store/root.reducer";
import {selectUser} from "../../store/user/user.selectors";
import {LogoutAction} from "../../store/user/user.actions";
import {TranslatePipe} from "../../../shared/pipes/translate.pipe";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    TranslatePipe,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  user$: Observable<UserStateModel | null>;
  @Input() sideBarOpen: boolean;
  @Output() sideBarToggle: EventEmitter<any> = new EventEmitter();

  constructor(private store: Store<AppState>, private router: Router) {
    this.user$ = this.store.pipe(select(selectUser));
  }

  toggleSideBar() {
    this.sideBarToggle.emit();
  }

  logout(): void {
    this.store.dispatch(new LogoutAction());
    localStorage.setItem('accessToken', '');
    localStorage.setItem('refreshToken', '');
    this.router.navigate(['auth'])
  }
}
