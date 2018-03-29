import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarketingModule } from './marketing/marketing.module';

export const routes: Routes = [
  { path: '', loadChildren: () => MarketingModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutes {}
