import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { TeachersService } from '../../teachers.service';

import * as fromActions from '../actions';

@Injectable()
export class TeachersEffect {
  loadAllTeachers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.TeachersActions.LOAD_ALL_TEACHERS),
      mergeMap(() =>
        this.http.get('/api/teacher').pipe(
          map((teachers) => {
            return {
              type: fromActions.TeachersActions.LOAD_ALL_TEACHERS_SUCCESS,
              payload: teachers,
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
              type: fromActions.TeachersActions.LOAD_ALL_TEACHERS_FAILURE,
              payload: { message: 'error' },
            });
          })
        )
      )
    )
  );

  createTeacher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.TeachersActions.CREATE_TEACHERS),
      mergeMap((action: any) =>
        this.http.post('/api/teacher', action.payload).pipe(
          map((teacher) => {
            // const msg = teachers.message;
            this._snackBar.open('Teacher successfully created.', '', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5000,
            });
            return {
              type: fromActions.TeachersActions.CREATE_TEACHERS_SUCCESS,
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
              type: fromActions.TeachersActions.CREATE_TEACHERS_FAILURE,
              payload: error,
            });
          })
        )
      )
    )
  );

  deleteTeacher$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.TeachersActions.DELETE_TEACHERS),
      mergeMap((action: any) =>
        this.http.delete(`api/teacher/${action.payload._id}`).pipe(
          map((rsp) => {
            this._snackBar.open('Teacher successfully deleted.', '', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 5000,
            });
            return {
              type: fromActions.TeachersActions.DELETE_TEACHERS_SUCCESS,
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
              type: fromActions.TeachersActions.DELETE_TEACHERS_FAILURE,
              payload: error,
            });
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    // private teacherService: TeachersService,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {}
}
