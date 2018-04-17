import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CurrentUserGuard } from './guards/current-user.guard';

import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: [],
  providers: [
    ApiService,
    UserService,
    CurrentUserGuard
  ]
})
export class CoreModule { }
