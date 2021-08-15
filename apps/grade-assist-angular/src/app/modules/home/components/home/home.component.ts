import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { io } from 'socket.io-client';

import * as fromStore from '../../../../store';

@Component({
  selector: 'grade-assist-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loggedInUser: any;
  socket!: any;

  constructor(private store: Store<fromStore.State>) {}
  ngOnInit(): void {
    this.socket = io('http://localhost:3000');

    this.store.subscribe((state) => {
      // console.log(state.auth.);
      this.loggedInUser = {
        userType: state.auth.userType,
        email: state.auth.userEmail,
        userId: state.auth.userId,
      };

      this.socket.on(`message${this.loggedInUser.userId}`, (message: any) => {
        console.log(message);
      });
    });
  }
}
