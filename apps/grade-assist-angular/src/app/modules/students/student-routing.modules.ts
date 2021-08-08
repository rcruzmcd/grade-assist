import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminListComponent } from './components/admin-list/admin-list.component';
import { AdminAddComponent } from './components/admin-add/admin-add.component';

const routes: Routes = [
  {
    path: 'list',
    component: AdminListComponent,
  },
  {
    path: 'add',
    component: AdminAddComponent,
  },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
