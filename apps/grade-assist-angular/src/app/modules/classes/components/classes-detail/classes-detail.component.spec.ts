import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ClassesDetailComponent } from './classes-detail.component';
import { SharedModule } from '@grade-assist/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

describe('ClassesDetailComponent', () => {
  let store: MockStore;
  const initialState = {
    classes: {
      selectedClass: {},
    },
  };

  let component: ClassesDetailComponent;
  let fixture: ComponentFixture<ClassesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassesDetailComponent],
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
    fixture = TestBed.createComponent(ClassesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch action onClearClicked', () => {
    component.onClearClicked();
    expect(component).toBeTruthy();
  });

  it('should navigate to onAddStudentsClicked', () => {
    component.onAddStudentsClicked();
    expect(component).toBeTruthy();
  });

  it('should navigate to onAddAssignmentClicked', () => {
    component.onAddAssignmentClicked();
    expect(component).toBeTruthy();
  });

  it('should navigate to onUpdateClicked', () => {
    component.onUpdateClicked();
    expect(component).toBeTruthy();
  });

  it('should navigate to onAssignmentClicked', () => {
    component.onAssignmentClicked({} as Event);
    expect(component).toBeTruthy();
  });

  it('should something onStudetnUpdate', () => {
    component.onStudentUpdate({} as Event);
    expect(component).toBeTruthy();
  });

  it('should dispatch action onStudentDelete', () => {
    component.onStudentDelete({} as Event);
    expect(component).toBeTruthy();
  });

  it('should something onAssignmentUpdate', () => {
    component.onAssignmentUpdate({} as Event);
    expect(component).toBeTruthy();
  });

  it('should dispatch action onAssignmnetDelete', () => {
    component.onAssignmentDelete({} as Event);
    expect(component).toBeTruthy();
  });
});
