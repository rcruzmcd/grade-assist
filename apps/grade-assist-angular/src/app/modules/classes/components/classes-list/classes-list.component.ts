import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { User, ColumnConfigs } from '@grade-assist/data';
import { Router } from '@angular/router';

@Component({
  selector: 'grade-assist-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss'],
})
export class ClassesListComponent implements OnInit {
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
        id: 'code',
        label: 'Code',
        display: true,
      },
      {
        id: 'name',
        label: 'Name',
        display: true,
      },
      {
        id: 'teacher.firstName',
        label: 'Teacher',
        display: true,
      },
    ],
  };
  classList$!: User[];

  constructor(private store: Store<fromStore.State>, private router: Router) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      // console.log(state);
      this.classList$ = state.classes.classesList;
    });
    this.store.dispatch({ type: fromStore.ClassesAction.LOAD_ALL_CLASSES });
  }

  onDeleteHandler(classes: Event) {
    // console.log(classes);
    this.store.dispatch({
      type: fromStore.ClassesAction.DELETE_CLASSES,
      payload: classes,
    });
  }

  onUpdateHandler(classes: Event) {
    // console.log(classes);
    this.store.dispatch({
      type: fromStore.ClassesAction.UPDATE_CLASSES,
      payload: classes,
    });
  }

  onViewHandler(classes: Event) {
    console.log(classes);
    this.store.dispatch({
      type: fromStore.ClassesAction.SELECT_CLASS,
      payload: classes,
    });
    this.router.navigate(['classes/details']);
  }
}
