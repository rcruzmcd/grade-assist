import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '@grade-assist/shared';
import { TeachersRoutingModule } from './teachers-routing.modules';
import { TeachersListComponent } from './components/teachers-list/teachers-list.component';
import { TeachersAddComponent } from './components/teachers-add/teachers-add.component';

import * as fromStore from './store/';
import { AuthInterceptor } from '../../http-interceptors/auth-interceptor';

@NgModule({
  declarations: [TeachersListComponent, TeachersAddComponent],
  imports: [
    CommonModule,
    TeachersRoutingModule,
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
export class TeachersModule {}
