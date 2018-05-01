import { Component, OnInit } from '@angular/core';

import { User } from '../../../common/entities';

import { UserService } from '../core';
import { ListColumn, DialogService } from '../shared';

@Component({
  selector: 'users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss']
})

export class UsersComponent implements OnInit {

  public columns: ListColumn[] = [
    {
      title: 'Email',
      value: 'email'
    },
    {
      title: 'Enabled',
      value: 'enabled'
    }
  ];

  public users: User[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly dialogService: DialogService
  ) { }

  public ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUsers({})
      .subscribe((users) => {
        this.users = users;
        console.log(users);
      }, (error: Error) => {
        this.dialogService.openAlertDialog({
          title: 'Error',
          content: error.message
        });
        console.log(error);
      });
  }
}
