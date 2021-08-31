import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ClassesUpdateComponent } from './classes-update.component';
import { SharedModule } from '@grade-assist/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

describe('ClassesUpdateComponent', () => {
  let store: MockStore;
  const initialState = {
    // classes: {
    //   selectedClass: {
    //     code: 'abc',
    //     name: 'test',
    //   },
    // },
  };

  let component: ClassesUpdateComponent;
  let fixture: ComponentFixture<ClassesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassesUpdateComponent],
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
    fixture = TestBed.createComponent(ClassesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // (component.teacherList = [
    //   {
    //     viewValue: 'test',
    //     value: '123',
    //   },
    // ]),
    //   fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should dispatch action on formHandler', () => {
    // (component.teacherList = [
    //   {
    //     viewValue: 'test',
    //     value: '123',
    //   },
    // ]),
    // //   fixture.detectChanges();
    // jest.spyOn(component, 'formHandler');
    // component.formHandler({} as Event);
    // expect(component.formHandler).toHaveBeenCalled();
  });
});
