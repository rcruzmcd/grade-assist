import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { User, ColumnConfigs } from '@grade-assist/data';

@Component({
  selector: 'grade-assist-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss'],
})
export class TeachersListComponent implements OnInit {
  tableConfig: {
    pagination?: boolean;
    sort?: boolean;
    updateRow?: boolean;
    deleteRow?: boolean;
    columns: ColumnConfigs[];
  } = {
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
      {
        id: 'classes',
        label: 'Classes',
        display: false,
      },
    ],
  };
  teacherList$!: User[];

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      // console.log(state);
      this.teacherList$ = state.teachers.teachersList;
    });
    this.store.dispatch({ type: fromStore.TeachersActions.LOAD_ALL_TEACHERS });
  }

  onDeleteHandler(teacher: Event) {
    // console.log(teacher);
    this.store.dispatch({
      type: fromStore.TeachersActions.DELETE_TEACHERS,
      payload: teacher,
    });
  }

  onUpdateHandler(teacher: Event) {
    // console.log(teacher);
    this.store.dispatch({
      type: fromStore.TeachersActions.UPDATE_TEACHERS,
      payload: teacher,
    });
  }
}
