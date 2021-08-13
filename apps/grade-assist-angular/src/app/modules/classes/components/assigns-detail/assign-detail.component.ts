import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { User, FormConfig, Classes, assignment } from '@grade-assist/data';
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

  constructor(private store: Store<fromStore.State>, private router: Router) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.assign = state.classes.selectedAssign;
      if (!this.assign) {
        console.error('need to reroute cuz why you here...???');
      }
      this.title = `${this.assign?.type} - ${this.assign?.name}`;
    });
  }
}
