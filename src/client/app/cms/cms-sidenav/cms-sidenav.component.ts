import { Component, OnInit } from '@angular/core';

import { UserService } from '../../core';

@Component({
  selector: 'cms-sidenav',
  templateUrl: 'cms-sidenav.component.html',
  styleUrls: ['cms-sidenav.component.scss']
})

export class CmsSidenavComponent implements OnInit {

  public constructor(
    private userService: UserService
  ) { }

  public ngOnInit() { }

  public onClickLogout() {
    this.userService.logout();
  }
}
