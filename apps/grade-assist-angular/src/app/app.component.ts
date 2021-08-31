import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { menu } from '../assets/menu';
import * as fromStore from './store';

@Component({
  selector: 'grade-assist-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  menu = menu;
  title = 'Grade Assist';
  userType = '*';
  isAuthorized = false;
  user = '';
  priviledgeMenu: {
    icon: string;
    route: string;
    label: string;
    privilege: string[];
  }[] = [];

  constructor(private store: Store<fromStore.State>, private router: Router) {}

  ngOnInit() {
    this.store.subscribe((state) => {
      this.isAuthorized = !!state?.auth?.jwt;
      this.userType = state.auth.userType;
      this.user = state.auth.userEmail;

      this.priviledgeMenu = this.menu.filter(
        (item) =>
          item.privilege.includes('*') || item.privilege.includes(this.userType)
      );
    });

    this.router.navigate(['home']);
  }

  onLogout() {
    this.store.dispatch({
      type: fromStore.AuthActions.LOGOUT,
    });
  }
}
