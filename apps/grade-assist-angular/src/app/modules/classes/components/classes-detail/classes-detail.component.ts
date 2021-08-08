import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { User, FormConfig } from '@grade-assist/data';

@Component({
  selector: 'grade-assist-classes-detail',
  templateUrl: './classes-detail.component.html',
  styleUrls: ['./classes-detail.component.scss'],
})
export class ClassesDetailComponent implements OnInit {
  title = 'Class';
  _class: any;

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      this._class = state.classes.selectedClass;
      if (!this._class) {
        console.error('need to reroute cuz why you here...???');
      }
    });
  }
}
