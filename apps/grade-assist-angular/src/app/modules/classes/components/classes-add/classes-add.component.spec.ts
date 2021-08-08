import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SharedModule } from '@grade-assist/shared';

import { ClassesAddComponent } from './classes-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ClassesAddComponent', () => {
  let store: MockStore;
  const initialState = {};
  let component: ClassesAddComponent;
  let fixture: ComponentFixture<ClassesAddComponent>;

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
      declarations: [ClassesAddComponent],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
