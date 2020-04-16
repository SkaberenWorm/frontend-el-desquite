import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministracionComponent } from './administracion/administracion.component';
import { LoginGuard } from 'src/app/commons/guards/login.guard';
import { RolAdminGuard } from 'src/app/commons/guards/rol-admin.guard';
import { AdminIndexComponent } from './administracion/admin-index/admin-index.component';

const routes: Routes = [
  {
    path: '',
    component: AdminIndexComponent,
    canLoad: [RolAdminGuard]
  },
  {
    path: 'administracion',
    component: AdministracionComponent,
    canActivate: [LoginGuard, RolAdminGuard],
    loadChildren: './administracion/administracion.module#AdministracionModule'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
