import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { CdkColumnDef } from '@angular/cdk/table';

import { DialogComponent } from './components/dialog/dialog.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
@NgModule({
  declarations: [DialogComponent, FormComponent, TableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [CdkColumnDef],
  exports: [DialogComponent, FormComponent, TableComponent],
})
export class SharedModule {}
