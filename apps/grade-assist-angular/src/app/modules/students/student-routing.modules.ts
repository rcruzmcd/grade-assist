import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentClassesComponent } from './components/student-classes/student-classes.component';
import { StudentGradesComponent } from './components/student-grades/student-grades.component';
import { StudentAssignmentsComponent } from './components/student-assignments/student-assignment.component';

const routes: Routes = [
  {
    path: 'list',
    component: StudentListComponent,
  },
  {
    path: 'add',
    component: StudentAddComponent,
  },
  {
    path: 'myclasses',
    component: StudentClassesComponent,
  },
  {
    path: 'mygrades',
    component: StudentGradesComponent,
  },
  {
    path: 'myassignments',
    component: StudentAssignmentsComponent,
  },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
