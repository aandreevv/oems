import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {filter, Observable} from 'rxjs';
import { map, take } from 'rxjs/operators';
import { selectIsLoggedIn } from '../../core/store/user/user.selectors';
import {AppState} from "../../core/store/root.reducer";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const isLoggedIn$ = this.store.pipe(select(selectIsLoggedIn), filter((isLoggedIn) => isLoggedIn !== null), take(1));

    return isLoggedIn$.pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['/dashboard']);
          return false;
        }

        return true;
      })
    );
  }
}
