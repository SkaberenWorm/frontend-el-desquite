import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PasswordIndexComponent } from './password-index/password-index.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: ':token',
    component: PasswordIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordRoutingModule { }
