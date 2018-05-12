import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { ForgotPasswordRoutingModule, routedComponents } from './forgot-password-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ForgotPasswordRoutingModule
  ],
  exports: [],
  declarations: [routedComponents],
  providers: [],
})
export class ForgotPasswordModule { }
