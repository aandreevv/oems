import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {HttpService} from "../../../core/services/http.service";
import {EventModel} from "../../../core/models/events.model";

@Injectable({
  providedIn: 'root'
})
export class EventInfoResolver implements Resolve<EventModel> {
  constructor(private http: HttpService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EventModel> {
    const id = route.paramMap.get('id');
    return this.http.getEventById(id!);
  }
}
