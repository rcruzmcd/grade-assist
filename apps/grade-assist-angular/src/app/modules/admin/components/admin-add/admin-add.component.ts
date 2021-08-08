import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { User, FormConfig } from '@grade-assist/data';

@Component({
  selector: 'grade-assist-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.scss'],
})
export class AdminAddComponent implements OnInit {
  title = 'Add New Admin';
  formConfig: FormConfig = {
    inputs: [
      {
        appearance: 'outline',
        label: 'Email',
        placeholder: '',
        type: 'email',
        key: 'email',
        validators: [Validators.required, Validators.email],
      },
      {
        appearance: 'outline',
        label: 'Password',
        placeholder: '',
        type: 'password',
        key: 'password',
        validators: [Validators.required, Validators.minLength(5)],
      },
      {
        appearance: 'outline',
        label: 'First Name',
        placeholder: '',
        key: 'firstName',
        validators: [Validators.required],
      },
      {
        appearance: 'outline',
        label: 'Last Name',
        placeholder: '',
        key: 'lastName',
      },
      {
        appearance: 'outline',
        label: 'Classes',
        placeholder: '',
        key: 'classes',
      },
    ],
  };

  constructor(private router: Router, private store: Store<fromStore.State>) {}

  ngOnInit(): void {
    console.log('init');
  }

  formHandler(teacher: Event) {
    // console.log(teacher);
    this.store.dispatch({
      type: fromStore.AdminActions.CREATE_ADMIN,
      payload: teacher,
    });

    // if update successfull navigate, if not stay
    // this.router.navigate(['admin/list']);
  }
}
