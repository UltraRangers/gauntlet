import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'alert-dialog',
  templateUrl: 'alert-dialog.component.html',
  styleUrls: ['alert-dialog.component.scss']
})

export class AlertDialogComponent implements OnInit {

  public submitted: boolean;

  constructor(
    private dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  public ngOnInit() { }

  public onSubmit() {
    this.submitted = true;
    this.dialogRef.close();
  }
}
