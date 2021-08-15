import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MessagesRoutingModule } from './messages-routing.module';

import { SharedModule } from '@grade-assist/shared';
import { MessagesHomeComponent } from './components/messages-home/messages-home.component';
import { FormsModule } from '@angular/forms';

// import { effects } from './store';
// import * as from from './store/reducers';

@NgModule({
  declarations: [MessagesHomeComponent],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    SharedModule,
    FormsModule,
    // StoreModule.forFeature(from.FeatureKey, from.reducers),
    // EffectsModule.forFeature(effects),
  ],
})
export class MessagesModule {}
