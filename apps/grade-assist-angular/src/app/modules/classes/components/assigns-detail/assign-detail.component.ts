import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import {
  User,
  FormConfig,
  Classes,
  assignment,
  TableConfig,
} from '@grade-assist/data';
import { from, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'grade-assist-assign-detail',
  templateUrl: './assign-detail.component.html',
  styleUrls: ['./assign-detail.component.scss'],
})
export class AssignsDetailComponent implements OnInit {
  title = '';
  assign?: assignment;
  showAddGradeForm = false;
  studentSelected: any;
  studentGrade?: string;
  _class!: Classes;
  gradesGridConfig: TableConfig = {
    updateRow: false,
    deleteRow: false,
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
        id: 'grade',
        label: 'Grade',
        display: true,
      },
    ],
  };

  constructor(private store: Store<fromStore.State>, private router: Router) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this._class = state.classes.selectedClass;
      this.assign = state.classes.selectedAssign;
      if (!this.assign) {
        console.error('need to reroute cuz why you here...???');
      }
      this.title = `${this.assign?.type} - ${this.assign?.name}`;
    });
  }

  onAddClicked() {
    this.showAddGradeForm = true;
  }

  onAddGrade() {
    console.log(this.studentGrade, this.studentSelected);
    this.store.dispatch({
      type: fromStore.ClassesAction.ADD_GRADE,
      payload: {
        _id: this.assign?._id,
        body: {
          grade: this.studentGrade,
          studentId: this.studentSelected,
        },
      },
    });
  }
}
