import { Component } from '@angular/core';
import { FormConfig } from '@grade-assist/data';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

@Component({
  selector: 'grade-assist-login',
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent {
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
        email: 'admin@grade-assist.com',
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
