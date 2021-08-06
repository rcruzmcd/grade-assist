import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatDialogHarness } from '@angular/material/dialog/testing';

import {} from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { TableConfig } from '@grade-assist/data';

import { TableComponent } from './table.component';
import { DialogComponent } from '../dialog/dialog.component';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatTable, MatTableModule } from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table';
import { of } from 'rxjs';

let loader: HarnessLoader;
describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  // let dialogSpy: jasmine.Spy;
  // let dialogRefSpyObj = jasmine.createSpyObj({
  //   afterClosed: of({}),
  //   close: null,
  // });

  const mockDialogRef = { close: jasmine.createSpy('close') };

  const data = [{ test: 'mytest', name: 'myName' }];
  const config: TableConfig = {
    columns: [
      {
        id: 'test',
        label: 'Test',
        display: true,
      },
      {
        id: 'name',
        label: 'Name',
        display: false,
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent, DialogComponent],
      imports: [],
      providers: [
        {
          provide: MatDialog,
          useValue: mockDialogRef,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.tableConfig = config;
    component.tableData = data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data async', () => {
    expect(component).toBeTruthy();
  });

  it('should @output update row on button click', () => {
    expect(component).toBeTruthy();
  });

  it('should @output delete row on button clicked and confirmed', () => {
    expect(component).toBeTruthy();
  });

  it('should not @ouput delete row on button clicked and not confirmed', () => {
    expect(component).toBeTruthy();
  });

  it('should pagination test', () => {
    expect(component).toBeTruthy();
  });

  it('should sort test', () => {
    expect(component).toBeTruthy();
  });

  it('should filter rows based on filtered text', () => {
    expect(component).toBeTruthy();
  });
});
