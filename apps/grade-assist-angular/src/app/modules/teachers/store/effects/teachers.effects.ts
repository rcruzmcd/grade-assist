import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
          map((teachers) => ({
            type: fromActions.TeachersActions.LOAD_ALL_TEACHERS_SUCCESS,
            payload: teachers,
          })),
          catchError(() =>
            of({
              type: fromActions.TeachersActions.LOAD_ALL_TEACHERS_FAILURE,
              payload: { message: 'error' },
            })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    // private teacherService: TeachersService,
    private http: HttpClient
  ) {}
}
