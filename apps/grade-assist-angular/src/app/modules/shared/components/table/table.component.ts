import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../dialog/dialog.component';
import { ColumnConfigs } from '@grade-assist/mylibrary';

@Component({
  selector: 'grade-assist-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() tableData!: any;
  @Input() tableStructure!: ColumnConfigs[];
  @Output() onRowDeleted = new EventEmitter<any>();
  @Output() onUpdateRow = new EventEmitter<any>();

  expandedElement: any | null;

  tableConfig!: {
    pagination: boolean;
    sort: boolean;
    updateRow: boolean;
    deleteRow: boolean;
    columns: ColumnConfigs[];
  };

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tableData);
    for (const obj of this.tableStructure) {
      if (obj.display) {
        this.displayedColumns.push(obj.id);
      }
    }
    if (this.tableConfig?.updateRow || this.tableConfig?.deleteRow || true) {
      this.displayedColumns.push('actions');
    }
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onUpdateClicked(row: any) {
    console.log(row);
    this.onUpdateRow.emit(row);
  }

  onDeleteClicked(row: any) {
    console.log(row);
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Confirm Deletion',
        content: `Are you sure you want to permanently delete ${row.firstName} ${row.lastName}?`,
        confirmLabel: 'Yes',
        cancelLabel: 'No',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.onRowDeleted.emit(row);
      }
    });
  }
}
