import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as fromActions from '../actions';

@Injectable()
export class adminEffect {
  loadAlladmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.AdminActions.LOAD_ALL_ADMIN),
      mergeMap(() =>
        this.http.get('/api/admin').pipe(
          map((admin) => {
            return {
              type: fromActions.AdminActions.LOAD_ALL_ADMIN_SUCCESS,
              payload: admin,
            };
          }),
          catchError((error: HttpErrorResponse) => {
            const msg = error.error.message || 'Something went wrong';
            this._snackBar.open(msg, '', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5000,
            });
            return of({
              type: fromActions.AdminActions.LOAD_ALL_ADMIN_FAILURE,
              payload: { message: 'error' },
            });
          })
        )
      )
    )
  );

  createAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.AdminActions.CREATE_ADMIN),
      mergeMap((action: any) =>
        this.http.post('/api/admin', action.payload).pipe(
          map((teacher) => {
            // const msg = admin.message;
            this._snackBar.open('Admin successfully created.', '', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5000,
            });
            return {
              type: fromActions.AdminActions.CREATE_ADMIN_SUCCESS,
              payload: teacher,
            };
          }),
          catchError((error: HttpErrorResponse) => {
            const msg = error.error.message || 'Something went wrong';
            this._snackBar.open(msg, '', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5000,
            });
            return of({
              type: fromActions.AdminActions.CREATE_ADMIN_FAILURE,
              payload: error,
            });
          })
        )
      )
    )
  );

  deleteAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.AdminActions.DELETE_ADMIN),
      mergeMap((action: any) =>
        this.http.delete(`api/admin/${action.payload._id}`).pipe(
          map((rsp) => {
            this._snackBar.open('Admin successfully deleted.', '', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5000,
            });
            return {
              type: fromActions.AdminActions.DELETE_ADMIN_SUCCESS,
              payload: { response: rsp, id: action.payload._id },
            };
          }),
          catchError((error: HttpErrorResponse) => {
            const msg = error.error.message || 'Something went wrong';
            this._snackBar.open(msg, '', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5000,
            });
            return of({
              type: fromActions.AdminActions.DELETE_ADMIN_FAILURE,
              payload: error,
            });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    // private adminervice: adminService,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {}
}
