import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { CmsRoutingModule, routedComponents } from './cms-routing.module';

import { CmsFooterComponent } from './cms-footer/cms-footer.component';
import { CmsHeaderComponent } from './cms-header/cms-header.component';
import { CmsSidenavComponent } from './cms-sidenav/cms-sidenav.component';

@NgModule({
  imports: [
    SharedModule,
    CmsRoutingModule
  ],
  exports: [],
  declarations: [
    routedComponents,
    CmsFooterComponent,
    CmsHeaderComponent,
    CmsSidenavComponent
  ],
  providers: []
})
export class CmsModule { }
