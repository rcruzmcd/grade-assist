import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ClassesListComponent } from './components/classes-list/classes-list.component';
import { ClassesAddComponent } from './components/classes-add/classes-add.component';
import { ClassesDetailComponent } from './components/classes-detail/classes-detail.component';
import { ClassesAddStudentsComponent } from './components/classes-add-students/classes-add-students.component';
import { ClassesAddAssignsComponent } from './components/classes-add-assigns/classes-add-assigns.component';
import { AssignsDetailComponent } from './components/assigns-detail/assign-detail.component';
import { ClassesUpdateComponent } from './components/classes-update/classes-update.component';

const routes: Routes = [
  {
    path: 'list',
    component: ClassesListComponent,
  },
  {
    path: 'add',
    component: ClassesAddComponent,
  },
  {
    path: 'details',
    component: ClassesDetailComponent,
  },
  {
    path: 'details/addStudents',
    component: ClassesAddStudentsComponent,
  },
  {
    path: 'details/addAssignments',
    component: ClassesAddAssignsComponent,
  },
  {
    path: 'details/assignment',
    component: AssignsDetailComponent,
  },
  {
    path: 'details/update',
    component: ClassesUpdateComponent,
  },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassesRoutingModule {}
