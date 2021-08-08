import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as fromActions from '../actions';

@Injectable()
export class ClassesEffect {
  loadAllClasses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.ClassesAction.LOAD_ALL_CLASSES),
      mergeMap(() =>
        this.http.get('/api/classes').pipe(
          map((classes) => {
            return {
              type: fromActions.ClassesAction.LOAD_ALL_CLASSES_SUCCESS,
              payload: classes,
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
              type: fromActions.ClassesAction.LOAD_ALL_CLASSES_FAILURE,
              payload: { message: 'error' },
            });
          })
        )
      )
    )
  );

  createClasses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.ClassesAction.CREATE_CLASSES),
      mergeMap((action: any) =>
        this.http.post('/api/classes', action.payload).pipe(
          map((classes) => {
            // const msg = admin.message;
            this._snackBar.open('classes successfully created.', '', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5000,
            });
            return {
              type: fromActions.ClassesAction.CREATE_CLASSES_SUCCESS,
              payload: classes,
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
              type: fromActions.ClassesAction.CREATE_CLASSES_FAILURE,
              payload: error,
            });
          })
        )
      )
    )
  );

  deleteClasses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.ClassesAction.DELETE_CLASSES),
      mergeMap((action: any) =>
        this.http.delete(`api/classes/${action.payload._id}`).pipe(
          map((rsp) => {
            this._snackBar.open('classes successfully deleted.', '', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5000,
            });
            return {
              type: fromActions.ClassesAction.DELETE_CLASSES_SUCCESS,
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
              type: fromActions.ClassesAction.DELETE_CLASSES_FAILURE,
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