import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {HttpService} from "../../../core/services/http.service";
import {UserDataResponse} from "../../../core/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class EventAttendeesResolver implements Resolve<UserDataResponse[]> {
  constructor(private http: HttpService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserDataResponse[]> {
    const id = route.paramMap.get('id');
    return this.http.getEventAttendees(id!);
  }
}
