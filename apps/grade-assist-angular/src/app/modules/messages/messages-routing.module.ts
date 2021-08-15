import { Routes, RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { MessagesHomeComponent } from './components/messages-home/messages-home.component';

const routes: Routes = [
  {
    path: '',
    component: MessagesHomeComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
