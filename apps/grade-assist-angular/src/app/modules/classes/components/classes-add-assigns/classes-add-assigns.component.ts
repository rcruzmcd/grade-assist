import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TemplateRef } from '@angular/core';

import * as fromStore from '../../store';
import { User, FormConfig, Classes } from '@grade-assist/data';

@Component({
  selector: 'grade-assist-classes-add-assigns',
  templateUrl: './classes-add-assigns.component.html',
  styleUrls: ['./classes-add-assigns.component.scss'],
})
export class ClassesAddAssignsComponent implements OnInit {
  //   studentsList?: User[];
  //   selectedStudents?: User[];
  formConfig: FormConfig = {
    inputs: [
      {
        appearance: 'outline',
        label: 'Name',
        placeholder: '',
        key: 'name',
        type: 'text',
      },
      {
        appearance: 'outline',
        label: 'Type',
        placeholder: '',
        key: 'type',
        type: 'text',
      },
    ],
  };
  selectedClass!: Classes;
  title = '';

  constructor(private store: Store<fromStore.State>, private router: Router) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      console.log(state);
      this.selectedClass = state.classes.selectedClass;
      this.title = `Create Assignment for ${this.selectedClass?.code} - ${this.selectedClass?.name}`;
    });
  }

  formHandler(assignInfo: Event) {
    this.store.dispatch({
      type: fromStore.ClassesAction.ADD_ASSIGN,
      payload: {
        classId: this.selectedClass._id,
        body: assignInfo,
      },
    });
    this.router.navigate(['/classes/details']);
  }
}
