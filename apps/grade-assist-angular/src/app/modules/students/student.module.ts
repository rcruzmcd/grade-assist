import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@grade-assist/shared';

import { StudentRoutingModule } from './student-routing.modules';

import * as fromStore from './store';
import { AuthInterceptor } from '../../http-interceptors/auth-interceptor';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentAddComponent } from './components/student-add/student-add.component';

@NgModule({
  declarations: [StudentListComponent, StudentAddComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromStore.FeatureKey, fromStore.reducer),
    EffectsModule.forFeature(fromStore.effects),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class StudentModule {}
