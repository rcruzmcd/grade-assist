import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { User, FormConfig, Classes } from '@grade-assist/data';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'grade-assist-classes-detail',
  templateUrl: './classes-detail.component.html',
  styleUrls: ['./classes-detail.component.scss'],
})
export class ClassesDetailComponent implements OnInit {
  title = 'Class';
  _class!: Classes;

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
}
