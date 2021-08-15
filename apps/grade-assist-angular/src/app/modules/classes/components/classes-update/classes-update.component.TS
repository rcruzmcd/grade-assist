import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { of } from 'rxjs';

import * as fromStore from '../../store';
import { User, FormConfig, Classes } from '@grade-assist/data';

@Component({
  selector: 'grade-assist-classes-update',
  templateUrl: './classes-update.component.html',
  styleUrls: ['./classes-update.component.scss'],
})
export class ClassesUpdateComponent implements OnInit {
  title = '';
  _class!: Classes;
  teacherList!: { viewValue: string; value: string }[];
  formConfig: FormConfig = {
    inputs: [
      {
        appearance: 'outline',
        label: 'Code',
        placeholder: '',
        key: 'code',
        validators: [Validators.required],
      },
      {
        appearance: 'outline',
        label: 'Name',
        placeholder: '',
        key: 'name',
      },
      {
        appearance: 'outline',
        label: 'Teacher',
        placeholder: '',
        key: 'teacher',
        type: 'select',
        selectValues: this.getDropDownValues('teacher'),
      },
      {
        appearance: 'outline',
        label: '',
        placeholder: '',
        key: 'assignments',
        hide: true,
      },
      {
        appearance: 'outline',
        label: '',
        placeholder: '',
        key: 'students',
        hide: true,
      },
      {
        appearance: 'outline',
        label: '',
        placeholder: '',
        key: '_id',
        hide: true,
      },
    ],
  };

  constructor(private router: Router, private store: Store<fromStore.State>) {}

  ngOnInit(): void {
    console.log('init');
    this.store.subscribe((state) => {
      this._class = state.classes.selectedClass;
      this.title = `Updating ${state.classes.selectedClass.code} - ${state.classes.selectedClass.name}`;

      this.teacherList = state.classes.teacherList.map((teacher) => {
        return {
          value: teacher._id || '',
          viewValue: `${teacher.firstName} ${teacher.lastName}`,
        };
      });
    });
    this.store.dispatch({
      type: fromStore.ClassesAction.LOAD_TEACHERS,
    });
  }

  async getDropDownValues(
    key: string
  ): Promise<{ viewValue: string; value: string }[]> {
    this.store.subscribe((state) => {
      const slectValue = state.classes.teacherList.map((teacher) => {
        return {
          value: teacher._id || '',
          viewValue: `${teacher.firstName} ${teacher.lastName}`,
        };
      });
      console.log('will it update? ', slectValue);
      return slectValue;
    });
    return [];
    // return Promise.;
  }

  formHandler(classes: Event) {
    console.log(classes);
    // this.store.dispatch({
    //   type: fromStore.ClassesAction.CREATE_CLASSES,
    //   payload: classes,
    // });

    // if update successfull navigate, if not stay
    // this.router.navigate(['admin/list']);
  }
}
