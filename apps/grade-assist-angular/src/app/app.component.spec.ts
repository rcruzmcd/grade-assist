import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/components/login/login.component';
import { SharedModule } from '@grade-assist/shared';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let store: MockStore;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  const initialState = { auth: { jwt: '' } };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatDividerModule,
        BrowserAnimationsModule,
        SharedModule,
      ],
      declarations: [AppComponent, LoginComponent],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Grade Assist'`, () => {
    expect(component.title).toEqual('Grade Assist');
  });

  it('should call onLogout on button click', fakeAsync(() => {
    jest.spyOn(component, 'onLogout');
    component.isAuthorized = true;
    fixture.detectChanges();
    const buttonDe = fixture.debugElement.query(By.css('#logout-button'));
    const button = buttonDe.nativeElement;
    button.click();
    tick();
    expect(component.onLogout).toHaveBeenCalled();
  }));

  it('should display login screen on first load with isAuthorize false', () => {
    component.isAuthorized = false;
    const loginContainerEl = fixture.debugElement.query(
      By.css('#login-container')
    );
    expect(loginContainerEl).toBeTruthy();
  });

  it('should display app container if isAuthorized is true', () => {
    component.isAuthorized = true;
    fixture.detectChanges();
    const appContainerEl = fixture.debugElement.query(By.css('#app-container'));
    expect(appContainerEl).toBeTruthy();
  });

  it('should load menu items base on menu configuration', () => {
    component.isAuthorized = true;
    fixture.detectChanges();
    const drawer = fixture.debugElement.query(By.css('.drawer'));
    const listLength = document.getElementsByTagName('mat-nav-list').length;
    const menuLength = 3; // 3 wildcards
    // component.menu.length;
    expect(listLength).toEqual(menuLength);
  });

  it('should load ALL menu items for admin', () => {
    component.userType = 'admin';
    store.setState({ auth: { jwt: '', userType: 'admin' } });
    component.isAuthorized = true;
    fixture.detectChanges();

    const drawer = fixture.debugElement.query(By.css('.drawer'));
    const listLength = document.getElementsByTagName('mat-nav-list').length;
    const menuLength = component.menu.length;
    expect(listLength).toEqual(menuLength);
  });

  // it('should dispatch logout action on logout function', () => {
  //   component.onLogout();
  // });
});
