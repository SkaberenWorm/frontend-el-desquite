import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/commons/guards/login.guard';

import { RoleFormComponent } from './role-form/role-form.component';
import { RoleIndexComponent } from './role-index/role-index.component';

const routes: Routes = [
  {
    path: '',
    component: RoleIndexComponent,
    canLoad: [LoginGuard]
  },

  {
    path: ':id/edit',
    component: RoleFormComponent,
    canLoad: [LoginGuard]
  },
  {
    path: 'new',
    component: RoleFormComponent,
    canLoad: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
