import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { User, ColumnConfigs, TableConfig } from '@grade-assist/data';
import { Router } from '@angular/router';

@Component({
  selector: 'grade-assist-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  tableConfig: TableConfig = {
    updateRow: true,
    deleteRow: true,
    viewBtn: true,
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
      {
        id: 'classes',
        label: 'Classes',
        display: false,
      },
    ],
  };
  studentList$!: User[];

  constructor(private store: Store<fromStore.State>, private router: Router) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      // console.log(state);
      this.studentList$ = state.student.studentsList;
    });
    this.store.dispatch({ type: fromStore.StudentActions.LOAD_ALL_STUDENT });
  }

  onDeleteHandler(student: Event) {
    // console.log(student);
    this.store.dispatch({
      type: fromStore.StudentActions.DELETE_STUDENT,
      payload: student,
    });
  }

  onUpdateHandler(student: Event) {
    // console.log(student);
    this.store.dispatch({
      type: fromStore.StudentActions.UPDATE_STUDENT,
      payload: student,
    });
  }

  onViewHandler(student: Event) {
    // console.log(classes);
    this.store.dispatch({
      type: fromStore.StudentActions.SELECT_STUDENT,
      payload: student,
    });
    this.router.navigate(['students/details']);
  }
}
