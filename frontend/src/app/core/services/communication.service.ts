import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Root, createRoot} from "react-dom/client";
import {CallAdapter} from "@azure/communication-react";

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  callAdapter$: BehaviorSubject<CallAdapter | null> = new BehaviorSubject<CallAdapter | null>(null);

  root: Root | null = null;
  callHTMLInstance: HTMLElement | null = null;
  callAdapter: CallAdapter | null = null;

  constructor(private http: HttpClient) {}

  getAccessToken(): Observable<string> {
    return this.http.post<string>('https://<your-backend-url>/get-communication-token', {});
  }

  createRoot(htmlEl: HTMLElement): Root {
    this.root = createRoot(htmlEl);

    return this.root;
  }

  destroyCall(): void {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }

  updateCallAdapter(adapter: CallAdapter | null): void {
    this.callAdapter$.next(adapter);
  }

  private watchCallAdapter(): void {
    this.callAdapter$.subscribe((adapter) => {
      this.callAdapter = adapter;
    })
  }
}
