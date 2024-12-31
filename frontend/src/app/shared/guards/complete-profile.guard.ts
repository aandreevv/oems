import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {Observable, map, filter, take} from 'rxjs';
import {selectUser} from '../../core/store/user/user.selectors';
import {AppState} from "../../core/store/root.reducer";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CompleteProfileGuard implements CanActivate {

  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log(1)
    const store$ = this.store.pipe(filter((store) => !!store.user.user), take(1));

    this.store.pipe(tap(store => console.log(store))).subscribe(console.log)
    return store$.pipe(
      map(store => store.user.user),
      map(user => {
        console.log(user)
        if (user?.fullName) {
          this.router.navigate(['/dashboard']);
          return false;
        }

        return true;
      })
    );
  }
}
