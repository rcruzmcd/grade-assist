import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { User, FormConfig, Classes, TableConfig } from '@grade-assist/data';
import { from, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'grade-assist-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent implements OnInit {
  title = '';
  student: any;

  constructor(private store: Store<fromStore.State>, private router: Router) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.student = state.student.selectedStudent;
      if (!this.student) {
        console.error('need to reroute cuz why you here...???');
      }
      this.title = `${this.student.firstName} ${this.student.lastName}`;
    });
  }

  onClearClicked() {
    // this.store.dispatch({
    //   type: fromStore.ClassesAction.CLEAR_CLASSES,
    //   payload: {
    //     classId: this._class._id,
    //   },
    // });
  }

  onUpdateClicked() {
    this.router.navigate(['classes/details/update']);
  }
}
