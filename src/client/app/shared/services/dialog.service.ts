import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Injectable()
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  public openAlertDialog({
    title = 'Alert',
    content = 'Test content'
  } = {}) {
    return this.dialog.open(AlertDialogComponent, {
      data: {
        title: title,
        content: content
      }
    });
  }

  public openConfirmDialog({
    title = 'Alert',
    content = 'Test content'
  } = {}) {
    return this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: title,
        content: content
      }
    });
  }
}
