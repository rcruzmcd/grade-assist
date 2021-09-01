import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';

@Component({
  selector: 'grade-assist-student-grades',
  templateUrl: './student-grades.component.html',
  styleUrls: ['./student-grades.component.scss'],
})
export class StudentGradesComponent implements OnInit {
  loggedInUser: any;
  title = 'My Grades';

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
