import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ClassesListComponent } from './components/classes-list/classes-list.component';
import { ClassesAddComponent } from './components/classes-add/classes-add.component';

const routes: Routes = [
  {
    path: 'list',
    component: ClassesListComponent,
  },
  {
    path: 'add',
    component: ClassesAddComponent,
  },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassesRoutingModule {}
