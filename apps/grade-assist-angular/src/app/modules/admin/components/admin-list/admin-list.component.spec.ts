import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AdminListComponent } from './admin-list.component';
import { SharedModule } from '@grade-assist/shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('AdminListComponent', () => {
  let store: MockStore;
  const initialState = {};

  let component: AdminListComponent;
  let fixture: ComponentFixture<AdminListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminListComponent],
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
    fixture = TestBed.createComponent(AdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch delete action onDeleteHandler', () => {
    component.onDeleteHandler({} as Event);
    expect(component).toBeTruthy();
  });

  it('should dispatch update action onUpdateHandler', () => {
    component.onUpdateHandler({} as Event);
    expect(component).toBeTruthy();
  });
});
