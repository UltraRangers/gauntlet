import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared';

import { PublicRoutingModule, routedComponents } from './public-routing.module';

import { PublicHeaderComponent } from './public-header/public-header.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
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
