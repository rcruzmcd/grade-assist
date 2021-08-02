import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { TeachersListComponent } from './components/teachers-list/teachers-list.component';
import { TeachersAddComponent } from './components/teachers-add/teachers-add.component';

const routes: Routes = [
  {
    path: 'list',
    component: TeachersListComponent,
  },
  {
    path: 'add',
    component: TeachersAddComponent,
  },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeachersRoutingModule {}
