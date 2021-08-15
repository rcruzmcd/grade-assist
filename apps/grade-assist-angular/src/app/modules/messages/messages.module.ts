import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MessagesRoutingModule } from './messages-routing.module';

import { SharedModule } from '@grade-assist/shared';
import { MessagesHomeComponent } from './components/messages-home/messages-home.component';
import { FormsModule } from '@angular/forms';

import * as fromStore from './store';

@NgModule({
  declarations: [MessagesHomeComponent],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    SharedModule,
    FormsModule,
    StoreModule.forFeature('messages', fromStore.reducer),
    EffectsModule.forFeature(fromStore.effects),
  ],
})
export class MessagesModule {}
