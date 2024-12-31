import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {HttpService} from "../../../core/services/http.service";
import {UserConnection} from "../../../core/models/profile.model";

@Injectable({
  providedIn: 'root'
})
export class UserConnectionsResolver implements Resolve<UserConnection[]> {
  constructor(private http: HttpService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserConnection[]> {
    const id = route.paramMap.get('id');
    return this.http.getUserConnections(id!);
  }
}
