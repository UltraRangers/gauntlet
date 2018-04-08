import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export enum ConfirmDialogState {
  Cancelled = 'cancelled',
  Confirmed = 'confirmed'
}

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  styleUrls: ['confirm-dialog.component.scss']
})

export class ConfirmDialogComponent implements OnInit {

  public state: string;
  public confirmed: boolean;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  public ngOnInit() { }

  public onCancel() {
    this.state = ConfirmDialogState.Cancelled;
    this.confirmed = false;
    this.dialogRef.close();
  }

  public onConfirm() {
    this.state = ConfirmDialogState.Confirmed;
    this.confirmed = true;
    this.dialogRef.close();
  }
}
