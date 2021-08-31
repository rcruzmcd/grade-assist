import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CdkColumnDef } from '@angular/cdk/table';

import { DialogComponent } from './components/dialog/dialog.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { MaterialModule } from './material.module';
import { ViewDialogComponent } from './components/view-dialog/view-dialog.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
@NgModule({
  declarations: [
    DialogComponent,
    FormComponent,
    TableComponent,
    ViewDialogComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, FormsModule],
  providers: [CdkColumnDef],
  exports: [
    DialogComponent,
    FormComponent,
    TableComponent,
    MaterialModule,
    SpinnerComponent,
  ],
})
export class SharedModule {}
