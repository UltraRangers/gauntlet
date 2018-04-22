import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { ProfileRoutingModule, routedComponents } from './profile-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule
  ],
  exports: [],
  declarations: [
    routedComponents
  ],
  providers: []
})
export class ProfileModule { }
