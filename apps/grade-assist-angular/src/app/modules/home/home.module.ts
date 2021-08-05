import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from '../../app-routing.module';
import { HomeRoutingModule } from './home-routing.modules';
import { HomeComponent } from './components/home/home.component';
import { MatCardModule } from '@angular/material/card';

// import { effects } from './store';
// import * as from from './store/reducers';
// import * as fromComponents from './components/index';

@NgModule({
  declarations: [
    //...fromComponents.components

    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    // StoreModule.forFeature(from.FeatureKey, from.reducers),
    // EffectsModule.forFeature(effects),
  ],
})
export class HomeModule {}
