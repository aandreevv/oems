import {Component, HostListener} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {LogoutAction} from "../../store/user/user.actions";
import {Router} from "@angular/router";
import {selectIsLoggedIn, selectUser} from "../../store/user/user.selectors";
import {AppState} from "../../store/root.reducer";
import {filter, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn$: Observable<boolean | null>;
  userName$: Observable<string | undefined>;
  profilePhoto$: Observable<string | undefined>;

  dropdownMenuOpen: boolean;

  constructor(private store: Store<AppState>, private router: Router) {
    this.isLoggedIn$ = this.store.pipe(select(selectIsLoggedIn));
    this.userName$ = this.store.pipe(select(selectUser), map(user => user?.username));
    this.profilePhoto$ = this.store.pipe(select(selectUser), map(user => user?.picture));

    this.dropdownMenuOpen = false;
  }

  handleDropdownMenuClose(): void {
    this.dropdownMenuOpen = false;
  }

  toggleMenu() {
    this.dropdownMenuOpen = !this.dropdownMenuOpen;
  }

  logout(): void {
    this.handleDropdownMenuClose();
    this.store.dispatch(new LogoutAction());
    localStorage.setItem('accessToken', '');
    localStorage.setItem('refreshToken', '');
    this.router.navigate(['auth'])
  }
}
