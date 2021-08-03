import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as fromActions from '../actions';

@Injectable()
export class AuthEffect {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.AuthActions.LOGIN),
      mergeMap((action: any) =>
        this.http.post('/api/login', action.payload).pipe(
          map((rsp) => ({
            type: fromActions.AuthActions.LOGIN_SUCCESS,
            payload: rsp,
          })),
          catchError(() =>
            of({
              type: fromActions.AuthActions.LOGIN_FAILURE,
              payload: { message: 'error' },
            })
          )
        )
      )
    )
  );
  constructor(private actions$: Actions, private http: HttpClient) {}
}
