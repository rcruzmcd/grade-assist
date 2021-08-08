import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { StudentListComponent } from './student-list.component';
import { SharedModule } from '@grade-assist/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('StudentListComponent', () => {
  let store: MockStore;
  const initialState = {};

  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentListComponent],
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
    fixture = TestBed.createComponent(StudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
