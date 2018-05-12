import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordComponent } from './forgot-password.component';

const routes: Routes = [
  { path: 'forgot-password', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }

export const routedComponents = [ForgotPasswordComponent];
