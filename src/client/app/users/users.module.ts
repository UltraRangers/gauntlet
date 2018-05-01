import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { UsersRoutingModule, routedComponents } from './users-routing.module';

@NgModule({
  imports: [
    SharedModule,
    UsersRoutingModule
  ],
  exports: [],
  declarations: [routedComponents],
  providers: [],
})
export class UsersModule { }
