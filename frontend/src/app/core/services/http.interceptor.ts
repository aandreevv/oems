import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, switchMap, filter, take, throwError, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../enviroments/enviroments';
import { HttpService } from "./http.service";
import {Store} from "@ngrx/store";
import {UserDataFailedAction} from "../store/user/user.actions";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private router: Router, private http: HttpService, private store: Store) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const baseUrl: string = environment.baseUrl;
    let accessToken = localStorage.getItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');
    const currentUrl = this.router.url;

    let apiReq: HttpRequest<any> = request.clone({ url: `${baseUrl}${request.url}` });

    if (!accessToken && currentUrl !== '/auth/register') {
      this.store.dispatch(new UserDataFailedAction());
      this.router.navigate(['/auth']);
      throwError('')
    }

    if (accessToken) {
      apiReq = apiReq.clone({
        setHeaders: {
          Authorization: `Bearer ${this.isRefreshing ? refreshToken : accessToken}`
        }
      });
    }

    return next.handle(apiReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && localStorage.getItem('refreshToken')) {
          if(this.isRefreshing) {
            localStorage.setItem('accessToken', '');
            localStorage.setItem('refreshToken', '');
            this.router.navigate(['/auth'])
            this.isRefreshing = false;
          }
          return this.handle401Error(apiReq, next);
        }
        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!this.isRefreshing && refreshToken) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.http.refreshTokens(refreshToken).pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          localStorage.setItem('accessToken', token.accessToken);
          localStorage.setItem('refreshToken', token.refreshToken);
          this.refreshTokenSubject.next(token.accessToken);
          return next.handle(this.addTokenHeader(request, token.accessToken));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          this.router.navigate(['/auth']);
          return throwError(() => error);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap((token) => next.handle(this.addTokenHeader(request, token!)))
      );
    }
  }

  private addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
