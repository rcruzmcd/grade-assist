import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';

@Component({
  selector: 'grade-assist-student-classes',
  templateUrl: './student-classes.component.html',
  styleUrls: ['./student-classes.component.scss'],
})
export class StudentClassesComponent implements OnInit {
  loggedInUser: any;
  title = 'My Classes';

  constructor(private store: Store<fromStore.State>) {}
  ngOnInit(): void {
    this.store.subscribe((state) => {
      console.log(state.auth.user);
      this.loggedInUser = state.auth.user;
    });
  }
}
