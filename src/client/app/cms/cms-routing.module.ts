import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CurrentUserGuard } from '../core';

import { CmsComponent } from './cms.component';

const routes: Routes = [
  {
    path: '',
    component: CmsComponent,
    canActivate: [CurrentUserGuard],
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }

export const routedComponents = [
  CmsComponent
];
