import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from '../../app-routing.module';
import { TeachersRoutingModule } from './teachers-routing.modules';
import { TeachersListComponent } from './components/teachers-list/teachers-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SharedModules } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { TeachersAddComponent } from './components/teachers-add/teachers-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

import * as fromStore from './store/';
import { HttpClientModule } from '@angular/common/http';
// import * as fromComponents from './components/index';

@NgModule({
  declarations: [
    //...fromComponents.components

    TeachersListComponent,
    TeachersAddComponent,
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    SharedModules,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDividerModule,
    HttpClientModule,
    StoreModule.forFeature(fromStore.FeatureKey, fromStore.reducer),
    EffectsModule.forFeature(fromStore.effects),
  ],
})
export class TeachersModule {}
