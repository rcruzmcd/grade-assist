import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
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
          catchError((error: HttpErrorResponse) => {
            const msg = error.error.message || 'Something went wrong';
            this._snackBar.open(msg, '', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5000,
            });
            return of({
              type: fromActions.AuthActions.LOGIN_FAILURE,
              payload: { message: 'error' },
            });
          })
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {}
}
