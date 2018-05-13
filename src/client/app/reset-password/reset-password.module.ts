import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { ResetPasswordRoutingModule, routedComponents } from './reset-password-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ResetPasswordRoutingModule
  ],
  exports: [],
  declarations: [routedComponents],
  providers: [],
})
export class ResetPasswordModule { }
