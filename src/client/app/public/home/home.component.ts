import { Component, OnInit } from '@angular/core';

import { DialogService, ListColumn } from '../../shared';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {

  public constructor(
    private dialogService: DialogService
  ) { }

  public ngOnInit() { }

  public data = [
    {
      name: 'Test',
      role: 'test'
    },
    {
      name: 'Test',
      role: 'test'
    }
  ];

  public columns: ListColumn[] = [
    {
      title: 'Name',
      value: 'name'
    },
    {
      title: 'Role',
      value: 'role'
    }
  ];

  public onClickAlert() {
    const alertDialog = this.dialogService.openAlertDialog({
      title: 'Alert',
      content: 'Sample alert'
    });
  }

  public onClickConfirm() {
    const confirmDialog = this.dialogService.openConfirmDialog({
      title: 'Confirm',
      content: 'Sample confirm'
    });
  }
}
