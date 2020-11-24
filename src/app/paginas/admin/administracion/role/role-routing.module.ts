import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/commons/guards/login.guard';

import { RoleIndexComponent } from './role-index/role-index.component';

const routes: Routes = [
  {
    path: '',
    component: RoleIndexComponent,
    canLoad: [LoginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
