import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/commons/guards/login.guard';
import { RolAdminGuard } from 'src/app/commons/guards/rol-admin.guard';

import { AdminIndexComponent } from './admin-index/admin-index.component';
import { AdministracionComponent } from './administracion/administracion.component';

const routes: Routes = [
  {
    path: '',
    component: AdminIndexComponent,
    canLoad: [LoginGuard]
  },

  { path: 'administracion', component: AdministracionComponent, canActivate: [LoginGuard, RolAdminGuard], loadChildren: () => import('./administracion/administracion.module').then(m => m.AdministracionModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
