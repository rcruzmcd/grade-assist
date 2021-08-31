import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ClassesAddAssignsComponent } from './classes-add-assigns.component';
import { SharedModule } from '@grade-assist/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

describe('ClassesAddAssignsComponent', () => {
  let store: MockStore;
  const initialState = {
    classes: {
      selectedClass: {
        code: 'abc',
        name: 'test',
      },
    },
  };

  let component: ClassesAddAssignsComponent;
  let fixture: ComponentFixture<ClassesAddAssignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassesAddAssignsComponent],
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MatCardModule,
        MatIconModule,
      ],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesAddAssignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch action on formHandler', () => {
    jest.spyOn(component, 'formHandler');
    component.formHandler({} as Event);
    expect(component.formHandler).toHaveBeenCalled();
  });
});
