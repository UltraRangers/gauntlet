import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { LoginRoutingModule, routedComponents } from './login-routing.module';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  exports: [],
  declarations: [routedComponents],
  providers: [],
})
export class LoginModule { }
