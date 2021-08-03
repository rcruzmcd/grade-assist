import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from './store';

@Component({
  selector: 'grade-assist-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Grade Assist';
  isAuthorized = false;

  menu = [
    {
      icon: 'home',
      route: '/',
      label: 'Home',
    },
    {
      icon: 'admin_panel_settings',
      route: '/admin',
      label: 'Admin',
    },
    {
      icon: 'class',
      route: '/classess',
      label: 'Classes',
    },
    {
      icon: 'school',
      route: '/students',
      label: 'Students',
    },
    {
      icon: 'groups',
      route: '/teachers',
      label: 'Teachers',
    },
  ];
  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.store.subscribe((state) => {
      this.isAuthorized = !!state.auth.jwt;
    });
  }

  onLogout() {
    this.store.dispatch({
      type: fromStore.AuthActions.LOGOUT,
    });
  }
}
