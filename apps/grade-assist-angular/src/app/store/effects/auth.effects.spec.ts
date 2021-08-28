import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { marbles } from 'rxjs-marbles/jest';

import * as fromStore from '../index';
import { AuthEffect } from './auth.effects';

const actions$ = new Observable<Action>();

describe('AuthEffect', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideMockActions(() => actions$)],
    });
  });

  test(
    'should login with corect credentials',
    marbles((m) => {
      const payload = {};
      const loginService = jest.fn().mockImplementationOnce(() => of(payload));

      // const action = new fromStore.login({});
      // const completion = new fromStore.loginSuccess(payload as any);
      // actions$ = m.hot('-a', { a: action});
      // const expected = m.cold('-b', {b: completion});

      // m.expect().toBeObservable(expected);
    })
  );
});
