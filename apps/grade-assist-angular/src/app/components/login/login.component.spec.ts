import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatCardModule } from '@angular/material/card/';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { LoginComponent } from './login.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
// import { MaterialModule } from '@grade-assist/shared';

import { SharedModule } from '@grade-assist/shared';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkColumnDef } from '@angular/cdk/table';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;
  let card: MatCardHarness;
  let loader: HarnessLoader;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        SharedModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatDividerModule,
      ],
      providers: [CdkColumnDef, provideMockStore({ initialState })],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // loader = TestbedHarnessEnvironment.loader(fixture);
  });
  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call form handler once information received from form', () => {
    jest.spyOn(component, 'formHandler');

    // expect(component.formHandler).toHaveBeenCalled();
  });

  it('should dispatch login action on formhandler called', () => {
    // spyOn(component, 'formHandler');
    // expect(component.formHandler).toHaveBeenCalled();
    // component.formHandler();
  });
});
