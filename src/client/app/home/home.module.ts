import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { HomeRoutingModule, routedComponents } from './home-routing.module';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule
  ],
  exports: [],
  declarations: [routedComponents],
  providers: []
})
export class HomeModule { }
