import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { User, FormConfig } from '@grade-assist/data';

@Component({
  selector: 'grade-assist-classes-add',
  templateUrl: './classes-add.component.html',
  styleUrls: ['./classes-add.component.scss'],
})
export class ClassesAddComponent implements OnInit {
  title = 'Add New Classes';
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

  formHandler(classes: Event) {
    // console.log(student);
    this.store.dispatch({
      type: fromStore.ClassesAction.CREATE_CLASSES,
      payload: classes,
    });

    // if update successfull navigate, if not stay
    // this.router.navigate(['admin/list']);
  }
}
