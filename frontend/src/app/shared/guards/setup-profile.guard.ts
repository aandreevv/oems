import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {Observable, map, filter, take} from 'rxjs';
import {selectUser} from '../../core/store/user/user.selectors';
import {AppState} from "../../core/store/root.reducer";

@Injectable({
  providedIn: 'root'
})
export class SetUpProfileGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const store$ = this.store.pipe(filter((store) => !!store.user.user), take(1));

    return store$.pipe(
      map(store => store.user.user),
      map(user => {
        if (!user?.fullName) {
          this.router.navigate(['/complete-profile']);
          return false;
        }

        return true;
      })
    );
  }
}
