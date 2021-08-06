import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CdkColumnDef } from '@angular/cdk/table';

import { DialogComponent } from './components/dialog/dialog.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { MaterialModule } from './material.module';
@NgModule({
  declarations: [DialogComponent, FormComponent, TableComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  providers: [CdkColumnDef],
  exports: [DialogComponent, FormComponent, TableComponent, MaterialModule],
})
export class SharedModule {}
