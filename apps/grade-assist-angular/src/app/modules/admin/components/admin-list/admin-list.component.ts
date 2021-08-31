import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { User, ColumnConfigs } from '@grade-assist/data';

@Component({
  selector: 'grade-assist-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent implements OnInit {
  isLoading = false;
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
  adminList$!: User[];

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      // console.log(state);
      this.adminList$ = state.admin.adminsList;
      this.isLoading = state.admin.loading;
    });
    this.store.dispatch({ type: fromStore.AdminActions.LOAD_ALL_ADMIN });
  }

  onDeleteHandler(admin: Event) {
    // console.log(admin);
    this.store.dispatch({
      type: fromStore.AdminActions.DELETE_ADMIN,
      payload: admin,
    });
  }

  onUpdateHandler(admin: Event) {
    // console.log(admin);
    this.store.dispatch({
      type: fromStore.AdminActions.UPDATE_ADMIN,
      payload: admin,
    });
  }
}
