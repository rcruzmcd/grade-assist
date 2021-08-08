import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as fromActions from '../actions';

@Injectable()
export class StudentEffect {
  loadAllStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.StudentActions.LOAD_ALL_STUDENT),
      mergeMap(() =>
        this.http.get('/api/student').pipe(
          map((student) => {
            return {
              type: fromActions.StudentActions.LOAD_ALL_STUDENT_SUCCESS,
              payload: student,
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
              type: fromActions.StudentActions.LOAD_ALL_STUDENT_FAILURE,
              payload: { message: 'error' },
            });
          })
        )
      )
    )
  );

  createStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.StudentActions.CREATE_STUDENT),
      mergeMap((action: any) =>
        this.http.post('/api/student', action.payload).pipe(
          map((student) => {
            // const msg = admin.message;
            this._snackBar.open('Student successfully created.', '', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5000,
            });
            return {
              type: fromActions.StudentActions.CREATE_STUDENT_SUCCESS,
              payload: student,
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
              type: fromActions.StudentActions.CREATE_STUDENT_FAILURE,
              payload: error,
            });
          })
        )
      )
    )
  );

  deleteStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.StudentActions.DELETE_STUDENT),
      mergeMap((action: any) =>
        this.http.delete(`api/student/${action.payload._id}`).pipe(
          map((rsp) => {
            this._snackBar.open('Student successfully deleted.', '', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5000,
            });
            return {
              type: fromActions.StudentActions.DELETE_STUDENT_SUCCESS,
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
              type: fromActions.StudentActions.DELETE_STUDENT_FAILURE,
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
