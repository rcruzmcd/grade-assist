import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { marbles } from 'rxjs-marbles/jest';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import * as fromStore from '../index';
import { MessageEffect } from './messages.effect';
import { ApiService } from '@grade-assist/shared';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SocketService } from '../../socket.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

let actions$ = new Observable<Action>();
let apiService: ApiService;
let messageEffect: MessageEffect;
let socketService: SocketService;
let store: MockStore;

const { initialState } = fromStore;

describe('MessageEffect', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        provideMockActions(() => actions$),
        ApiService,
        MessageEffect,
        SocketService,
        provideMockStore({ initialState }),
      ],
    });
    apiService = TestBed.get(ApiService);
    messageEffect = TestBed.get(MessageEffect);
    store = TestBed.inject(MockStore);
  });

  test(
    'should login ',
    marbles((m) => {
      const action = {
        payload: {},
        type: fromStore.MessagesActions.GET_MESSAGES,
      };
      messageEffect.getMessages$.subscribe((data) => console.log(data));
      // const payload = {};
      // const loginService = jest.fn().mockImplementationOnce(() => of(payload));

      // // const completion = new fromStore.loginSuccess(payload as any);
      actions$ = m.hot('-a', { a: action });

      // const apiServiceSpy = jest.spyOn(apiService, 'get');
      // const expected = m.cold('-b', { b: completion });

      // m.expect().toBeObservable(expected);
    })
  );

  test(
    'should get user ',
    marbles((m) => {
      messageEffect.socket$.subscribe((data) => console.log(data));
      // const payload = {};
      // const loginService = jest.fn().mockImplementationOnce(() => of(payload));

      const action = {
        payload: {},
        type: fromStore.MessagesActions.GET_MESSAGES,
      };

      // // const completion = new fromStore.loginSuccess(payload as any);
      actions$ = m.hot('-a', { a: action });

      // const apiServiceSpy = jest.spyOn(apiService, 'get');
      // const expected = m.cold('-b', { b: completion });

      // m.expect().toBeObservable(expected);
    })
  );

  test(
    'should get user ',
    marbles((m) => {
      messageEffect.sendMessage$.subscribe((data) => console.log(data));
      // const payload = {};
      // const loginService = jest.fn().mockImplementationOnce(() => of(payload));

      const action = {
        payload: {},
        type: fromStore.MessagesActions.SEND_MESSAGES,
      };

      // // const completion = new fromStore.loginSuccess(payload as any);
      actions$ = m.hot('-a', { a: action });

      // const apiServiceSpy = jest.spyOn(apiService, 'get');
      // const expected = m.cold('-b', { b: completion });

      // m.expect().toBeObservable(expected);
    })
  );

  test(
    'should get user ',
    marbles((m) => {
      messageEffect.loadAllUsers$.subscribe((data) => console.log(data));
      // const payload = {};
      // const loginService = jest.fn().mockImplementationOnce(() => of(payload));

      const action = {
        payload: {},
        type: fromStore.MessagesActions.GET_MESSAGES,
      };

      // // const completion = new fromStore.loginSuccess(payload as any);
      actions$ = m.hot('-a', { a: action });

      // const apiServiceSpy = jest.spyOn(apiService, 'get');
      // const expected = m.cold('-b', { b: completion });

      // m.expect().toBeObservable(expected);
    })
  );
});
