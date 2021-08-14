import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { User, FormConfig, Classes, TableConfig } from '@grade-assist/data';
import { from, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'grade-assist-classes-detail',
  templateUrl: './classes-detail.component.html',
  styleUrls: ['./classes-detail.component.scss'],
})
export class ClassesDetailComponent implements OnInit {
  title = 'Class';
  _class!: Classes;

  studentGridConfig: TableConfig = {
    updateRow: true,
    deleteRow: true,
    columns: [
      {
        id: 'firstName',
        label: 'First Name',
        display: true,
      },
      {
        id: 'lastName',
        label: 'Last Name',
        display: true,
      },
      {
        id: 'email',
        label: 'Email',
        display: true,
      },
    ],
  };

  assignGridConfig: TableConfig = {
    updateRow: true,
    deleteRow: true,
    columns: [
      {
        id: 'name',
        label: 'Name',
        display: true,
      },
      {
        id: 'type',
        label: 'Type',
        display: true,
      },
    ],
  };

  constructor(private store: Store<fromStore.State>, private router: Router) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this._class = state.classes.selectedClass;
      if (!this._class) {
        console.error('need to reroute cuz why you here...???');
      }
    });
  }

  onAddStudentsClicked() {
    this.router.navigate(['classes/details/addStudents']);
  }

  onAddAssignmentClicked() {
    this.router.navigate(['classes/details/addAssignments']);
  }

  onAssignmentClicked(assign: Event) {
    this.store.dispatch({
      type: fromStore.ClassesAction.SELECT_ASSIGNMENT,
      payload: assign,
    });
    this.router.navigate(['classes/details/assignment']);
  }

  onStudentUpdate(student: Event) {
    console.log(student);
  }

  onStudentDelete(student: any) {
    this.store.dispatch({
      type: fromStore.ClassesAction.DELETE_STUDENTS,
      payload: {
        classId: this._class._id,
        body: [student._id],
      },
    });
  }

  onAssignmentUpdate(student: Event) {
    console.log(student);
  }

  onAssignmentDelete(assign: any) {
    this.store.dispatch({
      type: fromStore.ClassesAction.DELETE_ASSIGN,
      payload: {
        assignId: assign._id,
      },
    });
  }
}
