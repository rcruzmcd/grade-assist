import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MessagesHomeComponent } from './messages-home.component';
import { SharedModule } from '@grade-assist/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MessageListComponent } from '../message-list/message-list.component';
import { ConversationComponent } from '../conversation/conversation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('MessagesHomeComponent', () => {
  let store: MockStore;
  const initialState = {};

  let component: MessagesHomeComponent;
  let fixture: ComponentFixture<MessagesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MessagesHomeComponent,
        MessageListComponent,
        ConversationComponent,
      ],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
