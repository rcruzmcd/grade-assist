import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromStore from './store';

@Component({
  selector: 'grade-assist-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
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
  menu = [
    {
      icon: 'home',
      route: '/',
      label: 'Home',
      privilege: ['*'],
    },
    {
      icon: 'admin_panel_settings',
      route: '/admin',
      label: 'Admin',
      privilege: ['admin'],
    },
    {
      icon: 'class',
      route: '/classes',
      label: 'Classes',
      privilege: ['*'],
    },
    {
      icon: 'school',
      route: '/students',
      label: 'Students',
      privilege: ['*'],
    },
    {
      icon: 'groups',
      route: '/teachers',
      label: 'Teachers',
      privilege: ['admin', 'teacher'],
    },
    {
      icon: 'assignment_turned_in',
      route: '/assignments',
      label: 'Assignments',
      privilege: ['admin'],
    },
  ];
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
