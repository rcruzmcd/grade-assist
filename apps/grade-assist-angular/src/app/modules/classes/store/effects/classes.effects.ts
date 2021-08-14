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

  getStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.ClassesAction.GET_STUDENTS_NOT_ASSIGNED),
      mergeMap(() =>
        this.http.get('/api/student').pipe(
          map((student) => {
            return {
              type: fromActions.ClassesAction.GET_STUDENTS_NOT_ASSIGNED_SUCCESS,
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
              type: fromActions.ClassesAction.GET_STUDENTS_NOT_ASSIGNED_FAILURE,
              payload: { message: 'error' },
            });
          })
        )
      )
    )
  );

  addStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.ClassesAction.ADD_STUDENTS),
      mergeMap((action: any) =>
        this.http
          .post(`/api/classes/${action.payload.classId}/addStudents`, {
            students: action.payload.body,
          })
          .pipe(
            map((_class) => {
              return {
                type: fromActions.ClassesAction.ADD_STUDENTS_SUCCESS,
                payload: _class,
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
                type: fromActions.ClassesAction.ADD_STUDENTS_FAILURE,
                payload: { message: 'error' },
              });
            })
          )
      )
    )
  );

  deleteStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.ClassesAction.DELETE_STUDENTS),
      mergeMap((action: any) =>
        this.http
          .post(`/api/classes/${action.payload.classId}/deleteStudents`, {
            students: action.payload.body,
          })
          .pipe(
            map((_class) => {
              return {
                type: fromActions.ClassesAction.DELETE_STUDENTS_SUCCESS,
                payload: _class,
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
                type: fromActions.ClassesAction.DELETE_STUDENTS_FAILURE,
                payload: { message: 'error' },
              });
            })
          )
      )
    )
  );

  addAssign$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.ClassesAction.ADD_ASSIGN),
      mergeMap((action: any) =>
        this.http
          .post(
            `/api/classes/${action.payload.classId}/assignment`,
            action.payload.body
          )
          .pipe(
            map((assign) => {
              return {
                type: fromActions.ClassesAction.ADD_ASSIGN_SUCCESS,
                payload: assign,
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
                type: fromActions.ClassesAction.ADD_ASSIGN_FAILURE,
                payload: { message: 'error' },
              });
            })
          )
      )
    )
  );

  deleteAssign$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.ClassesAction.DELETE_ASSIGN),
      mergeMap((action: any) =>
        this.http.delete(`/api/assignments/${action.payload.assignId}`).pipe(
          map((assign) => {
            return {
              type: fromActions.ClassesAction.DELETE_ASSIGN_SUCCESS,
              payload: assign,
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
              type: fromActions.ClassesAction.DELETE_ASSIGN_FAILURE,
              payload: { message: 'error' },
            });
          })
        )
      )
    )
  );

  getGrades$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.ClassesAction.SELECT_ASSIGNMENT),
      mergeMap((action: any) =>
        this.http.get(`/api/assignments/${action.payload._id}/grade`).pipe(
          map((rsp) => {
            return {
              type: fromActions.ClassesAction.GET_ASSIGN_GRADES_SUCCESS,
              payload: rsp,
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
              type: fromActions.ClassesAction.GET_ASSIGN_GRADES_FAILURE,
              payload: { message: 'error' },
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
