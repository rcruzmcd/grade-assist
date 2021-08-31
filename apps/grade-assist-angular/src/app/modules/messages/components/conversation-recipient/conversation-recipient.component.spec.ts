import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@grade-assist/shared';
import { ConversationRecipientComponent } from './conversation-recipient.component';

describe('ConversationRecipientComponent', () => {
  let component: ConversationRecipientComponent;
  let fixture: ComponentFixture<ConversationRecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConversationRecipientComponent],
      imports: [
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
