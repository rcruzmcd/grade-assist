import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';

import * as fromStore from '../../store';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket = io('http://localhost:3000');
  loggedInUser: any;

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public getNewMessage = () => {
    this.socket.on(`message${this.loggedInUser.userId}`, (message: any) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  constructor(private store: Store<fromStore.State>) {
    this.store.subscribe((state) => {
      this.loggedInUser.userId = state.auth.userId;
    });
  }
}
