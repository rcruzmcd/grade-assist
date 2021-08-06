import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { Teacher, FormConfig } from '@grade-assist/data';

@Component({
  selector: 'grade-assist-teachers-add',
  templateUrl: './teachers-add.component.html',
  styleUrls: ['./teachers-add.component.scss'],
})
export class TeachersAddComponent implements OnInit {
  formConfig: FormConfig = {
    inputs: [
      {
        appearance: 'outline',
        label: 'First Name',
        placeholder: '',
        key: 'firstName',
      },
      {
        appearance: 'outline',
        label: 'Last Name',
        placeholder: '',
        key: 'lastName',
      },
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
      type: fromStore.TeachersActions.CREATE_TEACHERS,
      payload: teacher,
    });
    this.router.navigate(['teachers/list']);
  }
}
