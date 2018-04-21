import { Component, OnInit } from '@angular/core';

import { UserService } from './core';

import { User } from '../../common/entities';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {

  constructor(
    private userService: UserService
  ) {}

  public ngOnInit() {
    this.getMe();
  }

  private getMe() {
    this.userService.getMe().subscribe((user: User) => {

    }, (error: Error) => {

    });
  }
}
