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
import { AuthEffect } from './auth.effects';
import { ApiService } from '@grade-assist/shared';
import { MatSnackBarModule } from '@angular/material/snack-bar';

let actions$ = new Observable<Action>();
let apiService: ApiService;
let authEffect: AuthEffect;

describe('AuthEffect', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [provideMockActions(() => actions$), ApiService, AuthEffect],
    });
    apiService = TestBed.get(ApiService);
    authEffect = TestBed.get(AuthEffect);
  });

  test(
    'should login ',
    marbles((m) => {
      const action = { payload: {}, type: fromStore.AuthActions.LOGIN };
      authEffect.login$.subscribe((data) => console.log(data));
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
      authEffect.getUser$.subscribe((data) => console.log(data));
      // const payload = {};
      // const loginService = jest.fn().mockImplementationOnce(() => of(payload));

      const action = { payload: {}, type: fromStore.AuthActions.GET_USER };

      // // const completion = new fromStore.loginSuccess(payload as any);
      actions$ = m.hot('-a', { a: action });

      // const apiServiceSpy = jest.spyOn(apiService, 'get');
      // const expected = m.cold('-b', { b: completion });

      // m.expect().toBeObservable(expected);
    })
  );
});
