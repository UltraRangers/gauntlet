import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', loadChildren: '../home/home.module#HomeModule' },
      { path: '', loadChildren: '../login/login.module#LoginModule' },
      { path: '', loadChildren: '../forgot-password/forgot-password.module#ForgotPasswordModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }

export const routedComponents = [PublicComponent];
