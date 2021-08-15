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
export class MessageEffect {
  getMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.MessagesActions.GET_MESSAGES),
      mergeMap((action: any) =>
        this.http.get('/api/conversation/${action.payload.userId}').pipe(
          map((rsp) => ({
            type: fromActions.MessagesActions.GET_MESSAGES_SUCCESS,
            payload: rsp,
          })),
          catchError((error: HttpErrorResponse) => {
            const msg = error.error?.message || 'Something went wrong';
            this._snackBar.open(msg, '', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5000,
            });
            return of({
              type: fromActions.MessagesActions.GET_MESSAGES_FAILURE,
              payload: { message: 'error' },
            });
          })
        )
      )
    )
  );

  //   socket$ = createEffect(()=
  //   this.actions$.pipe(
  //       ofType(fromActions.MessagesActions.GET_MESSAGES),
  //       mergeMap((action:any)=>
  //         // io setup
  //       )
  //   )
  //   )

  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.MessagesActions.SEND_MESSAGES),
      mergeMap((action: any) =>
        this.http.post(`/api/conversation/send`, {}).pipe(
          map((rsp) => ({
            type: fromActions.MessagesActions.SEND_MESSAGES_SUCCESS,
            payload: rsp,
          })),
          catchError((error: HttpErrorResponse) => {
            const msg = error.error?.message || 'Something went wrong';
            this._snackBar.open(msg, '', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5000,
            });
            return of({
              type: fromActions.MessagesActions.SEND_MESSAGES_FAILURE,
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
