import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TemplateRef } from '@angular/core';

import * as fromStore from '../../store';
import { User, FormConfig, Classes } from '@grade-assist/data';

@Component({
  selector: 'grade-assist-classes-add-students',
  templateUrl: './classes-add-students.component.html',
  styleUrls: ['./classes-add-students.component.scss'],
})
export class ClassesAddStudentsComponent implements OnInit {
  studentsList?: User[];
  selectedStudents?: User[];
  selectedClass!: Classes;
  title = '';

  constructor(private store: Store<fromStore.State>, private router: Router) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      console.log(state);
      this.selectedClass = state.classes.selectedClass;
      this.studentsList = state.classes.studentsNotInSelected;
      this.title = `Add Students to ${this.selectedClass?.code} - ${this.selectedClass?.name}`;
    });
    this.store.dispatch({
      type: fromStore.ClassesAction.GET_STUDENTS_NOT_ASSIGNED,
    });
  }

  onAddClicked() {
    const selectedStudentsId = this.selectedStudents?.map(
      (student) => student._id
    );
    this.store.dispatch({
      type: fromStore.ClassesAction.ADD_STUDENTS,
      payload: {
        classId: this.selectedClass._id,
        body: selectedStudentsId,
      },
    });
    this.router.navigate(['/classes/details']);
  }
}
