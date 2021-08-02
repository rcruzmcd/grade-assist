import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { AppRoutingModule } from '../../app-routing.module';
import { AdminRoutingModule } from './admin-routing.modules';

// import { effects } from './store';
// import * as from from './store/reducers';
// import * as fromComponents from './components/index';

@NgModule({
  declarations: [
    //...fromComponents.components
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    // StoreModule.forFeature(from.FeatureKey, from.reducers),
    // EffectsModule.forFeature(effects),
  ],
})
export class AdminModule { }
