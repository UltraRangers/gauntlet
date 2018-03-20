import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketingHomeComponent } from './marketing';

export const routes: Routes = [
  {
    path: '', component: MarketingHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MarketingRoutes {}
