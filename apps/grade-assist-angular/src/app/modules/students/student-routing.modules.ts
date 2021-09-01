import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';

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
    path: 'details',
    component: StudentDetailComponent,
  },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
