import { Component, OnInit } from '@angular/core';

import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'public-header',
  templateUrl: 'public-header.component.html',
  styleUrls: ['public-header.component.scss']
})

export class PublicHeaderComponent implements OnInit {

  public isLoggedIn: boolean = false;

  constructor(private readonly userService: UserService) {
    userService.getMe().subscribe(
      (user) => {
        if (user && Object.keys(user).length) {
          this.isLoggedIn = true; // mock
        }
      }
    );
  }

  public ngOnInit() { }
}
