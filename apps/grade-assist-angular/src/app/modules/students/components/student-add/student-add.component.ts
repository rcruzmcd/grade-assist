import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { User, FormConfig } from '@grade-assist/data';

@Component({
  selector: 'grade-assist-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss'],
})
export class StudentAddComponent implements OnInit {
  title = 'Add New Student';
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

  formHandler(student: Event) {
    // console.log(student);
    this.store.dispatch({
      type: fromStore.StudentActions.CREATE_STUDENT,
      payload: student,
    });

    // if update successfull navigate, if not stay
    // this.router.navigate(['admin/list']);
  }
}
