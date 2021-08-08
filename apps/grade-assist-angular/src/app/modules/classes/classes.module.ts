import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@grade-assist/shared';

import { ClassesRoutingModule } from './classes-routing.modules';

import * as fromStore from './store';
import { AuthInterceptor } from '../../http-interceptors/auth-interceptor';
import { ClassesListComponent } from './components/classes-list/classes-list.component';
import { ClassesAddComponent } from './components/classes-add/classes-add.component';
import { ClassesDetailComponent } from './components/classes-detail/classes-detail.component';

@NgModule({
  declarations: [
    ClassesListComponent,
    ClassesAddComponent,
    ClassesDetailComponent,
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
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
export class ClassesModule {}
