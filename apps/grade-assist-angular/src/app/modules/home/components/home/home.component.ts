import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../../store';

@Component({
  selector: 'grade-assist-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loggedInUser: any;

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
