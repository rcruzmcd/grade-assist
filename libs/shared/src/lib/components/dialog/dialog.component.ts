import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialog } from '@grade-assist/data';
// import { ConfirmDialog } from 'src/app/models/dialog.model';

@Component({
  selector: 'grade-assist-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  title!: string;
  content!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ConfirmDialog
  ) {}

  ngOnInit(): void {
    console.log('dialog');
  }
}
