import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@grade-assist/shared';

import { ClassesRoutingModule } from './classes-routing.modules';

import * as fromStore from './store';
import { AuthInterceptor } from '../../http-interceptors/auth-interceptor';
import { ClassesListComponent } from './components/classes-list/classes-list.component';
import { ClassesAddComponent } from './components/classes-add/classes-add.component';
import { ClassesDetailComponent } from './components/classes-detail/classes-detail.component';
import { ClassesAddStudentsComponent } from './components/classes-add-students/classes-add-students.component';
import { ClassesAddAssignsComponent } from './components/classes-add-assigns/classes-add-assigns.component';
import { AssignsDetailComponent } from './components/assigns-detail/assign-detail.component';
import { ClassesUpdateComponent } from './components/classes-update/classes-update.component';
import { BackButtonComponent } from '../../components/back-button/back-button.component';

@NgModule({
  declarations: [
    ClassesListComponent,
    ClassesAddComponent,
    ClassesDetailComponent,
    ClassesAddStudentsComponent,
    ClassesAddAssignsComponent,
    AssignsDetailComponent,
    ClassesUpdateComponent,
    BackButtonComponent,
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature(fromStore.FeatureKey, fromStore.reducer),
    EffectsModule.forFeature(fromStore.effects),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class ClassesModule {}
