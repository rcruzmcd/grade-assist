import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MessagesRoutingModule } from './messages-routing.module';

import { SharedModule } from '@grade-assist/shared';
import { MessagesHomeComponent } from './components/messages-home/messages-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as fromStore from './store';
import { MessageListComponent } from './components/message-list/message-list.component';
import { ConversationComponent } from './components/conversation/conversation.component';

@NgModule({
  declarations: [
    MessagesHomeComponent,
    MessageListComponent,
    ConversationComponent,
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('messages', fromStore.reducer),
    EffectsModule.forFeature(fromStore.effects),
  ],
})
export class MessagesModule {}
