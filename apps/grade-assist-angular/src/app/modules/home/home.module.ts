import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from '../../app-routing.module';
import { HomeRoutingModule } from './home-routing.modules';
import { HomeComponent } from './components/home/home.component';

import { SharedModule } from '@grade-assist/shared';

// import { effects } from './store';
// import * as from from './store/reducers';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    // StoreModule.forFeature(from.FeatureKey, from.reducers),
    // EffectsModule.forFeature(effects),
  ],
})
export class HomeModule {}
