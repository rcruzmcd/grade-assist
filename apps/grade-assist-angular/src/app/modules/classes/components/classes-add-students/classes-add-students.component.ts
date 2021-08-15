import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TemplateRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import * as fromStore from '../../store';
import { User, FormConfig, Classes } from '@grade-assist/data';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'grade-assist-classes-add-students',
  templateUrl: './classes-add-students.component.html',
  styleUrls: ['./classes-add-students.component.scss'],
})
export class ClassesAddStudentsComponent implements OnInit {
  selectedClass!: Classes;
  title = '';
  displayedColumns: string[] = ['select', 'firstName', 'lastName', 'email'];
  selection = new SelectionModel<User>(true, []);
  dataSource!: MatTableDataSource<User>;

  constructor(private store: Store<fromStore.State>, private router: Router) {}

  ngOnInit(): void {
    this.store.subscribe((state) => {
      console.log(state);
      this.selectedClass = state.classes.selectedClass;
      this.title = `Add Students to ${this.selectedClass?.code} - ${this.selectedClass?.name}`;
      this.dataSource = new MatTableDataSource(
        state.classes.studentsNotInSelected
      );
    });
    this.store.dispatch({
      type: fromStore.ClassesAction.GET_STUDENTS_NOT_ASSIGNED,
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    // if (!row) {
    //   return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    // }
    // return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
    //   row.position + 1
    // }`;
    return '';
  }

  onAddClicked() {
    const selectedStudentsId = this.selection.selected.map(
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
