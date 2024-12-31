import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {UserDataResponse} from "../../../core/models/user.model";
import {HttpService} from "../../../core/services/http.service";

@Injectable({
  providedIn: 'root'
})
export class UserProfileResolver implements Resolve<UserDataResponse> {
  constructor(private http: HttpService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserDataResponse> {
    const id = route.paramMap.get('id');
    return this.http.getUserDataById(id!);
  }
}
