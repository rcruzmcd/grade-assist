import { Component, OnInit } from '@angular/core';
import { FormConfig } from '@grade-assist/data';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

// sign up tab to handle new user... request needs to be approved by admin before sending
@Component({
  selector: 'grade-assist-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.components.scss'],
})
export class LoginComponent implements OnInit {
  loading!: boolean;
  formConfig: FormConfig = {
    inputs: [
      {
        appearance: 'outline',
        label: 'Email',
        placeholder: '',
        key: 'email',
        type: 'email',
      },
      {
        appearance: 'outline',
        label: 'Password',
        placeholder: '',
        key: 'password',
        type: 'password',
      },
    ],
  };

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.store.subscribe((state) => {
      this.loading = state.auth.loading;
    });
  }

  formHandler(user: Event) {
    this.store.dispatch({
      type: fromStore.AuthActions.LOGIN,
      payload: user,
    });
  }

  loginAsAdmin() {
    this.store.dispatch({
      type: fromStore.AuthActions.LOGIN,
      payload: {
        email: 'admin@admin.com',
        password: 'myverystrongSuperString123*',
      },
    });
  }
  loginAsStudent() {
    this.store.dispatch({
      type: fromStore.AuthActions.LOGIN,
      payload: {
        email: 'mabel.senior@student.com',
        password: 'myverystrongSuperString23*',
      },
    });
  }
  loginAsTeacher() {
    this.store.dispatch({
      type: fromStore.AuthActions.LOGIN,
      payload: {
        email: 'stacy.jarvis@teacher.com',
        password: 'myverystrongSuperString123*',
      },
    });
  }
}
