import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../dialog/dialog.component';
import { TableConfig } from '@grade-assist/data';
import { ViewDialogComponent } from '../view-dialog/view-dialog.component';

@Component({
  selector: 'grade-assist-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() tableData?: any = [];
  // @Input() tableStructure!: ColumnConfigs[];
  @Output() rowDeleted = new EventEmitter<any>();
  @Output() updateRow = new EventEmitter<any>();
  @Output() viewRowDetails = new EventEmitter<any>();

  expandedElement: any | null;

  @Input()
  tableConfig!: TableConfig;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    for (const obj of this.tableConfig.columns) {
      if (obj.display) {
        this.displayedColumns.push(obj.id);
      }
    }
    if (
      this.tableConfig?.updateRow ||
      this.tableConfig?.deleteRow ||
      this.tableConfig.viewBtn
    ) {
      this.displayedColumns.push('actions');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableData']) {
      this.dataSource = new MatTableDataSource(this.tableData);
    }
  }

  // ngAfterViewInit() {
  //   // this.dataSource.paginator = this.paginator;
  //   // this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onUpdateClicked(row: any) {
    this.updateRow.emit(row);
  }

  onViewClicked(row: any) {
    // console.log(row);
    //type of view: dialog or event emitter

    // const dialogRef = this.dialog.open(ViewDialogComponent, {
    //   data: { ...row },
    //   hasBackdrop: true,
    //   height: '500px',
    //   width: '500px',
    // });

    this.viewRowDetails.emit(row);
  }

  private getDeleteConfirm(row: any) {
    let text = '';
    for (const key in this.tableConfig.deleteConfirmKey) {
      text += ` ${row[key]}`;
    }
    return text;
  }
  // row type unknown as it is flexible
  onDeleteClicked(row: any) {
    console.log(row);
    const deleteConfirm = this.tableConfig.deleteConfirmKey
      ? this.getDeleteConfirm(row)
      : row._id;
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Confirm Deletion',
        content: `Are you sure you want to permanently delete ${deleteConfirm} ?`,
        confirmLabel: 'Yes',
        cancelLabel: 'No',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.rowDeleted.emit(row);
      }
    });
  }

  // row type unknown as it is flexible
  onRowClicked(row: any) {
    console.log(row);
  }

  // row type unknown as it is flexible
  getColumnData(row: any, key: any) {
    if (key.includes('.')) {
      const keySplit = key.split('.');
      const lvl1 = row[keySplit[0]];
      const nxtLevl = lvl1 ? lvl1[keySplit[1]] : '';
      return nxtLevl;
    }
    return row[key];
  }
}
