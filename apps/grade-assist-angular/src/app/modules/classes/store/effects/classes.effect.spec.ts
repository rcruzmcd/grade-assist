import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { marbles } from 'rxjs-marbles/jest';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import * as fromStore from '../index';
import { ClassesEffect } from './classes.effects';
import { ApiService } from '@grade-assist/shared';
import { MatSnackBarModule } from '@angular/material/snack-bar';

let actions$ = new Observable<Action>();
let apiService: ApiService;
let classesEffect: ClassesEffect;

describe('ClassesEffect', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        provideMockActions(() => actions$),
        ApiService,
        ClassesEffect,
      ],
    });
    apiService = TestBed.get(ApiService);
    classesEffect = TestBed.get(ClassesEffect);
  });

  test(
    'should load all classes ',
    marbles((m) => {
      const action = {
        payload: {},
        type: fromStore.ClassesAction.LOAD_ALL_CLASSES,
      };
      classesEffect.loadAllClasses$.subscribe((data) => console.log(data));
      // const payload = {};
      // const loginService = jest.fn().mockImplementationOnce(() => of(payload));

      // // const completion = new fromStore.loginSuccess(payload as any);
      actions$ = m.hot('-a', { a: action });

      // const apiServiceSpy = jest.spyOn(apiService, 'get');
      // const expected = m.cold('-b', { b: completion });

      // m.expect().toBeObservable(expected);
    })
  );

  test(
    'should load techers ',
    marbles((m) => {
      classesEffect.loadTeachers$.subscribe((data) => console.log(data));
      // const payload = {};
      // const loginService = jest.fn().mockImplementationOnce(() => of(payload));

      const action = {
        payload: {},
        type: fromStore.ClassesAction.LOAD_TEACHERS,
      };

      // // const completion = new fromStore.loginSuccess(payload as any);
      actions$ = m.hot('-a', { a: action });

      // const apiServiceSpy = jest.spyOn(apiService, 'get');
      // const expected = m.cold('-b', { b: completion });

      // m.expect().toBeObservable(expected);
    })
  );

  test(
    'should create classes ',
    marbles((m) => {
      classesEffect.createClasses$.subscribe((data) => console.log(data));
      // const payload = {};
      // const loginService = jest.fn().mockImplementationOnce(() => of(payload));

      const action = {
        payload: {},
        type: fromStore.ClassesAction.CREATE_CLASSES,
      };

      // // const completion = new fromStore.loginSuccess(payload as any);
      actions$ = m.hot('-a', { a: action });

      // const apiServiceSpy = jest.spyOn(apiService, 'get');
      // const expected = m.cold('-b', { b: completion });

      // m.expect().toBeObservable(expected);
    })
  );

  test(
    'should load techers ',
    marbles((m) => {
      classesEffect.deleteClasses$.subscribe((data) => console.log(data));
      // const payload = {};
      // const loginService = jest.fn().mockImplementationOnce(() => of(payload));

      const action = {
        payload: {},
        type: fromStore.ClassesAction.DELETE_CLASSES,
      };

      // // const completion = new fromStore.loginSuccess(payload as any);
      actions$ = m.hot('-a', { a: action });

      // const apiServiceSpy = jest.spyOn(apiService, 'get');
      // const expected = m.cold('-b', { b: completion });

      // m.expect().toBeObservable(expected);
    })
  );

  test(
    'should load techers ',
    marbles((m) => {
      classesEffect.clearClasses$.subscribe((data) => console.log(data));
      // const payload = {};
      // const loginService = jest.fn().mockImplementationOnce(() => of(payload));

      const action = {
        payload: {},
        type: fromStore.ClassesAction.CLEAR_CLASSES,
      };

      // // const completion = new fromStore.loginSuccess(payload as any);
      actions$ = m.hot('-a', { a: action });

      // const apiServiceSpy = jest.spyOn(apiService, 'get');
      // const expected = m.cold('-b', { b: completion });

      // m.expect().toBeObservable(expected);
    })
  );

  test(
    'should load techers ',
    marbles((m) => {
      classesEffect.getStudents$.subscribe((data) => console.log(data));
      // const payload = {};
      // const loginService = jest.fn().mockImplementationOnce(() => of(payload));

      const action = {
        payload: {},
        type: fromStore.ClassesAction.GET_STUDENTS_NOT_ASSIGNED,
      };

      // // const completion = new fromStore.loginSuccess(payload as any);
      actions$ = m.hot('-a', { a: action });

      // const apiServiceSpy = jest.spyOn(apiService, 'get');
      // const expected = m.cold('-b', { b: completion });

      // m.expect().toBeObservable(expected);
    })
  );

  test(
    'should load techers ',
    marbles((m) => {
      classesEffect.addStudents$.subscribe((data) => console.log(data));
      // const payload = {};
      // const loginService = jest.fn().mockImplementationOnce(() => of(payload));

      const action = {
        payload: {},
        type: fromStore.ClassesAction.ADD_STUDENTS,
      };

      // // const completion = new fromStore.loginSuccess(payload as any);
      actions$ = m.hot('-a', { a: action });

      // const apiServiceSpy = jest.spyOn(apiService, 'get');
      // const expected = m.cold('-b', { b: completion });

      // m.expect().toBeObservable(expected);
    })
  );

  test(
    'should load techers ',
    marbles((m) => {
      classesEffect.deleteStudents$.subscribe((data) => console.log(data));
      // const payload = {};
      // const loginService = jest.fn().mockImplementationOnce(() => of(payload));

      const action = {
        payload: {},
        type: fromStore.ClassesAction.DELETE_STUDENTS,
      };

      // // const completion = new fromStore.loginSuccess(payload as any);
      actions$ = m.hot('-a', { a: action });

      // const apiServiceSpy = jest.spyOn(apiService, 'get');
      // const expected = m.cold('-b', { b: completion });

      // m.expect().toBeObservable(expected);
    })
  );

  test(
    'should load techers ',
    marbles((m) => {
      classesEffect.addAssign$.subscribe((data) => console.log(data));
      // const payload = {};
      // const loginService = jest.fn().mockImplementationOnce(() => of(payload));

      const action = { payload: {}, type: fromStore.ClassesAction.ADD_ASSIGN };

      // // const completion = new fromStore.loginSuccess(payload as any);
      actions$ = m.hot('-a', { a: action });

      // const apiServiceSpy = jest.spyOn(apiService, 'get');
      // const expected = m.cold('-b', { b: completion });

      // m.expect().toBeObservable(expected);
    })
  );

  test(
    'should load techers ',
    marbles((m) => {
      classesEffect.deleteAssign$.subscribe((data) => console.log(data));
      // const payload = {};
      // const loginService = jest.fn().mockImplementationOnce(() => of(payload));

      const action = {
        payload: {},
        type: fromStore.ClassesAction.DELETE_ASSIGN,
      };

      // // const completion = new fromStore.loginSuccess(payload as any);
      actions$ = m.hot('-a', { a: action });

      // const apiServiceSpy = jest.spyOn(apiService, 'get');
      // const expected = m.cold('-b', { b: completion });

      // m.expect().toBeObservable(expected);
    })
  );

  test(
    'should load techers ',
    marbles((m) => {
      classesEffect.getGrades$.subscribe((data) => console.log(data));
      // const payload = {};
      // const loginService = jest.fn().mockImplementationOnce(() => of(payload));

      const action = {
        payload: {},
        type: fromStore.ClassesAction.SELECT_ASSIGNMENT,
      };

      // // const completion = new fromStore.loginSuccess(payload as any);
      actions$ = m.hot('-a', { a: action });

      // const apiServiceSpy = jest.spyOn(apiService, 'get');
      // const expected = m.cold('-b', { b: completion });

      // m.expect().toBeObservable(expected);
    })
  );

  test(
    'should load techers ',
    marbles((m) => {
      classesEffect.addGrade$.subscribe((data) => console.log(data));
      // const payload = {};
      // const loginService = jest.fn().mockImplementationOnce(() => of(payload));

      const action = { payload: {}, type: fromStore.ClassesAction.ADD_GRADE };

      // // const completion = new fromStore.loginSuccess(payload as any);
      actions$ = m.hot('-a', { a: action });

      // const apiServiceSpy = jest.spyOn(apiService, 'get');
      // const expected = m.cold('-b', { b: completion });

      // m.expect().toBeObservable(expected);
    })
  );
});
