import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MessageListComponent } from './message-list.component';
import { SharedModule } from '@grade-assist/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('MessageListComponent', () => {
  let store: MockStore;
  const initialState = {
    messages: {
      convos: [],
    },
    auth: {
      user: {},
    },
  };

  let component: MessageListComponent;
  let fixture: ComponentFixture<MessageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageListComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatIconModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should render messages', () => {
  //   const convoStub = [
  //     {
  //       messages: [
  //         {
  //           sender: '123',
  //           message: 'string',
  //           datetime: new Date(),
  //         },
  //       ],
  //       participants: ['123', '454'],
  //     },
  //   ];
  //   component.convos = convoStub;
  //   fixture.detectChanges();
  //   expect(component).toBeTruthy();
  // });

  it('should dispatch action on convo selected', () => {
    const convoStub = [
      {
        messages: [
          {
            sender: '123',
            message: 'string',
            datetime: new Date(),
          },
        ],
        participants: ['123', '454'],
      },
    ];
    component.onConvoSelected(convoStub[0]);
    expect(component).toBeTruthy();
  });
});
