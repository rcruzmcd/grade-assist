import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';

@Component({
  selector: 'grade-assist-student-assignments',
  templateUrl: './student-assignment.component.html',
  styleUrls: ['./student-assignment.component.scss'],
})
export class StudentAssignmentsComponent implements OnInit {
  loggedInUser: any;
  title = 'My Assignments';

  constructor(private store: Store<fromStore.State>) {}
  ngOnInit(): void {
    this.store.subscribe((state) => {
      console.log(state);
      this.loggedInUser = {
        userType: state.auth.userType,
        email: state.auth.userEmail,
      };
    });
  }
}
