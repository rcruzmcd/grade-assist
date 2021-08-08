import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SharedModule } from '@grade-assist/shared';

import { StudentAddComponent } from './student-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StudentAddComponent', () => {
  let store: MockStore;
  const initialState = {};
  let component: StudentAddComponent;
  let fixture: ComponentFixture<StudentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatDividerModule,
      ],
      providers: [provideMockStore({ initialState })],
      declarations: [StudentAddComponent],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
