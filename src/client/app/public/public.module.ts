import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { PublicRoutingModule, routedComponents } from './public-routing.module';

import { PublicHeaderComponent } from './public-header/public-header.component';

@NgModule({
  imports: [
    SharedModule,
    PublicRoutingModule
  ],
  exports: [],
  declarations: [
    routedComponents,
    PublicHeaderComponent
  ],
  providers: []
})
export class PublicModule { }
